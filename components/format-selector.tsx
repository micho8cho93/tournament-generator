"use client"

import { cn } from "@/lib/utils"
import type { TournamentFormat } from "./tournament-generator"

interface FormatSelectorProps {
  selectedFormat: TournamentFormat
  onSelect: (format: TournamentFormat) => void
}

const formats = [
  {
    id: "roundrobin" as const,
    label: "Round Robin",
    desc: "Everyone plays everyone",
    icon: "◎",
  },
  {
    id: "elimination" as const,
    label: "Elimination",
    desc: "Single knockout bracket",
    icon: "△",
  },
  {
    id: "groups" as const,
    label: "Group Stage",
    desc: "Groups + knockout",
    icon: "▣",
  },
]

export function FormatSelector({ selectedFormat, onSelect }: FormatSelectorProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[#00ff87] font-mono text-sm">02</span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#f0f0f0]">Tournament Format</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-[#2a2a3e] to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {formats.map(({ id, label, desc, icon }, index) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            style={{ animationDelay: `${(index + 8) * 50}ms` }}
            className={cn(
              "relative p-5 text-left",
              "border transition-all duration-200",
              "animate-stagger-in opacity-0",
              "group",
              selectedFormat === id
                ? "bg-[#00ff87]/10 border-[#00ff87] shadow-[inset_0_0_20px_#00ff8710]"
                : "bg-[#1a1a2e] border-[#2a2a3e] hover:border-[#00ff87]/50",
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "text-3xl mb-3 transition-colors",
                selectedFormat === id ? "text-[#00ff87]" : "text-[#6b6b8a] group-hover:text-[#00ff87]",
              )}
            >
              {icon}
            </div>

            {/* Label */}
            <div
              className={cn(
                "font-bold uppercase tracking-wide text-sm mb-1 transition-colors",
                selectedFormat === id ? "text-[#00ff87]" : "text-[#f0f0f0]",
              )}
            >
              {label}
            </div>

            {/* Description */}
            <div className="text-xs text-[#6b6b8a] font-mono">{desc}</div>

            {/* Selection indicator */}
            {selectedFormat === id && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#00ff87] shadow-[0_0_10px_#00ff87]" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
