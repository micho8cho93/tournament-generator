"use client"

interface GroupStageScheduleProps {
  teams: string[]
}

export function GroupStageSchedule({ teams }: GroupStageScheduleProps) {
  const n = teams.length
  const numGroups = n >= 6 ? 2 : 1

  const groups: string[][] = Array.from({ length: numGroups }, () => [])
  const shuffled = [...teams].sort(() => Math.random() - 0.5)

  shuffled.forEach((team, index) => {
    groups[index % numGroups].push(team)
  })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-[#1a1a2e] border border-[#2a2a3e]">
            {/* Group Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a3e] bg-[#00ff87]/5">
              <h3 className="font-bold uppercase tracking-wider text-[#00ff87]">
                Group {String.fromCharCode(65 + groupIndex)}
              </h3>
              <span className="text-xs font-mono text-[#6b6b8a]">{group.length} teams</span>
            </div>

            {/* Team List */}
            <div className="p-4 space-y-2 mb-4">
              {group.map((team, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-3 bg-[#12121a] border-l-2 border-[#2a2a3e]">
                  <span className="text-[#00ff87] font-mono text-xs w-4">{i + 1}</span>
                  <span className="font-mono text-sm text-[#f0f0f0]">{team}</span>
                </div>
              ))}
            </div>

            {/* Group Matches */}
            <div className="px-4 pb-4">
              <div className="text-xs font-mono text-[#6b6b8a] mb-3 uppercase tracking-wider">Matches</div>
              <div className="space-y-1">
                {group.map((team1, i) =>
                  group.slice(i + 1).map((team2, j) => (
                    <div key={`${i}-${j}`} className="flex items-center py-2 px-3 bg-[#12121a] text-xs">
                      <div className="flex-1 font-mono text-[#f0f0f0]">{team1}</div>
                      <div className="px-2 text-[#ff3366] font-bold">vs</div>
                      <div className="flex-1 font-mono text-[#f0f0f0] text-right">{team2}</div>
                    </div>
                  )),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Knockout Info */}
      <div className="flex items-center gap-4 px-5 py-4 bg-[#ff3366]/10 border border-[#ff3366]/30">
        <div className="text-[#ff3366] text-2xl">▶</div>
        <div>
          <div className="font-bold uppercase text-sm text-[#f0f0f0] mb-1">Knockout Stage</div>
          <div className="text-xs font-mono text-[#6b6b8a]">Top 2 teams from each group advance to Semi-Finals</div>
        </div>
      </div>
    </div>
  )
}
