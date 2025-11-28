"use client"

import { cn } from "@/lib/utils"

interface EliminationBracketProps {
  teams: string[]
}

function getRoundNames(size: number): string[] {
  const names: string[] = []
  let current = size
  while (current >= 2) {
    if (current === 2) names.push("Final")
    else if (current === 4) names.push("Semi-Finals")
    else if (current === 8) names.push("Quarter-Finals")
    else names.push(`Round of ${current}`)
    current /= 2
  }
  return names.reverse()
}

export function EliminationBracket({ teams }: EliminationBracketProps) {
  const n = teams.length
  const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(n)))
  const byes = nextPowerOf2 - n

  const bracket = [...teams]
  for (let i = 0; i < byes; i++) {
    bracket.push("BYE")
  }

  const roundNames = getRoundNames(nextPowerOf2)
  const rounds: { teams: string[]; roundName: string }[] = []

  let currentRound = bracket
  let roundNum = 0

  while (currentRound.length >= 2) {
    rounds.push({
      teams: [...currentRound],
      roundName: roundNames[roundNum],
    })

    const nextRound: string[] = []
    for (let i = 0; i < currentRound.length; i += 2) {
      const team1 = currentRound[i]
      const team2 = currentRound[i + 1]

      if (team1 === "BYE") {
        nextRound.push(team2)
      } else if (team2 === "BYE") {
        nextRound.push(team1)
      } else {
        nextRound.push(`Winner ${Math.floor(i / 2) + 1}`)
      }
    }

    currentRound = nextRound
    roundNum++
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} className="flex flex-col min-w-[180px]">
          <div className="text-center mb-4">
            <div className="inline-block px-3 py-1 bg-[#00ff87]/10 border border-[#00ff87]/30 text-[#00ff87] text-xs font-mono uppercase">
              {round.roundName}
            </div>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-around">
            {Array.from({ length: round.teams.length / 2 }).map((_, matchIndex) => {
              const team1 = round.teams[matchIndex * 2]
              const team2 = round.teams[matchIndex * 2 + 1]
              return (
                <div key={matchIndex} className="bg-[#1a1a2e] border border-[#2a2a3e]">
                  <div className="border-l-2 border-[#00ff87]">
                    <div
                      className={cn(
                        "py-2 px-3 font-mono text-xs border-b border-[#2a2a3e]",
                        team1 === "BYE" ? "text-[#6b6b8a] italic" : "text-[#f0f0f0]",
                      )}
                    >
                      {team1}
                    </div>
                    <div
                      className={cn(
                        "py-2 px-3 font-mono text-xs",
                        team2 === "BYE" ? "text-[#6b6b8a] italic" : "text-[#f0f0f0]",
                      )}
                    >
                      {team2}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
