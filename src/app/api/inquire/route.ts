import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Here you would typically insert this data into your database (e.g., Supabase)
    // such as an 'inquiries' or 'rental_requests' table.
    console.log('--- NEW RENTAL INQUIRY RECEIVED ---');
    console.log('Product ID:', payload.productId);
    console.log('Vendor ID:', payload.vendorId);
    console.log('Dates:', payload.dates);
    console.log('Measurements:', payload.measurements);
    console.log('Delivery:', payload.delivery);
    console.log('Contact:', payload.contact);
    console.log('Notes:', payload.notes);
    console.log('Calculated Totals:', payload.totals);
    console.log('-----------------------------------');

    // Simulate network delay for realistic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (error: any) {
    console.error('Inquiry API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
