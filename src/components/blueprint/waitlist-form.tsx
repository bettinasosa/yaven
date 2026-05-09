"use client"

import { ArrowRight, Loader2 } from "lucide-react"
import { useMemo, useState } from "react"
import type { AutomationBlueprint, BlueprintInput } from "@/lib/blueprint/types"

type WaitlistFormProps = {
  blueprint: AutomationBlueprint
  blueprintId: string
  answers: BlueprintInput
  onSubmitted: (email: string, desiredAutomation: string) => void
  onStarted: () => void
}

export function WaitlistForm({
  blueprint,
  blueprintId,
  answers,
  onSubmitted,
  onStarted
}: WaitlistFormProps) {
  const desiredAutomation = useMemo(() => {
    const options = [
      ...blueprint.topOpportunities,
      ...blueprint.quickWins,
      ...blueprint.customToolIdeas
    ].map(opportunity => opportunity.taskName)

    return options[0] ?? answers.desiredFirstAutomation
  }, [
    answers.desiredFirstAutomation,
    blueprint.customToolIdeas,
    blueprint.quickWins,
    blueprint.topOpportunities
  ])
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          blueprintId,
          desiredAutomation,
          // All answers
          role: answers.role,
          responsibilitySummary: answers.responsibilitySummary,
          typicalDay: answers.typicalDay,
          repeatedTasks: answers.repeatedTasks.join(", "),
          painfulTasks: answers.painfulTasks.join(", "),
          toolsUsed: answers.toolsUsed.join(", "),
          copyPasteFlows: answers.copyPasteFlows.join(", "),
          recurringDecisions: answers.recurringDecisions.join(", "),
          regularOutputs: answers.regularOutputs.join(", "),
          desiredFirstAutomation: answers.desiredFirstAutomation,
          // Blueprint output
          topOpportunity: blueprint.topOpportunities[0]?.taskName,
          topOpportunities: blueprint.topOpportunities.map(o => o.taskName).join(", "),
          quickWins: blueprint.quickWins.map(o => o.taskName).join(", "),
          blueprintHeadline: blueprint.blueprintHeadline,
          userSummary: blueprint.userSummary,
          agentTeamSummary: blueprint.agentTeam?.summary,
          agentTeamHours: blueprint.agentTeam?.hoursPerWeek,
          agentNames: blueprint.agentTeam?.agents.map(a => a.name).join(", "),
          workflowMapTitle: blueprint.workflowSchematic?.title,
          workflowMapSummary: blueprint.workflowSchematic?.summary,
          workflowMapSteps: blueprint.workflowSchematic?.steps
            .map(step => `${step.label}: ${step.detail}`)
            .join("\n"),
          promptTemplate: blueprint.suggestedPromptTemplate.prompt,
          source: "automation_preview_waitlist"
        })
      })

      if (!response.ok) throw new Error("Failed to save signup")
      onSubmitted(email, desiredAutomation)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-h-full flex-col gap-4">
      <h3 className="mt-2 text-4xl leading-tight text-zinc-900 font-instrument-serif">
        This team could be yours.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        We&apos;re onboarding early users one by one. Drop your email and we&apos;ll reach out when it&apos;s your turn — your blueprint is already saved.
      </p>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onFocus={onStarted}
            onChange={event => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-zinc-200 bg-[#FDFDF9] px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            Name
          </label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Optional"
            className="w-full rounded-2xl border border-zinc-200 bg-[#FDFDF9] px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="mt-auto flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="animate-glow-pulse inline-flex items-center gap-2 rounded-full bg-[#83A5D4] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving
            </>
          ) : (
            <>Claim my spot <ArrowRight className="size-4" /></>
          )}
        </button>
      </div>
    </form>
  )
}
