"use client"

import { Loader2 } from "lucide-react"
import { useState } from "react"
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
          role: answers.role,
          tools: answers.toolsUsed.join(", "),
          tasks: answers.painfulTasks.join(", "),
        })
      })

      if (!response.ok) throw new Error("Failed to save signup")
      onSubmitted(email, "")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            onFocus={onStarted}
            onChange={event => setEmail(event.target.value)}
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
