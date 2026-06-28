"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { bookDemoHref } from "@/lib/contact"
import dynamic from "next/dynamic"

const LiquidGradientBg = dynamic(
  () =>
    import("@/components/effects/liquid-gradient-bg").then(
      m => m.LiquidGradientBg
    ),
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

// ── Receipt items ───────────────────────────────────────────────────────────

const RECEIPT_ITEMS = [
  { label: "Beta access", qty: 1, price: "$0.00" },
  { label: "Priority features", qty: 1, price: "$0.00" },
  { label: "Direct team line", qty: 1, price: "$0.00" },
  { label: "Founding credit", qty: 1, price: "$0.00" },
  { label: "Skip the waitlist", qty: 1, price: "$0.00" },
]

function ReceiptRow({ label, qty, price }: { label: string; qty: number; price: string }) {
  const sans = "var(--font-satoshi), sans-serif"
  return (
    <div style={{ padding: "6px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: sans,
          fontSize: 13,
          color: "#0a0e1a",
          fontWeight: 500,
        }}
      >
        <span>{label}</span>
        <span
          style={{
            flex: 1,
            borderBottom: "1px dotted rgba(10,14,26,0.12)",
            minWidth: 24,
            margin: "0 8px",
            marginBottom: 3,
          }}
        />
        <span>{price}</span>
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 10,
          color: "rgba(10,14,26,0.3)",
          marginTop: 2,
        }}
      >
        QTY: {qty}
      </div>
    </div>
  )
}

// ── Founding Member Card — receipt that peeks from bottom ───────────────────

function FoundingMemberCard({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      y: hovered ? 0 : 380,
      duration: 0.5,
      ease: hovered ? "power3.out" : "power2.inOut",
    })
  }, [hovered])

  // Entry animation
  useEffect(() => {
    if (!cardRef.current) return
    gsap.set(cardRef.current, { y: 520, opacity: 0 })
    gsap.to(cardRef.current, {
      y: 380,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 1.2,
    })
  }, [])

  // Scroll-driven: slide receipt up as hero scrolls out so it doesn't clip
  useEffect(() => {
    if (!wrapRef.current || !sectionRef.current) return
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        if (!wrapRef.current) return
        // As hero exits viewport, move receipt up by its scroll progress
        const yShift = self.progress * -500
        wrapRef.current.style.transform = `translateY(${yShift}px)`
      },
    })
    return () => st.kill()
  }, [sectionRef])

  const sans = "var(--font-satoshi), sans-serif"
  const bricolage = "var(--font-bricolage), sans-serif"

  return (
    <div
      ref={wrapRef}
      className="absolute bottom-[clamp(20px,3vh,40px)] left-[clamp(60px,8vw,120px)] z-10 hidden md:block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", willChange: "transform" }}
    >
      <div
        ref={cardRef}
        style={{
          width: 320,
          background: "#F5F1E8",
          backgroundImage: [
            // Paper grain
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            // Subtle warm gradient at edges (thermal paper yellowing)
            "linear-gradient(180deg, rgba(230,220,200,0.15) 0%, transparent 8%, transparent 92%, rgba(230,220,200,0.1) 100%)",
            // Slight horizontal banding like a thermal printer
            `repeating-linear-gradient(180deg, transparent, transparent 3px, rgba(0,0,0,0.008) 3px, rgba(0,0,0,0.008) 4px)`,
          ].join(", "),
          boxShadow:
            "0 12px 50px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06), inset 0 0 80px rgba(120,100,60,0.04)",
          padding: 0,
          display: "flex",
          flexDirection: "column" as const,
          overflow: "visible",
          borderRadius: "3px 3px 0 0",
        }}
      >
        {/* Torn/zigzag top edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -6,
            left: 0,
            right: 0,
            height: 6,
            background:
              `url("data:image/svg+xml,%3Csvg width='12' height='6' viewBox='0 0 12 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,6 6,0 12,6' fill='%23F5F1E8'/%3E%3C/svg%3E")`,
            backgroundSize: "12px 6px",
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* Receipt header */}
        <div
          style={{
            padding: "24px 28px 18px",
            textAlign: "center" as const,
            borderBottom: "1px dashed rgba(10,14,26,0.12)",
          }}
        >
          <p
            style={{
              fontFamily: sans,
              fontSize: 10,
              fontWeight: 500,
              color: "rgba(10,14,26,0.35)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.14em",
              margin: 0,
            }}
          >
            Yaven Inc.
          </p>
          <p
            style={{
              fontFamily: bricolage,
              fontSize: 22,
              fontWeight: 600,
              color: "#0a0e1a",
              margin: "10px 0 4px",
              lineHeight: 1.15,
            }}
          >
            Founding Beta User
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: 10,
              color: "rgba(10,14,26,0.3)",
              margin: 0,
            }}
          >
            Receipt #001
          </p>
        </div>

        {/* Date / order meta */}
        <div
          style={{
            padding: "12px 28px",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px dashed rgba(10,14,26,0.12)",
          }}
        >
          <span
            style={{
              fontFamily: sans,
              fontSize: 10,
              color: "rgba(10,14,26,0.35)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.06em",
            }}
          >
            Date: {new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
          </span>
          <span
            style={{
              fontFamily: sans,
              fontSize: 10,
              color: "rgba(10,14,26,0.35)",
              letterSpacing: "0.06em",
            }}
          >
            REG #01
          </span>
        </div>

        {/* Line items */}
        <div style={{ padding: "10px 28px 6px" }}>
          {RECEIPT_ITEMS.map(item => (
            <ReceiptRow
              key={item.label}
              label={item.label}
              qty={item.qty}
              price={item.price}
            />
          ))}
        </div>

        {/* Dashed divider */}
        <div
          style={{
            borderBottom: "1px dashed rgba(10,14,26,0.12)",
            margin: "4px 28px",
          }}
        />

        {/* Item count + total */}
        <div style={{ padding: "12px 28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: sans,
              fontSize: 11,
              color: "rgba(10,14,26,0.4)",
              marginBottom: 6,
            }}
          >
            <span>ITEM COUNT</span>
            <span>{RECEIPT_ITEMS.length}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 700,
                color: "#0a0e1a",
                textTransform: "uppercase" as const,
                letterSpacing: "0.06em",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: bricolage,
                fontSize: 16,
                fontWeight: 600,
                fontStyle: "italic",
                color: "rgba(10,14,26,0.5)",
              }}
            >
              Just your feedback
            </span>
          </div>
        </div>

        {/* Dashed divider */}
        <div
          style={{
            borderBottom: "1px dashed rgba(10,14,26,0.12)",
            margin: "0 28px",
          }}
        />

        {/* CTA */}
        <div style={{ padding: "16px 28px 24px" }}>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("yaven:open-beta"))}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 999,
              border: "none",
              background: "#267fe5",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: sans,
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "transform 160ms ease-out, background 150ms ease",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#1b6fd4"
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#267fe5"
            }}
            onMouseDown={e => {
              e.currentTarget.style.transform = "scale(0.97)"
            }}
            onMouseUp={e => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            Claim your spot
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Mobile Receipt — fixed bottom-right, slides up from below ──────────────

function MobileReceiptCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const sans = "var(--font-satoshi), sans-serif"
  const bricolage = "var(--font-bricolage), sans-serif"

  // Slide up from bottom after a delay
  useEffect(() => {
    if (!cardRef.current) return
    gsap.set(cardRef.current, { y: 160, opacity: 0 })
    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      delay: 1.6,
    })
  }, [])

  return (
    <div
      ref={cardRef}
      className="fixed bottom-4 right-4 z-50 block md:hidden"
    >
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("yaven:open-beta"))}
        style={{
          width: 210,
          background: "#F5F1E8",
          backgroundImage: [
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
            "linear-gradient(180deg, rgba(230,220,200,0.12) 0%, transparent 10%, transparent 90%, rgba(230,220,200,0.08) 100%)",
            `repeating-linear-gradient(180deg, transparent, transparent 3px, rgba(0,0,0,0.008) 3px, rgba(0,0,0,0.008) 4px)`,
          ].join(", "),
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.1), inset 0 0 40px rgba(120,100,60,0.04)",
          borderRadius: "3px 3px 0 0",
          border: "none",
          padding: 0,
          cursor: "pointer",
          textAlign: "left" as const,
          display: "flex",
          flexDirection: "column" as const,
          overflow: "visible",
          position: "relative" as const,
          transition: "transform 160ms ease-out",
        }}
        onTouchStart={e => {
          e.currentTarget.style.transform = "scale(0.97)"
        }}
        onTouchEnd={e => {
          e.currentTarget.style.transform = "scale(1)"
        }}
      >
        {/* Torn zigzag top edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -6,
            left: 0,
            right: 0,
            height: 6,
            background:
              `url("data:image/svg+xml,%3Csvg width='12' height='6' viewBox='0 0 12 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,6 6,0 12,6' fill='%23F5F1E8'/%3E%3C/svg%3E")`,
            backgroundSize: "12px 6px",
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* Receipt header */}
        <div
          style={{
            padding: "14px 16px 10px",
            textAlign: "center" as const,
            borderBottom: "1px dashed rgba(10,14,26,0.1)",
          }}
        >
          <p
            style={{
              fontFamily: sans,
              fontSize: 8,
              fontWeight: 500,
              color: "rgba(10,14,26,0.3)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.12em",
              margin: 0,
            }}
          >
            Yaven Inc.
          </p>
          <p
            style={{
              fontFamily: bricolage,
              fontSize: 15,
              fontWeight: 600,
              color: "#0a0e1a",
              margin: "5px 0 2px",
              lineHeight: 1.2,
            }}
          >
            Founding Beta User
          </p>
          <p
            style={{
              fontFamily: sans,
              fontSize: 8,
              color: "rgba(10,14,26,0.25)",
              margin: 0,
            }}
          >
            Receipt #001
          </p>
        </div>

        {/* Line items with dot leaders */}
        <div style={{ padding: "8px 16px 6px" }}>
          {RECEIPT_ITEMS.slice(0, 3).map(item => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 4,
                fontFamily: sans,
                fontSize: 11,
                color: "rgba(10,14,26,0.5)",
                padding: "3px 0",
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
              <span
                style={{
                  flex: 1,
                  borderBottom: "1px dotted rgba(10,14,26,0.1)",
                  minWidth: 12,
                  marginBottom: 2,
                }}
              />
              <span style={{ whiteSpace: "nowrap" }}>{item.price}</span>
            </div>
          ))}
          <div
            style={{
              fontFamily: sans,
              fontSize: 9,
              color: "rgba(10,14,26,0.25)",
              padding: "2px 0 0",
            }}
          >
            +{RECEIPT_ITEMS.length - 3} more items
          </div>
        </div>

        {/* Dashed divider */}
        <div
          style={{
            borderBottom: "1px dashed rgba(10,14,26,0.1)",
            margin: "4px 16px",
          }}
        />

        {/* Total + CTA */}
        <div style={{ padding: "8px 16px 14px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: sans,
                fontSize: 10,
                fontWeight: 700,
                color: "#0a0e1a",
                textTransform: "uppercase" as const,
                letterSpacing: "0.04em",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: bricolage,
                fontSize: 12,
                fontWeight: 600,
                fontStyle: "italic",
                color: "rgba(10,14,26,0.45)",
              }}
            >
              Your feedback
            </span>
          </div>
          <div
            style={{
              textAlign: "center" as const,
              fontFamily: sans,
              fontSize: 12,
              fontWeight: 600,
              color: "#267fe5",
            }}
          >
            Claim your spot &rarr;
          </div>
        </div>
      </button>
    </div>
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
            The AI assistant that lives in your menu bar,
            <br />
            it handles the admin that eats your day
            <br />
            across all your <AppsWord />. All of it!
          </p>

          <div ref={ctaRef}>
            <BlueprintPanel />
          </div>
        </div>
      </div>

      {/* Founding member card — peeks from bottom left (desktop) */}
      <FoundingMemberCard sectionRef={sectionRef} />

      {/* Mobile receipt — fixed bottom-right, slides up */}
      <MobileReceiptCard />

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
