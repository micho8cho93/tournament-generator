"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface TechCardProps {
  children: React.ReactNode
  className?: string
}

export function TechCard({ children, className }: TechCardProps) {
  return (
    <div
      className={cn(
        "relative",
        "bg-[#12121a]/80 backdrop-blur-sm",
        "border border-[#2a2a3e]",
        "p-8",
        // Corner cut effect using clip-path
        "[clip-path:polygon(0_12px,12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]",
        "transition-all duration-300",
        "hover:border-[#00ff87]/30",
        "group",
        className,
      )}
    >
      {/* Top-left corner accent */}
      <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-[#00ff87] to-transparent" />
      <div className="absolute top-0 left-0 h-8 w-px bg-gradient-to-b from-[#00ff87] to-transparent" />

      {/* Bottom-right corner accent */}
      <div className="absolute bottom-0 right-0 w-8 h-px bg-gradient-to-l from-[#ff3366] to-transparent" />
      <div className="absolute bottom-0 right-0 h-8 w-px bg-gradient-to-t from-[#ff3366] to-transparent" />

      {children}
    </div>
  )
}
