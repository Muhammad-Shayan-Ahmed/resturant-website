import sql from "../utils/sql";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    const spiceLevel = url.searchParams.get('spiceLevel');
    const isVeg = url.searchParams.get('isVeg');
    const available = url.searchParams.get('available');

    // Build dynamic query
    let query = `
      SELECT 
        mi.id,
        mi.name,
        mi.slug,
        mi.description,
        mi.price,
        mi.spice_level,
        mi.is_veg,
        mi.image,
        mi.is_bestseller,
        mi.is_available,
        mi.variants,
        mi.addons,
        c.name as category_name,
        c.slug as category_slug
      FROM menu_items mi
      JOIN categories c ON mi.category_id = c.id
      WHERE 1=1
    `;

    const queryParams = [];
    let paramIndex = 1;

    // Add filters
    if (available !== 'false') {
      query += ` AND mi.is_available = $${paramIndex}`;
      queryParams.push(true);
      paramIndex++;
    }

    if (category) {
      query += ` AND c.slug = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }

    if (search) {
      query += ` AND (
        LOWER(mi.name) LIKE LOWER($${paramIndex})
        OR LOWER(mi.description) LIKE LOWER($${paramIndex + 1})
      )`;
      queryParams.push(`%${search}%`);
      queryParams.push(`%${search}%`);
      paramIndex += 2;
    }

    if (spiceLevel) {
      query += ` AND mi.spice_level = $${paramIndex}`;
      queryParams.push(spiceLevel);
      paramIndex++;
    }

    if (isVeg === 'true') {
      query += ` AND mi.is_veg = $${paramIndex}`;
      queryParams.push(true);
      paramIndex++;
    } else if (isVeg === 'false') {
      query += ` AND mi.is_veg = $${paramIndex}`;
      queryParams.push(false);
      paramIndex++;
    }

    query += ` ORDER BY mi.is_bestseller DESC, mi.name ASC`;

    // Execute query
    const menuItems = await sql(query, queryParams);

    // Transform the data
    const formattedItems = menuItems.map(item => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: parseFloat(item.price),
      spiceLevel: item.spice_level,
      isVeg: item.is_veg,
      image: item.image || getDefaultImage(item.category_slug),
      isBestseller: item.is_bestseller,
      isAvailable: item.is_available,
      variants: item.variants || [],
      addons: item.addons || [],
      category: {
        name: item.category_name,
        slug: item.category_slug
      }
    }));

    return Response.json(formattedItems, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error fetching menu items:', error);
    return Response.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// Helper function to get default images based on category
function getDefaultImage(categorySlug) {
  const defaultImages = {
    'desi': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    'bbq': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',
    'fast-food': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    'karahi': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    'tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',
    'boti': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',
    'charga': 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=400&q=80',
    'burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    'sides': 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=400&q=80',
    'drinks': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80',
    'desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80'
  };
  
  return defaultImages[categorySlug] || defaultImages['desi'];
}

// POST endpoint for creating new menu items (admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      name, 
      slug, 
      categoryId, 
      description, 
      price, 
      spiceLevel, 
      isVeg, 
      image, 
      isBestseller,
      variants,
      addons
    } = body;

    // Basic validation
    if (!name || !slug || !categoryId || !price) {
      return Response.json(
        { error: 'Name, slug, category, and price are required' },
        { status: 400 }
      );
    }

    if (price <= 0) {
      return Response.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingItem = await sql`
      SELECT id FROM menu_items WHERE slug = ${slug} LIMIT 1
    `;

    if (existingItem.length > 0) {
      return Response.json(
        { error: 'Menu item with this slug already exists' },
        { status: 400 }
      );
    }

    // Verify category exists
    const categoryExists = await sql`
      SELECT id FROM categories WHERE id = ${categoryId} LIMIT 1
    `;

    if (categoryExists.length === 0) {
      return Response.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Insert new menu item
    const result = await sql`
      INSERT INTO menu_items (
        name, 
        slug, 
        category_id, 
        description, 
        price, 
        spice_level, 
        is_veg, 
        image, 
        is_bestseller,
        variants,
        addons
      )
      VALUES (
        ${name}, 
        ${slug}, 
        ${categoryId}, 
        ${description || null}, 
        ${price}, 
        ${spiceLevel || 'none'}, 
        ${isVeg || false}, 
        ${image || null}, 
        ${isBestseller || false},
        ${JSON.stringify(variants || [])},
        ${JSON.stringify(addons || [])}
      )
      RETURNING *
    `;

    return Response.json({
      message: 'Menu item created successfully',
      item: result[0]
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating menu item:', error);
    return Response.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}