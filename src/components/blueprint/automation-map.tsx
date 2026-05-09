import type { AutomationMapGroup } from "@/lib/blueprint/types"

type AutomationMapProps = {
  groups: AutomationMapGroup[]
}

export function AutomationMap({ groups }: AutomationMapProps) {
  if (groups.length === 0) return null

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
          Automation map
        </p>
      </div>
      <div className="grid gap-3">
        {groups.slice(0, 4).map(group => (
          <div
            key={group.category}
            className="rounded-2xl border border-zinc-200 bg-[#FDFDF9] p-3"
          >
            <p className="text-sm font-medium text-zinc-900">{group.category}</p>
            <div className="mt-2 space-y-2">
              {group.items.map(item => (
                <div
                  key={`${group.category}-${item.task}`}
                  className="flex items-start justify-between gap-3 rounded-xl bg-[#FDFDF9]/70 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-zinc-700">
                      {item.task}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {item.automationType}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#FDFDF9] px-2 py-1 text-[10px] font-medium text-zinc-500 ring-1 ring-zinc-200">
                    {item.recommendation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
