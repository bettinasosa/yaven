"use client"

import Image from "next/image"
import { useState } from "react"
import { FadeIn } from "@/components/fade-in"

function InlineWaitlistForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p className="text-base font-medium" style={{ color: "var(--ink)" }}>
        You&apos;re on the list — we&apos;ll be in touch soon.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="neu-input flex-1 min-w-0 px-5 py-[0.7em] text-base font-medium"
          style={{ color: "var(--ink)" }}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-press-dark shrink-0 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Get early access"}
        </button>
      </form>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}

export function FooterCTASection() {
  return (
    <section
      className="px-4 sm:px-8 py-20 sm:py-32"
      style={{
        background:
          "linear-gradient(to bottom, #267FE5 0%, #E3D5BB 30%, #E3D5BB 70%, #267FE5 85%, #07348B 100%)"
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div
          className="neu-card px-8 py-12 sm:px-14 sm:py-16 text-center space-y-8"
          style={{ background: "#E3D5BB", boxShadow: "var(--shadow)" }}
        >
          <FadeIn className="flex justify-center">
            <Image
              src="/yavenlogo.png"
              alt="Yaven"
              width={80}
              height={80}
              className="size-16 object-contain"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.18))" }}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
              style={{
                color: "var(--ink)",
                fontFamily: "var(--page-font-heading)"
              }}
            >
              You didn&apos;t get here to write
              <br />
              follow-up emails.
              <br />
              No more chaos.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-base sm:text-lg font-medium"
              style={{ color: "#1A1A1A", opacity: 0.7 }}
            >
              Yaven handles the rest. Join the waitlist and we&apos;ll build your automation blueprint together.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <InlineWaitlistForm />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
