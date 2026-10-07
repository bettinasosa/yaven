"use client"

import { Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import type { AutomationBlueprint, BlueprintInput } from "@/lib/blueprint/types"
import { getAttribution } from "@/lib/attribution"
import { hasReferral } from "@/lib/analytics/context"
import { EVENTS } from "@/lib/analytics/events"
import { track } from "@/lib/analytics/posthog"
import { useFormSeen } from "@/lib/analytics/use-form-seen"

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
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const started = useRef(false)

  const surface = "blueprint" as const
  useFormSeen(formRef, surface)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const referred = hasReferral()
    // Set once the failure has been reported with a specific reason, so the
    // catch below only has to account for the request never completing.
    let reported = false
    track(EVENTS.SIGNUP_SUBMITTED, {
      surface,
      beta_application: false,
      has_referral: referred
    })

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role: answers.role,
          tools: answers.toolsUsed.join(", "),
          tasks: answers.painfulTasks.join(", "),
          signup_source: "blueprint",
          ...getAttribution(),
        })
      })

      if (!response.ok) {
        reported = true
        track(EVENTS.SIGNUP_FAILED, {
          surface,
          reason: response.status >= 500 ? "server" : "rejected",
          beta_application: false
        })
        throw new Error("Failed to save signup")
      }
      // `existing: true` means the address was already on the list — a repeat
      // visitor, not a new signup, and the two must never be added together.
      const data = await response.json().catch(() => ({}))
      track(EVENTS.SIGNUP_SUCCEEDED, {
        surface,
        already_registered: data?.existing === true,
        beta_application: false,
        has_referral: referred
      })
      onSubmitted(email, "")
    } catch {
      if (!reported) {
        track(EVENTS.SIGNUP_FAILED, {
          surface,
          reason: "network",
          beta_application: false
        })
      }
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Fired from focus AND change, because focus alone misses autofill and
  // paste-without-clicking. The ref keeps it to once per mount either way.
  function handleStarted() {
    if (!started.current) {
      started.current = true
      track(EVENTS.SIGNUP_STARTED, { surface })
    }
    onStarted()
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="space-y-2">
        <h3
          className="font-bold leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "var(--ink)" }}
        >
          This team could be yours.
        </h3>
        <p className="text-sm font-medium leading-relaxed" style={{ color: "#1A1A1A", opacity: 0.7 }}>
          We&apos;re onboarding early users one by one. Drop your email and
          we&apos;ll reach out when it&apos;s your turn — your blueprint is
          already saved.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label
            className="mb-1.5 block text-xs font-bold"
            style={{
              fontFamily: "var(--font-space-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--ink)",
              opacity: 0.6,
            }}
          >
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onFocus={handleStarted}
            onChange={event => {
              handleStarted()
              setEmail(event.target.value)
            }}
            placeholder="you@example.com"
            className="neu-input w-full px-4 py-3 text-sm font-medium"
            style={{ color: "var(--ink)" }}
          />
        </div>

        <div>
          <label
            className="mb-1.5 block text-xs font-bold"
            style={{
              fontFamily: "var(--font-space-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--ink)",
              opacity: 0.6,
            }}
          >
            Name
          </label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Optional"
            className="neu-input w-full px-4 py-3 text-sm font-medium"
            style={{ color: "var(--ink)" }}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={loading}
          className="btn-press-dark disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" /> Saving
            </span>
          ) : (
            "Claim my spot →"
          )}
        </button>
      </div>
    </form>
  )
}
