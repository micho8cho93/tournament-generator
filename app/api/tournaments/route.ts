import { NextRequest, NextResponse } from "next/server"
import { createTournament, listTournamentsForUser } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tournaments = listTournamentsForUser(user.id)
    return NextResponse.json({ tournaments }, { status: 200 })
  } catch (error) {
    console.error("List tournaments error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const name = typeof body.name === "string" && body.name.trim() ? body.name.trim() : "Untitled Tournament"
    const format = typeof body.format === "string" ? body.format : ""
    const teams = typeof body.teams === "number" ? body.teams : 0
    const data = body.data ?? null

    if (!format || teams <= 0) {
      return NextResponse.json({ error: "Invalid tournament data" }, { status: 400 })
    }

    const t = createTournament({
      id: crypto.randomUUID(),
      userId: user.id,
      name,
      format,
      teams,
      createdAt: new Date().toISOString(),
      data,
    })

    return NextResponse.json({ tournament: t }, { status: 201 })
  } catch (error) {
    console.error("Create tournament error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


