import sql from "../../utils/sql";

export async function GET(request) {
  try {
    // Fetch today's active deal
    const deals = await sql`
      SELECT 
        id,
        title,
        description,
        items,
        original_price,
        deal_price,
        expires_at,
        is_active
      FROM deals
      WHERE is_active = true 
        AND (expires_at IS NULL OR expires_at > NOW())
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (deals.length === 0) {
      return Response.json(null, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      });
    }

    const deal = deals[0];
    
    // Calculate savings and discount percentage
    const originalPrice = parseFloat(deal.original_price);
    const dealPrice = parseFloat(deal.deal_price);
    const savings = originalPrice - dealPrice;
    const discount = Math.round((savings / originalPrice) * 100);

    const formattedDeal = {
      id: deal.id,
      title: deal.title,
      description: deal.description,
      items: deal.items || [],
      originalPrice,
      dealPrice,
      savings,
      discount,
      expiresAt: deal.expires_at,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    };

    return Response.json(formattedDeal, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error('Error fetching deal of the day:', error);
    return Response.json(
      { error: 'Failed to fetch deal of the day' },
      { status: 500 }
    );
  }
}