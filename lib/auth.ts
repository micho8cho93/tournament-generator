import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { findUserById, type User } from "./db"

const SESSION_COOKIE_NAME = "tg_session"
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

type Session = {
  userId: string
  createdAt: number
}

// In-memory session store (resets on server restart). For a real app, move this to Redis or a database.
const sessions = new Map<string, Session>()

function generateSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export async function createSession(userId: string) {
  const sessionId = generateSessionId()
  const session: Session = {
    userId,
    createdAt: Date.now(),
  }
  sessions.set(sessionId, session)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  const sessionId = (await cookieStore).get(SESSION_COOKIE_NAME)?.value
  if (sessionId) {
    sessions.delete(sessionId)
  }
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getCurrentUser(req?: NextRequest): Promise<User | null> {
  let sessionId: string | undefined

  if (req) {
    sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value
  } else {
    const cookieStore = await cookies()
    sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value
  }

  if (!sessionId) return null

  const session = sessions.get(sessionId)
  if (!session) return null

  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(sessionId)
    return null
  }

  const user = findUserById(session.userId)
  return user ?? null
}


