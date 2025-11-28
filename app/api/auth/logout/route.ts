import { NextRequest, NextResponse } from "next/server"
import { destroySession } from "@/lib/auth"

export async function POST(_req: NextRequest) {
  try {
    await destroySession()
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("Logout error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


