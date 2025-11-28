"use client"

interface RoundRobinScheduleProps {
  teams: string[]
}

interface Match {
  team1: string
  team2: string
}

export function RoundRobinSchedule({ teams }: RoundRobinScheduleProps) {
  const teamList = [...teams]

  if (teamList.length % 2 !== 0) {
    teamList.push("BYE")
  }

  const numRounds = teamList.length - 1
  const matchesPerRound = teamList.length / 2
  const rounds: Match[][] = []

  for (let round = 0; round < numRounds; round++) {
    const roundMatches: Match[] = []
    for (let match = 0; match < matchesPerRound; match++) {
      const home = (round + match) % (teamList.length - 1)
      let away = (teamList.length - 1 - match + round) % (teamList.length - 1)

      if (match === 0) {
        away = teamList.length - 1
      }

      const team1 = teamList[home]
      const team2 = teamList[away]

      if (team1 !== "BYE" && team2 !== "BYE") {
        roundMatches.push({ team1, team2 })
      }
    }
    rounds.push(roundMatches)
  }

  return (
    <div className="space-y-6">
      {rounds.map((round, index) => (
        <div key={index}>
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-[#00ff87] text-[#0a0a0f] font-mono text-xs font-bold">
              R{String(index + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 h-px bg-[#2a2a3e]" />
          </div>

          <div className="space-y-2">
            {round.map((match, matchIndex) => (
              <div
                key={matchIndex}
                className="flex items-center bg-[#1a1a2e] border border-[#2a2a3e] hover:border-[#00ff87]/30 transition-colors"
              >
                <div className="flex-1 py-3 px-4 font-mono text-sm text-[#f0f0f0]">{match.team1}</div>
                <div className="px-4 py-2 bg-[#ff3366] text-[#f0f0f0] text-xs font-bold font-mono">VS</div>
                <div className="flex-1 py-3 px-4 font-mono text-sm text-[#f0f0f0] text-right">{match.team2}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
