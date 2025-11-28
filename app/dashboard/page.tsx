"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type User = {
  id: string
  email: string
}

type Tournament = {
  id: string
  name: string
  format: string
  teams: number
  createdAt: string
}

type AuthMode = "login" | "signup"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)

  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loadingTournaments, setLoadingTournaments] = useState(false)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } finally {
        setLoadingUser(false)
      }
    }
    run()
  }, [])

  useEffect(() => {
    const loadTournaments = async () => {
      if (!user) return
      setLoadingTournaments(true)
      try {
        const res = await fetch("/api/tournaments")
        if (res.ok) {
          const data = await res.json()
          setTournaments(data.tournaments ?? [])
        }
      } finally {
        setLoadingTournaments(false)
      }
    }
    loadTournaments()
  }, [user])

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/signup"
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAuthError(data.error ?? "Something went wrong")
        return
      }
      setUser(data.user)
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error(error)
      setAuthError("Network error")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    setTournaments([])
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f0f0f0] relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Dashboard</h1>
            <p className="text-sm text-[#6b6b8a]">View tournaments you&apos;ve generated and saved.</p>
          </div>
          <Link
            href="/"
            className="text-sm text-[#00ff87] border border-[#00ff87]/40 px-3 py-1.5 uppercase tracking-wide hover:bg-[#00ff87] hover:text-[#0a0a0f] transition-colors"
          >
            Back to Generator
          </Link>
        </header>

        {loadingUser ? (
          <div className="text-sm text-[#6b6b8a]">Loading...</div>
        ) : !user ? (
          <section className="max-w-md mx-auto border border-[#2a2a3e] bg-[#11111a] p-6">
            <div className="flex gap-4 mb-4 text-sm font-mono uppercase tracking-wide">
              <button
                className={`flex-1 py-2 border ${
                  authMode === "login"
                    ? "border-[#00ff87] text-[#0a0a0f] bg-[#00ff87]"
                    : "border-[#2a2a3e] text-[#6b6b8a]"
                }`}
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 border ${
                  authMode === "signup"
                    ? "border-[#00ff87] text-[#0a0a0f] bg-[#00ff87]"
                    : "border-[#2a2a3e] text-[#6b6b8a]"
                }`}
                onClick={() => setAuthMode("signup")}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#6b6b8a]">Email</label>
                <input
                  type="email"
                  className="w-full bg-[#0a0a0f] border border-[#2a2a3e] px-3 py-2 text-sm outline-none focus:border-[#00ff87]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-[#6b6b8a]">Password</label>
                <input
                  type="password"
                  className="w-full bg-[#0a0a0f] border border-[#2a2a3e] px-3 py-2 text-sm outline-none focus:border-[#00ff87]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              {authError && <p className="text-xs text-[#ff3366]">{authError}</p>}
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-[#00ff87] text-[#0a0a0f] font-bold uppercase tracking-wide text-sm hover:bg-transparent hover:text-[#00ff87] border border-[#00ff87] transition-colors"
              >
                {authMode === "login" ? "Login" : "Create Account"}
              </button>
            </form>
          </section>
        ) : (
          <>
            <section className="mb-8 flex items-center justify-between border border-[#2a2a3e] bg-[#11111a] px-4 py-3">
              <div>
                <div className="text-xs font-mono uppercase text-[#6b6b8a]">Signed in as</div>
                <div className="text-sm font-mono">{user.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs uppercase tracking-wide border border-[#ff3366] text-[#ff3366] px-3 py-1.5 hover:bg-[#ff3366] hover:text-[#0a0a0f] transition-colors"
              >
                Logout
              </button>
            </section>

            <section className="border border-[#2a2a3e] bg-[#11111a] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black uppercase tracking-tight">Saved Tournaments</h2>
                <span className="text-xs font-mono text-[#6b6b8a]">
                  {loadingTournaments ? "Loading..." : `${tournaments.length} total`}
                </span>
              </div>

              {tournaments.length === 0 ? (
                <p className="text-sm text-[#6b6b8a]">
                  No tournaments saved yet. Generate one on the{" "}
                  <Link href="/" className="text-[#00ff87] underline">
                    main page
                  </Link>{" "}
                  and save it.
                </p>
              ) : (
                <ul className="space-y-3">
                  {tournaments.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between border border-[#2a2a3e] bg-[#0b0b13] px-4 py-3"
                    >
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-xs text-[#6b6b8a] font-mono">
                          {t.format.toUpperCase()} • {t.teams} teams •{" "}
                          {new Date(t.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  )
}


