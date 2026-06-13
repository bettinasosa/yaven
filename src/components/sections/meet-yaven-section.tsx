"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useIsMobile } from "@/components/effects/use-is-mobile"
import { IconTooltip } from "@/components/ui/icon-tooltip"
import { ICON_LABELS } from "@/components/ui/icon-labels"

gsap.registerPlugin(ScrollTrigger)

// Cream draw-on underline
function U({ children }: { children: React.ReactNode }) {
  return (
    <span className="triage-underline u-cream" style={{ transition: "none" }}>
      {children}
    </span>
  )
}

// Inline tool-icon pill (cream bg on dark)
function IconPill({ name, tilt = 0 }: { name: string; tilt?: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <IconTooltip label={ICON_LABELS[name] ?? name}>
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "26px",
          height: "26px",
          borderRadius: "7px",
          background: "var(--cream)",
          border: "1px solid rgba(255,248,240,0.25)",
          verticalAlign: "middle",
          margin: "0 3px",
          flexShrink: 0,
          position: "relative",
          top: "-1px",
          transform: `rotate(${tilt}deg) translateY(${hovered ? "-5px" : "0px"})`,
          transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          cursor: "default"
        }}
      >
        <Image
          src={`/logos/${name}.png`}
          alt={name}
          width={16}
          height={16}
          style={{ objectFit: "contain", width: "16px", height: "16px" }}
        />
      </span>
    </IconTooltip>
  )
}

// ── Keyboard shortcut badges ────────────────────────────────────────────────

function KeyBadge({
  children,
  small,
  large
}: {
  children: React.ReactNode
  small?: boolean
  large?: boolean
}) {
  const fontSize = large ? "clamp(18px, 2.5vw, 28px)" : small ? "11px" : "13px"
  const minWidth = large ? "clamp(32px, 4vw, 48px)" : small ? "22px" : "26px"
  const height = large ? "clamp(32px, 4vw, 48px)" : small ? "22px" : "26px"
  const radius = large ? "10px" : "6px"
  const pad = large ? "0 10px" : "0 6px"
  const depth = large ? 2 : 1

  return (
    <span
      className="yv-keybadge inline-flex items-center justify-center font-bold"
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize,
        minWidth,
        height,
        padding: pad,
        borderRadius: radius,
        background: "rgba(255,255,255,0.9)",
        color: "#0a0e1a",
        boxShadow: large
          ? "0 2px 6px rgba(0,0,0,0.15), inset 0 -2px 0 rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.12), inset 0 -1px 0 rgba(0,0,0,0.08)",
        transition: "transform 0.1s ease, box-shadow 0.1s ease",
        ["--depth" as string]: `${depth}px`
      }}
    >
      {children}
    </span>
  )
}

function ShortcutBadge({ keys, small }: { keys: string[]; small?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      style={{
        marginRight: small ? "3px" : undefined,
        verticalAlign: "middle"
      }}
    >
      {keys.map((k, i) => (
        <KeyBadge key={i} small={small}>
          {k}
        </KeyBadge>
      ))}
    </span>
  )
}

// ── Draft card (LinkedIn DM) ────────────────────────────────────────────────

const DRAFT_RESPONSE =
  "Thanks so much for reaching out, Lola! I'm really flattered. I'm not looking to go in-house right now, but I'd love to stay connected. If anything changes on my end I'll definitely reach out."

const ASK_RESPONSE =
  "his team updated the payment window from 30 to 60 days. He mentioned cash-flow timing on their end. The rest of the scope is unchanged from your v2 redline."

function LinkedInCard({
  drafting,
  active,
  onTrigger
}: {
  drafting: boolean
  active: boolean
  onTrigger: () => void
}) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "480px",
        borderRadius: "48px",
        background: "linear-gradient(160deg, #0958b0, #0A66C2)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.22), 0 3px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "38px 35px 35px"
      }}
    >
      <div className="flex items-center gap-2.5 px-[22px] pb-5">
        <Image
          src="/logos/linkedin.png"
          alt="LinkedIn"
          width={26}
          height={26}
          style={{
            objectFit: "contain",
            width: "26px",
            height: "26px",
            borderRadius: "5px",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.12))"
          }}
        />
        <span className="font-bold text-white text-[16px]">Draft</span>
      </div>

      <div
        style={{
          flex: 1,
          background: "var(--cream)",
          borderRadius: "28px",
          padding: "clamp(20px,3vw,28px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00AFF9, #2563EB)",
              flexShrink: 0,
              display: "inline-block",
              boxShadow: "0 2px 10px rgba(124,58,237,0.3)"
            }}
          />
          <div>
            <div className="font-bold text-[#0a0e1a] text-[14px]">Lola H.</div>
            <div className="text-[#0a0e1a]/50 text-[12px]">
              Recruiter · Founding Designer role
            </div>
          </div>
        </div>

        <p className="text-[#0a0e1a] text-[14px] leading-[1.55] font-medium mb-4 mx-1">
          Hi Bettina! Your work is stunning, we&apos;re hiring a founding
          designer. Open to a quick chat?
        </p>

        <div
          className="rounded-[28px] p-5 flex flex-col gap-3 mt-auto"
          style={{
            background: "rgba(0,0,0,0.04)",
            border: "1.5px solid rgba(0,0,0,0.08)"
          }}
        >
          {!drafting ? (
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[#0a0e1a]/40 text-[11px] font-medium tracking-[0.06em] uppercase mb-1.5">
                  You type
                </div>
                <div className="text-[#0a0e1a] font-medium text-[15px]">
                  politely decline, warm
                </div>
              </div>
              <div className="glass-wrap glass-btn-invite">
                <button
                  type="button"
                  className="glass-btn glass-btn-sm"
                  style={{ fontSize: "14px" }}
                  onClick={onTrigger}
                >
                  <span className="text-white">
                    <span className="inline-flex items-center gap-[3px]">
                      <KeyBadge>⌥</KeyBadge>
                      <KeyBadge>D</KeyBadge>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[#0a0e1a]/40 text-[11px] font-medium tracking-[0.06em] uppercase mb-2">
                Yaven drafts
              </div>
              <div className="text-[#0a0e1a] text-[14px] leading-[1.55] font-medium">
                {active ? (
                  <Typewriter text={DRAFT_RESPONSE} speed={12} delay={300} />
                ) : (
                  <span className="opacity-0">.</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Ask card (document with macOS-style bg) ────────────────────────────────

function AskCard({
  asking,
  active,
  onTrigger,
  inline = false
}: {
  asking: boolean
  active: boolean
  onTrigger: () => void
  inline?: boolean
}) {
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        style={{
          width: "100%",
          minHeight: "480px",
          borderRadius: "52px",
          position: "relative",
          overflow: "hidden",
          background: "#ebc1ff",
          boxShadow: "0 10px 32px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 flex items-end justify-between pl-[57px] pr-10 pt-14 pb-8 z-[2]"
          style={{ height: "18%" }}
        >
          <div className="flex items-center gap-2.5">
            <Image
              src="/logos/google.png"
              alt="Google"
              width={26}
              height={26}
              style={{
                objectFit: "contain",
                width: "26px",
                height: "26px",
                borderRadius: "8px"
              }}
            />
            <span className="font-bold text-white text-[16px]">Ask</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "18%",
            left: "-4%",
            width: "90%",
            bottom: "-4%",
            background: "var(--cream)",
            borderRadius: "0 32px 0",
            padding: "52px 28px 40px 56px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 1,
            boxShadow:
              "6px -6px 28px rgba(0,0,0,0.16), 3px -3px 10px rgba(0,0,0,0.08), 1px -1px 3px rgba(0,0,0,0.05)"
          }}
        >
          <div className="flex justify-end" style={{ marginRight: "10px" }}>
            <div
              className="text-[11px] font-medium text-[#0a0e1a]/50"
              style={{
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.06)",
                padding: "5px 12px",
                borderRadius: "20px"
              }}
            >
              Ottos_Bakehouse_v3.pdf
            </div>
          </div>

          <div className="text-[16px] leading-[1.75] text-[#0a0e1a]/70 mt-2">
            <div className="mb-3">
              <span className="text-[#0a0e1a]/30 text-[13px]">4.1</span> All
              deliverables remain the sole property of the Client upon full
              payment.
            </div>
            <div className="mb-3">
              <span className="text-[#0a0e1a]/30 text-[13px]">4.2</span> Payment
              due within{" "}
              <strong
                style={{
                  color: "#0a0e1a",
                  fontWeight: 600
                }}
              >
                sixty (60)
              </strong>{" "}
              days of invoice date.
            </div>
          </div>

          {!asking && (
            <div className="flex items-center justify-between mt-auto">
              <div className="text-[13px] font-medium text-[#0a0e1a]/35">
                Ask about this document
              </div>
              <div className="glass-wrap glass-btn-invite">
                <button
                  type="button"
                  className="glass-btn glass-btn-sm"
                  style={{ fontSize: "14px" }}
                  onClick={onTrigger}
                >
                  <span className="text-white">
                    <span className="inline-flex items-center gap-[3px]">
                      <KeyBadge>⌥</KeyBadge>
                      <KeyBadge>A</KeyBadge>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {inline && asking && (
            <div
              className="mt-auto"
              style={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                paddingTop: "12px"
              }}
            >
              <div
                className="text-[13px] font-semibold mb-2"
                style={{ color: "rgba(0,0,0,0.4)" }}
              >
                I thought this was 30 days? Why did it change?
              </div>
              <div
                className="text-[14px] leading-[1.6] font-medium"
                style={{ color: "rgba(0,0,0,0.75)" }}
              >
                {active ? (
                  <>
                    <span>Since your last </span>
                    <span
                      className="inline-flex items-center gap-1 align-middle"
                      style={{
                        background: "rgba(0,0,0,0.06)",
                        borderRadius: "10px",
                        fontSize: "12px"
                      }}
                    >
                      <Image
                        src="/logos/granola.png"
                        alt="Granola"
                        width={14}
                        height={14}
                        className="rounded-[3px]"
                        style={{ flexShrink: 0, width: "14px", height: "14px" }}
                      />
                    </span>
                    <span> call with Pablo on May 12, </span>
                    <Typewriter text={ASK_RESPONSE} speed={12} delay={300} />
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating glass bubble — desktop only */}
      {!inline && asking && (
        <div
          style={{
            position: "absolute",
            top: "65%",
            left: "calc(100% - 140px)",
            transform: "translateY(-50%)",
            width: "300px",
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(16px) saturate(1.2)",
            WebkitBackdropFilter: "blur(16px) saturate(1.2)",
            borderRadius: "32px",
            border: "1px solid rgba(255,255,255,0.5)",
            padding: "18px 22px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
            zIndex: 10
          }}
        >
          <div
            className="text-[13px] font-semibold mb-2"
            style={{ color: "rgba(0,0,0,0.4)" }}
          >
            I thought this was 30 days? Why did it change?
          </div>
          <div
            className="text-[14px] leading-[1.6] font-medium"
            style={{ color: "rgba(0,0,0,0.75)" }}
          >
            {active ? (
              <>
                <span>Since your last </span>
                <span
                  className="inline-flex items-center gap-1 align-middle"
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    borderRadius: "10px",
                    fontSize: "12px"
                  }}
                >
                  <Image
                    src="/logos/granola.png"
                    alt="Granola"
                    width={14}
                    height={14}
                    className="rounded-[3px]"
                    style={{ flexShrink: 0, width: "14px", height: "14px" }}
                  />
                </span>
                <span> call with Pablo on May 12, </span>
                <Typewriter text={ASK_RESPONSE} speed={12} delay={300} />
              </>
            ) : (
              <span className="opacity-0">.</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main section ────────────────────────────────────────────────────────────

const bodyTextStyle: React.CSSProperties = {
  fontSize: "var(--fs-body)",
  fontWeight: 500,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.8)"
}

export function MeetYavenSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const draftCardRef = useRef<HTMLDivElement>(null)
  const askCardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const textWrapRef = useRef<HTMLDivElement>(null)

  const [drafting, setDrafting] = useState(false)
  const [draftTyping, setDraftTyping] = useState(false)
  const [asking, setAsking] = useState(false)
  const [askTyping, setAskTyping] = useState(false)
  const [showDraftHint, setShowDraftHint] = useState(false)
  const [showAskHint, setShowAskHint] = useState(false)

  const staticLayout = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const draftInView = useRef(false)
  const askInView = useRef(false)

  const triggerDraft = useCallback(() => {
    if (drafting || !draftInView.current) return
    setDrafting(true)
    setTimeout(() => setDraftTyping(true), 100)
  }, [drafting])

  const triggerAsk = useCallback(() => {
    if (asking || !askInView.current) return
    setAsking(true)
    setTimeout(() => setAskTyping(true), 100)
  }, [asking])

  // Keyboard listeners
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.code === "KeyD") {
          e.preventDefault()
          triggerDraft()
        } else if (e.code === "KeyA") {
          e.preventDefault()
          triggerAsk()
        }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [triggerDraft, triggerAsk])

  // Show underlines on static/mobile
  useEffect(() => {
    if (!(staticLayout || isMobile) || !textWrapRef.current) return
    textWrapRef.current
      .querySelectorAll(".triage-underline")
      .forEach(el => el.classList.add("is-visible"))
  }, [staticLayout, isMobile])

  // Animate underlines when they scroll into view (desktop)
  useEffect(() => {
    if (staticLayout || isMobile || !textWrapRef.current) return
    const els = textWrapRef.current.querySelectorAll(".triage-underline")
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("is-visible")
        })
      },
      { threshold: 0.5 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [staticLayout, isMobile])

  // Desktop scroll animation
  useEffect(() => {
    if (staticLayout || isMobile || !wrapperRef.current) return

    const wrapper = wrapperRef.current
    const triggers: ScrollTrigger[] = []

    gsap.set(contentRef.current, { opacity: 1 })

    const draftEnterTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "0% top",
        end: "10% top",
        scrub: 0.8
      }
    })
    draftEnterTl.fromTo(
      draftCardRef.current,
      { y: "100vh", rotation: 4 },
      { y: 0, rotation: 0, ease: "none", force3D: true }
    )
    triggers.push(draftEnterTl.scrollTrigger!)

    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "0% top",
        end: "46% top",
        onEnter: () => {
          draftInView.current = true
          setShowDraftHint(true)
        },
        onLeave: () => {
          draftInView.current = false
        },
        onEnterBack: () => {
          draftInView.current = true
          setShowDraftHint(true)
        },
        onLeaveBack: () => {
          draftInView.current = false
          setDrafting(false)
          setDraftTyping(false)
          setShowDraftHint(false)
        }
      })
    )

    const stackTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "38% top",
        end: "54% top",
        scrub: 0.8
      }
    })
    stackTl.fromTo(
      askCardRef.current,
      { y: "100vh", rotation: -4 },
      { y: 36, rotation: 0, ease: "none", force3D: true },
      0
    )
    triggers.push(stackTl.scrollTrigger!)

    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "46% top",
        end: "98% top",
        onEnter: () => {
          askInView.current = true
          setShowAskHint(true)
        },
        onLeave: () => {
          askInView.current = false
        },
        onEnterBack: () => {
          askInView.current = true
          setShowAskHint(true)
        },
        onLeaveBack: () => {
          askInView.current = false
          setAsking(false)
          setAskTyping(false)
          setShowAskHint(false)
        }
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [staticLayout, isMobile])

  // Mobile scroll animation
  useEffect(() => {
    if (!isMobile || staticLayout || !wrapperRef.current) return

    const wrapper = wrapperRef.current
    const triggers: ScrollTrigger[] = []

    gsap.set(contentRef.current, { opacity: 1 })

    const draftTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 90%",
        end: "top 20%",
        scrub: 0.5
      }
    })
    draftTl.fromTo(
      draftCardRef.current,
      { y: "100vh" },
      { y: 0, ease: "none", force3D: true }
    )
    triggers.push(draftTl.scrollTrigger!)

    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "30% top",
        onEnter: () => {
          draftInView.current = true
          setShowDraftHint(true)
        },
        onLeave: () => {
          draftInView.current = false
        },
        onEnterBack: () => {
          draftInView.current = true
          setShowDraftHint(true)
        },
        onLeaveBack: () => {
          draftInView.current = false
          setDrafting(false)
          setDraftTyping(false)
          setShowDraftHint(false)
        }
      })
    )

    const askTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "18% top",
        end: "42% top",
        scrub: 0.5
      }
    })
    askTl.fromTo(
      askCardRef.current,
      { y: "100vh" },
      { y: 0, ease: "none", force3D: true }
    )
    triggers.push(askTl.scrollTrigger!)

    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "36% top",
        end: "85% top",
        onEnter: () => {
          askInView.current = true
          setShowAskHint(true)
        },
        onLeave: () => {
          askInView.current = false
        },
        onEnterBack: () => {
          askInView.current = true
          setShowAskHint(true)
        },
        onLeaveBack: () => {
          askInView.current = false
          setAsking(false)
          setAskTyping(false)
          setShowAskHint(false)
        }
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [isMobile, staticLayout])

  const sideText = (
    <div ref={textWrapRef} className="flex flex-col gap-5">
      <ScrollCutReveal
        className="font-medium tracking-[-0.02em] leading-[1] m-0"
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "var(--fs-display)",
          color: "#fff"
        }}
      >
        Meet Yaven.
      </ScrollCutReveal>

      <p
        className="font-medium leading-[1.35] m-0"
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "var(--fs-title)",
          color: "#fff",
          opacity: 0.85
        }}
      >
        A menu bar assistant that lives on your Mac.
      </p>

      <div className="flex flex-col gap-5 max-w-[520px]">
        <p style={bodyTextStyle}>
          It connects to your <IconPill name="gmail" tilt={-3} /> email,{" "}
          <IconPill name="gcal" tilt={2} /> calendar,{" "}
          <IconPill name="hubspot" tilt={-2} /> CRM,{" "}
          <IconPill name="notion" tilt={3} /> docs and more, and catches
          everything in <U>one place</U>. The intro, the contract, the unpaid
          invoice, none of it gets buried.
        </p>

        <p style={bodyTextStyle}>
          Use <ShortcutBadge keys={["⌥", "D"]} small /> to draft any reply,
          anywhere, in your voice. <ShortcutBadge keys={["⌥", "A"]} small />{" "}
          answers anything on your screen. You approve every step. The more you
          approve, <U>the more it automates</U>.
        </p>

        <p style={bodyTextStyle}>
          <U>Local-first</U>. Your emails, drafts, and context stay on your
          machine. Nothing is uploaded to our servers or synced to a cloud.
        </p>
      </div>

      <p
        className="text-[13px] font-semibold text-white/40 uppercase tracking-[0.08em] mt-1"
        style={{
          opacity: showDraftHint ? 1 : 0,
          transition: "opacity 0.4s ease"
        }}
      >
        Try the demo! press <ShortcutBadge keys={["⌥", "D"]} small />
        <span style={{ opacity: showAskHint ? 1 : 0, transition: "opacity 0.4s ease" }}>
          {" "}or <ShortcutBadge keys={["⌥", "A"]} small />
        </span>
      </p>
    </div>
  )

  // Reduced motion — static pre-activated cards
  if (staticLayout) {
    return (
      <section
        data-meet-yaven
        style={{
          background: "var(--primary)",
          padding: "clamp(80px,12vh,140px) clamp(28px,5vw,48px)"
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div
            className="w-full grid items-start gap-[clamp(40px,6vw,80px)]"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
            }}
          >
            {sideText}
            <div className="flex flex-col gap-6" style={{ maxWidth: "440px" }}>
              <LinkedInCard drafting active onTrigger={() => {}} />
              <AskCard asking active inline onTrigger={() => {}} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Mobile — text block + stacking card animation
  if (isMobile) {
    return (
      <>
        <section
          data-meet-yaven
          className="bg-[var(--primary)]"
          style={{
            padding: "clamp(60px,10vh,100px) clamp(24px,5vw,40px) 0"
          }}
        >
          {sideText}
        </section>

        <div
          ref={wrapperRef}
          className="relative bg-[var(--primary)]"
          style={{ height: "160vh", marginTop: "-1px", marginBottom: "clamp(60px,10vh,100px)" }}
        >
          <div
            className="sticky top-0 h-screen overflow-visible flex items-center justify-center"
            style={{ padding: "0 clamp(20px,5vw,32px)" }}
          >
            <div
              ref={contentRef}
              className="relative"
              style={{
                width: "100%",
                maxWidth: "440px",
                height: "600px",
                opacity: 0
              }}
            >
              <div
                ref={draftCardRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  transformOrigin: "center bottom",
                  transform: "translateZ(0) translateY(100vh)"
                }}
              >
                <LinkedInCard
                  drafting={drafting}
                  active={draftTyping}
                  onTrigger={triggerDraft}
                />
              </div>

              <div
                ref={askCardRef}
                style={{
                  position: "absolute",
                  top: "48px",
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  transformOrigin: "center bottom",
                  transform: "translateZ(0) translateY(100vh)"
                }}
              >
                <AskCard
                  asking={asking}
                  active={askTyping}
                  inline
                  onTrigger={triggerAsk}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Desktop — full scroll-pinned animation
  return (
    <div
      ref={wrapperRef}
      data-meet-yaven
      className="relative h-[550vh] bg-[var(--primary)]"
    >
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[200px] z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--primary) 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 100%)"
        }}
      />

      <div className="sticky top-0 h-screen overflow-visible flex items-center z-2 p-[clamp(28px,4vh,60px)_clamp(28px,5vw,48px)]">
        <div
          ref={contentRef}
          className="w-full max-w-[1100px] mx-auto grid items-start gap-[clamp(40px,6vw,80px)]"
          style={{
            gridTemplateColumns: "1.4fr 1fr",
            opacity: 0
          }}
        >
          {/* Text column */}
          <div>{sideText}</div>

          {/* Card column — stacking */}
          <div
            className="relative"
            style={{
              width: "100%",
              maxWidth: "460px",
              justifySelf: "end",
              height: "540px"
            }}
          >
            <div
              ref={draftCardRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                willChange: "transform",
                backfaceVisibility: "hidden",
                transformOrigin: "center bottom",
                transform: "translateZ(0) translateY(100vh) rotate(6deg)"
              }}
            >
              <LinkedInCard
                drafting={drafting}
                active={draftTyping}
                onTrigger={() => {
                  if (drafting) return
                  setDrafting(true)
                  setTimeout(() => setDraftTyping(true), 100)
                }}
              />
            </div>

            <div
              ref={askCardRef}
              style={{
                position: "absolute",
                top: "48px",
                left: 0,
                right: 0,
                zIndex: 2,
                willChange: "transform",
                backfaceVisibility: "hidden",
                transformOrigin: "center bottom",
                transform: "translateZ(0) translateY(100vh) rotate(-6deg)"
              }}
            >
              <AskCard
                asking={asking}
                active={askTyping}
                onTrigger={triggerAsk}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
