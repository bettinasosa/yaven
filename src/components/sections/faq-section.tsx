"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useCopy } from "@/content/copy-context"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

function FaqItem({
  q,
  a,
  open,
  onToggle
}: {
  q: string
  a: React.ReactNode
  open: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !innerRef.current) return
    const el = contentRef.current
    if (open) {
      const h = innerRef.current.scrollHeight
      el.style.height = `${h}px`
      el.style.opacity = "1"
    } else {
      el.style.height = "0px"
      el.style.opacity = "0"
    }
  }, [open])

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          padding: "clamp(20px, 2.5vh, 28px) 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left"
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "var(--fs-body-lg)",
            fontWeight: 600,
            color: "var(--cream)",
            lineHeight: 1.35
          }}
        >
          {q}
        </span>
        <span
          style={{
            fontSize: "24px",
            color: "var(--cream)",
            opacity: 0.5,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            lineHeight: 1
          }}
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          height: "0px",
          opacity: 0,
          overflow: "hidden",
          transition:
            "height 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease"
        }}
      >
        <div
          ref={innerRef}
          style={{
            paddingBottom: "clamp(20px, 2.5vh, 28px)",
            fontSize: "var(--fs-body)",
            fontWeight: 500,
            lineHeight: 1.65,
            color: "var(--cream)",
            opacity: 0.7,
            maxWidth: "600px"
          }}
        >
          {a}
        </div>
      </div>
    </div>
  )
}

export function FaqSection() {
  const { faq } = useCopy()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const staticLayout = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const pinWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const items = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-faq-item]")
    )

    // Reduced motion — ensure items are visible (clears any inline styles
    // left by a previous GSAP pass during the hydration race).
    if (staticLayout) {
      gsap.set(items, { clearProps: "all" })
      return
    }

    gsap.set(items, { y: 30, opacity: 0 })

    const triggers: ScrollTrigger[] = []

    // Stagger-reveal items
    triggers.push(
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out"
          })
        }
      })
    )

    // Pin the section briefly so users can read the FAQs
    if (pinWrapRef.current) {
      triggers.push(
        ScrollTrigger.create({
          trigger: pinWrapRef.current,
          start: "top top",
          end: "+=40%",
          pin: sectionRef.current,
          pinSpacing: true
        })
      )
    }

    return () => {
      triggers.forEach(t => t.kill())
      gsap.set(items, { clearProps: "all" })
    }
  }, [staticLayout])

  return (
    <div ref={pinWrapRef}>
      <section
        ref={sectionRef}
        style={{
          background: "var(--primary)",
          padding:
            "clamp(80px, 12vh, 140px) clamp(28px, 5vw, 48px) clamp(80px, 12vh, 140px)"
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <ScrollCutReveal
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--cream)",
              margin: "0 0 clamp(32px, 5vh, 56px)",
              textAlign: "left"
            }}
          >
            FAQ
          </ScrollCutReveal>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {faq.map((item, i) => (
              <div key={i} data-faq-item>
                <FaqItem
                  q={item.q}
                  a={item.a}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
