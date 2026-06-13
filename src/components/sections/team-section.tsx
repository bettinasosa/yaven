"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { useIsMobile } from "@/components/effects/use-is-mobile"

gsap.registerPlugin(ScrollTrigger)

const INK = "#0a0e1a"

function LogoPill({ logo }: { logo: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "rgba(10,14,26,0.04)",
        border: "1px solid rgba(10,14,26,0.07)",
        flexShrink: 0
      }}
    >
      <Image
        src={`/logos/${logo}.png`}
        alt=""
        width={20}
        height={20}
        style={{ objectFit: "contain", width: "20px", height: "20px" }}
      />
    </span>
  )
}

const bioStyle: React.CSSProperties = {
  fontSize: "var(--fs-body-lg)",
  fontWeight: 500,
  lineHeight: 1.7,
  color: INK,
  opacity: 0.75,
  margin: 0,
  maxWidth: "520px"
}

const nameStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "var(--fs-title)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  color: INK,
  margin: "0 0 clamp(8px, 1.2vw, 14px)"
}

// Card wrapper with hover tilt micro-interaction
function TeamCard({
  children,
  accentColor
}: {
  children: React.ReactNode
  accentColor: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
    glow.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${accentColor}12, transparent 60%)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card) return
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)"
    if (glow) glow.style.background = "transparent"
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        padding: "clamp(28px, 3.5vw, 40px)",
        borderRadius: "28px",
        background: hovered ? "rgba(10,14,26,0.035)" : "rgba(10,14,26,0.02)",
        border: `1px solid ${hovered ? "rgba(10,14,26,0.1)" : "rgba(10,14,26,0.06)"}`,
        transition:
          "background 0.3s ease, border-color 0.3s ease, transform 0.4s cubic-bezier(0.25,1,0.5,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        cursor: "default",
        overflow: "hidden"
      }}
    >
      {/* Radial glow that follows cursor */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          transition: "background 0.15s ease"
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  )
}

export function TeamSection() {
  const isMobile = useIsMobile()
  const staticLayout = usePrefersReducedMotion()
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (staticLayout || !innerRef.current) return

    const lines = Array.from(
      innerRef.current.querySelectorAll<HTMLElement>("[data-mask-inner]")
    )
    gsap.set(lines, { y: "110%" })

    const st = ScrollTrigger.create({
      trigger: innerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(lines, {
          y: "0%",
          stagger: 0.08,
          duration: 0.72,
          ease: "power3.out"
        })
      },
      onLeaveBack: () => {
        gsap.to(lines, {
          y: "110%",
          stagger: { each: 0.05, from: "end" },
          duration: 0.38,
          ease: "power2.in"
        })
      }
    })

    return () => st.kill()
  }, [staticLayout, isMobile])

  const clip: React.CSSProperties = { overflow: "clip", width: "100%" }

  return (
    <section
      style={{
        background: "var(--cream)",
        padding: isMobile
          ? "clamp(60px, 10vh, 100px) clamp(24px, 5vw, 40px)"
          : "clamp(80px, 12vh, 160px) clamp(28px, 5vw, 48px)"
      }}
    >
      <div ref={innerRef} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={clip}>
          <h2
            data-mask-inner
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: INK,
              margin: 0
            }}
          >
            Built by people who were the customer first.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: isMobile ? "clamp(20px, 4vh, 36px)" : "clamp(24px, 3vw, 40px)",
            marginTop: "clamp(36px, 5vh, 60px)"
          }}
        >
          {/* Betts */}
          <div style={clip}>
            <div data-mask-inner>
              <TeamCard accentColor="#9B5DE5">
                <h3 style={nameStyle}>
                  <a
                    href="https://www.bettinasosa.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#9B5DE5",
                      textDecoration: "none",
                      borderBottom: "2.5px solid #9B5DE5",
                      paddingBottom: "2px"
                    }}
                  >
                    Betts
                  </a>{" "}
                  <span
                    style={{
                      fontSize: "clamp(12px, 1.1vw, 14px)",
                      fontWeight: 500,
                      color: INK,
                      opacity: 0.4
                    }}
                  >
                    bettinasosa.com ↗
                  </span>
                </h3>
                <p style={bioStyle}>
                  Design engineer. Imperial MEng, Creative Conscience Gold +
                  Silver, Design Museum London. Founding engineer twice, Head of
                  Engineering, then grew a freelance practice to $20k+ MRR in a
                  year. Those systems became Yaven. She designed every pixel
                  you&apos;re scrolling.
                </p>
              </TeamCard>
            </div>
          </div>

          {/* Nick */}
          <div style={clip}>
            <div data-mask-inner>
              <TeamCard accentColor="#267FE5">
                <h3 style={nameStyle}>
                  <span
                    style={{
                      color: "#267FE5",
                      borderBottom: "2.5px solid #267FE5",
                      paddingBottom: "2px"
                    }}
                  >
                    Nick
                  </span>
                </h3>
                <p style={bioStyle}>
                  AI infrastructure. Imperial, then MIT (the only student
                  selected from his year). Digital twins in production across
                  three countries, then AI agent infrastructure for a hedge fund.
                  Now building a twin of your working life.
                </p>
                <p style={{ ...bioStyle, marginTop: "12px", opacity: 0.5 }}>
                  4,000 vinyl records and DJ sets on three continents. We take
                  taste seriously.
                </p>
              </TeamCard>
            </div>
          </div>
        </div>

        {/* Logo pills row */}
        <div style={{ ...clip, marginTop: "clamp(36px, 5vh, 56px)" }}>
          <div
            data-mask-inner
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 1.5vw, 18px)",
              flexWrap: "wrap"
            }}
          >
            <span
              style={{
                fontSize: "var(--fs-body-sm)",
                fontWeight: 600,
                color: INK,
                opacity: 0.4,
                marginRight: "4px"
              }}
            >
              Our team comes from
            </span>
            <LogoPill logo="imperial" />
            <LogoPill logo="mit" />
            <LogoPill logo="oxford" />
          </div>
        </div>

        <div style={{ ...clip, marginTop: "clamp(20px, 3vh, 32px)" }}>
          <p
            data-mask-inner
            style={{
              ...bioStyle,
              opacity: 0.5,
              maxWidth: "640px"
            }}
          >
            We were the customer before we were the company. Between us: a
            jewelry brand, a freelance practice, a hedge fund&apos;s agent
            stack, and every invoice, DM, and follow-up that came with them. We
            onboard every tester ourselves.
          </p>
        </div>
      </div>
    </section>
  )
}
