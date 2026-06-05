"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { HeroBlobs } from "@/components/hero-blobs"
import { AnimatedHeadline } from "@/components/animated-headline"

gsap.registerPlugin(ScrollTrigger, SplitText)

function YavenMark({ height }: { height: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Yaven"
      width={height}
      height={height}
      style={{ display: "block", objectFit: "contain" }}
      priority
    />
  )
}

// Cloud layout — large, bottom-anchored, half below the section edge
// bottom is px: negative = pushed below the section's bottom edge
const CLOUDS = [
  {
    left: "-22%",
    bottom: -200,
    width: 800,
    opacity: 0.9,
    floatY: -22,
    floatX: 14,
    dur: 5.4,
    delay: 0.0
  },
  {
    left: "-20%",
    bottom: -220,
    width: 540,
    opacity: 0.7,
    floatY: -26,
    floatX: -12,
    dur: 4.6,
    delay: 0.7
  },
  {
    left: "5%",
    bottom: -220,
    width: 540,
    opacity: 0.7,
    floatY: -26,
    floatX: -12,
    dur: 4.6,
    delay: 0.7
  },
  {
    left: "20%",
    bottom: -200,
    width: 420,
    opacity: 0.9,
    floatY: -20,
    floatX: 10,
    dur: 5.8,
    delay: 0.3
  },
  {
    right: "6%",
    bottom: -220,
    width: 500,
    opacity: 0.76,
    floatY: -24,
    floatX: -10,
    dur: 4.9,
    delay: 1.0
  },
  {
    right: "3%",
    bottom: -100,
    width: 300,
    opacity: 0.76,
    floatY: -24,
    floatX: -10,
    dur: 4.9,
    delay: 1.0
  },
  {
    right: "-25%",
    bottom: -210,
    width: 720,
    opacity: 0.88,
    floatY: -18,
    floatX: 12,
    dur: 5.1,
    delay: 0.5
  }
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const ledeRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const cloudEls = useRef<HTMLDivElement[]>([])

  // Pill border-shine tracks mouse X + scroll Y
  useEffect(() => {
    let rafId = 0
    let targetAngle = -30
    let currentAngle = -30
    let mouseProgress = 0.5

    const update = () => {
      const mouseAngle = (mouseProgress - 0.5) * 200
      const scrollAngle = (window.scrollY / window.innerHeight) * 80
      targetAngle = mouseAngle + scrollAngle
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
    const onScroll = () => update()

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
    window.addEventListener("scroll", onScroll, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const d = 2.0

    // ── entrance animations ───────────────────────────────────────────────
    gsap.set(navRef.current, { yPercent: -120, opacity: 0 })
    gsap.set(boxRef.current, { scale: 0.88, opacity: 0 })
    gsap.set(ctaRef.current, { opacity: 0, y: 22 })
    gsap.set(cloudsRef.current, { opacity: 0, y: 36 })

    gsap.to(navRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power3.out",
      delay: d
    })
    gsap.to(boxRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(1.5)",
      delay: d + 0.05,
      onComplete: () => gsap.set(boxRef.current, { clearProps: "transform" })
    })

    // Text-mask reveal on lede — SplitText lines slide up from below clip
    const ledeSplit = new SplitText(ledeRef.current, {
      type: "lines",
      mask: "lines"
    })
    gsap.fromTo(
      ledeSplit.lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
        delay: d + 0.5
      }
    )

    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: d + 0.7
    })
    // clouds drift up into place
    gsap.to(cloudsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power2.out",
      delay: d + 0.3
    })

    // ── individual cloud float loops (y only — x reserved for scroll exit) ─
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

    // ── scroll exit — clouds slide to their sides, fully reversible ─────
    // Indices 0–3 have left: positioning → go left (negative x)
    // Indices 4–6 have right: positioning → go right (positive x)
    // Positive y = drift downward with the scroll
    const xTargets = [-500, -420, -320, -220, 300, 380, 520]
    const yTargets = [420, 360, 300, 240, 300, 360, 420]
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
          end: "80% top",
          scrub: 1.8
        }
      })
      if (tween.scrollTrigger) stTriggers.push(tween.scrollTrigger)
    })

    return () => {
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

      {/* ── Clouds ─────────────────────────────────────────────────────── */}
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

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <div
        ref={navRef}
        className="absolute z-10 w-full px-8 pt-8 flex items-center justify-between"
        style={{ opacity: 0, top: 0 }}
      >
        <div className="flex items-center">
          <YavenMark height={46} />
          <span
            className="hero-nav-label"
            style={{
              fontWeight: 700,
              fontSize: "44px",
              color: "#E3D5BB"
            }}
          >
            Yaven
          </span>
        </div>
      </div>

      {/* ── Centred content ────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center w-full max-w-3xl">
          {/* Wordmark */}
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
              className="font-bold hero-wordmark-text"
              style={{
                fontSize: "clamp(64px, 11vw, 160px)",
                lineHeight: 0.95,
                color: "#E3D5BB",
                display: "block"
              }}
            >
              Yaven
            </span>
          </div>

          {/* Headline */}
          <AnimatedHeadline
            className="font-bold hero-headline"
            style={{
              fontSize: "clamp(26px, 4vw, 52px)",
              lineHeight: 1.1,
              color: "#E3D5BB",
              marginBottom: "20px"
            }}
            delay={2.15}
            highlights={[]}
          >
            A new interface for ai
          </AnimatedHeadline>

          {/* Lede */}
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
            Yaven lives in your notch and watches everything you work on — so
            it&apos;s always up to speed, and you never have to explain
            yourself.
          </p>

          {/* CTAs */}
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
                fontWeight: 700,
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
