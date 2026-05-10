"use client"

import { ArrowRight, Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import type { AutomationBlueprint } from "@/lib/blueprint/types"

type BlueprintPreviewProps = {
  blueprint: AutomationBlueprint
  role: string
  onUnlock: () => void
  onDirectSubmit: (email: string) => Promise<void>
}

export function BlueprintPreview({
  blueprint,
  role,
  onUnlock,
  onDirectSubmit
}: BlueprintPreviewProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const opportunities = [
    ...blueprint.topOpportunities,
    ...blueprint.quickWins
  ]
    .filter((item, index, arr) => arr.findIndex(o => o.id === item.id) === index)
    .slice(0, 4)

  async function handleInlineSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    <div className="flex flex-col gap-7 pb-28">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-4xl leading-tight text-zinc-900 font-instrument-serif">
          {role} — here&apos;s your week, optimised.
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500">
          Based on your stack and what you flagged, here&apos;s what we&apos;d
          take off your plate first. These aren&apos;t hypotheticals.
        </p>
      </div>

      {/* Automation items */}
      <div className="space-y-4">
        {opportunities.map(opportunity => (
          <div key={opportunity.id} className="flex gap-3">
            <span className="mt-0.5 shrink-0 text-sm font-semibold text-[#83A5D4]">
              →
            </span>
            <p className="text-sm leading-relaxed text-zinc-700">
              <span className="font-semibold text-zinc-900">
                {opportunity.taskName}
              </span>
              {" — "}
              {opportunity.whyAutomatable}
            </p>
          </div>
        ))}
      </div>

      {/* Bridge */}
      <div className="space-y-3 rounded-2xl bg-[#F2F2E5] px-5 py-4">
        <p className="text-sm leading-relaxed text-zinc-700">
          Existing tools that promise to fix this are unintuitive, hard to
          setup, and leave you wondering where to start.
        </p>
        <p className="text-sm font-semibold leading-relaxed text-zinc-800">
          <span className="text-shimmer-dark italic">Yaven</span>{" "}
          knows your role, knows your stack, and runs the handoffs. You just do
          the parts only you can do.
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
          Get early access <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
