import { NextResponse } from "next/server";
import pool from "../../../lib/neon"; // your pg pool helper

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      serviceId,
      firstName,
      lastName,
      email,
      phone,
      idNumber,
      company,
      message,
    } = body;

    // Basic validation
    if (!serviceId || !firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const query = `
      INSERT INTO requests 
        (service_id, first_name, last_name, email, phone, id_number, company, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;
    const values = [serviceId, firstName, lastName, email, phone, idNumber, company, message];

    const result = await pool.query(query, values);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
