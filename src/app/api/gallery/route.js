import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    
    let query = `
      SELECT id, title, image, tags, alt_text, display_order, created_at
      FROM gallery_images
    `;
    
    const params = [];
    
    if (tag) {
      query += ` WHERE $1 = ANY(tags)`;
      params.push(tag);
    }
    
    query += ` ORDER BY display_order ASC, created_at DESC`;
    
    const images = await sql(query, params);
    
    return Response.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}