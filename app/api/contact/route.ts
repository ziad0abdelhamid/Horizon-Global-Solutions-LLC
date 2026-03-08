// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/neon";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Save to NeonDB
    const nameArray = name.trim().split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray.slice(1).join(" ") || "";

    const query = `
      INSERT INTO requests 
        (service_id, first_name, last_name, email, phone, id_number, company, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    await pool.query(query, [
      "contact",
      firstName,
      lastName,
      email,
      "",
      "",
      "",
      message,
    ]);

    console.log("Contact form submitted:", { name, email, message });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
