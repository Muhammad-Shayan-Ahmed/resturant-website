import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const zones = await sql`
      SELECT * FROM delivery_zones 
      WHERE is_active = true 
      ORDER BY fee ASC
    `;
    
    return Response.json({
      success: true,
      data: zones
    });
  } catch (error) {
    console.error('Error fetching delivery zones:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch delivery zones' },
      { status: 500 }
    );
  }
}