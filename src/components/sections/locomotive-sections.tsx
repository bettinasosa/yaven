"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"

gsap.registerPlugin(ScrollTrigger, SplitText)

const FEATURES = [
  {
    num: "01",
    title: "Lives in your notch",
    body: "Always on, always context-aware. Yaven sits in your menu bar and understands what you're working on — no briefing, no copy-paste, no context-switching."
  },
  {
    num: "02",
    title: "Connects your tools",
    body: "Email, calendar, Slack, LinkedIn, HubSpot. Yaven reads everything and joins the dots so you never have to explain yourself twice."
  },
  {
    num: "03",
    title: "Takes action for you",
    body: "Drafts the email. Preps the brief. Researches the prospect. Yaven doesn't suggest — it does."
  }
]

const CAPABILITIES = [
  {
    num: "01",
    title: "Networking follow-ups",
    desc: "Log every contact from an event, find their profiles, draft a personal message for each."
  },
  {
    num: "02",
    title: "Meeting prep",
    desc: "One-page brief with talking points, ready before you dial in."
  },
  {
    num: "03",
    title: "Prospect research",
    desc: "100 qualified leads in your CRM by EOD, each message sounding like you wrote it."
  },
  {
    num: "04",
    title: "Email drafting",
    desc: "Context-aware drafts that match your voice and the thread history."
  },
  {
    num: "05",
    title: "Sector briefs",
    desc: "Earnings calls, filings, news — structured into an exec summary in minutes."
  },
  {
    num: "06",
    title: "CRM hygiene",
    desc: "Contacts enriched, notes synced, pipeline updated — without you touching it."
  },
  {
    num: "07",
    title: "Calendar management",
    desc: "Scheduling, rescheduling, prep reminders. Your calendar runs itself."
  }
]

const INK = "#0a0e1a"
const MUTE = "rgba(10,14,26,0.42)"
const BLUE = "#267FE5"
const MONO = "var(--font-space-mono), monospace"
const SANS = "var(--font-dm-sans), sans-serif"

export function LocomotiveSections() {
  const statHeadRef = useRef<HTMLHeadingElement>(null)
  const statBodyRef = useRef<HTMLParagraphElement>(null)
  const featGridRef = useRef<HTMLDivElement>(null)
  const featLabelRef = useRef<HTMLParagraphElement>(null)
  const capLabelRef = useRef<HTMLParagraphElement>(null)
  const ctaLabelRef = useRef<HTMLParagraphElement>(null)
  const ctaHeadRef = useRef<HTMLHeadingElement>(null)
  const ctaBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const SMOOTH = "power3.out"

    const revealFrom = (el: Element | null, vars: gsap.TweenVars, delay = 0) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, ...vars },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.9,
          ease: SMOOTH,
          delay,
          scrollTrigger: { trigger: el, start: "top 84%" }
        }
      )
    }

    // Big statement heading — SplitText char animation (CodePen MYyBrZw pattern)
    if (statHeadRef.current) {
      gsap.set(statHeadRef.current, { opacity: 1 })
      const split = new SplitText(statHeadRef.current, { type: "chars,words" })
      gsap.from(split.chars, {
        yPercent: 130,
        opacity: 0,
        stagger: 0.035,
        duration: 0.9,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: statHeadRef.current, start: "top 82%" },
      })
    }

    revealFrom(statBodyRef.current, { y: 32 }, 0.1)

    // Features
    revealFrom(featLabelRef.current, { y: 20 })
    if (featGridRef.current) {
      const cards = featGridRef.current.querySelectorAll<HTMLElement>(".feat-card")
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: SMOOTH,
          stagger: 0.12,
          scrollTrigger: { trigger: featGridRef.current, start: "top 80%" }
        }
      )
    }

    // Capabilities label
    revealFrom(capLabelRef.current, { y: 20 })

    // CTA
    revealFrom(ctaLabelRef.current, { y: 20 })
    revealFrom(ctaHeadRef.current, { y: 60 }, 0.08)
    revealFrom(ctaBtnRef.current, { y: 28 }, 0.2)
  }, [])

  const capListRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!capListRef.current) return
    ScrollTrigger.create({
      trigger: capListRef.current,
      start: "top 80%",
      onEnter: () => capListRef.current?.classList.add("is-inview"),
      onLeaveBack: () => capListRef.current?.classList.remove("is-inview")
    })
  }, [])

  return (
    <div style={{ background: "#fff", color: INK }}>
      {/* ── 1 · Big statement ────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(120px,16vh,220px) clamp(24px,7vw,120px)",
          background: "linear-gradient(to bottom, transparent 0%, #ffffff 28%)",
        }}
      >
        <div style={{ maxWidth: "960px" }}>
          <h2
            ref={statHeadRef}
            style={{
              fontFamily: SANS,
              fontSize: "clamp(46px, 7.5vw, 96px)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              margin: "0 0 56px",
              opacity: 0
            }}
          >
            The boring half
            <br />
            of your day,
            <br />
            handled.
          </h2>
          <p
            ref={statBodyRef}
            style={{
              fontFamily: SANS,
              fontSize: "clamp(16px, 1.8vw, 21px)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: MUTE,
              margin: 0,
              maxWidth: "520px",
              opacity: 0
            }}
          >
            Yaven automates the admin, drafts the emails, and keeps you in the
            loop — so you can focus on the work only you can do.
          </p>
        </div>
      </section>

      {/* ── 2 · Three features ───────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(120px,15vh,200px) clamp(24px,7vw,120px)",
        }}
      >
        <p
          ref={featLabelRef}
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: MUTE,
            margin: "0 0 100px",
            opacity: 0
          }}
        >
          How it works
        </p>
        <div
          ref={featGridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(64px, 8vw, 128px)"
          }}
        >
          {FEATURES.map((f) => (
            <div key={f.num} className="feat-card" style={{ opacity: 0 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: BLUE,
                  display: "block",
                  marginBottom: "36px"
                }}
              >
                {f.num}
              </span>
              <h3
                className="u-hover-underline"
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(22px, 2.6vw, 30px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                  margin: "0 0 24px",
                  display: "inline-block"
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: MUTE,
                  margin: 0
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3 · Capabilities list ────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(120px,15vh,200px) clamp(24px,7vw,120px)",
        }}
      >
        <p
          ref={capLabelRef}
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: MUTE,
            margin: "0 0 100px",
            opacity: 0
          }}
        >
          What Yaven handles
        </p>

        <div ref={capListRef}>
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.num}
              className="loco-list-item"
              style={
                {
                  "--index": i,
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 1fr",
                  gap: "clamp(16px, 3.5vw, 56px)",
                  alignItems: "baseline",
                  padding: "clamp(36px, 4vw, 52px) 0"
                } as React.CSSProperties
              }
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.10em",
                  color: MUTE
                }}
              >
                {c.num}
              </span>
              <span
                className="u-hover-underline"
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(17px, 2vw, 22px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  display: "inline-block"
                }}
              >
                {c.title}
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: MUTE
                }}
              >
                {c.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4 · CTA ──────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(120px,15vh,200px) clamp(24px,7vw,120px)",
        }}
      >
        <div>
          <p
            ref={ctaLabelRef}
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: BLUE,
              margin: "0 0 52px",
              opacity: 0
            }}
          >
            Early access
          </p>
          <h2
            ref={ctaHeadRef}
            style={{
              fontFamily: SANS,
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              margin: "0 0 72px",
              opacity: 0
            }}
          >
            Less admin.
            <br />
            More focus.
          </h2>
          <div ref={ctaBtnRef} style={{ opacity: 0 }}>
            <BlueprintPanel />
          </div>
        </div>
      </section>
    </div>
  )
}
