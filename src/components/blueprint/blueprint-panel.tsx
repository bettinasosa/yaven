"use client"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Loader2 } from "lucide-react"

export function BlueprintPanel() {
  const [open, setOpen] = useState(false)
  const [onCream, setOnCream] = useState(false)
  const [betaMode, setBetaMode] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [hasMac, setHasMac] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const rowRef = useRef<HTMLDivElement>(null)
  const btnWrapRef = useRef<HTMLDivElement>(null)

  function shake() {
    const el = rowRef.current
    if (!el) return
    el.classList.remove("yv-shake")
    void el.offsetWidth
    el.classList.add("yv-shake")
  }

  function handleOpen() {
    setOnCream(!!btnWrapRef.current?.closest(".get-yaven-cream"))
    setOpen(true)
  }

  function handleClose() {
    if (loading) return
    setOpen(false)
    setBetaMode(false)
    setRole("")
    setHasMac(null)
    setEmail("")
    setError("")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
        body: JSON.stringify({
          email,
          ...(betaMode && { role, hasMac, betaTester: true })
        })
      })
      if (!response.ok) throw new Error("Failed")
      setSuccess(true)
      setTimeout(() => {
        handleClose()
        setSuccess(false)
      }, 2200)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Text/border color tokens — popup bg stays glass regardless of context
  const c = onCream
    ? {
        heading: "#0a0e1a",
        body: "rgba(10,14,26,0.55)",
        link: "rgba(10,14,26,0.85)",
        label: "rgba(10,14,26,0.6)",
        rowBorder: "rgba(0,0,0,0.14)",
        rowBg: "rgba(0,0,0,0.06)",
        inputColor: "#0a0e1a",
        inputBorder: "rgba(0,0,0,0.1)",
        inputBg: "rgba(0,0,0,0.04)",
        optSelected: { border: "rgba(0,0,0,0.45)", bg: "rgba(0,0,0,0.08)", color: "#0a0e1a" },
        optDefault: { border: "rgba(0,0,0,0.1)", bg: "rgba(0,0,0,0.03)", color: "rgba(10,14,26,0.45)" }
      }
    : {
        heading: "#fff",
        body: "rgba(255,255,255,0.65)",
        link: "rgba(255,255,255,0.9)",
        label: "rgba(255,255,255,0.75)",
        rowBorder: "rgba(255,255,255,0.3)",
        rowBg: "rgba(255,255,255,0.1)",
        inputColor: "#fff",
        inputBorder: "rgba(255,255,255,0.18)",
        inputBg: "rgba(255,255,255,0.08)",
        optSelected: { border: "rgba(255,255,255,0.6)", bg: "rgba(255,255,255,0.18)", color: "#fff" },
        optDefault: { border: "rgba(255,255,255,0.18)", bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }
      }

  const popup =
    open && typeof document !== "undefined"
      ? createPortal(
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
              onClick={handleClose}
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
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                animation: "popup-in 0.3s ease",
                transition: "all 0.3s ease"
              }}
            >
              {success ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "22px",
                      fontWeight: 600,
                      color: c.heading
                    }}
                  >
                    You&apos;re in.
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "15px",
                      color: c.body,
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
                      color: c.heading,
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
                      color: c.body,
                      margin: "0 0 24px",
                      lineHeight: 1.6
                    }}
                  >
                    Be first to get access when we launch. Or become a{" "}
                    <button
                      type="button"
                      onClick={() => setBetaMode(true)}
                      style={{
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        fontWeight: 700,
                        color: c.link,
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: betaMode ? "default" : "pointer",
                        opacity: betaMode ? 0.5 : 1
                      }}
                    >
                      beta tester
                    </button>
                    .
                  </p>

                  {/* Beta tester extra fields */}
                  {betaMode && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                        marginBottom: "20px",
                        animation: "popup-in 0.25s ease"
                      }}
                    >
                      <div>
                        <label
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: c.label,
                            display: "block",
                            marginBottom: "6px"
                          }}
                        >
                          Your role
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={e => setRole(e.target.value)}
                          placeholder="e.g. Freelance designer, founder, consultant…"
                          style={{
                            width: "100%",
                            padding: "11px 16px",
                            borderRadius: "12px",
                            border: `1px solid ${c.inputBorder}`,
                            background: c.inputBg,
                            color: c.inputColor,
                            fontSize: "15px",
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            outline: "none"
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: c.label,
                            display: "block",
                            marginBottom: "6px"
                          }}
                        >
                          Do you have a Mac?
                        </label>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {[
                            { label: "Yes", value: true },
                            { label: "No", value: false }
                          ].map(opt => {
                            const selected = hasMac === opt.value
                            const colors = selected ? c.optSelected : c.optDefault
                            return (
                              <button
                                key={String(opt.value)}
                                type="button"
                                onClick={() => setHasMac(opt.value)}
                                style={{
                                  flex: 1,
                                  padding: "10px",
                                  borderRadius: "12px",
                                  border: `1px solid ${colors.border}`,
                                  background: colors.bg,
                                  color: colors.color,
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  fontFamily: "var(--font-dm-sans), sans-serif",
                                  cursor: "pointer",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                {opt.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <p style={{ color: "#ff6b6b", fontSize: "13px", margin: "0 0 12px" }}>
                      {error}
                    </p>
                  )}

                  {/* Email + submit row */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0",
                      borderRadius: "999px",
                      border: `1px solid ${c.rowBorder}`,
                      background: c.rowBg,
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
                        color: c.inputColor,
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
                          <span
                            className="text-white"
                            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                          >
                            <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                          </span>
                        ) : (
                          <span className="text-white">
                            {betaMode ? "Apply →" : "Get Yaven"}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )
      : null

  return (
    <>
      <div ref={btnWrapRef} className="glass-wrap">
        <div className="glass-shadow" />
        <button type="button" onClick={handleOpen} className="glass-btn">
          <span className="text-white">Get Yaven</span>
        </button>
      </div>
      {popup}
    </>
  )
}
