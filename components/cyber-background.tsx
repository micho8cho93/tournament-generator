"use client"

import type React from "react"

export function CyberBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Base gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" aria-hidden="true" />

      {/* Hex grid pattern */}
      <div className="fixed inset-0 hex-grid opacity-60" aria-hidden="true" />

      {/* Carbon fiber texture */}
      <div className="fixed inset-0 carbon-bg" aria-hidden="true" />

      {/* Corner accent glows */}
      <div
        className="fixed top-0 left-0 w-96 h-96 bg-[#00ff87] opacity-[0.03] blur-[100px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-0 w-96 h-96 bg-[#ff3366] opacity-[0.03] blur-[100px] rounded-full"
        aria-hidden="true"
      />

      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00ff8730] to-transparent animate-scan-line" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
