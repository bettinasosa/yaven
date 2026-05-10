"use client"

import { ArrowRight, Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import type { AutomationBlueprint, AutomationOpportunity } from "@/lib/blueprint/types"

type BlueprintPreviewProps = {
  blueprint: AutomationBlueprint
  onUnlock: () => void
  onDirectSubmit: (email: string) => Promise<void>
}

const WARM_COPY: { keywords: string[]; text: string }[] = [
  {
    keywords: ["email", "writing email", "message"],
    text: "AI drafts in your tone. You read, tweak, send. No more staring at a blank page."
  },
  {
    keywords: ["scheduling", "coordination"],
    text: "No more back-and-forth to find a time. Coordination handled before you even check your inbox."
  },
  {
    keywords: ["data entry"],
    text: "Information flows where it needs to go, automatically. Copy-paste is officially over."
  },
  {
    keywords: ["report"],
    text: "Pull the numbers, press go. Formatted and ready to share — without the manual work."
  },
  {
    keywords: ["follow"],
    text: "Every follow-up lands on time, without you needing to remember it exists."
  },
  {
    keywords: ["meeting note", "note"],
    text: "Meeting ends, notes appear. Decisions and action items sorted before you close your laptop."
  },
  {
    keywords: ["spreadsheet"],
    text: "Spreadsheets that update themselves. You just review the result."
  },
  {
    keywords: ["review", "document"],
    text: "AI flags what actually matters. You focus on decisions, not reading every line."
  },
  {
    keywords: ["research"],
    text: "Deep research in minutes. AI reads and summarizes so you can skip straight to the insights."
  },
  {
    keywords: ["invoice"],
    text: "Invoices in, records updated. Zero manual entry required."
  },
  {
    keywords: ["task", "project"],
    text: "Your task list prioritized and updated without you lifting a finger."
  }
]

function getWarmCopy(taskName: string): string {
  const lower = taskName.toLowerCase()
  const match = WARM_COPY.find(({ keywords }) =>
    keywords.some(k => lower.includes(k))
  )
  return (
    match?.text ??
    `AI handles the repetitive parts of ${taskName.toLowerCase()} so you can stay focused on what actually moves things forward.`
  )
}

const ACCENTS = ["#83A5D4", "#F3C5CB", "#A99CF2"]

function OpportunityCard({
  opportunity,
  index
}: {
  opportunity: AutomationOpportunity
  index: number
}) {
  const accent = ACCENTS[index % ACCENTS.length]
  const outputs = opportunity.expectedOutputs.slice(0, 3)

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm space-y-3">
      <div className="flex items-start gap-3">
        <span
          className="mt-[5px] size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <h4 className="text-base font-semibold leading-snug text-zinc-900 font-instrument-serif">
          {opportunity.taskName}
        </h4>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600 pl-[1.375rem]">
        {getWarmCopy(opportunity.taskName)}
      </p>

      <p className="text-sm leading-relaxed text-zinc-600 pl-[1.375rem]">
        {opportunity.whyAutomatable}
      </p>

      <p className="text-sm leading-relaxed text-zinc-700 pl-[1.375rem]">
        <span className="font-medium">How to start: </span>
        {opportunity.firstVersion}
      </p>

      {outputs.length > 0 && (
        <div className="pl-[1.375rem] flex flex-wrap gap-1.5 pt-1">
          {outputs.map(output => (
            <span
              key={output}
              className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-700"
              style={{ backgroundColor: `${accent}22` }}
            >
              {output}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function BlueprintPreview({
  blueprint,
  onUnlock,
  onDirectSubmit
}: BlueprintPreviewProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const hours = blueprint.agentTeam?.hoursPerWeek ?? 8

  const opportunities = [
    ...blueprint.topOpportunities,
    ...blueprint.quickWins
  ]
    .filter(
      (item, index, arr) => arr.findIndex(o => o.id === item.id) === index
    )
    .slice(0, 3)

  async function handleInlineSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setSubmitError("")
    try {
      await onDirectSubmit(email.trim())
    } catch {
      setSubmitError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 pb-28">
      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#83A5D4]">
          Your results
        </p>
        <h3 className="text-4xl leading-tight text-zinc-900 font-instrument-serif">
          You could get{" "}
          <span className="text-[#83A5D4]">{hours} hours back</span> every
          week.
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600">
          {blueprint.userSummary}
        </p>
      </div>

      {/* Opportunities */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Where AI fits into your week
        </p>
        {opportunities.map((opportunity, index) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            index={index}
          />
        ))}
      </div>

      {/* Don't fall behind */}
      <div className="rounded-2xl bg-[#F2F2E5] px-5 py-4">
        <p className="text-sm font-semibold text-zinc-800">
          The most productive people in your field are already doing this.
        </p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">
          Not to replace their work — to do twice as much with the same hours.
          Don&apos;t fall behind.
        </p>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#FDFDF9] via-[#FDFDF9]/95 to-transparent pt-8 pb-1">
        {/* Desktop: inline email form */}
        <form
          onSubmit={handleInlineSubmit}
          className="relative hidden sm:flex items-center gap-2"
        >
          <div className="flex flex-1 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1 shadow-sm focus-within:border-[#83A5D4]">
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="animate-slow-bounce inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:animate-none hover:bg-zinc-700 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                Get early access <ArrowRight className="size-4" />
              </>
            )}
          </button>
          {submitError && (
            <p className="absolute bottom-full mb-2 text-xs text-red-500">
              {submitError}
            </p>
          )}
        </form>

        {/* Mobile: CTA button → email phase */}
        <button
          type="button"
          onClick={onUnlock}
          className="animate-slow-bounce sm:hidden w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-md hover:animate-none hover:bg-zinc-700"
        >
          Claim my spot <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
