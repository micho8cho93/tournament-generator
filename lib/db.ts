import fs from "fs"
import path from "path"

export type User = {
  id: string
  email: string
  passwordHash: string
  createdAt: string
}

export type Tournament = {
  id: string
  userId: string
  name: string
  format: string
  teams: number
  createdAt: string
  data: unknown
}

type Database = {
  users: User[]
  tournaments: Tournament[]
}

const DATA_DIR = path.join(process.cwd(), ".data")
const DB_FILE = path.join(DATA_DIR, "db.json")

function ensureDbFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DB_FILE)) {
    const initial: Database = { users: [], tournaments: [] }
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8")
  }
}

function readDb(): Database {
  ensureDbFile()
  const raw = fs.readFileSync(DB_FILE, "utf8")
  try {
    const parsed = JSON.parse(raw) as Database
    if (!parsed.users || !parsed.tournaments) {
      throw new Error("Invalid DB shape")
    }
    return parsed
  } catch {
    const initial: Database = { users: [], tournaments: [] }
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8")
    return initial
  }
}

function writeDb(db: Database) {
  ensureDbFile()
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8")
}

export function findUserByEmail(email: string): User | undefined {
  const db = readDb()
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function createUser(user: User): User {
  const db = readDb()
  db.users.push(user)
  writeDb(db)
  return user
}

export function findUserById(id: string): User | undefined {
  const db = readDb()
  return db.users.find((u) => u.id === id)
}

export function createTournament(t: Tournament): Tournament {
  const db = readDb()
  db.tournaments.push(t)
  writeDb(db)
  return t
}

export function listTournamentsForUser(userId: string): Tournament[] {
  const db = readDb()
  return db.tournaments.filter((t) => t.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getTournamentForUser(id: string, userId: string): Tournament | undefined {
  const db = readDb()
  return db.tournaments.find((t) => t.id === id && t.userId === userId)
}


