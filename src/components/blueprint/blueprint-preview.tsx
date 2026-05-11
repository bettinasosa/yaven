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

  const opportunities = [...blueprint.topOpportunities, ...blueprint.quickWins]
    .filter(
      (item, index, arr) => arr.findIndex(o => o.id === item.id) === index
    )
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
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-4xl leading-tight text-zinc-900 font-instrument-serif">
          Here&apos;s your week, optimised.
        </h3>
        <p className="text-base leading-relaxed text-zinc-500">
          {blueprint.userSummary}
        </p>
      </div>

      {/* Automation opportunities */}
      <div className="space-y-5">
        {opportunities.map(opportunity => (
          <div key={opportunity.id} className="flex gap-3">
            <span className="mt-0.5 shrink-0 text-sm font-semibold text-[#7696dc]">
              →
            </span>
            <div className="space-y-0.5">
              <p className="text-base font-semibold text-zinc-900">
                {opportunity.taskName}
              </p>
              <p className="text-base leading-relaxed text-zinc-500">
                {opportunity.whyAutomatable}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bridge + CTA */}

      <p className="text-xl leading-relaxed font-bold italic text-[#7696dc] font-instrument-serif">
        Want to see what your week looks like without the noise?
      </p>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 pt-0 pb-1">
        <form
          onSubmit={handleInlineSubmit}
          className="relative hidden sm:flex flex-row items-center gap-2"
        >
          <div className="flex flex-1 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1 shadow-sm focus-within:border-[#83A5D4]">
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="animate-slow-bounce shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:animate-none hover:bg-zinc-700 disabled:opacity-60"
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
