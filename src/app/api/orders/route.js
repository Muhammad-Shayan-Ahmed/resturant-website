import sql from "../utils/sql.js";

// Create new order
export async function POST(request) {
  try {
    const {
      customer_name,
      customer_phone,
      customer_email,
      order_type,
      delivery_address,
      delivery_notes,
      items,
      subtotal,
      delivery_fee,
      discount_amount,
      tax_amount,
      total_amount,
      coupon_code,
      payment_method
    } = await request.json();

    // Generate order number
    const order_number = 'DF' + Date.now().toString().slice(-8);
    
    // Calculate estimated delivery (45 minutes for delivery, 20 for takeaway)
    const estimatedMinutes = order_type === 'delivery' ? 45 : 20;
    const estimated_delivery = new Date(Date.now() + estimatedMinutes * 60000);

    const order = await sql`
      INSERT INTO orders (
        order_number, customer_name, customer_phone, customer_email,
        order_type, delivery_address, delivery_notes, items,
        subtotal, delivery_fee, discount_amount, tax_amount, total_amount,
        coupon_code, payment_method, estimated_delivery
      ) VALUES (
        ${order_number}, ${customer_name}, ${customer_phone}, ${customer_email},
        ${order_type}, ${delivery_address}, ${delivery_notes}, ${JSON.stringify(items)},
        ${subtotal}, ${delivery_fee}, ${discount_amount}, ${tax_amount}, ${total_amount},
        ${coupon_code}, ${payment_method}, ${estimated_delivery}
      ) RETURNING *
    `;

    // Update coupon usage if used
    if (coupon_code) {
      await sql`
        UPDATE coupons 
        SET used_count = used_count + 1 
        WHERE code = ${coupon_code}
      `;
    }

    return Response.json({
      success: true,
      data: order[0],
      message: 'Order placed successfully!'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json(
      { success: false, error: 'Failed to place order' },
      { status: 500 }
    );
  }
}

// Get orders (for admin or customer lookup)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    const order_number = searchParams.get('order_number');
    
    let query = `
      SELECT * FROM orders
    `;
    
    const params = [];
    const conditions = [];
    
    if (phone) {
      conditions.push(`customer_phone = $${params.length + 1}`);
      params.push(phone);
    }
    
    if (order_number) {
      conditions.push(`order_number = $${params.length + 1}`);
      params.push(order_number);
    }
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ` ORDER BY created_at DESC`;
    
    const orders = await sql(query, params);
    
    return Response.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}