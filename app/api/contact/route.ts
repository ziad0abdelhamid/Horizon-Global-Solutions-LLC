import { NextResponse } from 'next/server'


export async function POST(req: Request) {
const data = await req.json()
// validate and forward to your email provider / DB
return NextResponse.json({ ok: true })
}