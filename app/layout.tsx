import type React from "react"
import type { Metadata } from "next"
import { Anybody, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const _anybody = Anybody({ subsets: ["latin"], variable: "--font-anybody" })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Tournament Generator",
  description: "Create tournament schedules with ease - Round Robin, Elimination, and Group Stage formats",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
