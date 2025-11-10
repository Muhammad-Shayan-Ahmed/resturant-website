import sql from "../utils/sql";

export async function GET(request) {
  try {
    // Fetch published testimonials
    const testimonials = await sql`
      SELECT 
        id,
        name,
        rating,
        comment,
        avatar,
        is_verified,
        created_at
      FROM testimonials
      WHERE is_published = true
      ORDER BY is_verified DESC, created_at DESC
      LIMIT 10
    `;

    const formattedTestimonials = testimonials.map(testimonial => ({
      id: testimonial.id,
      name: testimonial.name,
      rating: testimonial.rating,
      comment: testimonial.comment,
      avatar: testimonial.avatar || `https://images.unsplash.com/photo-1494790108755-2616b612b1d1?auto=format&fit=crop&w=150&q=80`,
      isVerified: testimonial.is_verified,
      date: testimonial.created_at
    }));

    return Response.json(formattedTestimonials, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200'
      }
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return Response.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST endpoint for creating new testimonials
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, rating, comment, customerEmail, orderNumber } = body;

    // Basic validation
    if (!name || !rating || !comment) {
      return Response.json(
        { error: 'Name, rating, and comment are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return Response.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if customer has ordered before for verification
    let isVerified = false;
    if (customerEmail && orderNumber) {
      const orderCheck = await sql`
        SELECT id FROM orders 
        WHERE customer_email = ${customerEmail} 
        AND order_number = ${orderNumber}
        AND payment_status = 'completed'
        LIMIT 1
      `;
      isVerified = orderCheck.length > 0;
    }

    // Insert testimonial
    const result = await sql`
      INSERT INTO testimonials (name, rating, comment, is_verified, is_published)
      VALUES (${name}, ${rating}, ${comment}, ${isVerified}, false)
      RETURNING id, name, rating, comment, is_verified, created_at
    `;

    return Response.json({
      message: 'Thank you for your review! It will be published after moderation.',
      testimonial: result[0]
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating testimonial:', error);
    return Response.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}