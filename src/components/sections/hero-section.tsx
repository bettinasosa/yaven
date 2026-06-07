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

// Track whether the loader event has already fired so a late-mounting hero
// can animate in immediately.
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

// ── Hero — centered design (formerly variant A) ──────────────────────────────

export function HeroSection() {
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
        className="absolute z-10 w-full px-8 pt-4 flex items-center justify-between"
        style={{ opacity: 0, top: 0 }}
      >
        <div className="flex items-center">
          <YavenMark height={64} />
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
            color: "#fff",
            textDecoration: "underline",
            textDecorationThickness: "2px",
            textUnderlineOffset: "4px"
          }}
        >
          Book a call <span className="book-call-arrow">↗</span>
        </a>
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
          <div ref={boxRef} style={{ display: "none" }} />

          <div
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontWeight: 500,
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 1,
              color: "#fff",
              marginBottom: "12px"
            }}
          >
            Yaven
          </div>

          <AnimatedHeadline
            className="font-medium hero-headline"
            style={{
              fontSize: "clamp(26px, 4vw, 52px)",
              lineHeight: 1.1,
              color: "#fff",
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
              color: "#fff",
              maxWidth: "600px",
              marginBottom: "36px"
            }}
          >
            AI that handles the busywork while you do more of what you love.
          </p>

          <div ref={ctaRef} className="flex justify-center">
            <div style={{ width: "fit-content" }}>
              <BlueprintPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
