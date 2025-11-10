import sql from "../utils/sql";

export async function GET(request) {
  try {
    // Fetch all categories
    const categories = await sql`
      SELECT 
        id,
        name,
        slug,
        description,
        image,
        display_order
      FROM categories
      ORDER BY display_order ASC, name ASC
    `;

    const formattedCategories = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      displayOrder: category.display_order
    }));

    return Response.json(formattedCategories, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST endpoint for creating new categories (admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, slug, description, image, displayOrder } = body;

    // Basic validation
    if (!name || !slug) {
      return Response.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingCategory = await sql`
      SELECT id FROM categories WHERE slug = ${slug} LIMIT 1
    `;

    if (existingCategory.length > 0) {
      return Response.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    // Insert new category
    const result = await sql`
      INSERT INTO categories (name, slug, description, image, display_order)
      VALUES (${name}, ${slug}, ${description || null}, ${image || null}, ${displayOrder || 0})
      RETURNING id, name, slug, description, image, display_order
    `;

    return Response.json({
      message: 'Category created successfully',
      category: result[0]
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    return Response.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}