"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const PIN_AMOUNT = 1400

const SKY = "#B8D6F2"
const INK = "#07348B"
const T1 = "rgba(255,255,255,0.92)"
const T2 = "rgba(255,255,255,0.42)"
const DIV = "rgba(255,255,255,0.09)"

// glass token reused across cards
const GLASS_CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(24px) saturate(1.4)",
  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.13)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)"
}

const ACTIVE_APPS = [
  { label: "Gmail", sub: "active now", src: "/logos/gmail.png" },
  { label: "Notion", sub: "active now", src: "/logos/notion.png" },
  { label: "HubSpot", sub: "active now", src: "/logos/hubspot.png" },
  { label: "Excel", sub: "active now", src: "/logos/excel.png" }
]

function TelegramIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        flexShrink: 0,
        background: "rgba(42,171,238,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 2L11 13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 2L15 22L11 13L2 9L22 2Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function ProductPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const appsRowRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const calRef = useRef<HTMLDivElement>(null)
  const msg1Ref = useRef<HTMLDivElement>(null)
  const msg2Ref = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.set(headingRef.current, { opacity: 0, y: 24 })
    gsap.set(cardRef.current, { opacity: 0, y: 40, scale: 0.97 })

    const entrance = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 78%",
      onEnter: () => {
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out"
        })
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          delay: 0.12
        })
      }
    })

    const drop = dropRef.current!
    const fullH = drop.scrollHeight

    gsap.set(drop, { height: 0, overflow: "hidden" })
    gsap.set(
      [
        appsRowRef.current,
        mediaRef.current,
        calRef.current,
        msg1Ref.current,
        msg2Ref.current,
        moreRef.current
      ],
      { opacity: 0, y: 8 }
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${PIN_AMOUNT}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2
      }
    })

    tl.to(drop, { height: fullH, duration: 2.2, ease: "power2.inOut" })
      .to(appsRowRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .to(mediaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.0)
      .to(calRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.3)
      .to(msg1Ref.current, { opacity: 1, y: 0, duration: 0.7 }, 1.8)
      .to(msg2Ref.current, { opacity: 1, y: 0, duration: 0.7 }, 2.2)
      .to(moreRef.current, { opacity: 1, y: 0, duration: 0.6 }, 2.6)

    return () => {
      entrance.kill()
      tl.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: `linear-gradient(to bottom, ${SKY} 0%, ${SKY} 72%, #267FE5 100%)`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
        overflow: "hidden"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "160px",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          background:
            "linear-gradient(to bottom, rgba(184,214,242,0.95) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 2
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "860px",
          padding: "clamp(60px,8vw,100px) clamp(24px,6vw,64px)",
          position: "relative",
          zIndex: 3,
          textAlign: "center"
        }}
      >
        {/* ── Heading ──────────────────────────────────────────────── */}
        <div ref={headingRef} style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: "var(--font-space-mono),monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: INK,
              opacity: 0.5,
              marginBottom: "14px"
            }}
          >
            The app
          </p>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(28px,4.5vw,52px)",
              lineHeight: 1.08,
              color: INK,
              marginBottom: "14px"
            }}
          >
            Always briefed. Never asked.
          </h2>
          <p
            style={{
              fontSize: "clamp(15px,1.7vw,19px)",
              lineHeight: 1.55,
              color: INK,
              opacity: 0.58,
              maxWidth: "460px",
              margin: "0 auto"
            }}
          >
            Sits in your menu bar. Watches every open app, message, and doc — so
            your context is always live, and your AI is always ready.
          </p>
        </div>

        {/* ── Illustration card ────────────────────────────────────── */}
        <div ref={cardRef}>
          {/* Liquid-glass outer shell — blue rim picks up SKY background */}
          <div
            style={{
              background: "rgba(12,18,32,0.38)",
              backdropFilter: "blur(60px) saturate(1.5)",
              WebkitBackdropFilter: "blur(60px) saturate(1.5)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "24px",
              boxShadow: `0 0 0 6px rgba(184,214,242,0.28),
               0 0 0 7px rgba(255,255,255,0.06),
               0 40px 100px rgba(0,0,0,0.35)`,
              overflow: "hidden",
              width: "100%"
            }}
          >
            {/* ── macOS menu bar ──────────────────────────────────── */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                padding: "9px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${DIV}`,
                position: "relative"
              }}
            >
              <div
                style={{ display: "flex", gap: "7px", alignItems: "center" }}
              >
                {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: c
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "var(--font-dm-sans),sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: T2,
                  letterSpacing: "0.01em"
                }}
              >
                yaven
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={T2}
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
                <div style={{ position: "relative" }}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={T2}
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-5px",
                      background: "#FF6B2B",
                      color: "#fff",
                      fontFamily: "var(--font-space-mono)",
                      fontSize: "7px",
                      fontWeight: 700,
                      width: "13px",
                      height: "13px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    5
                  </span>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke={T2}
                    strokeWidth="2"
                  />
                  <polygon points="10,8 16,12 10,16" fill={T2} />
                </svg>
              </div>
            </div>

            {/* ── Animated dropdown ───────────────────────────────── */}
            <div
              ref={dropRef}
              style={{
                background: "rgba(10,14,26,0.55)",
                backdropFilter: "blur(40px) saturate(1.3)",
                WebkitBackdropFilter: "blur(40px) saturate(1.3)"
              }}
            >
              {/* active apps row */}
              <div
                ref={appsRowRef}
                style={{
                  padding: "14px 14px 10px",
                  display: "flex",
                  gap: "10px"
                }}
              >
                {ACTIVE_APPS.map(({ label, sub, src }) => (
                  <div
                    key={label}
                    style={{
                      flex: 1,
                      ...GLASS_CARD,
                      borderRadius: "12px",
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        flexShrink: 0,
                        background: "rgba(255,255,255,0.10)",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        src={src}
                        alt={label}
                        width={28}
                        height={28}
                        style={{
                          objectFit: "contain",
                          width: "28px",
                          height: "28px"
                        }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: T1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontFamily: "var(--font-dm-sans),sans-serif"
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: T2,
                          marginTop: "2px",
                          fontFamily: "var(--font-dm-sans),sans-serif"
                        }}
                      >
                        {sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* content row */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "4px 14px 14px"
                }}
              >
                {/* Left: album art */}
                <div
                  ref={mediaRef}
                  style={{
                    flex: "0 0 45%",
                    display: "flex",
                    flexDirection: "column",
                    ...GLASS_CARD,
                    borderRadius: "14px",
                    overflow: "hidden"
                  }}
                >
                  {/* Pink Floyd prism SVG — inset with its own rounded clip */}
                  <div
                    style={{
                      margin: "10px 10px 0",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.4)",
                      flex: 1,
                      position: "relative"
                    }}
                  >
                    <svg
                      viewBox="0 0 400 400"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "100%", display: "block" }}
                    >
                      <defs>
                        <radialGradient id="pGlow" cx="50%" cy="28%" r="55%">
                          <stop
                            offset="0%"
                            stopColor="#9DCFE8"
                            stopOpacity="0.70"
                          />
                          <stop
                            offset="45%"
                            stopColor="#3A7A9C"
                            stopOpacity="0.35"
                          />
                          <stop
                            offset="100%"
                            stopColor="#0D1F2A"
                            stopOpacity="0.10"
                          />
                        </radialGradient>
                        <filter
                          id="bGlow"
                          x="-30%"
                          y="-300%"
                          width="160%"
                          height="700%"
                        >
                          <feGaussianBlur stdDeviation="2" result="b" />
                          <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <filter
                          id="rbGlow"
                          x="-5%"
                          y="-20%"
                          width="110%"
                          height="140%"
                        >
                          <feGaussianBlur stdDeviation="1.4" result="b" />
                          <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <rect width="400" height="400" fill="#060606" />
                      {/* incoming beam */}
                      <line
                        x1="0"
                        y1="193"
                        x2="154"
                        y2="193"
                        stroke="white"
                        strokeWidth="1.4"
                        filter="url(#bGlow)"
                        opacity="0.92"
                      />
                      {/* prism */}
                      <polygon
                        points="200,86 113,280 287,280"
                        fill="url(#pGlow)"
                        stroke="rgba(160,210,235,0.55)"
                        strokeWidth="1.5"
                      />
                      {/* rainbow */}
                      <g filter="url(#rbGlow)">
                        <polygon
                          points="247,183 400,122 400,143"
                          fill="#E8302A"
                          opacity="0.95"
                        />
                        <polygon
                          points="247,183 400,143 400,159"
                          fill="#E86C1A"
                          opacity="0.95"
                        />
                        <polygon
                          points="247,183 400,159 400,174"
                          fill="#EEC91A"
                          opacity="0.95"
                        />
                        <polygon
                          points="247,183 400,174 400,192"
                          fill="#34B53A"
                          opacity="0.95"
                        />
                        <polygon
                          points="247,183 400,192 400,210"
                          fill="#22A8CC"
                          opacity="0.95"
                        />
                        <polygon
                          points="247,183 400,210 400,229"
                          fill="#2852C8"
                          opacity="0.95"
                        />
                        <polygon
                          points="247,183 400,229 400,254"
                          fill="#7C28A8"
                          opacity="0.95"
                        />
                      </g>
                    </svg>
                  </div>

                  {/* player bar */}
                  <div
                    style={{
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: `1px solid ${DIV}`
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: T1,
                          fontFamily: "var(--font-dm-sans),sans-serif",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        The Dark Side of the Moon
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: T2,
                          marginTop: "1px",
                          fontFamily: "var(--font-dm-sans),sans-serif"
                        }}
                      >
                        Pink Floyd
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexShrink: 0,
                        marginLeft: "10px"
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill={T2}>
                        <polygon points="19,5 9,12 19,19" />
                        <rect x="5" y="5" width="3" height="14" rx="1" />
                      </svg>
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.14)",
                          border: "1px solid rgba(255,255,255,0.22)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                      </div>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill={T2}>
                        <polygon points="5,5 15,12 5,19" />
                        <rect x="16" y="5" width="3" height="14" rx="1" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  {/* Calendar */}
                  <div
                    ref={calRef}
                    style={{
                      ...GLASS_CARD,
                      borderRadius: "14px",
                      padding: "14px 16px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px"
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans),sans-serif",
                          fontSize: "42px",
                          fontWeight: 800,
                          lineHeight: 1,
                          color: T1
                        }}
                      >
                        4
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: T1,
                            fontFamily: "var(--font-dm-sans),sans-serif",
                            lineHeight: 1.2
                          }}
                        >
                          June
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: T2,
                            fontFamily: "var(--font-dm-sans),sans-serif"
                          }}
                        >
                          Thursday
                        </div>
                      </div>
                    </div>
                    {/* meeting row */}
                    <div
                      style={{
                        marginTop: "10px",
                        paddingTop: "10px",
                        borderTop: `1px solid ${DIV}`,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                    >
                      {/* blue accent bar */}
                      <div
                        style={{
                          width: 3,
                          alignSelf: "stretch",
                          borderRadius: 2,
                          background: "#267FE5",
                          flexShrink: 0
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: T1,
                            fontFamily: "var(--font-dm-sans),sans-serif"
                          }}
                        >
                          team health check :)
                        </div>
                        <div
                          style={{
                            fontSize: "10px",
                            color: T2,
                            marginTop: "1px",
                            fontFamily: "var(--font-dm-sans),sans-serif"
                          }}
                        >
                          7:00 PM
                        </div>
                      </div>
                      <button
                        style={{
                          background: "#267FE5",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "4px 10px",
                          fontFamily: "var(--font-dm-sans),sans-serif",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                          flexShrink: 0
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div
                    style={{
                      ...GLASS_CARD,
                      borderRadius: "14px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      ref={msg1Ref}
                      style={{
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        borderBottom: `1px solid ${DIV}`
                      }}
                    >
                      <TelegramIcon />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: T1,
                            fontFamily: "var(--font-dm-sans),sans-serif"
                          }}
                        >
                          Telegram
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: T2,
                            marginTop: "2px",
                            fontFamily: "var(--font-dm-sans),sans-serif",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          Login code: 59248. Do not give this...
                        </div>
                      </div>
                    </div>
                    <div
                      ref={msg2Ref}
                      style={{
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px"
                      }}
                    >
                      <TelegramIcon />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: T1,
                            fontFamily: "var(--font-dm-sans),sans-serif"
                          }}
                        >
                          Dai Dai Tran
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: T2,
                            marginTop: "2px",
                            fontFamily: "var(--font-dm-sans),sans-serif",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          Dai Dai Tran: I asked the editing guy...
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* +more */}
                  <div
                    ref={moreRef}
                    style={{ textAlign: "center", padding: "2px 0" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: T2,
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans),sans-serif",
                        fontWeight: 600
                      }}
                    >
                      +3 more →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* caption */}
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              fontFamily: "var(--font-dm-sans),sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: INK,
              opacity: 0.5,
              marginTop: "16px"
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
            >
              <path d="M12 2l2.5 7H22l-6 4.5L18.5 21 12 16.5 5.5 21 8 13.5 2 9h7.5z" />
            </svg>
            Context pulled, ready before you ask
          </p>
        </div>
      </div>
    </section>
  )
}
