"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { GooeyTabs } from "@/components/gooey-tabs"

gsap.registerPlugin(ScrollTrigger, SplitText)

const FEATURES = [
  {
    title: "Lives in your notch",
    body: "Always on, always context-aware. yaven sits in your menu bar and understands what you're working on — no briefing, no copy-paste, no context-switching."
  },
  {
    title: "Connects your tools",
    body: "Email, calendar, Slack, LinkedIn, HubSpot. yaven reads everything and joins the dots so you never have to explain yourself twice."
  },
  {
    title: "Takes action for you",
    body: "Drafts the email. Preps the brief. Researches the prospect. yaven doesn't suggest — it does."
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
const SANS = "var(--font-dm-sans), sans-serif"

export function LocomotiveSectionsND() {
  const statHeadRef = useRef<HTMLHeadingElement>(null)
  const statBodyRef = useRef<HTMLParagraphElement>(null)
  const blueWrapperRef = useRef<HTMLDivElement>(null)
  const featSectionRef = useRef<HTMLElement>(null)
  const featGridRef = useRef<HTMLDivElement>(null)
  const featLabelRef = useRef<HTMLParagraphElement>(null)
  const capSectionRef = useRef<HTMLElement>(null)
  const capLabelRef = useRef<HTMLParagraphElement>(null)
  const ctaLabelRef = useRef<HTMLParagraphElement>(null)
  const ctaHeadRef = useRef<HTMLHeadingElement>(null)
  const ctaBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const SMOOTH = "power3.out"

    const revealFrom = (
      el: Element | null,
      vars: gsap.TweenVars,
      delay = 0
    ) => {
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
        scrollTrigger: { trigger: statHeadRef.current, start: "top 82%" }
      })
    }

    revealFrom(statBodyRef.current, { y: 32 }, 0.1)

    // Section-card entrance — scrub border-radius as each card slides up
    const cardEnter = (
      el: HTMLElement | null,
      trigger: Element | null,
      endRadius = "40px 40px 0 0"
    ) => {
      if (!el) return
      gsap.fromTo(
        el,
        { borderRadius: "72px 72px 0 0" },
        {
          borderRadius: endRadius,
          ease: "none",
          scrollTrigger: {
            trigger: trigger ?? el,
            start: "top bottom",
            end: "top top",
            scrub: 1.2
          }
        }
      )
    }
    // Blue section goes fully edge-to-edge once sticky
    cardEnter(featSectionRef.current, blueWrapperRef.current, "0 0 0 0")
    // Capabilities card slides on top of the blue section
    cardEnter(capSectionRef.current, capSectionRef.current, "0 0 0 0")

    // Features — single timeline per card: enter(1) · pin(1) · exit(1)
    // fromTo inside a timeline sets the "from" state immediately on mount,
    // so cards are invisible+offscreen before any scrolling occurs.
    revealFrom(featLabelRef.current, { y: 16 })
    if (featGridRef.current && blueWrapperRef.current) {
      const cards = [
        ...featGridRef.current.querySelectorAll<HTMLElement>(".feat-card")
      ]
      const wrapper = blueWrapperRef.current

      const tl = (s: string, e: string) =>
        gsap.timeline({ scrollTrigger: { trigger: wrapper, start: s, end: e, scrub: 1.5 } })

      // Card 0 — 0%→42%: enter(1) pin(1) exit(1)
      tl("0% top", "42% top")
        .fromTo(cards[0], { y: "110vh", opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 1 })
        .to(cards[0], { y: 0, duration: 1 })
        .to(cards[0], { y: "-110vh", opacity: 0, duration: 1 })

      // Card 1 — 30%→72%: enter(1) pin(1) exit(1)
      tl("30% top", "72% top")
        .fromTo(cards[1], { y: "110vh", opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 1 })
        .to(cards[1], { y: 0, duration: 1 })
        .to(cards[1], { y: "-110vh", opacity: 0, duration: 1 })

      // Card 2 — 62%→92%: enter(1) pin(2) stays
      tl("62% top", "92% top")
        .fromTo(cards[2], { y: "110vh", opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 1 })
        .to(cards[2], { y: 0, duration: 2 })
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
      {/* ── 1 · Big statement — sticky with dwell time ──────────────────── */}
      <div style={{ position: "relative", height: "200vh" }}>
        <section
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "clamp(120px,16vh,220px) clamp(24px,7vw,120px)",
            background: "#ffffff",
            zIndex: 0,
            overflow: "hidden"
          }}
        >
          <div style={{ maxWidth: "960px" }}>
            <h2
              ref={statHeadRef}
              style={{
                fontFamily: SANS,
                fontSize: "clamp(60px, 9.5vw, 128px)",
                fontWeight: 500,
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
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: MUTE,
                margin: 0,
                maxWidth: "520px",
                opacity: 0
              }}
            >
              yaven automates the admin, drafts the emails, and keeps you in the
              loop — so you can focus on the work only you can do.
            </p>
          </div>
        </section>
      </div>

      {/* ── 2 · Features — tall wrapper keeps blue sticky ────────────────── */}
      <div
        ref={blueWrapperRef}
        style={{ position: "relative", height: "550vh", zIndex: 2 }}
      >
        <section
          ref={featSectionRef}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: BLUE,
            borderRadius: "72px 72px 0 0",
            overflow: "hidden",
            boxShadow: "0 -16px 64px rgba(0,0,0,0.22)"
          }}
        >
          {/* Label */}
          <p
            ref={featLabelRef}
            style={{
              position: "absolute",
              top: "clamp(40px,6vh,56px)",
              left: "clamp(40px,6vw,100px)",
              fontSize: "32px",
              fontWeight: 500,
              color: "rgba(227,213,187,0.55)",
              margin: 0,
              opacity: 0
            }}
          >
            How it works
          </p>

          {/* Square cards — absolutely positioned, alternating sides */}
          <div
            ref={featGridRef}
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            {FEATURES.map((f, i) => {
              const cardSize = "clamp(260px, 30vw, 380px)"
              const positions: React.CSSProperties =
                i === 0
                  ? { left: "clamp(48px, 7vw, 120px)", top: "8%" }
                  : i === 1
                    ? { right: "clamp(48px, 7vw, 120px)", top: "36%" }
                    : { left: "clamp(48px, 7vw, 120px)", top: "22%" }
              return (
                <div
                  key={f.title}
                  className="feat-card"
                  style={{
                    position: "absolute",
                    width: cardSize,
                    height: cardSize,
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "clamp(20px,2.4vw,32px)",
                    boxShadow:
                      "0 32px 80px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)",
                    opacity: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    ...positions
                  }}
                >
                  <h3
                    style={{
                      fontFamily: SANS,
                      fontSize: "clamp(22px, 2.6vw, 34px)",
                      fontWeight: 500,
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                      margin: 0,
                      color: INK
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: "clamp(14px, 1.3vw, 16px)",
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: MUTE,
                      margin: 0
                    }}
                  >
                    {f.body}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* ── 3 · Capabilities list — white card pins on top of blue ─────────── */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <section
          ref={capSectionRef}
          style={{
            position: "sticky",
            top: 0,
            background: "#ffffff",
            borderRadius: "72px 72px 0 0",
            padding:
              "clamp(80px,10vh,130px) clamp(24px,7vw,120px) clamp(80px,10vh,130px)",
            overflow: "hidden",
            boxShadow: "0 -16px 64px rgba(0,0,0,0.22)"
          }}
        >
          <p
            ref={capLabelRef}
            style={{
              fontFamily: SANS,
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTE,
              margin: "0 0 140px",
              opacity: 0
            }}
          >
            What yaven handles
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
                    gridTemplateColumns: "1fr auto",
                    gap: "clamp(24px, 4vw, 80px)",
                    alignItems: "baseline",
                    padding: "clamp(48px, 5vw, 72px) 0"
                  } as React.CSSProperties
                }
              >
                <span
                  className="u-hover-underline"
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(34px, 4.8vw, 62px)",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                    display: "inline-block"
                  }}
                >
                  {c.title}
                </span>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(16px, 1.6vw, 20px)",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: MUTE,
                    maxWidth: "360px",
                    textAlign: "right"
                  }}
                >
                  {c.desc}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 4 · CTA ──────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(160px,20vh,260px) clamp(24px,7vw,120px)",
          position: "relative",
          zIndex: 3,
          background: "#ffffff"
        }}
      >
        <div>
          <p
            ref={ctaLabelRef}
            style={{
              fontFamily: SANS,
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: BLUE,
              margin: "0 0 60px",
              opacity: 0
            }}
          >
            Early access
          </p>
          <h2
            ref={ctaHeadRef}
            style={{
              fontFamily: SANS,
              fontSize: "clamp(60px, 9vw, 122px)",
              fontWeight: 500,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              margin: "0 0 96px",
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

          <div style={{ marginTop: "clamp(80px, 10vh, 120px)" }}>
            <GooeyTabs />
          </div>
        </div>
      </section>
    </div>
  )
}
