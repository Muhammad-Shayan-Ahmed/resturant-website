import sql from "../../utils/sql";

export async function GET(request) {
  try {
    // Fetch bestseller menu items with category information
    const highlights = await sql`
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
        mi.variants,
        mi.addons,
        c.name as category_name,
        c.slug as category_slug
      FROM menu_items mi
      JOIN categories c ON mi.category_id = c.id
      WHERE mi.is_bestseller = true 
        AND mi.is_available = true
      ORDER BY mi.name
      LIMIT 8
    `;

    // Transform the data for frontend consumption
    const formattedHighlights = highlights.map(item => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: parseFloat(item.price),
      spiceLevel: item.spice_level,
      isVeg: item.is_veg,
      image: item.image || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80`,
      isBestseller: item.is_bestseller,
      variants: item.variants || [],
      addons: item.addons || [],
      category: {
        name: item.category_name,
        slug: item.category_slug
      }
    }));

    return Response.json(formattedHighlights, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error fetching menu highlights:', error);
    return Response.json(
      { error: 'Failed to fetch menu highlights' },
      { status: 500 }
    );
  }
}