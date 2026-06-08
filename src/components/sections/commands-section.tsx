"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const DRAFT_RESPONSE =
  "Thanks so much for reaching out, Priya! I'm really flattered. I'm not looking to go in-house right now, but I'd love to stay connected. If anything changes on my end I'll definitely reach out."

const ASK_RESPONSE =
  "his team updated the payment window from 30 to 60 days. He mentioned cash-flow timing on their end. The rest of the scope is unchanged from your v2 redline."

function KeyBadge({
  children,
  small
}: {
  children: React.ReactNode
  small?: boolean
}) {
  return (
    <span
      className="inline-flex items-center justify-center font-bold"
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: small ? "11px" : "13px",
        minWidth: small ? "22px" : "26px",
        height: small ? "22px" : "26px",
        padding: "0 6px",
        borderRadius: "6px",
        background: "rgba(255,255,255,0.9)",
        color: "#0a0e1a",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), inset 0 -1px 0 rgba(0,0,0,0.08)"
      }}
    >
      {children}
    </span>
  )
}

function ShortcutBadge({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-[3px]">
      {keys.map((k, i) => (
        <KeyBadge key={i} small>
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
        height: "500px",
        borderRadius: "28px",
        background: "var(--cream)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        overflow: "hidden"
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header bar — LinkedIn blue */}
        <div
          className="flex items-center justify-between px-5 py-6"
          style={{
            background: "linear-gradient(135deg, #0A66C2, #0d79d9)"
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center rounded-lg"
              style={{
                width: "32px",
                height: "32px",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.25)"
              }}
            >
              <span className="font-bold text-white text-[14px] leading-none">
                in
              </span>
            </span>
            <span className="font-bold text-white text-[16px]">Messaging</span>
          </div>
          <ShortcutBadge keys={["⌥", "D"]} />
        </div>

        {/* Message content */}
        <div className="px-5 py-5 flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center rounded-full shrink-0"
              style={{
                width: "30px",
                height: "30px",
                background: "linear-gradient(135deg, #00AFF9, #2563EB)",
                boxShadow: "0 2px 10px rgba(124,58,237,0.3)"
              }}
            />
            <div>
              <div className="font-bold text-[#0a0e1a] text-[15px]">
                Priya Nair
              </div>
              <div className="text-[#0a0e1a]/50 text-[13px]">
                Recruiter · Founding Designer role
              </div>
            </div>
          </div>

          <p className="text-[#0a0e1a] text-[15px] leading-[1.55] font-medium mx-4">
            Hi Bettina! Your work is stunning, we&apos;re hiring a founding
            designer. Open to a quick chat this week?
          </p>

          <div
            className="rounded-2xl p-4 flex flex-col gap-3 mt-auto"
            style={{
              background: "rgba(0,0,0,0.04)",
              border: "1.5px solid rgba(0,0,0,0.08)"
            }}
          >
            {!drafting ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#0a0e1a]/40 text-[11px] font-medium tracking-[0.06em] uppercase mb-1.5">
                    You type
                  </div>
                  <div className="text-[#0a0e1a] font-medium text-[15px]">
                    politely decline, but warm
                  </div>
                </div>
                <div className="glass-wrap">
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
    </div>
  )
}

// ── Ask card (document with macOS-style bg) ────────────────────────────────

function AskCard({
  asking,
  active,
  onTrigger
}: {
  asking: boolean
  active: boolean
  onTrigger: () => void
}) {
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        style={{
          width: "100%",
          minHeight: "480px",
          borderRadius: "28px",
          position: "relative",
          overflow: "hidden",
          background: "var(--red)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)"
        }}
      >
        {/* Cream document panel — cropped from left/bottom */}
        <div
          style={{
            position: "absolute",
            top: "14%",
            left: "-4%",
            width: "90%",
            bottom: "-4%",
            background: "var(--cream)",
            borderRadius: "0 22px 0",
            padding: "52px 28px 40px 40px",
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
              <div className="glass-wrap">
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
        </div>
      </div>

      {/* ── Floating glass bubble (outside clipped card) ── */}
      {asking && (
        <div
          style={{
            position: "absolute",
            top: "65%",
            left: "calc(100% - 140px)",
            transform: "translateY(-50%)",
            width: "300px",
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(40px) saturate(1.4)",
            WebkitBackdropFilter: "blur(40px) saturate(1.4)",
            borderRadius: "22px",
            border: "1px solid rgba(255,255,255,0.5)",
            padding: "18px 22px",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
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
                    style={{ flexShrink: 0 }}
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
      // Use e.code (physical key) — on macOS, Option+D types "∂" so e.key
      // would never match "d".
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

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    const wrapper = wrapperRef.current
    const triggers: ScrollTrigger[] = []

    // Show content immediately (cards animate in independently)
    gsap.set(contentRef.current, { opacity: 1 })

    // Draft card slides up from bottom with rotation
    const draftEnterTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "0% top",
        end: "10% top",
        scrub: true
      }
    })
    draftEnterTl.fromTo(
      draftCardRef.current,
      { y: "100vh", rotation: 6 },
      { y: 0, rotation: 0, ease: "none", force3D: true }
    )
    triggers.push(draftEnterTl.scrollTrigger!)

    // Draft in-view tracking
    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "0% top",
        end: "30% top",
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

    // Ask card slides up with alternate rotation
    const stackTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "38% top",
        end: "54% top",
        scrub: true
      }
    })
    stackTl.fromTo(
      askCardRef.current,
      { y: "100vh", rotation: -6 },
      { y: 0, rotation: 0, ease: "none", force3D: true },
      0
    )
    triggers.push(stackTl.scrollTrigger!)

    // Ask in-view tracking
    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "54% top",
        end: "90% top",
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
  }, [staticLayout])

  const sideText = (
    <div className="flex flex-col gap-6">
      <ScrollCutReveal className="font-instrument-serif text-[clamp(44px,6.5vw,96px)] font-medium tracking-[-0.02em] leading-[1.05] text-white m-0">
        Yaven works anywhere.
      </ScrollCutReveal>
      <p className="text-[clamp(15px,1.6vw,17px)] text-white/80 leading-[1.55] mr-60 mt-24">
        Draft a reply, explain a contract, answer a question, all without
        leaving the app you&apos;re in. Press{" "}
        <span className="inline-flex items-center gap-[3px] align-middle">
          <KeyBadge small>⌥</KeyBadge>
          <KeyBadge small>D</KeyBadge>
        </span>{" "}
        to draft or{" "}
        <span className="inline-flex items-center gap-[3px] align-middle">
          <KeyBadge small>⌥</KeyBadge>
          <KeyBadge small>A</KeyBadge>
        </span>{" "}
        to ask.
      </p>
    </div>
  )

  if (staticLayout) {
    return (
      <section className="bg-[var(--primary)] p-[clamp(80px,12vh,140px)_clamp(28px,5vw,48px)]">
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
              <AskCard asking active onTrigger={() => {}} />
            </div>
          </div>
        </div>
      </section>
    )
  }

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
                onTrigger={triggerDraft}
              />
            </div>

            {/* Ask card — slides up on top, 40px lower */}
            <div
              ref={askCardRef}
              style={{
                position: "absolute",
                top: "70px",
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
