"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import dynamic from "next/dynamic"

const LiquidGradientBg = dynamic(
  () => import("@/components/effects/liquid-gradient-bg").then(m => m.LiquidGradientBg),
  { ssr: false }
)

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
      className="relative min-h-screen overflow-hidden flex bg-[var(--primary)] z-50"
    >
      {/* Liquid gradient background */}
      <LiquidGradientBg />

      {/* Nav — logo top left, book a call top right */}
      <div
        className="absolute top-[clamp(28px,4vw,48px)] left-[clamp(28px,4vw,48px)] right-[clamp(28px,4vw,48px)] z-10 flex items-center justify-between"
      >
        <div ref={logoRef}>
          <YavenMark height={52} />
        </div>
        <a
          ref={bookCallRef}
          href="https://calendly.com/nickprice2000/yaven-support"
          target="_blank"
          rel="noopener noreferrer"
          className="u-hover-underline font-[var(--font-space-mono)] text-[13px] font-medium tracking-[0.08em] text-white/70 no-underline"
        >
          Book a call ↗
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
            A personal assistant that triages
            <br />
            your inbox, drafts in your voice, and proactively
            <br />
            handles the admin that doesn&apos;t need you.
          </p>

          <div ref={ctaRef}>
            <BlueprintPanel />
          </div>
        </div>
      </div>

      {/* Bottom blend — fades the liquid gradient into solid primary so
          there's no hard line between hero and the next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[clamp(120px,20vh,240px)] pointer-events-none z-[6]"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #267FE5 100%)"
        }}
      />
    </section>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────

export function HeroSectionND() {
  return <HeroVariantB />
}
