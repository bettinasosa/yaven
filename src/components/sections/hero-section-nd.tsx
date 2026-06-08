"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { LiquidGradientBg } from "@/components/effects/liquid-gradient-bg"

// Track whether the loader event has already fired so late-mounting variants
// (e.g. switching A→B after page load) can animate in immediately.
let _loaderFired = false
if (typeof window !== "undefined") {
  window.addEventListener(
    "yaven:loader:done",
    () => {
      _loaderFired = true
    },
    { once: true }
  )
}

function YavenMark({ height }: { height: number }) {
  return (
    <Image
      src="/logo.png"
      alt="yaven"
      width={height}
      height={height}
      style={{ display: "block", objectFit: "contain" }}
      priority
    />
  )
}

// ── Variant B — liquid gradient, right-aligned content ───────────────────────

function HeroVariantB() {
  const sectionRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.set(navRef.current, { yPercent: -120, opacity: 0 })
    gsap.set(contentRef.current, { opacity: 0, y: 40 })
    gsap.set(ctaRef.current, { opacity: 0, y: 22 })

    const onLoaderDone = () => {
      gsap.to(navRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out"
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
    }

    if (_loaderFired) {
      onLoaderDone()
    } else {
      window.addEventListener("yaven:loader:done", onLoaderDone, { once: true })
    }

    return () => {
      window.removeEventListener("yaven:loader:done", onLoaderDone)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#267FE5",
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        zIndex: 50,
        display: "flex"
      }}
    >
      {/* Liquid gradient background */}
      <LiquidGradientBg />

      {/* Nav — logo top left, book a call top right */}
      <div
        ref={navRef}
        style={{
          position: "absolute",
          top: "clamp(16px, 2.5vh, 28px)",
          left: "clamp(28px, 4vw, 48px)",
          right: "clamp(28px, 4vw, 48px)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <YavenMark height={72} />
        <a
          href="https://calendly.com/nickprice2000/yaven-support"
          target="_blank"
          rel="noopener noreferrer"
          className="u-hover-underline"
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.65)",
            textDecoration: "none"
          }}
        >
          Book a call ↗
        </a>
      </div>

      {/* Right-aligned content block — vertically centred */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          minHeight: "100vh",
          padding: "clamp(100px, 14vh, 160px) clamp(32px, 5vw, 80px)"
        }}
      >
        <div
          ref={contentRef}
          style={{
            maxWidth: "580px",
            textAlign: "left"
          }}
        >
          <span
            data-heading-font
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(72px, 12vw, 180px)",
              fontWeight: 400,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              display: "block",
              textTransform: "lowercase",
              marginBottom: "clamp(64px, 10vh, 120px)"
            }}
          >
            yaven
          </span>

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(20px, 3vw, 42px)",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              opacity: 0.92,
              marginBottom: "clamp(2px, 1vh, 12px)"
            }}
          >
            Less admin.
            <br />
            More flow.
          </p>

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(15px, 1.8vw, 20px)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.5,
              margin: "0 0 clamp(24px, 4vh, 40px)"
            }}
          >
            AI that handles the busywork
            <br />
            letting you focus on what you love.
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
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "clamp(120px, 20vh, 240px)",
          background:
            "linear-gradient(to bottom, transparent 0%, #267FE5 100%)",
          pointerEvents: "none",
          zIndex: 6
        }}
      />
    </section>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────

export function HeroSectionND() {
  return <HeroVariantB />
}
