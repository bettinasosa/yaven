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
    q: "So what actually is this?",
    a: (
      <>
        A second brain that lives in your Mac&apos;s menu bar. It connects to
        all of your inbound (telegram, imessage, slack, mail etc.), calendar,
        notes and docs, learns how you work, and builds a picture of your
        conversations, and commitments so nothing falls through the cracks.
        <br />
        <br />
        Right now it intelligently prioritises your inbox so the most critical
        messages are always at the top of your desk, drafts replies on one click
        in your voice from any app on your Mac, and preps you before every
        meeting. The more you use it, the more it handles on its own. Currently
        in beta.
      </>
    )
  },
  {
    q: "How is this different from ChatGPT or Claude?",
    a: (
      <>
        A chat box waits for you to drive it: you write the prompt, paste the
        context, copy the answer back. Yaven already read the thread, knows the
        client, and queued the reply before you opened it. You approve, it
        learns. The more you use it, the less you have to touch.
      </>
    )
  },
  {
    q: "Where does my data go?",
    a: (
      <>
        Yaven is local-first. Your emails, drafts, and the profile it builds
        stay on your Mac, not on our servers, not synced to a cloud. When you
        ask it to draft or answer, only the relevant text is sent to your
        existing model provider for that single request. Nothing is stored
        afterward. Yaven never sends, files, or changes anything without your
        explicit approval.
      </>
    )
  },
  {
    q: "I handle client data under NDA. Can I trust this?",
    a: (
      <>
        That&apos;s exactly why it&apos;s local-first. Your files and context
        never leave your machine unless you trigger a draft. When you do, only
        the relevant snippet goes to your existing model provider for that one
        request, nothing is retained. You control every action, every send.
      </>
    )
  },
  {
    q: "What does it connect to?",
    a: (
      <>
        Gmail, Google Calendar, Apple Calendar, iMessage, Telegram, Granola,
        Spotify, your files and docs. Many more integrations are coming through
        the beta.
      </>
    )
  },
  {
    q: "Is it Mac only?",
    a: (
      <>
        Yes, for now. Yaven is built native for macOS. Windows is on the
        roadmap.
      </>
    )
  },
  {
    q: "When do I get access?",
    a: (
      <>
        Yaven is in beta. We onboard a small group every week, personally. Join
        the waitlist and we&apos;ll reach out.
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
            {FAQS.map((faq, i) => (
              <div key={i} data-faq-item>
                <FaqItem
                  q={faq.q}
                  a={faq.a}
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
