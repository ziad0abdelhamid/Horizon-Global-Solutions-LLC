import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../lib/neon";

// GET - Fetch all messages from NeonDB
export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const query = `
      SELECT id, service_id, first_name, last_name, email, phone, id_number, company, message, created_at
      FROM requests
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

// DELETE - Delete message
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    const query = `DELETE FROM requests WHERE id = $1`;
    await pool.query(query, [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting message:", err);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 },
    );
  }
}
