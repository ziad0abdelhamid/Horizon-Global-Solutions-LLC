// app/api/contact/route.ts
"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Example: you can process the form data here, e.g., send email or save to DB
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // TODO: handle form data (send email, save to DB, etc.)
    console.log("Contact form submitted:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
