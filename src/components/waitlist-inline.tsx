"use client"

import { useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { getAttribution } from "@/lib/attribution"
import { hasReferral } from "@/lib/analytics/context"
import { EVENTS } from "@/lib/analytics/events"
import { track } from "@/lib/analytics/posthog"
import { useFormSeen } from "@/lib/analytics/use-form-seen"

// Inline email capture for the closing sections. Posts to the same
// /api/waitlist endpoint as the blueprint flow.
export function WaitlistInline({ variant }: { variant?: "hero" } = {}) {
  const hero = variant === "hero"
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const started = useRef(false)

  const surface = hero ? "hero" : "footer"
  useFormSeen(formRef, surface)

  function handleFocus() {
    if (started.current) return
    started.current = true
    track(EVENTS.SIGNUP_STARTED, { surface })
  }

  function shake() {
    const el = formRef.current
    if (!el) return
    el.classList.remove("yv-shake")
    void el.offsetWidth // restart the animation
    el.classList.add("yv-shake")
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    // Invalid/empty → shake instead of the native validation bubble
    if (!email.trim() || !email.includes("@")) {
      track(EVENTS.SIGNUP_FAILED, {
        surface,
        reason: "invalid_email",
        beta_application: false
      })
      shake()
      return
    }
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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          signup_source: variant === "hero" ? "hero" : "footer",
          ...getAttribution(),
          ...(typeof window !== "undefined" && (() => {
            try { const r = localStorage.getItem("yv_ref"); return r ? { referredBy: r } : {} }
            catch { return {} }
          })())
        })
      })
      if (!res.ok) {
        reported = true
        track(EVENTS.SIGNUP_FAILED, {
          surface,
          reason: res.status >= 500 ? "server" : "rejected",
          beta_application: false
        })
        throw new Error("Failed")
      }
      // `existing: true` means the address was already on the list — a repeat
      // visitor, not a new signup, and the two should never be added together.
      const data = await res.json().catch(() => ({}))
      track(EVENTS.SIGNUP_SUCCEEDED, {
        surface,
        already_registered: data?.existing === true,
        beta_application: false,
        has_referral: referred
      })
      setSubmitted(true)
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

  if (submitted) {
    return (
      <p
        style={{
          fontSize: "18px",
          fontWeight: 500,
          color: "var(--cream)",
          margin: 0
        }}
      >
        You&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    )
  }

  return (
    <div>
      {error && (
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--secondary)",
            margin: "0 0 12px"
          }}
        >
          {error}
        </p>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="waitlist-input-row flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 rounded-[28px] sm:rounded-full"
        style={{
          padding: hero ? "6px" : "5px",
          border: hero
            ? "1.5px solid rgba(255,255,255,0.45)"
            : "1px solid rgba(255,255,255,0.3)",
          background: hero
            ? "rgba(255,255,255,0.14)"
            : "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: hero
            ? "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "0 4px 16px rgba(0,0,0,0.12)"
        }}
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onFocus={handleFocus}
          onChange={e => setEmail(e.target.value)}
          className={`flex-1 min-w-0 rounded-full border-none bg-transparent text-white font-[var(--font-dm-sans),sans-serif] outline-none ${hero ? "py-6 px-6 text-[20px] sm:py-4 sm:text-[17px]" : "py-3 px-5 text-[15px]"}`}
          style={hero ? { textShadow: "0 1px 2px rgba(0,0,0,0.15)" } : undefined}
        />
        <div className="glass-wrap waitlist-btn-wrap shrink-0 w-full sm:w-auto">
          <div className="glass-shadow" />
          <button
            type="submit"
            disabled={loading}
            className="glass-btn w-full sm:w-auto"
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {loading ? (
              <span className="text-white inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </span>
            ) : (
              <span className="text-white">Get early access</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
