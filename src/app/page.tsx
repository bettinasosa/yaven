"use client"

import { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HeroSectionND } from "@/components/sections/hero-section-nd"
import { MeetYavenSection } from "@/components/sections/meet-yaven-section"
import { ProposalsCrmSection } from "@/components/sections/proposals-crm-section"
import { TriageSection } from "@/components/sections/triage-section"
import { CommandsSection } from "@/components/sections/commands-section"
import { FooterCTASection } from "@/components/sections/footer-cta-section"
import { FooterSection } from "@/components/sections/footer-section"

gsap.registerPlugin(ScrollTrigger)

const FOOTER_H = 660

// Card entrance — section slides up with rounded top corners that flatten on arrival
function CardWrap({ children, z }: { children: React.ReactNode; z: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const anim = gsap.fromTo(
      ref.current,
      { borderRadius: "72px 72px 0 0" },
      {
        borderRadius: "0 0 0 0",
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.2
        }
      }
    )
    return () => {
      anim.scrollTrigger?.kill()
    }
  }, [])
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        zIndex: z,
        borderRadius: "72px 72px 0 0",
        overflow: "clip",
        boxShadow: "0 -16px 64px rgba(0,0,0,0.22)"
      }}
    >
      {children}
    </div>
  )
}

function StickyGetYaven() {
  const btnRef = useRef<HTMLDivElement>(null)
  const onCream = useRef(false)

  const checkOverlap = useCallback(() => {
    if (!btnRef.current) return
    const btnRect = btnRef.current.getBoundingClientRect()
    const btnMid = btnRect.top + btnRect.height / 2
    const creamEls = document.querySelectorAll("[data-cream]")
    let hit = false
    creamEls.forEach(el => {
      const r = el.getBoundingClientRect()
      if (btnMid >= r.top && btnMid <= r.bottom) hit = true
    })
    if (hit !== onCream.current) {
      onCream.current = hit
      btnRef.current.classList.toggle("get-yaven-cream", hit)
    }
  }, [])

  useEffect(() => {
    if (!btnRef.current) return

    gsap.set(btnRef.current, { x: 120, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "100vh top",
      onEnter: () => {
        gsap.to(btnRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        })
      },
      onLeaveBack: () => {
        gsap.to(btnRef.current, {
          x: 120,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in"
        })
      }
    })

    window.addEventListener("scroll", checkOverlap, { passive: true })
    checkOverlap()

    return () => {
      trigger.kill()
      window.removeEventListener("scroll", checkOverlap)
    }
  }, [checkOverlap])

  return (
    <div
      ref={btnRef}
      style={{
        position: "fixed",
        top: "clamp(16px, 2.5vh, 28px)",
        right: "clamp(28px, 4vw, 48px)",
        zIndex: 999
      }}
    >
      <div className="glass-wrap">
        <div className="glass-shadow" />
        <a
          href="#waitlist"
          className="glass-btn"
          style={{ whiteSpace: "nowrap" }}
        >
          <span>Get Yaven</span>
        </a>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <StickyGetYaven />
      <HeroSectionND />
      <MeetYavenSection />
      <CardWrap z={3}>
        <div data-cream>
          <TriageSection />
          <ProposalsCrmSection />
        </div>
      </CardWrap>
      <div
        style={{
          position: "relative",
          zIndex: 5,
          background: "var(--cream)",
          paddingTop: "80px"
        }}
      >
        <CommandsSection />
      </div>
      <FooterCTASection />

      {/* ── Sticky footer ── */}
      <div
        className="relative"
        style={{
          height: FOOTER_H,
          clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
          zIndex: 1
        }}
      >
        <div
          style={{
            position: "relative",
            height: `calc(100vh + ${FOOTER_H}px)`,
            top: "-100vh"
          }}
        >
          <div
            style={{
              height: FOOTER_H,
              position: "sticky",
              top: `calc(100vh - ${FOOTER_H}px)`
            }}
          >
            <FooterSection />
          </div>
        </div>
      </div>
    </>
  )
}
