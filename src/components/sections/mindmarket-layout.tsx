"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"

gsap.registerPlugin(ScrollTrigger, SplitText)

/* ── Palette ───────────────────────────────────────────────────────── */
const BLUE = "#267FE5"
const INK = "#0a0e1a"
const CREAM = "#E3D5BB"
const MUTE = "rgba(10,14,26,0.42)"
const SANS = "var(--font-dm-sans), sans-serif"
const MONO = "var(--font-space-mono)"

/* ── Content ───────────────────────────────────────────────────────── */
const VALUE_PROPS = [
  {
    title: "No more context-switching",
    body: "yaven lives in your notch — always on, always aware of what you're working on. No briefing, no copy-paste."
  },
  {
    title: "One inbox for everything",
    body: "Email, calendar, Slack, LinkedIn, CRM — all connected, all understood. You never explain yourself twice."
  },
  {
    title: "Knows your voice",
    body: "Learns your style, your tone, your preferences. Every draft sounds like you wrote it yourself."
  },
  {
    title: "Does, not suggests",
    body: "Drafts the email. Preps the brief. Researches the prospect. yaven takes action — not just suggestions."
  }
]

const STATS = [
  { value: "7+", label: "capabilities handled" },
  { value: "6+", label: "tool integrations" },
  { value: "24/7", label: "always available" }
]

const CAPABILITIES = [
  { num: "01", title: "Networking follow-ups", desc: "Log every contact from an event, find their profiles, draft a personal message for each." },
  { num: "02", title: "Meeting prep", desc: "One-page brief with talking points, ready before you dial in." },
  { num: "03", title: "Prospect research", desc: "100 qualified leads in your CRM by EOD, each message sounding like you wrote it." },
  { num: "04", title: "Email drafting", desc: "Context-aware drafts that match your voice and the thread history." },
  { num: "05", title: "Sector briefs", desc: "Earnings calls, filings, news — structured into an exec summary in minutes." },
  { num: "06", title: "CRM hygiene", desc: "Contacts enriched, notes synced, pipeline updated — without you touching it." },
  { num: "07", title: "Calendar management", desc: "Scheduling, rescheduling, prep reminders. Your calendar runs itself." }
]

/* ── Loader tracking ───────────────────────────────────────────────── */
let _loaderFired = false
if (typeof window !== "undefined") {
  window.addEventListener("yaven:loader:done", () => { _loaderFired = true }, { once: true })
}

/* ═══════════════════════════════════════════════════════════════════ */

export function MindMarketLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const midPathRef = useRef<SVGPathElement>(null)
  const mainPathRef = useRef<SVGPathElement>(null)

  // Hero
  const heroNavRef = useRef<HTMLDivElement>(null)
  const heroH1Ref = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroCtaRef = useRef<HTMLDivElement>(null)

  // Value props
  const vpWrapperRef = useRef<HTMLDivElement>(null)
  const vpRefs = useRef<(HTMLDivElement | null)[]>([])

  // Stats
  const statsSectionRef = useRef<HTMLElement>(null)
  const statsHeadRef = useRef<HTMLHeadingElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[]>([])

  // Capabilities
  const capWrapperRef = useRef<HTMLDivElement>(null)
  const capHeadRef = useRef<HTMLHeadingElement>(null)
  const capRefs = useRef<(HTMLDivElement | null)[]>([])

  // CTA
  const ctaHeadRef = useRef<HTMLHeadingElement>(null)
  const ctaSubRef = useRef<HTMLParagraphElement>(null)
  const ctaBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())

    const ctx = gsap.context(() => {

      /* ─────────────────────────────────────────────────────
         THREAD — 3 layered SVG paths (glow → mid → main)
         MindMarket uses three layered paths with the
         secondary path rendering above the gradient shadow.
         ───────────────────────────────────────────────────── */
      const buildThread = () => {
        const container = containerRef.current
        const svg = svgRef.current
        const glow = glowPathRef.current
        const mid = midPathRef.current
        const main = mainPathRef.current
        if (!container || !svg || !glow || !mid || !main) return

        const w = container.offsetWidth
        const h = container.scrollHeight
        svg.setAttribute("viewBox", `0 0 ${w} ${h}`)
        svg.style.height = `${h}px`

        // Build an organic S-curve path
        const cx = w * 0.5
        const amp = Math.min(w * 0.32, 360)
        const segs = 8
        const segH = h / segs

        let d = `M ${cx} 0`
        for (let i = 0; i < segs; i++) {
          const dir = i % 2 === 0 ? -1 : 1
          const y1 = i * segH
          const y2 = (i + 1) * segH
          d += ` C ${cx + dir * amp} ${y1 + segH * 0.33}, ${cx - dir * amp} ${y1 + segH * 0.66}, ${cx} ${y2}`
        }

        // Apply same path to all 3 layers
        ;[glow, mid, main].forEach(p => p.setAttribute("d", d))

        // Animate all 3 layers together
        ;[glow, mid, main].forEach(p => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(p, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: 1
            }
          })
        })
      }
      setTimeout(buildThread, 300)

      /* ─────────────────────────────────────────────────────
         HERO — staggered entrance + parallax exit
         ───────────────────────────────────────────────────── */
      gsap.set(heroNavRef.current, { y: -40, opacity: 0 })
      gsap.set(heroH1Ref.current, { y: 80, opacity: 0 })
      gsap.set(heroSubRef.current, { y: 50, opacity: 0 })
      gsap.set(heroCtaRef.current, { y: 30, opacity: 0 })

      const animateHero = () => {
        gsap.to(heroNavRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 })
        gsap.to(heroH1Ref.current, { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.25 })
        gsap.to(heroSubRef.current, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.45 })
        gsap.to(heroCtaRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 })
      }

      if (_loaderFired) animateHero()
      else window.addEventListener("yaven:loader:done", animateHero, { once: true })

      // Parallax exit — hero elements drift as user scrolls away
      gsap.to(heroH1Ref.current, {
        y: -60, opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: heroH1Ref.current, start: "top top", end: "bottom top-=200", scrub: 1 }
      })
      gsap.to(heroSubRef.current, {
        y: -40, opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: heroSubRef.current, start: "top top+=100", end: "bottom top-=100", scrub: 1 }
      })
      gsap.to(heroCtaRef.current, {
        y: -30, opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: heroCtaRef.current, start: "top top+=200", end: "bottom top", scrub: 1 }
      })

      /* ─────────────────────────────────────────────────────
         VALUE PROPS — scrub-driven stagger with parallax
         Each column at a different speed for depth.
         ───────────────────────────────────────────────────── */
      vpRefs.current.forEach((el, i) => {
        if (!el) return
        // Scrub entrance: each column has a slightly different y-offset
        const yStart = 120 + i * 30
        gsap.fromTo(el,
          { y: yStart, opacity: 0 },
          {
            y: 0, opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: vpWrapperRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1.2
            }
          }
        )
      })

      /* ─────────────────────────────────────────────────────
         STATS — scrub-driven scale + reveal
         Numbers scale up from small as user scrolls in.
         ───────────────────────────────────────────────────── */
      if (statsHeadRef.current) {
        gsap.fromTo(statsHeadRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: statsSectionRef.current, start: "top 80%", end: "top 55%", scrub: 1 }
          }
        )
      }
      statRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: 80, opacity: 0, scale: 0.85 },
          {
            y: 0, opacity: 1, scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsSectionRef.current,
              start: `top ${70 - i * 5}%`,
              end: `top ${40 - i * 5}%`,
              scrub: 1.2
            }
          }
        )
      })

      /* ─────────────────────────────────────────────────────
         CAPABILITIES — SplitText heading + scrub cards
         Cards slide up with slight rotation that straightens.
         ───────────────────────────────────────────────────── */
      if (capHeadRef.current) {
        gsap.set(capHeadRef.current, { opacity: 1 })
        const split = new SplitText(capHeadRef.current, { type: "chars,words" })
        gsap.from(split.chars, {
          yPercent: 120, opacity: 0,
          stagger: 0.025, duration: 0.7, ease: "back.out(1.7)",
          scrollTrigger: { trigger: capHeadRef.current, start: "top 82%" }
        })
      }

      capRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: 100, opacity: 0, rotateX: 6 },
          {
            y: 0, opacity: 1, rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: capWrapperRef.current,
              start: `top ${75 - i * 4}%`,
              end: `top ${45 - i * 4}%`,
              scrub: 1
            }
          }
        )
      })

      /* ─────────────────────────────────────────────────────
         CTA — SplitText heading + scrub entrance
         ───────────────────────────────────────────────────── */
      if (ctaHeadRef.current) {
        gsap.set(ctaHeadRef.current, { opacity: 1 })
        const split = new SplitText(ctaHeadRef.current, { type: "chars,words" })
        gsap.from(split.chars, {
          yPercent: 100, opacity: 0,
          stagger: 0.02, duration: 0.7, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ctaHeadRef.current, start: "top 82%" }
        })
      }
      gsap.fromTo(ctaSubRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: ctaSubRef.current, start: "top 88%", end: "top 65%", scrub: 1 } }
      )
      gsap.fromTo(ctaBtnRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: ctaBtnRef.current, start: "top 90%", end: "top 70%", scrub: 1 } }
      )

    }, containerRef)

    return () => { ctx.revert() }
  }, [])

  /* ═══════════════════════════════════════════════════════════════ */

  return (
    <div ref={containerRef} style={{ position: "relative" }}>

      {/* ── Thread SVG — 3 layered paths ────────────────── */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 50,
          overflow: "visible"
        }}
        fill="none"
      >
        <defs>
          {/* Gradient that adapts to section backgrounds */}
          <linearGradient id="mm-thread-main" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CREAM} stopOpacity="0.9" />
            <stop offset="18%" stopColor={CREAM} stopOpacity="0.7" />
            <stop offset="22%" stopColor={BLUE} stopOpacity="0.5" />
            <stop offset="50%" stopColor={BLUE} stopOpacity="0.4" />
            <stop offset="75%" stopColor={BLUE} stopOpacity="0.5" />
            <stop offset="85%" stopColor={CREAM} stopOpacity="0.6" />
            <stop offset="100%" stopColor={CREAM} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="mm-thread-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CREAM} stopOpacity="0.4" />
            <stop offset="20%" stopColor={CREAM} stopOpacity="0.25" />
            <stop offset="25%" stopColor={BLUE} stopOpacity="0.15" />
            <stop offset="75%" stopColor={BLUE} stopOpacity="0.15" />
            <stop offset="80%" stopColor={CREAM} stopOpacity="0.25" />
            <stop offset="100%" stopColor={CREAM} stopOpacity="0.2" />
          </linearGradient>
          <filter id="thread-blur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        {/* Layer 1: Glow / shadow — wide, blurred */}
        <path
          ref={glowPathRef}
          stroke="url(#mm-thread-glow)"
          strokeWidth="20"
          strokeLinecap="round"
          filter="url(#thread-blur)"
        />
        {/* Layer 2: Mid path — softer, medium width */}
        <path
          ref={midPathRef}
          stroke="url(#mm-thread-main)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Layer 3: Main crisp path */}
        <path
          ref={mainPathRef}
          stroke="url(#mm-thread-main)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* ═══════════════════════════════════════════════════
          1 · HERO — sticky blue, centered text
         ═══════════════════════════════════════════════════ */}
      <div style={{ height: "140vh" }}>
        <section
          className="hero-grain"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: BLUE,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2
          }}
        >
          {/* Nav */}
          <div
            ref={heroNavRef}
            style={{
              position: "absolute",
              top: "clamp(24px,4vh,40px)",
              left: "clamp(28px,4vw,48px)",
              right: "clamp(28px,4vw,48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Image src="/logo.png" alt="yaven" width={36} height={36} style={{ objectFit: "contain" }} priority />
              <span style={{ fontWeight: 500, fontSize: "18px", color: "#fff", fontFamily: SANS }}>yaven</span>
            </div>
          </div>

          {/* Center text */}
          <div style={{ textAlign: "center", maxWidth: "780px", padding: "0 clamp(24px,4vw,60px)", zIndex: 5 }}>
            <h1
              ref={heroH1Ref}
              style={{
                fontFamily: SANS,
                fontSize: "clamp(42px,7vw,88px)",
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: "0 0 28px"
              }}
            >
              Focus on the tasks
              <br />only you can do.
            </h1>
            <p
              ref={heroSubRef}
              style={{
                fontFamily: SANS,
                fontSize: "clamp(16px,1.6vw,20px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.75)",
                margin: "0 auto 40px",
                maxWidth: "480px"
              }}
            >
              One AI assistant for all your admin.
            </p>
            <div ref={heroCtaRef}>
              <BlueprintPanel />
            </div>
          </div>

          {/* Cloud — decorative */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-200px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(400px,60vw,900px)",
              pointerEvents: "none",
              opacity: 0.2,
              zIndex: 3
            }}
          >
            <Image src="/cloud.png" alt="" width={900} height={450} style={{ width: "100%", height: "auto" }} />
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════
          2 · VALUE PROPS — 4-column, scrub parallax stagger
         ═══════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 3,
          background: "#fff",
          padding: "clamp(100px,14vh,180px) clamp(24px,6vw,120px)"
        }}
      >
        <div
          ref={vpWrapperRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: "clamp(32px,4vw,64px)"
          }}
        >
          {VALUE_PROPS.map((vp, i) => (
            <div
              key={vp.title}
              ref={el => { vpRefs.current[i] = el }}
              style={{ opacity: 0 }}
            >
              <h3 style={{
                fontFamily: SANS,
                fontSize: "clamp(22px,2.2vw,28px)",
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: INK,
                margin: "0 0 16px"
              }}>
                {vp.title}
              </h3>
              <p style={{
                fontFamily: SANS,
                fontSize: "clamp(14px,1.3vw,16px)",
                fontWeight: 400,
                lineHeight: 1.65,
                color: MUTE,
                margin: 0
              }}>
                {vp.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3 · STATS — scrub scale + reveal
         ═══════════════════════════════════════════════════ */}
      <section
        ref={statsSectionRef}
        style={{
          position: "relative",
          zIndex: 3,
          background: CREAM,
          padding: "clamp(100px,14vh,180px) clamp(24px,6vw,120px)"
        }}
      >
        <h2
          ref={statsHeadRef}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(14px,1.4vw,18px)",
            fontWeight: 400,
            color: MUTE,
            margin: "0 0 clamp(48px,6vh,80px)",
            opacity: 0
          }}
        >
          A few numbers behind the work we do
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(40px,6vw,100px)" }}>
          {STATS.map((s, i) => (
            <div key={s.label} ref={el => { statRefs.current[i] = el }} style={{ opacity: 0 }}>
              <span style={{
                fontFamily: SANS,
                fontSize: "clamp(56px,8vw,100px)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: INK,
                display: "block"
              }}>
                {s.value}
              </span>
              <span style={{
                fontFamily: SANS,
                fontSize: "clamp(14px,1.3vw,17px)",
                fontWeight: 400,
                color: MUTE,
                marginTop: "8px",
                display: "block"
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4 · CAPABILITIES — cards, scrub entrance with rotateX
         ═══════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 3,
          background: "#fff",
          padding: "clamp(100px,14vh,180px) clamp(24px,6vw,120px)"
        }}
      >
        <h2
          ref={capHeadRef}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(36px,5vw,64px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: INK,
            margin: "0 0 clamp(48px,6vh,80px)",
            opacity: 0
          }}
        >
          What yaven handles
        </h2>

        <div
          ref={capWrapperRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(16px,2vw,28px)",
            perspective: "1200px"
          }}
        >
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.num}
              ref={el => { capRefs.current[i] = el }}
              style={{
                background: "#f7f5f1",
                borderRadius: "16px",
                padding: "clamp(24px,2.8vw,36px)",
                border: "1px solid rgba(10,14,26,0.04)",
                opacity: 0,
                transition: "transform 0.3s cubic-bezier(.25,1,.5,1), box-shadow 0.3s cubic-bezier(.25,1,.5,1)",
                cursor: "default",
                transformStyle: "preserve-3d"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)"
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ""
                e.currentTarget.style.boxShadow = ""
              }}
            >
              <span style={{
                fontFamily: MONO,
                fontSize: "11px",
                fontWeight: 700,
                color: BLUE,
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: "14px"
              }}>
                {c.num}
              </span>
              <h3 style={{
                fontFamily: SANS,
                fontSize: "clamp(20px,2vw,26px)",
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: INK,
                margin: "0 0 12px"
              }}>
                {c.title}
              </h3>
              <p style={{
                fontFamily: SANS,
                fontSize: "clamp(13px,1.2vw,15px)",
                fontWeight: 400,
                lineHeight: 1.6,
                color: MUTE,
                margin: 0
              }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5 · CTA — centered, SplitText, scrub entrance
         ═══════════════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          zIndex: 3,
          background: CREAM,
          padding: "clamp(140px,18vh,260px) clamp(24px,6vw,120px)",
          textAlign: "center"
        }}
      >
        <h2
          ref={ctaHeadRef}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(42px,7vw,88px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: INK,
            margin: "0 0 24px",
            opacity: 0
          }}
        >
          Less admin.
          <br />More focus.
        </h2>

        <p
          ref={ctaSubRef}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(16px,1.6vw,20px)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: MUTE,
            margin: "0 auto 48px",
            maxWidth: "460px",
            opacity: 0
          }}
        >
          From email drafts to meeting prep — yaven handles the admin so you
          can focus on the work that matters.
        </p>

        <div ref={ctaBtnRef} style={{ display: "inline-block", opacity: 0 }}>
          <BlueprintPanel />
          <a
            href="https://calendly.com/nickprice2000/yaven-support"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: MUTE,
              textDecoration: "underline",
              textDecorationThickness: "1.5px",
              textUnderlineOffset: "4px",
              display: "block",
              marginTop: "20px"
            }}
          >
            Book a call ↗
          </a>
        </div>
      </section>
    </div>
  )
}
