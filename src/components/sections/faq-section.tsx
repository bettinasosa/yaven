"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How is this different from ChatGPT or Claude?",
    a: (
      <>
        A chat box waits for you to drive it: you write the prompt, paste the
        context, copy the answer back. Yaven runs ahead of you. It already read
        the thread, knows the client, and queued the reply for your approval.
        And it remembers: who you know, how you write, what you always approve.
      </>
    )
  },
  {
    q: "What can Yaven see?",
    a: (
      <>
        Yaven accesses only the apps you connect: email, calendar, CRM, docs. It
        reads what it needs in the moment to draft or prioritize, and stores
        context locally on your Mac. Nothing is sent to third parties. The hard
        rule: Yaven never sends, files, or changes anything without your explicit
        approval. Every action waits for you.
      </>
    )
  },
  {
    q: "Is it Mac only?",
    a: (
      <>
        Yes, for now. Yaven is built native for macOS. Windows is coming; the
        waitlist is where you&apos;ll hear first.
      </>
    )
  },
  {
    q: "What does it connect to?",
    a: (
      <>
        Gmail, Google Calendar, LinkedIn, HubSpot, Salesforce, Notion, Granola,
        and more arriving through the beta.
      </>
    )
  },
  {
    q: "When do I get access?",
    a: (
      <>
        We onboard a small group every week, personally. Beta testers skip the
        waitlist.
      </>
    )
  }
]

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
            fontSize: "clamp(16px, 1.8vw, 20px)",
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
            fontSize: "clamp(14px, 1.4vw, 17px)",
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const staticLayout = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (staticLayout || !sectionRef.current) return
    const items = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-faq-item]")
    )
    gsap.set(items, { y: 30, opacity: 0 })

    const st = ScrollTrigger.create({
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

    return () => st.kill()
  }, [staticLayout])

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--primary)",
        padding:
          "clamp(80px, 12vh, 140px) clamp(28px, 5vw, 48px) clamp(24px, 4vh, 48px)"
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <ScrollCutReveal
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(32px, 4.5vw, 56px)",
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
          {FAQS.map((faq, i) => (
            <div key={i} data-faq-item>
              <FaqItem
                q={faq.q}
                a={faq.a}
                open={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
