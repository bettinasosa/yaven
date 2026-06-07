"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Typewriter } from "@/components/effects/typewriter"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

const headlineStyle: React.CSSProperties = {
  fontFamily: "var(--font-instrument-serif)",
  fontSize: "clamp(32px, 4.5vw, 64px)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: INK,
  margin: 0
}

const bodyStyle: React.CSSProperties = {
  fontSize: "clamp(16px, 1.9vw, 22px)",
  fontWeight: 500,
  lineHeight: 1.45,
  color: INK,
  opacity: 0.8,
  margin: "18px 0 0",
  maxWidth: "480px"
}

const phaseGridStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  alignItems: "center",
  gap: "clamp(40px, 6vw, 80px)"
}

// Scattered note fragments that melt into one document (gooey filter)
const FRAGMENTS = [
  { x: -150, y: -120, r: -18, w: 86, h: 54 },
  { x: 160, y: -100, r: 14, w: 70, h: 70 },
  { x: -180, y: 70, r: 10, w: 64, h: 64 },
  { x: 140, y: 120, r: -12, w: 90, h: 50 },
  { x: -40, y: -170, r: 6, w: 56, h: 56 },
  { x: 60, y: 170, r: -8, w: 74, h: 46 }
]

function GooeyStage({
  fragRefs,
  merged
}: {
  fragRefs: React.RefObject<(HTMLDivElement | null)[]>
  merged: boolean
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "min(380px, 80vw)",
        height: "min(380px, 80vw)",
        margin: "0 auto"
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="yv-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
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

      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#yv-goo)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* The document the fragments melt into */}
        <div
          style={{
            width: "150px",
            height: "190px",
            borderRadius: "16px",
            background: "var(--primary)"
          }}
        />
        {FRAGMENTS.map((f, i) => (
          <div
            key={i}
            ref={el => {
              fragRefs.current[i] = el
            }}
            style={{
              position: "absolute",
              width: `${f.w}px`,
              height: `${f.h}px`,
              borderRadius: "14px",
              background: "var(--primary)",
              transform: merged
                ? "translate(0, 0) scale(0.6)"
                : `translate(${f.x}px, ${f.y}px) rotate(${f.r}deg)`
            }}
          />
        ))}
      </div>

      {/* Document face — above the filter so it stays crisp */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "150px",
          height: "190px",
          borderRadius: "16px",
          padding: "18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "9px"
        }}
      >
        {[80, 100, 100, 60, 100, 45].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? "10px" : "6px",
              width: `${w}%`,
              borderRadius: "4px",
              background: "rgba(255,255,255,0.75)"
            }}
          />
        ))}
      </div>
    </div>
  )
}

// CRM contact card that fills itself in
const CRM_ROWS = [
  { field: "Name", value: "Bettina Sosa" },
  { field: "Company", value: "Otto's Bakehouse" },
  { field: "Last call", value: "Tue: pricing, onboarding" },
  { field: "Promised", value: "Contract by Thursday" },
  { field: "Next step", value: "Send revised proposal" }
]

function CrmRow({
  field,
  value,
  delay,
  active
}: {
  field: string
  value: string
  delay: number
  active: boolean
}) {
  const [flash, setFlash] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        padding: "10px 14px",
        borderRadius: "10px",
        background: flash ? "var(--cream)" : "transparent",
        transition: "background 0.8s ease",
        minHeight: "42px"
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: INK,
          opacity: 0.5,
          width: "84px",
          flexShrink: 0,
          paddingTop: "2px"
        }}
      >
        {field}
      </span>
      <span style={{ fontSize: "15px", fontWeight: 500, color: INK }}>
        {/* Mounted only once phase 2 lands, so typing starts on cue */}
        {active && (
          <Typewriter
            text={value}
            speed={16}
            delay={delay}
            onComplete={() => {
              setFlash(true)
              setTimeout(() => setFlash(false), 900)
            }}
          />
        )}
      </span>
    </div>
  )
}

function CrmCard({ active }: { active: boolean }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        border: "var(--bd)",
        boxShadow: "var(--shadow)",
        padding: "clamp(18px, 2.5vw, 28px)",
        maxWidth: "460px"
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(18px, 2vw, 22px)",
          lineHeight: 1,
          color: INK,
          opacity: 0.55,
          padding: "0 14px 14px"
        }}
      >
        Contact
      </div>
      {CRM_ROWS.map((row, i) => (
        <CrmRow
          key={row.field}
          field={row.field}
          value={row.value}
          delay={i * 750}
          active={active}
        />
      ))}
    </div>
  )
}

// The conference follow-up card, in the CRM card's field/value language
const GREEN = "#3BA55C"
const CONFERENCE_ROWS = [
  { field: "Scanned", value: "300 contacts", done: false },
  { field: "Worth keeping", value: "4", done: false },
  { field: "Intros", value: "Drafted ✓", done: true },
  { field: "Ready by", value: "Landing", done: false }
]

function ConferenceCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        border: "var(--bd)",
        boxShadow: "var(--shadow)",
        padding: "clamp(18px, 2.5vw, 28px)",
        maxWidth: "460px"
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-instrument-serif)",
          fontSize: "clamp(18px, 2vw, 22px)",
          lineHeight: 1,
          color: INK,
          opacity: 0.55,
          padding: "0 14px 14px"
        }}
      >
        Tuesday&apos;s conference
      </div>
      {CONFERENCE_ROWS.map(row => (
        <div
          key={row.field}
          style={{ display: "flex", gap: "14px", padding: "10px 14px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: INK,
              opacity: 0.5,
              width: "110px",
              flexShrink: 0,
              paddingTop: "2px"
            }}
          >
            {row.field}
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: row.done ? 700 : 500,
              color: row.done ? GREEN : INK
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// Script §4+§5 — Automations. Pinned three-phase set piece: the gooey
// proposal merge, the self-filling CRM, and the conference follow-up.
export function ProposalsCrmSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const proposalsRef = useRef<HTMLDivElement>(null)
  const crmRef = useRef<HTMLDivElement>(null)
  const confRef = useRef<HTMLDivElement>(null)
  const finaleRef = useRef<HTMLDivElement>(null)
  const headerWrapRef = useRef<HTMLDivElement>(null)
  const fragRefs = useRef<(HTMLDivElement | null)[]>([])
  const [crmActive, setCrmActive] = useState(false)
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    gsap.set(proposalsRef.current, { y: 60, opacity: 0 })
    gsap.set(crmRef.current, { y: "100vh", opacity: 0 })
    gsap.set(confRef.current, { y: "100vh", opacity: 0 })
    gsap.set(finaleRef.current, { y: "100vh", opacity: 0 })
    fragRefs.current.forEach((f, i) => {
      if (f) gsap.set(f, { x: FRAGMENTS[i].x, y: FRAGMENTS[i].y, rotation: FRAGMENTS[i].r })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    // Phase 1 — proposals enter, fragments melt into the document
    tl.to(proposalsRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 0.8 }, 0)
    fragRefs.current.forEach((f, i) => {
      if (!f) return
      tl.to(
        f,
        { x: 0, y: 0, rotation: 0, scale: 0.6, ease: "power2.inOut", duration: 1.6 },
        0.8 + i * 0.12
      )
    })
    tl.to({}, { duration: 0.8 }) // dwell on the finished document

    // Phase 2 — proposals give way, CRM card slides up and fills in
    tl.to(proposalsRef.current, { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 }, ">")
    tl.to(crmRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 }, "<0.3")
    tl.to({}, { duration: 1.8 }) // dwell while the card types itself

    // Phase 3 — the conference follow-up takes the stage
    tl.to(crmRef.current, { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 }, ">")
    tl.to(confRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 }, "<0.3")
    tl.to({}, { duration: 1.4 }) // dwell

    // Phase 4 — the zoom-out; the header leaves so the line stands alone
    tl.to(confRef.current, { y: -60, opacity: 0, ease: "power2.in", duration: 0.8 }, ">")
    tl.to(headerWrapRef.current, { y: -40, opacity: 0, ease: "power2.in", duration: 0.8 }, "<")
    tl.to(finaleRef.current, { y: 0, opacity: 1, ease: "power3.out", duration: 1.2 }, "<0.3")
    tl.to({}, { duration: 1.4 }) // dwell before unpinning

    // Mount the typewriters only when phase 2 actually lands
    const gate = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "42% top",
      once: true,
      onEnter: () => setCrmActive(true)
    })

    return () => {
      gate.kill()
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout])

  const header = (
    <ScrollCutReveal
      style={{
        fontFamily: "var(--font-instrument-serif)",
        fontSize: "clamp(36px, 5.5vw, 76px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        color: INK,
        margin: 0,
        textAlign: "center"
      }}
    >
      Workflows.
    </ScrollCutReveal>
  )

  if (staticLayout) {
    return (
      <section style={{ background: "#fff", overflow: "hidden" }}>
        <div style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}>{header}</div>
        <div
          style={{
            ...phaseGridStyle,
            position: "relative",
            padding: "clamp(60px, 9vh, 110px) 24px"
          }}
        >
          <div>
            <h2 style={headlineStyle}>Call ends. Proposal exists.</h2>
            <p style={bodyStyle}>
              Built from your notes while the conversation is still warm.
            </p>
          </div>
          <GooeyStage fragRefs={fragRefs} merged />
        </div>
        <div
          style={{
            ...phaseGridStyle,
            position: "relative",
            padding: "clamp(60px, 9vh, 110px) 24px clamp(100px, 15vh, 180px)"
          }}
        >
          <CrmCard active />
          <div>
            <h2 style={headlineStyle}>A CRM that fills itself in.</h2>
            <p style={bodyStyle}>
              Every call, email, and promise: logged. You never typed a field.
            </p>
          </div>
        </div>
        <div
          style={{
            ...phaseGridStyle,
            position: "relative",
            padding: "clamp(60px, 9vh, 110px) 24px clamp(100px, 15vh, 180px)"
          }}
        >
          <div>
            <h2 style={headlineStyle}>300 badge scans. 4 worth keeping.</h2>
            <p style={bodyStyle}>
              Yaven finds them and writes the intros before your flight lands.
            </p>
          </div>
          <ConferenceCard />
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "clamp(60px, 9vh, 110px) 24px clamp(100px, 15vh, 180px)"
          }}
        >
          <h2 style={headlineStyle}>And that&apos;s just a few examples…</h2>
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height: "780vh", background: "#fff" }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div ref={headerWrapRef} style={{ paddingTop: "clamp(48px, 8vh, 90px)" }}>
          {header}
        </div>

        <div style={{ position: "relative", flex: 1 }}>
        {/* Phase 1 — Proposals */}
        <div ref={proposalsRef} style={phaseGridStyle}>
          <div>
            <h2 style={headlineStyle}>Call ends. Proposal exists.</h2>
            <p style={bodyStyle}>
              Built from your notes while the conversation is still warm.
            </p>
          </div>
          <GooeyStage fragRefs={fragRefs} merged={false} />
        </div>

        {/* Phase 2 — CRM */}
        <div ref={crmRef} style={phaseGridStyle}>
          <CrmCard active={crmActive} />
          <div>
            <h2 style={headlineStyle}>A CRM that fills itself in.</h2>
            <p style={bodyStyle}>
              Every call, email, and promise: logged. You never typed a field.
            </p>
          </div>
        </div>

        {/* Phase 3 — Conference follow-up */}
        <div ref={confRef} style={phaseGridStyle}>
          <div>
            <h2 style={headlineStyle}>300 badge scans. 4 worth keeping.</h2>
            <p style={bodyStyle}>
              Yaven finds them and writes the intros before your flight lands.
            </p>
          </div>
          <ConferenceCard />
        </div>

        {/* Phase 4 — the zoom-out */}
        <div
          ref={finaleRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
            textAlign: "center"
          }}
        >
          <h2 style={headlineStyle}>And that&apos;s just a few examples…</h2>
        </div>
        </div>
      </section>
    </div>
  )
}
