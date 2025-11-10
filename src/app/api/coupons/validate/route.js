import sql from "../../utils/sql.js";

export async function POST(request) {
  try {
    const { code, subtotal } = await request.json();

    if (!code) {
      return Response.json(
        { success: false, error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    const coupon = await sql`
      SELECT * FROM coupons 
      WHERE code = ${code} 
      AND is_active = true
      AND (expires_at IS NULL OR expires_at > NOW())
      AND (usage_limit IS NULL OR used_count < usage_limit)
    `;

    if (coupon.length === 0) {
      return Response.json(
        { success: false, error: 'Invalid or expired coupon code' },
        { status: 400 }
      );
    }

    const couponData = coupon[0];

    // Check minimum subtotal requirement
    if (couponData.min_subtotal && subtotal < couponData.min_subtotal) {
      return Response.json(
        { 
          success: false, 
          error: `Minimum order amount of Rs. ${couponData.min_subtotal} required for this coupon` 
        },
        { status: 400 }
      );
    }

    // Calculate discount amount
    let discountAmount = 0;
    
    if (couponData.type === 'percent') {
      discountAmount = (subtotal * couponData.value) / 100;
    } else if (couponData.type === 'fixed') {
      discountAmount = couponData.value;
    }
    
    // Ensure discount doesn't exceed subtotal
    discountAmount = Math.min(discountAmount, subtotal);

    return Response.json({
      success: true,
      data: {
        code: couponData.code,
        type: couponData.type,
        value: couponData.value,
        discountAmount: discountAmount
      },
      message: `Coupon applied! You saved Rs. ${discountAmount}`
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return Response.json(
      { success: false, error: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}