"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

// Shared gooey filter for the Draft avatar and Ask bubbles
function GooFilterDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
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

const panelStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "24px",
  border: "var(--bd)",
  boxShadow: "var(--shadow)",
  padding: "clamp(24px, 4vw, 48px)",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
}

// Yaven avatar: plain blue circle with a white dot — calm, no goo.
function GooAvatar({ size = 34 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-block",
        flexShrink: 0,
        borderRadius: "50%",
        background: "var(--primary)"
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "22%",
          height: "22%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.85)"
        }}
      />
    </span>
  )
}

const emailCardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  border: "var(--bd)",
  boxShadow: "var(--shadow-sm)",
  padding: "12px 16px"
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
          color: "var(--warm)"
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
        way <em style={{ paddingRight: "0.12em" }}>you</em> write already in
        its head.
      </p>

      {/* Email thread — typing picks up mid-sentence */}
      <div
        style={{
          background: "#F6F1E6",
          borderRadius: "14px",
          border: "var(--bd)",
          padding: "clamp(14px, 2vw, 20px)",
          fontSize: "clamp(13px, 1.4vw, 15px)",
          lineHeight: 1.55,
          color: INK,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >
        {/* Thread subject bar */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "12px",
            paddingBottom: "8px",
            borderBottom: "1px solid rgba(10,14,26,0.08)"
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "clamp(13px, 1.4vw, 15px)" }}>
            Re: Otto&apos;s Bakehouse proposal
          </span>
          <span
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "10px",
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
            <span
              aria-hidden="true"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "var(--cream)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "13px",
                flexShrink: 0
              }}
            >
              S
            </span>
            <span style={{ fontWeight: 700 }}>Sarah Whitman</span>
            <span
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "10px",
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
        <div style={{ ...emailCardStyle, borderColor: "rgba(38,127,229,0.35)" }}>
          <div style={emailMetaStyle}>
            <GooAvatar size={30} />
            <span style={{ fontWeight: 700 }}>You</span>
            <span
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "10px",
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
                startText="Hi Sarah, good speaking earlier. "
                text="The revised numbers are attached, same scope we walked through but with the onboarding fee folded in. If it all looks right I can have the contract over to you by Thursday."
                speed={26}
              />
            ) : (
              <span>Hi Sarah, good speaking earlier. </span>
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
          background: "#F6F1E6",
          borderRadius: "14px",
          border: "var(--bd)",
          padding: "clamp(16px, 2.5vw, 24px)",
          flex: 1,
          minHeight: "230px",
          overflow: "hidden"
        }}
      >
        {/* The redlined contract you're reading — visibly never changes */}
        <div
          style={{
            opacity: 0.5,
            fontSize: "clamp(13px, 1.4vw, 15px)",
            lineHeight: 1.55,
            color: INK
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "11px",
              marginBottom: "10px"
            }}
          >
            Ottos_Bakehouse_Agreement_v3.pdf, returned with edits
          </div>
          <div style={{ marginBottom: "6px" }}>
            4.2 Payment due within{" "}
            <s style={{ opacity: 0.6 }}>thirty (30)</s>{" "}
            <strong>sixty (60)</strong> days of invoice date.
          </div>
          <div>
            4.3 <s style={{ opacity: 0.6 }}>
              A kill fee of 25% applies to work cancelled after commencement.
            </s>
          </div>
        </div>

        {/* Question + answer melt together under the gooey filter */}
        <div
          style={{
            position: "absolute",
            left: "clamp(16px, 2.5vw, 24px)",
            right: "clamp(16px, 2.5vw, 24px)",
            bottom: "clamp(16px, 2.5vw, 24px)"
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-6px",
              filter: "url(#yv-goo-cmd)"
            }}
          >
            {/* question bubble blob */}
            <div
              style={{
                position: "absolute",
                top: "6px",
                left: "6px",
                right: "6px",
                height: "46px",
                borderRadius: "23px",
                background: "var(--primary)"
              }}
            />
            {/* answer blob, stretching open below the question */}
            <div
              style={{
                position: "absolute",
                left: "6px",
                right: "6px",
                top: "58px",
                height: "46px",
                borderRadius: "23px",
                background: "#fff",
                transform: answered ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                transition: "transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1) 0.25s"
              }}
            />
          </div>

          {/* "Ask" tag so the popup reads as the command */}
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
              background: "#fff",
              border: "var(--bd)",
              boxShadow: "var(--shadow-sm)",
              color: "var(--primary)"
            }}
          >
            Ask
          </span>

          {/* crisp text above the goo */}
          <div
            style={{
              position: "relative",
              height: "46px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 16px",
              fontSize: "clamp(13px, 1.4vw, 15px)",
              fontWeight: 700,
              color: "#fff"
            }}
          >
            {/* Unmounted until the panel lands, so it resets on backscroll */}
            {active && (
              <Typewriter
                text="What changed from the version I sent?"
                speed={32}
                delay={400}
                onComplete={() => setAnswered(true)}
              />
            )}
          </div>
          <div
            style={{
              position: "relative",
              height: "46px",
              marginTop: "6px",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              fontSize: "clamp(13px, 1.4vw, 15px)",
              lineHeight: 1.4,
              color: INK,
              opacity: answered ? 1 : 0,
              transition: "opacity 0.4s ease 0.55s"
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
          opacity: 0.65,
          margin: 0
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

    // Draft panel settles in early; Ask peels over it and then dwells for
    // the rest of the pin so the question/answer beat has time to land.
    const enter = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "4% top", end: "22% top", scrub: 1.5 }
    })
    enter.fromTo(
      draftRef.current,
      { y: "60vh", opacity: 0 },
      { y: 0, opacity: 1, ease: "power3.out", duration: 1 }
    )
    if (enter.scrollTrigger) triggers.push(enter.scrollTrigger)

    const peel = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "38% top", end: "60% top", scrub: 1.5 }
    })
    peel.fromTo(
      askRef.current,
      { y: "110vh" },
      { y: 0, ease: "power3.out", duration: 1 },
      0
    )
    // Draft recedes into the deck — top edge stays visible behind Ask
    peel.to(
      draftRef.current,
      { y: -16, scale: 0.96, ease: "power2.out", duration: 1 },
      0
    )
    if (peel.scrollTrigger) triggers.push(peel.scrollTrigger)

    // Demo gates: typing starts when each panel lands and rewinds when you
    // scroll back above it.
    triggers.push(
      ScrollTrigger.create({
        trigger: wrapper,
        start: "20% top",
        onEnter: () => setDraftActive(true),
        onLeaveBack: () => setDraftActive(false)
      }),
      ScrollTrigger.create({
        trigger: wrapper,
        start: "58% top",
        onEnter: () => setAskActive(true),
        onLeaveBack: () => setAskActive(false)
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [staticLayout])

  const header = (
    <ScrollCutReveal
      className="yv-breathing"
      style={{
        fontFamily: "var(--font-instrument-serif)",
        fontSize: "clamp(40px, 6vw, 84px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        color: INK,
        margin: 0,
        textAlign: "center"
      }}
    >
      Two commands.
    </ScrollCutReveal>
  )

  // Reduced motion: plain stacked layout, no scrub theatre
  if (staticLayout) {
    return (
      <section
        style={{
          background: "var(--cream)",
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
          <div style={panelStyle}>
            <DraftPanel active />
          </div>
          <div style={panelStyle}>
            <AskPanel active />
          </div>
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height: "420vh", background: "var(--cream)" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(48px, 8vh, 90px) 24px 24px"
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
          <div
            ref={draftRef}
            style={{
              ...panelStyle,
              position: "absolute",
              inset: 0,
              maxHeight: "min(560px, 72vh)",
              opacity: 0
            }}
          >
            <DraftPanel active={draftActive} />
          </div>

          <div
            ref={askRef}
            style={{
              ...panelStyle,
              position: "absolute",
              top: "44px",
              left: 0,
              right: 0,
              bottom: 0,
              maxHeight: "min(560px, 72vh)",
              transform: "translateY(110vh)"
            }}
          >
            <AskPanel key={askActive ? "ask-on" : "ask-off"} active={askActive} />
          </div>
        </div>
      </div>
    </div>
  )
}
