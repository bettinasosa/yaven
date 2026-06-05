"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { HeroBlobs } from "@/components/hero-blobs"
import { AnimatedHeadline } from "@/components/animated-headline"

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

// Cloud layout — large, bottom-anchored, half below the section edge
const CLOUDS = [
  {
    left: "-22%",
    bottom: -200,
    width: 800,
    opacity: 0.9,
    floatY: -22,
    dur: 5.4,
    delay: 0.0
  },
  {
    left: "-20%",
    bottom: -220,
    width: 540,
    opacity: 0.7,
    floatY: -26,
    dur: 4.6,
    delay: 0.7
  },
  {
    left: "5%",
    bottom: -220,
    width: 540,
    opacity: 0.7,
    floatY: -26,
    dur: 4.6,
    delay: 0.7
  },
  {
    left: "20%",
    bottom: -200,
    width: 420,
    opacity: 0.9,
    floatY: -20,
    dur: 5.8,
    delay: 0.3
  },
  {
    right: "6%",
    bottom: -220,
    width: 500,
    opacity: 0.76,
    floatY: -24,
    dur: 4.9,
    delay: 1.0
  },
  {
    right: "3%",
    bottom: -100,
    width: 300,
    opacity: 0.76,
    floatY: -24,
    dur: 4.9,
    delay: 1.0
  },
  {
    right: "-25%",
    bottom: -210,
    width: 720,
    opacity: 0.88,
    floatY: -18,
    dur: 5.1,
    delay: 0.5
  }
]

// ── Variant A — current centered design ──────────────────────────────────────

function HeroVariantA() {
  const sectionRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const ledeRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const cloudEls = useRef<HTMLDivElement[]>([])

  // Pill shine tracks mouse + scroll
  useEffect(() => {
    let rafId = 0,
      targetAngle = -30,
      currentAngle = -30,
      mouseProgress = 0.5
    const update = () => {
      targetAngle =
        (mouseProgress - 0.5) * 200 + (window.scrollY / window.innerHeight) * 80
    }
    const onMove = (e: MouseEvent) => {
      mouseProgress = e.clientX / window.innerWidth
      update()
    }
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseProgress = e.touches[0].clientX / window.innerWidth
        update()
      }
    }
    const tick = () => {
      currentAngle += (targetAngle - currentAngle) * 0.07
      document.documentElement.style.setProperty(
        "--pill-angle",
        `${currentAngle}deg`
      )
      rafId = requestAnimationFrame(tick)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })
    window.addEventListener("touchstart", onTouch, { passive: true })
    window.addEventListener("scroll", () => update(), { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("touchstart", onTouch)
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    gsap.set(navRef.current, { yPercent: -120, opacity: 0 })
    gsap.set(boxRef.current, { scale: 0.88, opacity: 0 })
    gsap.set(ctaRef.current, { opacity: 0, y: 22 })
    gsap.set(cloudsRef.current, { opacity: 0, y: 36 })

    const ledeSplit = new SplitText(ledeRef.current, {
      type: "lines",
      mask: "lines"
    })
    gsap.set(ledeSplit.lines, { yPercent: 100 })

    const onLoaderDone = () => {
      gsap.to(navRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out"
      })
      gsap.to(boxRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.5)",
        delay: 0.05,
        onComplete: () => gsap.set(boxRef.current, { clearProps: "transform" })
      })
      gsap.to(ledeSplit.lines, {
        yPercent: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
        delay: 0.2
      })
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.4
      })
      gsap.to(cloudsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.15
      })
    }
    if (_loaderFired) {
      onLoaderDone()
    } else {
      window.addEventListener("yaven:loader:done", onLoaderDone, { once: true })
    }

    cloudEls.current.forEach((el, i) => {
      if (!el) return
      const c = CLOUDS[i]
      gsap.to(el, {
        y: c.floatY,
        duration: c.dur,
        delay: c.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    const xTargets = [-1900, -1400, -1100, -800, 900, 1200, 2000]
    const yTargets = [600, 500, 420, 320, 420, 500, 600]
    const stTriggers: ScrollTrigger[] = []
    cloudEls.current.forEach((el, i) => {
      if (!el) return
      const tween = gsap.to(el, {
        x: xTargets[i] ?? 0,
        y: yTargets[i] ?? 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8
        }
      })
      if (tween.scrollTrigger) stTriggers.push(tween.scrollTrigger)
    })

    return () => {
      window.removeEventListener("yaven:loader:done", onLoaderDone)
      ledeSplit.revert?.()
      stTriggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col hero-grain"
      style={{
        background: "transparent",
        position: "relative",
        zIndex: 50,
        overflow: "visible"
      }}
    >
      <HeroBlobs />

      {/* Clouds */}
      <div
        ref={cloudsRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 7
        }}
      >
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            ref={el => {
              if (el) cloudEls.current[i] = el
            }}
            style={{
              position: "absolute",
              bottom: `${c.bottom}px`,
              left: "left" in c ? (c as { left: string }).left : undefined,
              right: "right" in c ? (c as { right: string }).right : undefined,
              width: c.width,
              opacity: c.opacity
            }}
          >
            <Image
              src="/cloud.png"
              alt=""
              width={c.width}
              height={Math.round(c.width * 0.5)}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* Nav */}
      <div
        ref={navRef}
        className="absolute z-10 w-full px-8 pt-8 flex items-center"
        style={{ opacity: 0, top: 0 }}
      >
        <YavenMark height={32} />
        <span
          className="hero-nav-label"
          style={{
            fontWeight: 500,
            fontSize: "26px",
            color: "#E3D5BB",
            marginLeft: "8px"
          }}
        >
          yaven
        </span>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "320px",
          background:
            "linear-gradient(to bottom, rgba(38,127,229,0) 0%, rgba(38,127,229,0.65) 45%, rgba(38,127,229,1) 100%)",
          pointerEvents: "none",
          zIndex: 6
        }}
      />

      {/* Centred content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center w-full max-w-3xl">
          <div
            ref={boxRef}
            className="hero-namebox"
            style={{
              display: "inline-block",
              marginBottom: "32px",
              opacity: 0
            }}
          >
            <span
              className="font-medium hero-wordmark-text"
              style={{
                fontSize: "clamp(40px, 6vw, 88px)",
                lineHeight: 0.95,
                color: "#E3D5BB",
                display: "block"
              }}
            >
              yaven
            </span>
          </div>

          <AnimatedHeadline
            className="font-medium hero-headline"
            style={{
              fontSize: "clamp(26px, 4vw, 52px)",
              lineHeight: 1.1,
              color: "#E3D5BB",
              marginBottom: "20px"
            }}
            delay={0.1}
            highlights={[]}
          >
            Less admin. More flow.
          </AnimatedHeadline>

          <p
            ref={ledeRef}
            className="font-medium mx-auto hero-lede"
            style={{
              fontSize: "clamp(17px, 2vw, 23px)",
              lineHeight: 1.45,
              color: "#E3D5BB",
              maxWidth: "600px",
              marginBottom: "36px"
            }}
          >
            yaven lives in at the top of your screen. It&apos;s always up to
            speed.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <div style={{ width: "fit-content" }}>
              <BlueprintPanel />
            </div>
            <a
              href="https://calendly.com/nickprice2000/yaven-support"
              target="_blank"
              rel="noopener noreferrer"
              className="book-call-link"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#E3D5BB",
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "4px"
              }}
            >
              Book a call <span className="book-call-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
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
        end: "+=2200",
        pin: true,
        pinSpacing: true,
        scrub: 1.2
      }
    })

    // Phase 1 (0 → 3): Logo zooms in
    tl.fromTo(
      logoRef.current,
      { scale: 1 },
      { scale: 24, transformOrigin: "50% 50%", duration: 3, ease: "power2.in" },
      0
    )

    // Phase 2 (2.5 → 5): Logo + cover fade out, text rises up simultaneously
    tl.to(
      logoRef.current,
      { opacity: 0, duration: 0.8, ease: "power1.in" },
      2.5
    )
    tl.to(
      coverRef.current,
      { opacity: 0, duration: 1.2, ease: "power1.inOut" },
      2.5
    )

    tl.to(
      bWordRef.current,
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      2.6
    )
    tl.to(
      bNavRef.current,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      2.7
    )
    tl.to(
      bTagRef.current,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      2.8
    )
    tl.to(
      bCtaRef.current,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      2.9
    )
    tl.to(
      bCloudRef.current,
      { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" },
      2.6
    )

    // Hold at final state before unpinning
    tl.to({}, { duration: 3 }, 4.2)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
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
  const [variant, setVariant] = useState<"A" | "B" | "C">("A")

  return (
    <>
      {variant === "A" && <HeroVariantA />}
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
        {(["A", "B", "C"] as const).map(v => (
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
