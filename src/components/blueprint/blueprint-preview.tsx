"use client"

import { Loader2 } from "lucide-react"
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
        <h3
          className="font-bold leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--ink)" }}
        >
          Here&apos;s your week, optimised.
        </h3>
        <p className="text-base font-medium leading-relaxed" style={{ color: "#1A1A1A", opacity: 0.65 }}>
          {blueprint.userSummary}
        </p>
      </div>

      {/* Opportunities */}
      <div className="space-y-4">
        {opportunities.map(opportunity => (
          <div
            key={opportunity.id}
            className="flex gap-4 rounded-[16px] bg-white p-4"
            style={{ border: "var(--bd)", boxShadow: "var(--shadow-sm)" }}
          >
            <span
              className="mt-0.5 shrink-0 font-bold text-base"
              style={{ color: "var(--ink)" }}
            >
              →
            </span>
            <div className="space-y-1">
              <p className="text-base font-bold" style={{ color: "var(--ink)" }}>
                {opportunity.taskName}
              </p>
              <p className="text-sm font-medium leading-relaxed" style={{ color: "#1A1A1A", opacity: 0.65 }}>
                {opportunity.whyAutomatable}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-lg font-bold" style={{ color: "var(--ink)" }}>
        Want to see what your week looks like without the noise?
      </p>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 pt-0 pb-1" style={{ background: "linear-gradient(to top, #fff 70%, transparent)" }}>
        <form
          onSubmit={handleInlineSubmit}
          className="relative hidden sm:flex flex-row items-center gap-3"
        >
          <input
            ref={inputRef}
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="neu-input flex-1 px-5 py-[0.7em] text-base font-medium"
            style={{ color: "var(--ink)" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-press-dark shrink-0 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Get early access"}
          </button>
          {submitError && (
            <p className="absolute bottom-full mb-2 text-xs text-red-500">{submitError}</p>
          )}
        </form>

        <button
          type="button"
          onClick={onUnlock}
          className="btn-press-dark sm:hidden w-full"
          style={{ fontSize: "16px", padding: "0.8em 1.8em" }}
        >
          Get early access
        </button>
      </div>
    </div>
  )
}
