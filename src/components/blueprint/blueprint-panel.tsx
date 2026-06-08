"use client"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Loader2 } from "lucide-react"

export function BlueprintPanel() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const rowRef = useRef<HTMLDivElement>(null)

  function shake() {
    const el = rowRef.current
    if (!el) return
    el.classList.remove("yv-shake")
    void el.offsetWidth
    el.classList.add("yv-shake")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      shake()
      return
    }
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      if (!response.ok) throw new Error("Failed")
      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setEmail("")
      }, 2200)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const popup = open && typeof document !== "undefined" ? createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => !loading && setOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)"
        }}
      />

      {/* Glass popup */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "540px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: "24px",
          padding: "clamp(36px, 6vw, 56px)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
          animation: "popup-in 0.3s ease"
        }}
      >
        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#fff"
              }}
            >
              You&apos;re in.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.7)",
                marginTop: "8px"
              }}
            >
              We&apos;ll reach out soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h3
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(22px, 4vw, 28px)",
                fontWeight: 600,
                color: "#fff",
                margin: "0 0 8px",
                lineHeight: 1.2
              }}
            >
              Join the waitlist
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.65)",
                margin: "0 0 24px",
                lineHeight: 1.5
              }}
            >
              Be first to get access when we launch.
            </p>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "13px", margin: "0 0 12px" }}>
                {error}
              </p>
            )}

            {/* Input + button row — stacked on mobile, inline on desktop */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "5px",
                alignItems: "center"
              }}
              className="waitlist-input-row"
              ref={rowRef}
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "12px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background: "transparent",
                  color: "#fff",
                  fontSize: "15px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  outline: "none"
                }}
              />
              <div className="glass-wrap waitlist-btn-wrap" style={{ flexShrink: 0 }}>
                <div className="glass-shadow" />
                <button
                  type="submit"
                  disabled={loading}
                  className="glass-btn"
                  style={{
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {loading ? (
                    <span className="text-white" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                    </span>
                  ) : (
                    <span className="text-white">Get Yaven</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  ) : null

  return (
    <>
      <div className="glass-wrap">
        <div className="glass-shadow" />
        <button type="button" onClick={() => setOpen(true)} className="glass-btn">
          <span className="text-white">Show me</span>
        </button>
      </div>
      {popup}
    </>
  )
}
