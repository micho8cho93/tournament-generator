"use client"

import { cn } from "@/lib/utils"

interface TeamSelectorProps {
  selectedTeams: number
  onSelect: (teams: number) => void
}

const teamCounts = [3, 4, 5, 6, 7, 8, 9, 10]

export function TeamSelector({ selectedTeams, onSelect }: TeamSelectorProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[#00ff87] font-mono text-sm">01</span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f0f0f0]">Select Teams</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-[#2a2a3e] to-transparent" />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {teamCounts.map((count, index) => (
          <button
            key={count}
            onClick={() => onSelect(count)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={cn(
              "relative aspect-square flex items-center justify-center",
              "font-mono text-xl font-bold",
              "border transition-all duration-200",
              "animate-stagger-in opacity-0",
              selectedTeams === count
                ? "bg-[#00ff87] text-[#0a0a0f] border-[#00ff87] shadow-[0_0_20px_#00ff8740]"
                : "bg-[#1a1a2e] text-[#f0f0f0] border-[#2a2a3e] hover:border-[#00ff87]/50 hover:text-[#00ff87]",
            )}
          >
            {count}
            {selectedTeams === count && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#0a0a0f]">
                <div className="absolute inset-0 bg-[#00ff87] animate-ping" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
