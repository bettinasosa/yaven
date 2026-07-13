"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { bookDemoHref } from "@/lib/contact"

function YavenMark({ height }: { height: number }) {
  return (
    <Image
      src="/yaven-logo.webp"
      alt="yaven"
      width={628}
      height={1152}
      style={{ mixBlendMode: "multiply", width: "auto", height: `${height}px` }}
      priority
    />
  )
}

// ── Floating app icons on "apps" hover ──────────────────────────────────────

const APP_ICONS = [
  { src: "/logos/gmail.png", alt: "Gmail" },
  { src: "/logos/telegram-icon.png", alt: "Telegram" },
  { src: "/logos/notion.png", alt: "Notion" },
  { src: "/logos/gcal.png", alt: "Google Calendar" },
  { src: "/logos/hubspot.png", alt: "HubSpot" },
  { src: "/logos/linkedin.png", alt: "LinkedIn" },
  { src: "/logos/asana.png", alt: "Asana" },
  { src: "/logos/salesforce.png", alt: "Salesforce" },
  { src: "/logos/excel.png", alt: "Excel" }
]

// Party pop — spaced out, higher ones spread more
const POP_TARGETS = [
  { x: -56, y: 4, r: -14 },
  { x: -44, y: -10, r: 10 },
  { x: -28, y: -30, r: -6 },
  { x: -4, y: -14, r: 8 },
  { x: 20, y: -34, r: -4 },
  { x: 38, y: -10, r: 12 },
  { x: 58, y: 4, r: -8 },
  { x: 62, y: -24, r: 6 },
  { x: -52, y: -26, r: -10 }
]

function AppsWord() {
  const [hovered, setHovered] = useState(false)
  const iconsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!hovered) {
      iconsRef.current.forEach(el => {
        if (el) {
          gsap.killTweensOf(el)
          gsap.to(el, {
            opacity: 0,
            x: 0,
            y: 0,
            scale: 0.2,
            rotation: 0,
            duration: 0.15,
            ease: "power4.in"
          })
        }
      })
      return
    }
    iconsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.killTweensOf(el)
      const t = POP_TARGETS[i]
      gsap.fromTo(
        el,
        { opacity: 0, x: 0, y: 0, scale: 0, rotation: 0 },
        {
          opacity: 1,
          x: t.x,
          y: t.y,
          scale: 1,
          rotation: t.r,
          duration: 0.3,
          ease: "back.out(4)",
          delay: i * 0.02
        }
      )
    })
  }, [hovered])

  return (
    <span
      className="relative inline-block cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-bold">apps</span>
      {/* floating icons — party pop burst */}
      <span
        className="absolute pointer-events-none"
        style={{ left: "50%", top: "0" }}
        aria-hidden="true"
      >
        {APP_ICONS.map((icon, i) => (
          <span
            key={icon.alt}
            ref={el => {
              iconsRef.current[i] = el
            }}
            className="absolute flex items-center justify-center"
            style={{
              left: -10,
              top: -10,
              opacity: 0,
              width: 20,
              height: 20,
              borderRadius: 4,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.15), inset 0 0.5px 0 rgba(255,255,255,0.25)"
            }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={14}
              height={14}
              style={{ objectFit: "contain", width: 14, height: 14 }}
            />
          </span>
        ))}
      </span>
    </span>
  )
}

// ── Variant B — liquid gradient, right-aligned content ───────────────────────

function HeroVariantB() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const bookCallRef = useRef<HTMLAnchorElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.set(logoRef.current, { yPercent: -120, opacity: 0 })
    gsap.set(bookCallRef.current, { opacity: 0, y: -14 })
    gsap.set(contentRef.current, { opacity: 0, y: 40 })
    gsap.set(ctaRef.current, { opacity: 0, y: 22 })

    gsap.to(logoRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power3.out"
    })
    gsap.to(bookCallRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.55
    })
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1
    })
    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: 0.3
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative min-h-screen overflow-hidden flex z-[1]"
    >
      {/* Background is the site-wide living gradient (fixed, in the layout). */}

      {/* Nav — logo top left, book a call top right */}
      <div className="absolute top-[clamp(28px,4vw,48px)] left-[clamp(28px,4vw,48px)] right-[clamp(28px,4vw,48px)] z-10 flex items-center justify-between">
        <div ref={logoRef}>
          <YavenMark height={52} />
        </div>
        <a
          ref={bookCallRef}
          href={bookDemoHref}
          className="u-hover-underline font-[var(--font-space-mono)] text-[13px] font-medium tracking-[0.08em] text-white/70 no-underline"
        >
          Book a demo
        </a>
      </div>

      {/* Right-aligned content block — vertically centred */}
      <div className="relative z-5 flex items-center justify-start md:justify-end w-full min-h-screen p-[clamp(80px,14vh,160px)_clamp(24px,5vw,80px)]">
        <div
          ref={contentRef}
          className="max-w-[580px] text-left md:mr-[clamp(8px,2.5vh,28px)] md:ml-0 ml-[clamp(28px,4vw,48px)]"
        >
          <span
            style={{ fontFamily: "var(--font-instrument-serif)" }}
            className="block text-[clamp(80px,14vw,180px)] md:text-[clamp(72px,12vw,180px)] font-medium text-white lowercase leading-[0.88] tracking-[-0.03em] mb-[clamp(20px,3vh,36px)] mt-[clamp(24px,5vh,80px)] md:mt-[clamp(100px,16vh,200px)]"
          >
            Yaven
          </span>

          <p className="font-[var(--font-dm-sans),sans-serif] text-[clamp(28px,6vw,42px)] md:text-[clamp(20px,3vw,42px)] font-medium text-white leading-[1.1] tracking-[-0.02em] m-0 opacity-92 mt-[clamp(28px,5vh,80px)] md:mt-[clamp(50px,8vh,100px)] mb-[clamp(2px,1vh,12px)]">
            Less admin.
            <br />
            More flow.
          </p>

          <p className="font-[var(--font-dm-sans),sans-serif] text-[var(--fs-body)] font-normal text-white/70 leading-[1.5] mt-0 mr-0 mb-[clamp(24px,4vh,40px)] ml-0">
            The AI workforce that lives in your menu bar,
            <br />
            handling the admin that eats your day
            <br />
            across all your <AppsWord />.
          </p>

          <div ref={ctaRef}>
            <BlueprintPanel />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────

export function HeroSectionND() {
  return <HeroVariantB />
}
