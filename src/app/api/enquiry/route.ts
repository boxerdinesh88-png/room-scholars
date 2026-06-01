import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, moveIn, message, propertyName, propertyLocation, price } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const pool = getPool();
    await pool.query(
      `INSERT INTO enquiries (name, email, phone, move_in_date, message, property_name, property_location, price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, moveIn || null, message || null, propertyName || null, propertyLocation || null, price || null]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
