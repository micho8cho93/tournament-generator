"use client"

import { useState } from "react"
import Link from "next/link"
import { TechCard } from "./tech-card"
import { RoundRobinSchedule } from "./schedules/round-robin"
import { EliminationBracket } from "./schedules/elimination-bracket"
import { GroupStageSchedule } from "./schedules/group-stage"
import type { TournamentFormat } from "./tournament-generator"

interface ScheduleOutputProps {
  teams: number
  format: TournamentFormat
  onReset: () => void
}

const formatTitles: Record<Exclude<TournamentFormat, null>, string> = {
  roundrobin: "Round Robin",
  elimination: "Elimination Bracket",
  groups: "Group Stage",
}

export function generateTeamNames(count: number): string[] {
  const names = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa"]
  return names.slice(0, count).map((name) => `Team ${name}`)
}

export function ScheduleOutput({ teams, format, onReset }: ScheduleOutputProps) {
  const teamNames = generateTeamNames(teams)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage(null)
    try {
      const res = await fetch("/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formatTitles[format!]} (${teams} teams)`,
          format,
          teams,
          data: {
            teams: teamNames,
            format,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401) {
          setSaveMessage("You must be logged in to save. Visit the dashboard to sign in.")
        } else {
          setSaveMessage(data.error ?? "Failed to save tournament")
        }
        return
      }
      setSaveMessage("Tournament saved! View it on your dashboard.")
    } catch (error) {
      console.error(error)
      setSaveMessage("Network error while saving")
    } finally {
      setSaving(false)
    }
  }

  return (
    <TechCard>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#2a2a3e]">
        <div>
          <div className="text-xs font-mono text-[#6b6b8a] mb-1 uppercase tracking-wider">Generated Schedule</div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#00ff87]">{formatTitles[format!]}</h2>
        </div>
        <div className="text-right">
          <div className="text-xs font-mono text-[#6b6b8a] mb-1">TEAMS</div>
          <div className="text-3xl font-mono font-bold text-[#f0f0f0]">{teams}</div>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="mb-8">
        {format === "roundrobin" && <RoundRobinSchedule teams={teamNames} />}
        {format === "elimination" && <EliminationBracket teams={teamNames} />}
        {format === "groups" && <GroupStageSchedule teams={teamNames} />}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 border border-[#00ff87] text-[#00ff87] font-bold uppercase text-sm tracking-wider hover:bg-[#00ff87] hover:text-[#0a0a0f] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            💾 {saving ? "Saving..." : "Save Tournament"}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 border border-[#ff3366] text-[#ff3366] font-bold uppercase text-sm tracking-wider hover:bg-[#ff3366] hover:text-[#0a0a0f] transition-all duration-200"
          >
            ↺ New Tournament
          </button>
        </div>
        {saveMessage && (
          <p className="text-xs text-center text-[#6b6b8a]">
            {saveMessage}{" "}
            <Link href="/dashboard" className="text-[#00ff87] underline">
              Go to dashboard
            </Link>
          </p>
        )}
      </div>
    </TechCard>
  )
}
