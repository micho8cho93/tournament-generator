"use client"

import { useState } from "react"
import { CyberBackground } from "./cyber-background"
import { NeonText } from "./neon-text"
import { TechCard } from "./tech-card"
import { TeamSelector } from "./team-selector"
import { FormatSelector } from "./format-selector"
import { ScheduleOutput } from "./schedule-output"

export type TournamentFormat = "roundrobin" | "elimination" | "groups" | null

export default function TournamentGenerator() {
  const [selectedTeams, setSelectedTeams] = useState<number>(0)
  const [selectedFormat, setSelectedFormat] = useState<TournamentFormat>(null)
  const [clickCount, setClickCount] = useState(0)
  const [showSchedule, setShowSchedule] = useState(false)

  const updateClickCount = () => {
    setClickCount((prev) => prev + 1)
  }

  const handleTeamSelect = (teams: number) => {
    updateClickCount()
    setSelectedTeams(teams)
    setShowSchedule(false)
  }

  const handleFormatSelect = (format: TournamentFormat) => {
    updateClickCount()
    setSelectedFormat(format)
    setShowSchedule(false)
  }

  const handleGenerate = () => {
    updateClickCount()
    setShowSchedule(true)
  }

  const handleReset = () => {
    updateClickCount()
    setSelectedTeams(0)
    setSelectedFormat(null)
    setShowSchedule(false)
  }

  const canGenerate = selectedTeams > 0 && selectedFormat !== null

  return (
    <CyberBackground>
      <div className="container mx-auto max-w-4xl px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-12 animate-stagger-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-[#00ff87]/30 bg-[#00ff87]/5 text-[#00ff87] text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#00ff87] rounded-full animate-pulse" />
            System Online
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-3">
            <NeonText text="Tournament" />
          </h1>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#6b6b8a]">Generator</h2>
        </header>

        {/* Main Card */}
        <TechCard className="mb-8 animate-stagger-in [animation-delay:150ms] opacity-0">
          <div className="space-y-10">
            <TeamSelector selectedTeams={selectedTeams} onSelect={handleTeamSelect} />

            <FormatSelector selectedFormat={selectedFormat} onSelect={handleFormatSelect} />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={cn(
                "w-full py-5 font-black text-lg uppercase tracking-wider",
                "transition-all duration-300",
                "border-2",
                canGenerate
                  ? "bg-[#00ff87] text-[#0a0a0f] border-[#00ff87] hover:bg-transparent hover:text-[#00ff87] hover:shadow-[0_0_30px_#00ff8740]"
                  : "bg-[#1a1a2e] text-[#6b6b8a] border-[#2a2a3e] cursor-not-allowed",
              )}
            >
              {canGenerate ? "Generate Schedule" : "Select Options Above"}
            </button>

            {/* Click Counter */}
            <div className="flex items-center justify-center gap-3 text-xs font-mono text-[#6b6b8a]">
              <span>INTERACTIONS:</span>
              <div className="flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-2 h-4 transition-colors duration-200",
                      i < clickCount ? "bg-[#00ff87]" : "bg-[#2a2a3e]",
                    )}
                  />
                ))}
              </div>
              <span className="text-[#00ff87]">{clickCount}/10</span>
            </div>
          </div>
        </TechCard>

        {/* Schedule Output */}
        {showSchedule && (
          <div className="animate-slide-up">
            <ScheduleOutput teams={selectedTeams} format={selectedFormat!} onReset={handleReset} />
          </div>
        )}
      </div>
    </CyberBackground>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
