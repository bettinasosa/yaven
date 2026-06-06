"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"

gsap.registerPlugin(ScrollTrigger, SplitText)

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

// ── Variant B — flat blue, right-aligned, single cloud ───────────────────────

function HeroVariantB() {
  const sectionRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cloudRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial hidden states (mirrors Variant A)
    gsap.set(navRef.current, { yPercent: -120, opacity: 0 })
    gsap.set(wordRef.current, { scale: 0.88, opacity: 0 })
    gsap.set(tagRef.current, { opacity: 0, y: 40 })
    gsap.set(ctaRef.current, { opacity: 0, y: 22 })
    gsap.set(cloudRef.current, { opacity: 0, y: 36 })

    const onLoaderDone = () => {
      gsap.to(navRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out"
      })
      gsap.to(wordRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.5)",
        delay: 0.05
      })
      gsap.to(tagRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15
      })
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.35
      })
      gsap.to(cloudRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.1
      })
    }

    if (_loaderFired) {
      onLoaderDone()
    } else {
      window.addEventListener("yaven:loader:done", onLoaderDone, { once: true })
    }

    // Scroll exit — cloud drifts down
    const st = gsap.to(cloudRef.current, {
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2
      }
    })

    return () => {
      window.removeEventListener("yaven:loader:done", onLoaderDone)
      st.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-grain"
      style={{
        background: "#267FE5",
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        zIndex: 50
      }}
    >
      {/* Nav — top left */}
      <div
        ref={navRef}
        style={{
          position: "absolute",
          top: "clamp(24px, 4vh, 40px)",
          left: "clamp(28px, 4vw, 48px)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <YavenMark height={36} />
        <span
          style={{
            fontWeight: 500,
            fontSize: "18px",
            color: "#fff",
            fontFamily: "var(--font-dm-sans), sans-serif"
          }}
        >
          yaven
        </span>
      </div>

      {/* "yaven" wordmark — right, vertically centred */}
      <div
        ref={wordRef}
        style={{
          position: "absolute",
          right: "clamp(32px, 5vw, 80px)",
          top: "50%",
          transform: "translateY(-58%)",
          zIndex: 5,
          textAlign: "right"
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(80px, 14vw, 210px)",
            fontWeight: 500,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 0.88,
            display: "block",
            textTransform: "lowercase"
          }}
        >
          yaven
        </span>
      </div>

      {/* Tagline — bottom right */}
      <div
        ref={tagRef}
        style={{
          position: "absolute",
          bottom: "clamp(40px, 7vh, 90px)",
          right: "clamp(32px, 5vw, 80px)",
          zIndex: 5,
          textAlign: "right"
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(20px, 3vw, 42px)",
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
            opacity: 0.92
          }}
        >
          less admin.
          <br />
          more flow.
        </p>
      </div>

      {/* CTA — bottom left */}
      <div
        ref={ctaRef}
        style={{
          position: "absolute",
          bottom: "clamp(40px, 7vh, 90px)",
          left: "clamp(32px, 5vw, 80px)",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px"
        }}
      >
        <BlueprintPanel />
        <a
          href="https://calendly.com/nickprice2000/yaven-support"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.65)",
            textDecoration: "underline",
            textDecorationThickness: "1.5px",
            textUnderlineOffset: "4px"
          }}
        >
          Book a call ↗
        </a>
      </div>

      {/* Single cloud — bottom centre */}
      <div
        ref={cloudRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-260px",
          left: "50%",
          transform: "translateX(-55%)",
          zIndex: 4,
          width: "clamp(500px, 72vw, 1100px)",
          pointerEvents: "none"
        }}
      >
        <Image
          src="/cloud.png"
          alt=""
          width={860}
          height={480}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </section>
  )
}

// ── Variant C — logo door-zoom → blue fills screen → wipe left → Variant B ───

// SVG mark scales crisply to any size (unique gradient ID avoids clash with page-loader)
function LogoMarkC({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 504 871"
      width={size}
      height={Math.round(size * (871 / 504))}
      fill="none"
    >
      <path d="M0 113L301.146 211.929V522.5L0 688V113Z" fill="url(#c_lg)" />
      <path
        d="M300.498 522.828L0 687.99L300.498 870.99V522.828Z"
        fill="#064AA9"
      />
      <path
        d="M203.502 0L0 113L300.498 295V871L504 759V183L203.502 0Z"
        fill="#E3D5BB"
      />
      <path d="M0 125V113L300.5 295V307L0 125Z" fill="#E3D5BB" />
      <defs>
        <linearGradient
          id="c_lg"
          x1="301.146"
          y1="397.757"
          x2="0"
          y2="397.757"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="#267FE5" />
          <stop offset="0.3" stopColor="#62A7C6" />
          <stop offset="0.5" stopColor="#AFAA47" />
          <stop offset="0.5739" stopColor="#CB9C41" />
          <stop offset="0.9" stopColor="#E1402E" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function HeroVariantC() {
  const sectionRef = useRef<HTMLElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  // Base layer refs — animated in as logo fades
  const bNavRef = useRef<HTMLDivElement>(null)
  const bWordRef = useRef<HTMLDivElement>(null)
  const bTagRef = useRef<HTMLDivElement>(null)
  const bCtaRef = useRef<HTMLDivElement>(null)
  const bCloudRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Hide base layer elements initially
    gsap.set(
      [
        bNavRef.current,
        bWordRef.current,
        bTagRef.current,
        bCtaRef.current,
        bCloudRef.current
      ],
      { opacity: 0, y: 40 }
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    })

    // Phase 1 (0 → 5): Logo zooms in — occupies most of the scroll
    tl.fromTo(
      logoRef.current,
      { scale: 1 },
      { scale: 24, transformOrigin: "50% 50%", duration: 5, ease: "power2.in" },
      0
    )

    // Phase 2 (5 → 7): Logo + cover fade out, text rises up simultaneously
    tl.to(
      logoRef.current,
      { opacity: 0, duration: 0.8, ease: "power1.in" },
      5
    )
    tl.to(
      coverRef.current,
      { opacity: 0, duration: 1.2, ease: "power1.inOut" },
      5
    )

    tl.to(
      bWordRef.current,
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      5.2
    )
    tl.to(
      bNavRef.current,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      5.3
    )
    tl.to(
      bTagRef.current,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      5.4
    )
    tl.to(
      bCtaRef.current,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      5.5
    )
    tl.to(
      bCloudRef.current,
      { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" },
      5.2
    )

    // Hold at final state before unpinning; cloud drifts down during this window
    tl.to({}, { duration: 2 }, 7)
    tl.to(
      bCloudRef.current,
      { y: 120, ease: "none", duration: 2 },
      7
    )

    // Let Lenis know the page is taller now (pin spacer added) so it updates scroll limits
    requestAnimationFrame(() => window.dispatchEvent(new Event("content-changed")))

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      // Let Lenis recalculate after the pin spacer is removed
      requestAnimationFrame(() => window.dispatchEvent(new Event("content-changed")))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#267FE5",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        zIndex: 50
      }}
    >
      {/* ── Variant B layout — sits underneath, animated in as logo fades ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        {/* Nav */}
        <div
          ref={bNavRef}
          style={{
            position: "absolute",
            top: "clamp(24px, 4vh, 40px)",
            left: "clamp(28px, 4vw, 48px)",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <YavenMark height={36} />
          <span
            style={{
              fontWeight: 500,
              fontSize: "18px",
              color: "#fff",
              fontFamily: "var(--font-dm-sans), sans-serif"
            }}
          >
            yaven
          </span>
        </div>

        {/* Large "yaven" wordmark — right, vertically centred */}
        <div
          ref={bWordRef}
          style={{
            position: "absolute",
            right: "clamp(32px, 5vw, 80px)",
            top: "50%",
            transform: "translateY(-58%)",
            textAlign: "right",
            zIndex: 1
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(80px, 14vw, 210px)",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 0.88,
              display: "block",
              textTransform: "lowercase"
            }}
          >
            yaven
          </span>
        </div>

        {/* Tagline — bottom right */}
        <div
          ref={bTagRef}
          style={{
            position: "absolute",
            bottom: "clamp(40px, 7vh, 90px)",
            right: "clamp(32px, 5vw, 80px)",
            textAlign: "right"
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(20px, 3vw, 42px)",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              opacity: 0.92
            }}
          >
            less admin.
            <br />
            more flow.
          </p>
        </div>

        {/* CTA — bottom left */}
        <div
          ref={bCtaRef}
          style={{
            position: "absolute",
            bottom: "clamp(40px, 7vh, 90px)",
            left: "clamp(32px, 5vw, 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px"
          }}
        >
          <BlueprintPanel />
          <a
            href="https://calendly.com/nickprice2000/yaven-support"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.65)",
              textDecoration: "underline",
              textDecorationThickness: "1.5px",
              textUnderlineOffset: "4px"
            }}
          >
            Book a call ↗
          </a>
        </div>

        {/* Cloud — bottom centre */}
        <div
          ref={bCloudRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-260px",
            left: "50%",
            transform: "translateX(-55%)",
            width: "clamp(500px, 72vw, 1100px)",
            pointerEvents: "none"
          }}
        >
          <Image
            src="/cloud.png"
            alt=""
            width={1100}
            height={550}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      {/* ── Blue cover — contains logo, slides left to reveal B ──────────── */}
      <div
        ref={coverRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          background: "#267FE5",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          ref={logoRef}
          style={{ transformOrigin: "center center", flexShrink: 0 }}
        >
          <LogoMarkC size={88} />
        </div>
      </div>
    </section>
  )
}

// ── Main export — manages variant toggle ─────────────────────────────────────

export function HeroSection() {
  const [variant, setVariant] = useState<"B" | "C">("B")

  return (
    <>
      {variant === "B" && <HeroVariantB />}
      {variant === "C" && <HeroVariantC />}

      {/* Variant toggle */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 200,
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.80)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "40px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          display: "flex",
          padding: "3px",
          gap: "2px"
        }}
      >
        {(["B", "C"] as const).map(v => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: "40px",
              border: "none",
              cursor: "pointer",
              background: variant === v ? "rgba(0,0,0,0.75)" : "transparent",
              color: variant === v ? "#fff" : "rgba(0,0,0,0.55)",
              transition: "all 0.15s ease"
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </>
  )
}
