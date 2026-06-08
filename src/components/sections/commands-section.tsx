"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { GlassCard } from "@/components/effects/glass-card"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

// Shared gooey filter for the Draft avatar and Ask bubbles
function GooFilterDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="yv-goo-cmd">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

const panelContentStyle: React.CSSProperties = {
  padding: "clamp(28px, 4vw, 44px) clamp(28px, 4vw, 48px)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  height: "100%"
}

const panelGlassProps = {
  borderRadius: "34px",
  style: {
    willChange: "transform" as const,
    backfaceVisibility: "hidden" as const,
    background: "linear-gradient(-75deg, rgba(255,255,255,0.12), rgba(255,255,255,0.3), rgba(255,255,255,0.12))",
    backdropFilter: "blur(24px) saturate(1.2)",
    WebkitBackdropFilter: "blur(24px) saturate(1.2)"
  }
}

// Grainy gradient avatar
function GradientAvatar({
  size = 30,
  gradient = "linear-gradient(135deg, #6CB4EE 0%, #267FE5 40%, #1B4F9E 100%)",
  children
}: {
  size?: number
  gradient?: string
  children?: React.ReactNode
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        borderRadius: "50%",
        background: gradient,
        overflow: "hidden"
      }}
    >
      {/* Grain overlay via CSS noise */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
          opacity: 0.35,
          mixBlendMode: "overlay"
        }}
      />
      {children && (
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      )}
    </span>
  )
}


const emailCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.35)",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.4)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)",
  padding: "18px 24px"
}

const emailMetaStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px"
}

function DraftPanel({ active }: { active: boolean }) {
  return (
    <>
      <span
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(20px, 2.2vw, 26px)",
          lineHeight: 1,
          color: "var(--secondary)"
        }}
      >
        Draft
      </span>
      <p
        style={{
          fontSize: "clamp(17px, 1.9vw, 23px)",
          fontWeight: 500,
          lineHeight: 1.45,
          color: INK,
          margin: 0,
          maxWidth: "560px"
        }}
      >
        It writes where your cursor is - with the thread, the client, and the
        way <em style={{ paddingRight: "0.12em" }}>you</em> write already in its
        head.
      </p>

      {/* Email thread — typing picks up mid-sentence */}
      <div
        style={{
          background: "rgba(255,255,255,0.18)",
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
          padding: "clamp(20px, 3vw, 28px)",
          fontSize: "clamp(13px, 1.4vw, 15px)",
          lineHeight: 1.55,
          color: INK,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {/* Thread subject bar */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "12px",
            padding: "0 4px 4px"
          }}
        >
          <span
            style={{ fontWeight: 700, fontSize: "clamp(13px, 1.4vw, 15px)" }}
          >
            Re: Otto&apos;s Bakehouse proposal
          </span>
          <span
            style={{
              fontSize: "11px",
              opacity: 0.45,
              whiteSpace: "nowrap"
            }}
          >
            2 messages
          </span>
        </div>

        {/* Received message */}
        <div style={emailCardStyle}>
          <div style={emailMetaStyle}>
            <GradientAvatar
              size={30}
              gradient="linear-gradient(135deg, #A8D8EA 0%, #6CB4EE 50%, #4A90D9 100%)"
            >
              <span style={{ fontWeight: 700, fontSize: "12px", color: "#fff" }}>B</span>
            </GradientAvatar>
            <span style={{ fontWeight: 700 }}>Bettina</span>
            <span
              style={{
                fontSize: "11px",
                opacity: 0.45,
                marginLeft: "auto"
              }}
            >
              10:42
            </span>
          </div>
          <div style={{ opacity: 0.75 }}>
            Could you send over the revised numbers when you get a chance?
            We&apos;d like to move before the end of the month.
          </div>
        </div>

        {/* Your reply — Yaven picks up where the cursor stopped */}
        <div
          style={{
            ...emailCardStyle,
            border: "1px solid rgba(38,127,229,0.35)"
          }}
        >
          <div style={emailMetaStyle}>
            <GradientAvatar
              size={30}
              gradient="linear-gradient(135deg, #5BC0EB 0%, #267FE5 45%, #1B2F6E 100%)"
            >
              <span style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                display: "block"
              }} />
            </GradientAvatar>
            <span style={{ fontWeight: 700 }}>You</span>
            <span
              style={{
                fontSize: "11px",
                color: "var(--primary)",
                marginLeft: "auto"
              }}
            >
              drafting…
            </span>
          </div>
          <div>
            {/* Unmounted until the panel lands, so it resets on backscroll */}
            {active ? (
              <Typewriter
                startText="Hi Bettina, good speaking earlier. "
                text="The revised numbers are attached, same scope we walked through but with the onboarding fee folded in. If it all looks right I can have the contract over to you by Thursday."
                speed={5}
              />
            ) : (
              <span>Hi Bettina, good speaking earlier. </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// Remounted via `key` when the scroll gate flips, so the demo rewinds
// on backscroll.
function AskPanel({ active }: { active: boolean }) {
  const [answered, setAnswered] = useState(false)

  return (
    <>
      <span
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(20px, 2.2vw, 26px)",
          lineHeight: 1,
          color: "var(--primary)"
        }}
      >
        Ask
      </span>
      <p
        style={{
          fontSize: "clamp(17px, 1.9vw, 23px)",
          fontWeight: 500,
          lineHeight: 1.45,
          color: INK,
          margin: 0,
          maxWidth: "560px"
        }}
      >
        Question anything on your screen, without leaving it.
      </p>

      {/* The page you're reading, with the Ask popup over it */}
      <div
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.18)",
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
          padding: "clamp(22px, 3vw, 30px)",
          flex: 1,
          minHeight: "250px",
          overflow: "hidden"
        }}
      >
        {/* The redlined contract you're reading — visibly never changes */}
        <div
          style={{
            opacity: 0.5,
            fontSize: "clamp(13px, 1.4vw, 15px)",
            lineHeight: 1.55,
            color: INK,
            paddingBottom: "140px"
          }}
        >
          <div
            style={{
              fontSize: "12px",
              opacity: 0.7,
              marginBottom: "10px"
            }}
          >
            Ottos_Bakehouse_Agreement_v3.pdf, returned with edits
          </div>
          <div style={{ marginBottom: "6px" }}>
            4.2 Payment due within <s style={{ opacity: 0.6 }}>thirty (30)</s>{" "}
            <strong>sixty (60)</strong> days of invoice date.
          </div>
          <div>
            4.3{" "}
            <s style={{ opacity: 0.6 }}>
              A kill fee of 25% applies to work cancelled after commencement.
            </s>
          </div>
        </div>

        {/* Ask popup — question + answer */}
        <div
          style={{
            position: "absolute",
            left: "clamp(18px, 2.5vw, 26px)",
            right: "clamp(18px, 2.5vw, 26px)",
            bottom: "clamp(18px, 2.5vw, 26px)",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          {/* Question bubble with "Ask" tag overlapping its top edge */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: "-10px",
                left: "14px",
                zIndex: 1,
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "13px",
                lineHeight: 1,
                padding: "4px 10px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                color: "var(--primary)"
              }}
            >
              Ask
            </span>
            <div
              style={{
                height: "46px",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                borderRadius: "23px",
                background: "var(--primary)",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                fontWeight: 700,
                color: "#fff"
              }}
            >
            {active && (
              <Typewriter
                text="What changed from the version I sent?"
                speed={6}
                delay={200}
                onComplete={() => setAnswered(true)}
              />
            )}
            </div>
          </div>

          {/* Answer bubble */}
          <div
            style={{
              height: "46px",
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              borderRadius: "23px",
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.35)",
              fontSize: "clamp(13px, 1.4vw, 15px)",
              lineHeight: 1.4,
              color: INK,
              opacity: answered ? 1 : 0,
              transform: answered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transition: "transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) 0.2s, opacity 0.3s ease 0.2s"
            }}
          >
            Payment terms: 30 → 60 days. The kill fee in §4 is gone.
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: "clamp(14px, 1.5vw, 17px)",
          fontWeight: 500,
          color: INK,
          opacity: 0.55,
          margin: 0,
          marginTop: "auto",
          paddingTop: "8px"
        }}
      >
        Read the redlines before your coffee cooled.
      </p>
    </>
  )
}

// Script §3 — Two commands (Draft + Ask). Set piece: stacking panels.
export function CommandsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const draftRef = useRef<HTMLDivElement>(null)
  const askRef = useRef<HTMLDivElement>(null)
  const [draftActive, setDraftActive] = useState(false)
  const [askActive, setAskActive] = useState(false)
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    const wrapper = wrapperRef.current
    const triggers: ScrollTrigger[] = []

    // Draft card — scrub in smoothly
    const draftTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "5% top",
        end: "20% top",
        scrub: 1
      }
    })
    draftTl.fromTo(
      draftRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, ease: "none", force3D: true }
    )
    triggers.push(draftTl.scrollTrigger!)

    // Activate draft typewriter
    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "15% top",
        onEnter: () => setDraftActive(true),
        onLeaveBack: () => setDraftActive(false)
      })
    )

    // Ask card stacks — push start much later so draft stays solo longer
    const askTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "60% top",
        end: "78% top",
        scrub: 1
      }
    })
    askTl.to(
      draftRef.current,
      { y: -16, scale: 0.96, ease: "none", force3D: true },
      0
    )
    askTl.fromTo(
      askRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, ease: "none", force3D: true },
      0
    )
    triggers.push(askTl.scrollTrigger!)

    // Activate ask typewriter
    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "68% top",
        onEnter: () => setAskActive(true),
        onLeaveBack: () => setAskActive(false)
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [staticLayout])

  const header = (
    <ScrollCutReveal
      className=""
      style={{
        fontFamily: "var(--font-instrument-serif)",
        fontSize: "clamp(40px, 6vw, 84px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        color: "#fff",
        margin: 0,
        textAlign: "center"
      }}
    >
      Yaven drafts anywhere.
    </ScrollCutReveal>
  )

  // Reduced motion: plain stacked layout, no scrub theatre
  if (staticLayout) {
    return (
      <section
        style={{
          background: "#267FE5",
          padding: "clamp(80px, 12vh, 140px) 24px"
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "40px"
          }}
        >
          <GooFilterDefs />
          {header}
          <GlassCard {...panelGlassProps}>
            <div style={panelContentStyle}>
              <DraftPanel active />
            </div>
          </GlassCard>
          <GlassCard {...panelGlassProps}>
            <div style={panelContentStyle}>
              <AskPanel active />
            </div>
          </GlassCard>
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className="hero-grain"
      style={{ position: "relative", height: "450vh", background: "#267FE5", ["--grain-opacity" as string]: 0.1 }}
    >
      {/* Bottom blur fade-out into next section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(38,127,229,0.95) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(48px, 8vh, 90px) 24px 24px",
          zIndex: 2
        }}
      >
        <GooFilterDefs />
        {header}

        {/* Panel stage */}
        <div
          style={{
            position: "relative",
            width: "min(960px, 100%)",
            flex: 1,
            marginTop: "clamp(32px, 6vh, 64px)"
          }}
        >
          <GlassCard
            {...panelGlassProps}
            ref={draftRef}
            style={{
              ...panelGlassProps.style,
              position: "absolute",
              inset: 0,
              maxHeight: "min(560px, 72vh)",
              opacity: 0
            }}
          >
            <div style={panelContentStyle}>
              <DraftPanel active={draftActive} />
            </div>
          </GlassCard>

          <GlassCard
            {...panelGlassProps}
            ref={askRef}
            style={{
              ...panelGlassProps.style,
              position: "absolute",
              top: "44px",
              left: 0,
              right: 0,
              bottom: 0,
              maxHeight: "min(560px, 72vh)",
              transform: "translateY(120px)",
              opacity: 0
            }}
          >
            <div style={panelContentStyle}>
              <AskPanel active={askActive} />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
