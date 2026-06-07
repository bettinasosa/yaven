"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import { Sparkles, Mail, FileText, Bell } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const PRIMARY_BLUE = "#267FE5"

// The stream — five inboxes' worth of noise
const STREAM = [
  "Invoice #214, 47 days overdue",
  "Re: contract redlines",
  "Can we move Thursday's call?",
  "AI Weekly: your Tuesday digest",
  "Intro: Maya ↔ you",
  "Your receipt from Figma",
  "Re: proposal timeline?",
  "3 new connection requests",
  "Quick question about pricing",
  "Webinar invite: Q3 outlook"
]

const chipStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 18px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.06)",
  fontSize: "clamp(13px, 1.4vw, 15px)",
  fontWeight: 500,
  color: "#fff",
  whiteSpace: "nowrap"
}

/* ── Display Card (glass variant) ────────────────────────────── */

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-200" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-white/90"
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-44 w-[26rem] skew-y-[-8deg] select-none flex-col justify-between rounded-2xl border border-white/20 bg-[#4a9af0]/40 backdrop-blur-2xl px-5 py-4 transition-all duration-500 ease-out",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
        "hover:bg-[#4a9af0]/55 hover:border-white/40",
        "*:flex *:items-center *:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-white/20 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-white/80">{description}</p>
      <p className="text-white/50">{date}</p>
    </div>
  )
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      icon: <Mail className="size-4 text-white" />,
      title: "Sorted by you, not by time",
      description: "Client intros and deadline threads surface first.",
      date: "Priorities first",
      titleClassName: "text-white/90",
      className:
        "[grid-area:stack] opacity-70 hover:opacity-100 hover:-translate-y-10"
    },
    {
      icon: <FileText className="size-4 text-white" />,
      title: "Drafted in your voice",
      description: "Follow-ups and proposals, ready to send.",
      date: "Your tone, always",
      titleClassName: "text-white",
      className:
        "[grid-area:stack] translate-x-20 translate-y-14 opacity-70 hover:opacity-100 hover:translate-y-2"
    },
    {
      icon: <Bell className="size-4 text-white" />,
      title: "Briefed without asking",
      description: "Context from past conversations, ready.",
      date: "Always prepared",
      titleClassName: "text-white",
      className:
        "[grid-area:stack] translate-x-40 translate-y-28 hover:translate-y-16"
    }
  ]

  const displayCards = cards || defaultCards

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */

export function TriageSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const staticLayout = usePrefersReducedMotion()

  useEffect(() => {
    if (staticLayout || !wrapperRef.current) return

    gsap.set(textRef.current, { y: 50, opacity: 0 })
    gsap.set(marqueeRef.current, { opacity: 0 })
    if (boardRef.current) gsap.set(boardRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    })

    tl.to(
      textRef.current,
      { y: 0, opacity: 1, ease: "power3.out", duration: 1 },
      0
    )
    tl.to(marqueeRef.current, { opacity: 1, duration: 1 }, 0.5)

    if (boardRef.current) {
      tl.to(
        boardRef.current,
        { y: 0, opacity: 1, ease: "power3.out", duration: 1 },
        0.2
      )
    }

    tl.to({}, { duration: 1.6 })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [staticLayout])

  const marquee = (
    <div
      ref={marqueeRef}
      className="testimonial-marquee"
      style={{ width: "100%" }}
    >
      <div
        className="testimonial-marquee-track"
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
          animationDuration: "38s",
          padding: "8px 0"
        }}
      >
        {[...STREAM, ...STREAM].map((msg, i) => (
          <span key={i} style={{ ...chipStyle, opacity: 0.7 }}>
            {msg}
          </span>
        ))}
      </div>
    </div>
  )

  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "clamp(32px, 4vw, 64px)",
        maxWidth: "1200px",
        width: "100%",
        padding: "0 clamp(24px, 4vw, 48px)",
        flexWrap: "wrap"
      }}
    >
      {/* Left: text */}
      <div ref={textRef} style={{ flex: "1 1 340px", minWidth: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(36px, 5.5vw, 76px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "#FFF",
            margin: 0
          }}
        >
          Your real work starts when the admin ends
        </h2>
        <p
          style={{
            fontSize: "clamp(16px, 1.9vw, 22px)",
            fontWeight: 500,
            lineHeight: 1.45,
            color: "#FFF",
            opacity: 0.65,
            maxWidth: "460px",
            margin: "20px 0 0"
          }}
        >
          Priorities, not just notifications.
        </p>
      </div>

      {/* Right: cards */}
      <div ref={boardRef} style={{ flex: "0 0 auto", marginRight: "3rem" }}>
        <DisplayCards />
      </div>
    </div>
  )

  if (staticLayout) {
    return (
      <section
        style={{
          background: PRIMARY_BLUE,
          padding: "clamp(100px, 15vh, 180px) 0",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div style={{ marginBottom: "clamp(40px, 6vh, 80px)" }}>{marquee}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          {content}
        </div>
      </section>
    )
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        height: "400vh",
        background: PRIMARY_BLUE
      }}
    >
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px, 4vh, 48px) 0"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "clamp(16px, 3vh, 32px)",
            width: "100%"
          }}
        >
          {marquee}
        </div>
        {content}
      </section>
    </div>
  )
}
