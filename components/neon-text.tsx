"use client"

import { cn } from "@/lib/utils"

interface NeonTextProps {
  text: string
  className?: string
}

export function NeonText({ text, className }: NeonTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block",
        "bg-gradient-to-r from-[#00ff87] via-[#00ffcc] to-[#00ff87] bg-clip-text text-transparent",
        "bg-[length:200%_auto] animate-text-shimmer",
        "[text-shadow:0_0_40px_#00ff8740]",
        className,
      )}
    >
      {text}
    </span>
  )
}
