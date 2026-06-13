"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useIsMobile } from "@/components/effects/use-is-mobile"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const DRAFT_RESPONSE =
  "Thanks so much for reaching out, Lola! I'm really flattered. I'm not looking to go in-house right now, but I'd love to stay connected. If anything changes on my end I'll definitely reach out."

const ASK_RESPONSE =
  "his team updated the payment window from 30 to 60 days. He mentioned cash-flow timing on their end. The rest of the scope is unchanged from your v2 redline."

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

function ShortcutBadge({
  keys,
  small,
  large
}: {
  keys: string[]
  small?: boolean
  large?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center ${large ? "gap-[5px]" : "gap-[3px]"}`}
      style={{
        position: "relative",
        top: large ? "-0.08em" : undefined,
        marginRight: small ? "3px" : undefined,
        verticalAlign: "middle"
      }}
    >
      {keys.map((k, i) => (
        <KeyBadge key={i} small={small} large={large}>
          {k}
        </KeyBadge>
      ))}
    </span>
  )
}

// ── Draft card (LinkedIn DM) ────────────────────────────────────────────────

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
      {/* Header label */}
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

      {/* Inner white card */}
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
        {/* Avatar + sender + subtitle */}
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

        {/* Incoming message */}
        <p className="text-[#0a0e1a] text-[14px] leading-[1.55] font-medium mb-4 mx-1">
          Hi Bettina! Your work is stunning, we&apos;re hiring a founding
          designer. Open to a quick chat?
        </p>

        {/* Draft box */}
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
        {/* Header bar — Ask command (doc icon + ⌥A), on the red strip */}
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

        {/* Cream document panel — cropped from left/bottom */}
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
          {/* Doc name bubble */}
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

          {/* Trigger button */}
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

          {/* Inline response — used on mobile/static instead of the floating bubble */}
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

      {/* ── Floating glass bubble (outside clipped card) — desktop/animated only ── */}
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

export function CommandsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const draftCardRef = useRef<HTMLDivElement>(null)
  const askCardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [drafting, setDrafting] = useState(false)
  const [draftTyping, setDraftTyping] = useState(false)
  const [asking, setAsking] = useState(false)
  const [askTyping, setAskTyping] = useState(false)

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

  // Desktop scroll animation — killed when mobile takes over
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
        },
        onLeave: () => {
          draftInView.current = false
        },
        onEnterBack: () => {
          draftInView.current = true
        },
        onLeaveBack: () => {
          draftInView.current = false
          setDrafting(false)
          setDraftTyping(false)
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
      // Stop a touch low so the card's top lands just below the Draft header,
      // covering the draft card's cream rather than climbing over the header.
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
        },
        onLeave: () => {
          askInView.current = false
        },
        onEnterBack: () => {
          askInView.current = true
        },
        onLeaveBack: () => {
          askInView.current = false
          setAsking(false)
          setAskTyping(false)
        }
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [staticLayout, isMobile])

  // Mobile scroll animation — stacking cards like triage
  useEffect(() => {
    if (!isMobile || staticLayout || !wrapperRef.current) return

    const wrapper = wrapperRef.current
    const triggers: ScrollTrigger[] = []

    gsap.set(contentRef.current, { opacity: 1 })

    // Draft card slides up as the wrapper enters the viewport (no blank gap)
    const draftTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 75%",
        end: "top top",
        scrub: 0.5
      }
    })
    draftTl.fromTo(
      draftCardRef.current,
      { y: "100vh" },
      { y: 0, ease: "none", force3D: true }
    )
    triggers.push(draftTl.scrollTrigger!)

    // Draft button active when card is settled
    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "36% top",
        onEnter: () => {
          draftInView.current = true
        },
        onLeave: () => {
          draftInView.current = false
        },
        onEnterBack: () => {
          draftInView.current = true
        },
        onLeaveBack: () => {
          draftInView.current = false
          setDrafting(false)
          setDraftTyping(false)
        }
      })
    )

    // Ask card slides up on top
    const askTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "20% top",
        end: "38% top",
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
        },
        onLeave: () => {
          askInView.current = false
        },
        onEnterBack: () => {
          askInView.current = true
        },
        onLeaveBack: () => {
          askInView.current = false
          setAsking(false)
          setAskTyping(false)
        }
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [isMobile, staticLayout])

  const sideText = (
    <div className="flex flex-col gap-4">
      <ScrollCutReveal
        className="text-[var(--fs-display)] font-medium tracking-[-0.02em] leading-[1.05] text-white m-0"
        style={{ fontFamily: "var(--font-instrument-serif)" }}
      >
        <ShortcutBadge keys={["⌥", "D"]} large /> to draft.{" "}
        <ShortcutBadge keys={["⌥", "A"]} large /> to ask.
      </ScrollCutReveal>
      <p
        className={`text-[var(--fs-body)] font-medium text-white/80 leading-[1.55] ${isMobile ? "mt-1" : "mt-3"}`}
        style={{ maxWidth: "480px" }}
      >
        Press <ShortcutBadge keys={["⌥", "D"]} small /> in any app and the reply
        writes itself: your tone, this client&apos;s history, the whole thread
        accounted for. Press <ShortcutBadge keys={["⌥", "A"]} small /> and ask
        about anything on your screen, a contract clause, a number in a
        spreadsheet, a thread you don&apos;t want to reread. Full answers, not
        shallow ones, because Yaven remembers.
      </p>
      <p className="text-[13px] font-semibold text-white/40 uppercase tracking-[0.08em] mt-1">
        Try the demo!
      </p>
    </div>
  )

  // Reduced motion — static pre-activated cards, no animation
  if (staticLayout) {
    return (
      <section
        className="bg-[var(--primary)] p-[clamp(80px,12vh,140px)_clamp(28px,5vw,48px)]"
        style={{
          borderRadius: "48px 48px 0 0",
          boxShadow: "0 -16px 64px rgba(0,0,0,0.18)"
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

  // Mobile — text block + stacking card animation (like triage)
  if (isMobile) {
    return (
      <>
        <section
          className="bg-[var(--primary)]"
          style={{
            borderRadius: "48px 48px 0 0",
            boxShadow: "0 -16px 64px rgba(0,0,0,0.18)",
            padding: "clamp(60px,10vh,100px) clamp(24px,5vw,40px) 16px"
          }}
        >
          {sideText}
        </section>

        <div
          ref={wrapperRef}
          className="relative bg-[var(--primary)]"
          style={{ height: "180vh", marginTop: "-1px" }}
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
                  transform: "translateZ(0) translateY(100vh) rotate(6deg)"
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
                  transform: "translateZ(0) translateY(100vh) rotate(-6deg)"
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
      className="relative h-[550vh] bg-[var(--primary)]"
      style={{
        borderRadius: "48px 48px 0 0",
        boxShadow: "0 -16px 64px rgba(0,0,0,0.18)"
      }}
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
        {/* Content: text (left) + card stack (right) */}
        <div
          ref={contentRef}
          className="w-full max-w-[1100px] mx-auto grid items-start gap-[clamp(40px,6vw,80px)]"
          style={{
            gridTemplateColumns: "1.4fr 1fr",
            opacity: 0
          }}
        >
          {/* Text column — static */}
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
            {/* Draft card — slides up from bottom of screen */}
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

            {/* Ask card — slides up on top */}
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
