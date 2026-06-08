"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

function AppIcon({ name, tilt }: { name: string; tilt: number }) {
  const [hovered, setHovered] = useState(false)
  return (
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
        background: "rgba(10,14,26,0.07)",
        border: "1px solid rgba(10,14,26,0.08)",
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
        style={{ objectFit: "contain" }}
      />
    </span>
  )
}

const CARDS = [
  {
    label: "Needs you now",
    bg: "var(--primary)",
    desc: "Things only you can handle. Yaven knows the difference between urgent and just loud.",
    items: [
      { text: "Can we move Thursday's call?", tag: "Client" },
      { text: "Intro: Maya ↔ you", tag: "Warm lead" },
      { text: "Contract redlines from legal", tag: "Deadline" }
    ]
  },
  {
    label: "Already handled",
    bg: "#df4f3e",
    desc: "Replied, filed, or followed up using your tone, context, and rules.",
    items: [
      { text: "Re: proposal timeline?", tag: "✓ replied" },
      { text: "Invoice #214 overdue", tag: "✓ nudged" },
      { text: "Meeting recap sent", tag: "✓ drafted" },
      { text: "Receipt filed to expenses", tag: "✓ sorted" }
    ]
  },
  {
    label: "Can wait",
    bg: "#ebc1ff",
    textDark: true,
    desc: "Queued for when you have the headspace.",
    items: [
      { text: "AI Weekly digest", tag: "Friday" },
      { text: "Webinar invite: Q3 outlook", tag: "Next week" }
    ]
  }
]

function TriageCard({ card }: { card: (typeof CARDS)[number] }) {
  const dark = "textDark" in card && card.textDark
  const textColor = dark ? "#0a0e1a" : "#fff"
  const chipBg = dark ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)"
  const tagColor = dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)"

  return (
    <div
      style={{
        background: card.bg,
        borderRadius: "28px",
        padding: "clamp(28px, 3.5vw, 40px)",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        minHeight: "340px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ marginBottom: "auto" }}>
        <div
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(20px, 2.2vw, 26px)",
            fontWeight: 500,
            lineHeight: 1.15,
            color: textColor
          }}
        >
          {card.label}
        </div>
        <p
          style={{
            fontSize: "clamp(13px, 1.3vw, 15px)",
            fontWeight: 400,
            lineHeight: 1.45,
            color: textColor,
            opacity: 0.65,
            margin: "8px 0 0"
          }}
        >
          {card.desc}
        </p>
      </div>

      {card.items.map(item => (
        <div
          key={item.text}
          style={{
            padding: "10px 14px",
            borderRadius: "14px",
            background: chipBg,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <span
            style={{
              fontSize: "clamp(13px, 1.3vw, 14px)",
              fontWeight: 500,
              color: textColor,
              opacity: 0.9,
              lineHeight: 1.35
            }}
          >
            {item.text}
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: dark ? "#0a0e1a" : "#fff",
              whiteSpace: "nowrap",
              flexShrink: 0,
              padding: "3px 8px",
              borderRadius: "6px",
              background: dark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"
            }}
          >
            {item.tag}
          </span>
        </div>
      ))}
    </div>
  )
}

export function TriageSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    const wrapper = wrapperRef.current
    const triggers: ScrollTrigger[] = []

    gsap.set(contentRef.current, { opacity: 1 })

    // Card 1 — slides up
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "0% top",
        end: "12% top",
        scrub: true
      }
    })
    tl1.fromTo(
      cardRefs.current[0],
      { y: "100vh", rotation: 5 },
      { y: 0, rotation: 0, ease: "none", force3D: true }
    )
    triggers.push(tl1.scrollTrigger!)

    // Card 2 — stacks on top
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "30% top",
        end: "46% top",
        scrub: true
      }
    })
    tl2.fromTo(
      cardRefs.current[1],
      { y: "100vh", rotation: -4 },
      { y: 0, rotation: 0, ease: "none", force3D: true }
    )
    triggers.push(tl2.scrollTrigger!)

    // Card 3 — stacks on top
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "60% top",
        end: "76% top",
        scrub: true
      }
    })
    tl3.fromTo(
      cardRefs.current[2],
      { y: "100vh", rotation: 3 },
      { y: 0, rotation: 0, ease: "none", force3D: true }
    )
    triggers.push(tl3.scrollTrigger!)

    return () => triggers.forEach(t => t.kill())
  }, [staticLayout])

  // Animate underlines when they scroll into view
  const textWrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!textWrapRef.current) return
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
  }, [])

  const appIcon = (name: string, tilt = 0) => (
    <AppIcon name={name} tilt={tilt} />
  )

  const underline = (text: string) => (
    <span className="triage-underline">{text}</span>
  )

  const bodyStyle: React.CSSProperties = {
    fontSize: "clamp(15px, 1.6vw, 18px)",
    lineHeight: 1.55,
    color: "#0a0e1a",
    opacity: 0.75,
    margin: 0
  }

  const sideText = (
    <div ref={textWrapRef} className="flex flex-col gap-6">
      <ScrollCutReveal
        className="text-[clamp(36px,5.5vw,76px)] font-medium tracking-[-0.02em] leading-[1.05] m-0"
        style={{ color: "#0a0e1a", fontFamily: "var(--font-instrument-serif)" }}
      >
        Yaven knows what matters.
      </ScrollCutReveal>

      <div className="flex flex-col gap-7 max-w-[480px]">
        <p style={bodyStyle}>
          Your {appIcon("gmail", -3)} email, {appIcon("linkedin", 2)} messages,{" "}
          {appIcon("google", -2)} calendar, {appIcon("hubspot", 3)} CRM,{" "}
          {appIcon("notion", -1)} docs, all flowing into {underline("one queue")}
          .
        </p>

        <p style={bodyStyle}>
          It knows the difference between {underline("work and personal")},
          reads your context, and prioritizes what actually needs your attention
          right now.
        </p>

        <p style={bodyStyle}>
          Yaven handles what it can, drafts what it can&apos;t, and{" "}
          {underline("never sends anything without your approval")}.
        </p>
      </div>
    </div>
  )

  if (staticLayout) {
    return (
      <section
        style={{
          background: "var(--cream)",
          padding: "clamp(80px, 12vh, 140px) clamp(28px, 5vw, 48px)"
        }}
      >
        <div
          className="max-w-[1100px] mx-auto grid items-start gap-[clamp(40px,6vw,80px)]"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
          }}
        >
          <div className="flex flex-col gap-6" style={{ maxWidth: "440px" }}>
            {CARDS.map(card => (
              <TriageCard key={card.label} card={card} />
            ))}
          </div>
          {sideText}
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: "500vh", background: "var(--cream)" }}
    >
      <div
        className="sticky top-0 h-screen overflow-visible flex items-center z-2"
        style={{ padding: "clamp(28px, 4vh, 60px) clamp(28px, 5vw, 48px)" }}
      >
        <div
          ref={contentRef}
          className="w-full max-w-[1100px] mx-auto grid items-start gap-[clamp(40px,6vw,80px)]"
          style={{
            gridTemplateColumns: "1fr 1.4fr",
            opacity: 0
          }}
        >
          {/* Card column — stacking, on the left */}
          <div
            className="relative"
            style={{
              width: "100%",
              maxWidth: "440px",
              height: "540px"
            }}
          >
            {CARDS.map((card, i) => (
              <div
                key={card.label}
                ref={el => {
                  cardRefs.current[i] = el
                }}
                style={{
                  position: "absolute",
                  top: `${i * 60}px`,
                  left: 0,
                  right: 0,
                  zIndex: i + 1,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  transformOrigin: "center bottom",
                  transform: "translateZ(0) translateY(100vh)"
                }}
              >
                <TriageCard card={card} />
              </div>
            ))}
          </div>

          {/* Text column — on the right */}
          <div>{sideText}</div>
        </div>
      </div>
    </div>
  )
}
