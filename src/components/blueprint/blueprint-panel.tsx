"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Loader2, ArrowLeft, Check, Copy } from "lucide-react"

// Odometer-style count-up from 0 to target over ~800ms
function CountUp({ to }: { to: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const duration = 800
    const start = performance.now()
    let raf: number
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.round(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to])
  return <>{val.toLocaleString()}</>
}

export function BlueprintPanel() {
  const [open, setOpen] = useState(false)
  const [onCream, setOnCream] = useState(false)
  const [betaMode, setBetaMode] = useState(false)
  const [email, setEmail] = useState("")
  const [betaName, setBetaName] = useState("")
  const [role, setRole] = useState("")
  const [hasMac, setHasMac] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [betaSuccess, setBetaSuccess] = useState(false)
  const [position, setPosition] = useState(0)
  const [refCode, setRefCode] = useState("")
  const [copied, setCopied] = useState(false)
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
    setBetaName("")
    setRole("")
    setHasMac(null)
    setEmail("")
    setError("")
    setBetaSuccess(false)
    setSuccess(false)
    setPosition(0)
    setRefCode("")
    setCopied(false)
  }

  function exitBeta() {
    setBetaMode(false)
    setBetaName("")
    setRole("")
    setHasMac(null)
  }

  const copyLink = useCallback(async () => {
    if (!refCode) return
    try {
      await navigator.clipboard.writeText(`yaven.us/w/${refCode}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard not available */ }
  }, [refCode])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      setError("invalid")
      shake()
      return
    }
    if (betaMode && (!role.trim() || hasMac === null)) {
      setError("incomplete")
      shake()
      return
    }
    setError("")
    setLoading(true)

    // Mac "No" -> submit as waitlist signup instead of beta application
    const isBetaSubmit = betaMode && hasMac !== false

    // Check if this signup came through a referral link
    let referredBy: string | undefined
    try {
      referredBy = localStorage.getItem("yv_ref") ?? undefined
    } catch { /* localStorage unavailable */ }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...(referredBy && { referredBy }),
          ...(isBetaSubmit && {
            name: betaName,
            role,
            hasMac,
            betaTester: true
          })
        })
      })
      if (!response.ok) throw new Error("Failed")
      const data = await response.json()
      setPosition(data.position ?? 0)
      setRefCode(data.refCode ?? "")
      setSuccess(true)
      if (isBetaSubmit) {
        setBetaSuccess(true)
      }
      try { localStorage.removeItem("yv_ref") } catch { /* noop */ }
    } catch {
      setError("network")
    } finally {
      setLoading(false)
    }
  }

  // Text/border color tokens
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
        optSelected: {
          border: "rgba(0,0,0,0.45)",
          bg: "rgba(0,0,0,0.08)",
          color: "#0a0e1a"
        },
        optDefault: {
          border: "rgba(0,0,0,0.1)",
          bg: "rgba(0,0,0,0.03)",
          color: "rgba(10,14,26,0.45)"
        }
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
        optSelected: {
          border: "rgba(255,255,255,0.6)",
          bg: "rgba(255,255,255,0.18)",
          color: "#fff"
        },
        optDefault: {
          border: "rgba(255,255,255,0.18)",
          bg: "rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.55)"
        }
      }

  const font = "var(--font-dm-sans), sans-serif"

  // ── Waitlist success state ──
  const waitlistSuccess = (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <p
        style={{
          fontFamily: font,
          fontSize: "28px",
          fontWeight: 600,
          color: c.heading,
          animation: "countup-reveal 0.4s ease"
        }}
      >
        You&apos;re in.
      </p>
      <p
        style={{
          fontFamily: font,
          fontSize: "20px",
          fontWeight: 500,
          color: c.body,
          marginTop: "6px"
        }}
      >
        #<CountUp to={position} /> in line.
      </p>
      <p
        style={{
          fontFamily: font,
          fontSize: "14px",
          color: c.body,
          marginTop: "20px",
          lineHeight: 1.5
        }}
      >
        Skip 100 spots for every friend who joins.
      </p>
      {refCode && (
        <div
          style={{
            marginTop: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "0",
            borderRadius: "999px",
            border: `1px solid ${c.rowBorder}`,
            background: c.rowBg,
            padding: "4px 4px 4px 18px",
            animation: "referral-slide 0.3s ease 0.9s both"
          }}
        >
          <span
            style={{
              fontFamily: font,
              fontSize: "14px",
              color: c.body,
              userSelect: "all",
              marginRight: "10px"
            }}
          >
            yaven.us/w/{refCode}
          </span>
          <button
            type="button"
            onClick={copyLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: `1px solid ${c.rowBorder}`,
              background: c.rowBg,
              color: c.heading,
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: font,
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap"
            }}
          >
            {copied ? (
              <>
                <Check style={{ width: "14px", height: "14px" }} />
                Copied
              </>
            ) : (
              <>
                <Copy style={{ width: "14px", height: "14px" }} />
                Copy
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )

  // ── Beta success state ──
  const betaSuccessContent = (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <p
        style={{
          fontFamily: font,
          fontSize: "28px",
          fontWeight: 600,
          color: c.heading
        }}
      >
        Application in.
      </p>
      <p
        style={{
          fontFamily: font,
          fontSize: "15px",
          color: c.body,
          marginTop: "8px",
          lineHeight: 1.5
        }}
      >
        We onboard testers personally. Grab a slot and skip the
        email back-and-forth.
      </p>
      <a
        href="https://calendly.com/nickprice2000/yaven-support"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "13px 28px",
          borderRadius: "999px",
          background: "#267fe5",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 600,
          fontFamily: font,
          textDecoration: "none",
          transition: "transform 0.15s ease"
        }}
      >
        Book your 15-min onboarding
      </a>
      <div style={{ marginTop: "14px" }}>
        <button
          type="button"
          onClick={handleClose}
          style={{
            fontFamily: font,
            fontSize: "13px",
            color: c.body,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: "3px"
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  )

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
                background: "rgba(0,0,0,0.22)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)"
              }}
            />

            {/* Glass popup */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "540px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "28px",
                padding: "clamp(36px, 6vw, 56px)",
                backdropFilter: "blur(40px) saturate(1.4)",
                WebkitBackdropFilter: "blur(40px) saturate(1.4)",
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.08)",
                animation: "popup-in 0.3s ease",
                transition: "all 0.3s ease"
              }}
            >
              {success ? (
                betaSuccess ? betaSuccessContent : waitlistSuccess
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {betaMode ? (
                    <div
                      style={{
                        marginBottom: "20px",
                        animation:
                          "beta-fields-in 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          margin: "0 0 8px"
                        }}
                      >
                        <button
                          type="button"
                          onClick={exitBeta}
                          aria-label="Back to waitlist"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "30px",
                            height: "30px",
                            borderRadius: "999px",
                            border: `1px solid ${c.rowBorder}`,
                            background: c.rowBg,
                            color: c.heading,
                            cursor: "pointer",
                            flexShrink: 0
                          }}
                        >
                          <ArrowLeft
                            style={{ width: "16px", height: "16px" }}
                          />
                        </button>
                        <h3
                          style={{
                            fontFamily: font,
                            fontSize: "clamp(22px, 4vw, 28px)",
                            fontWeight: 600,
                            color: c.heading,
                            margin: 0,
                            lineHeight: 1.2
                          }}
                        >
                          Become a beta tester
                        </h3>
                      </div>
                      <p
                        style={{
                          fontFamily: font,
                          fontSize: "14px",
                          color: c.body,
                          margin: 0,
                          lineHeight: 1.6
                        }}
                      >
                        Help shape Yaven before launch. We onboard a small group
                        each week, personally.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3
                        style={{
                          fontFamily: font,
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
                          fontFamily: font,
                          fontSize: "14px",
                          color: c.body,
                          margin: "0 0 24px",
                          lineHeight: 1.6
                        }}
                      >
                        Be first in when we launch. Or skip the line and{" "}
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
                            cursor: "pointer"
                          }}
                        >
                          become a beta tester
                        </button>
                        .
                      </p>
                    </>
                  )}

                  {error === "network" && (
                    <p
                      style={{
                        color: "#ff6b6b",
                        fontSize: "13px",
                        margin: "0 0 12px",
                        fontFamily: font
                      }}
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}

                  {/* Beta tester extra fields.
                      Always mounted so it can animate open AND closed. */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      overflow: "hidden",
                      maxHeight: betaMode ? "500px" : "0px",
                      opacity: betaMode ? 1 : 0,
                      marginBottom: betaMode ? "44px" : "0px",
                      pointerEvents: betaMode ? "auto" : "none",
                      transition:
                        "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, margin-bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                    }}
                  >
                    {/* Name (beta only) */}
                    <input
                      type="text"
                      value={betaName}
                      onChange={e => setBetaName(e.target.value)}
                      placeholder="Your name"
                      style={{
                        width: "100%",
                        padding: "11px 18px",
                        borderRadius: "999px",
                        border: `1px solid ${c.rowBorder}`,
                        background: c.rowBg,
                        color: c.inputColor,
                        fontSize: "15px",
                        fontFamily: font,
                        outline: "none"
                      }}
                    />

                    {/* Role chips */}
                    <div>
                      <label
                        style={{
                          fontFamily: font,
                          fontSize: "14px",
                          fontWeight: 500,
                          color: c.label,
                          display: "block",
                          marginBottom: "6px"
                        }}
                      >
                        Your role
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px"
                        }}
                      >
                        {["Founder", "Freelancer", "Consultant", "Other"].map(
                          r => {
                            const selected = role === r
                            const colors = selected
                              ? c.optSelected
                              : c.optDefault
                            return (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: "999px",
                                  border: `1px solid ${colors.border}`,
                                  background: colors.bg,
                                  color: colors.color,
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  fontFamily: font,
                                  cursor: "pointer",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                {r}
                              </button>
                            )
                          }
                        )}
                      </div>
                    </div>

                    {/* Mac question */}
                    <div>
                      <label
                        style={{
                          fontFamily: font,
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
                                borderRadius: "999px",
                                border: `1px solid ${colors.border}`,
                                background: colors.bg,
                                color: colors.color,
                                fontSize: "14px",
                                fontWeight: 600,
                                fontFamily: font,
                                cursor: "pointer",
                                transition: "all 0.15s ease"
                              }}
                            >
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>
                      {hasMac === false && (
                        <p
                          style={{
                            fontFamily: font,
                            fontSize: "13px",
                            color: c.body,
                            margin: "10px 0 0",
                            lineHeight: 1.5
                          }}
                        >
                          Yaven is macOS-first. Join the waitlist and
                          you&apos;re top of the list for Windows.
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Email + submit row */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0",
                      borderRadius: "999px",
                      border: `1px solid ${error === "invalid" ? "rgba(255, 80, 80, 0.7)" : c.rowBorder}`,
                      background: c.rowBg,
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      padding: "5px",
                      alignItems: "center",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease"
                    }}
                    className="waitlist-input-row"
                    ref={rowRef}
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value)
                        if (error === "invalid") setError("")
                      }}
                      placeholder="you@work.com"
                      style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "11px 18px",
                        borderRadius: "999px",
                        border: "none",
                        background: "transparent",
                        color: c.inputColor,
                        fontSize: "15px",
                        fontFamily: font,
                        outline: "none"
                      }}
                    />
                    {loading ? (
                      <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Loader2
                          style={{
                            width: "20px",
                            height: "20px",
                            color: c.heading,
                            animation: "spin 1s linear infinite"
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="glass-wrap waitlist-btn-wrap"
                        style={{ flexShrink: 0 }}
                      >
                        <div className="glass-shadow" />
                        <button
                          type="submit"
                          className="glass-btn"
                          style={{
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                          }}
                        >
                          <span className="text-white">
                            {betaMode
                              ? hasMac === false
                                ? "Join the waitlist"
                                : "Apply \u2192"
                              : "Get early access"}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                  {!betaMode && (
                    <p
                      style={{
                        fontFamily: font,
                        fontSize: "12px",
                        color: c.body,
                        margin: "12px 0 0",
                        textAlign: "center"
                      }}
                    >
                      One email when your access opens. No newsletter.
                    </p>
                  )}
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
          <span className="text-white">Get early access</span>
        </button>
      </div>
      {popup}
    </>
  )
}
