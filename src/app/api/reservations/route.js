import sql from "../utils/sql.js";

// Create new reservation
export async function POST(request) {
  try {
    const {
      customer_name,
      customer_phone,
      customer_email,
      party_size,
      reservation_date,
      reservation_time,
      special_notes
    } = await request.json();

    // Generate reservation number
    const reservation_number = 'RES' + Date.now().toString().slice(-8);

    // Check if time slot is available (basic check - in production you'd want more sophisticated logic)
    const existingReservations = await sql`
      SELECT COUNT(*) as count 
      FROM reservations 
      WHERE reservation_date = ${reservation_date} 
      AND reservation_time = ${reservation_time}
      AND status != 'cancelled'
    `;

    // Simple capacity check (assuming max 10 tables)
    if (existingReservations[0].count >= 10) {
      return Response.json(
        { success: false, error: 'Time slot is not available' },
        { status: 400 }
      );
    }

    const reservation = await sql`
      INSERT INTO reservations (
        reservation_number, customer_name, customer_phone, customer_email,
        party_size, reservation_date, reservation_time, special_notes
      ) VALUES (
        ${reservation_number}, ${customer_name}, ${customer_phone}, ${customer_email},
        ${party_size}, ${reservation_date}, ${reservation_time}, ${special_notes}
      ) RETURNING *
    `;

    return Response.json({
      success: true,
      data: reservation[0],
      message: 'Reservation confirmed successfully!'
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return Response.json(
      { success: false, error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}

// Get reservations
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    const date = searchParams.get('date');
    
    let query = `
      SELECT * FROM reservations
    `;
    
    const params = [];
    const conditions = [];
    
    if (phone) {
      conditions.push(`customer_phone = $${params.length + 1}`);
      params.push(phone);
    }
    
    if (date) {
      conditions.push(`reservation_date = $${params.length + 1}`);
      params.push(date);
    }
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ` ORDER BY reservation_date DESC, reservation_time DESC`;
    
    const reservations = await sql(query, params);
    
    return Response.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}