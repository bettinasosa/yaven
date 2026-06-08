"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

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
    desc: "Replied, filed, or followed up. Using your tone, your context, your rules.",
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
    desc: "Not noise, just not now. Queued for when you have the headspace.",
    items: [
      { text: "AI Weekly digest", tag: "Friday" },
      { text: "Webinar invite: Q3 outlook", tag: "Next week" }
    ]
  }
]

function TriageCard({
  card
}: {
  card: (typeof CARDS)[number]
}) {
  const dark = "textDark" in card && card.textDark
  const textColor = dark ? "#0a0e1a" : "#fff"
  const chipBg = dark ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.15)"
  const tagColor = dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)"

  return (
    <div
      style={{
        background: card.bg,
        borderRadius: "28px",
        padding: "clamp(22px, 2.8vw, 32px)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        minHeight: "340px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <div style={{ marginBottom: "4px" }}>
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
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.03em",
              color: tagColor,
              whiteSpace: "nowrap",
              flexShrink: 0
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

  const sideText = (
    <div className="flex flex-col gap-6">
      <ScrollCutReveal
        className="text-[clamp(36px,5.5vw,76px)] font-medium tracking-[-0.02em] leading-[1.05] m-0"
        style={{ color: "#0a0e1a", fontFamily: "var(--font-instrument-serif)" }}
      >
        It knows what matters to you.
      </ScrollCutReveal>
      <p
        className="text-[clamp(15px,1.6vw,18px)] leading-[1.5] max-w-[480px]"
        style={{ color: "#0a0e1a", opacity: 0.7 }}
      >
        Five inboxes, one queue. Yaven understands the different versions of
        you, what to prioritize, when, and what actually needs your attention
        right now.
      </p>
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
