import sql from "../utils/sql";

export async function GET(request) {
  try {
    // Fetch operating hours
    const hours = await sql`
      SELECT 
        day_of_week,
        open_time,
        close_time,
        is_closed
      FROM operating_hours
      ORDER BY day_of_week
    `;

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const formattedHours = hours.map(hour => ({
      day: dayNames[hour.day_of_week],
      open: hour.open_time,
      close: hour.close_time,
      isClosed: hour.is_closed
    }));

    return Response.json(formattedHours, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });

  } catch (error) {
    console.error('Error fetching operating hours:', error);
    return Response.json(
      { error: 'Failed to fetch operating hours' },
      { status: 500 }
    );
  }
}

// PUT endpoint for updating operating hours (admin only)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { hours } = body;

    if (!hours || !Array.isArray(hours)) {
      return Response.json(
        { error: 'Invalid hours data' },
        { status: 400 }
      );
    }

    // Update each day's hours
    for (const hour of hours) {
      const { dayOfWeek, openTime, closeTime, isClosed } = hour;
      
      await sql`
        UPDATE operating_hours 
        SET 
          open_time = ${isClosed ? null : openTime},
          close_time = ${isClosed ? null : closeTime},
          is_closed = ${isClosed}
        WHERE day_of_week = ${dayOfWeek}
      `;
    }

    return Response.json({ message: 'Operating hours updated successfully' });

  } catch (error) {
    console.error('Error updating operating hours:', error);
    return Response.json(
      { error: 'Failed to update operating hours' },
      { status: 500 }
    );
  }
}