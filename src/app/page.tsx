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
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { useIsMobile } from "@/components/effects/use-is-mobile"

gsap.registerPlugin(ScrollTrigger)

const FOOTER_H = 660

// Card entrance — section slides up with rounded top corners that flatten on arrival
function CardWrap({
  children,
  z,
  behindBg
}: {
  children: React.ReactNode
  z: number
  behindBg?: string
}) {
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
    <div style={{ position: "relative", zIndex: z, background: behindBg }}>
      <div
        ref={ref}
        style={{
          position: "relative",
          borderRadius: "72px 72px 0 0",
          overflow: "clip",
          boxShadow: "0 -16px 64px rgba(0,0,0,0.22)"
        }}
      >
        {children}
      </div>
    </div>
  )
}

function StickyGetYaven() {
  const isMobile = useIsMobile()
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

  const pastHero = useRef(false)
  const beforeCta = useRef(true)

  useEffect(() => {
    if (!btnRef.current) return

    gsap.set(btnRef.current, { x: 120, opacity: 0 })

    // Visible only once past the hero AND before the final CTA section.
    const apply = () => {
      const visible = pastHero.current && beforeCta.current
      gsap.to(btnRef.current, {
        x: visible ? 0 : 120,
        opacity: visible ? 1 : 0,
        duration: visible ? 0.5 : 0.35,
        ease: visible ? "power3.out" : "power2.in"
      })
    }

    // Appear as the first Meet Yaven slide scrolls in (not just after one
    // viewport of hero scroll).
    const meetYaven = document.querySelector<HTMLElement>("[data-meet-yaven]")
    const heroTrigger = ScrollTrigger.create({
      trigger: meetYaven ?? document.body,
      start: meetYaven ? "top 70%" : "100vh top",
      onEnter: () => {
        pastHero.current = true
        apply()
      },
      onLeaveBack: () => {
        pastHero.current = false
        apply()
      }
    })

    // Hide from the "Focus on the work only you can do." CTA onward.
    const cta = document.querySelector<HTMLElement>("[data-hide-getyaven]")
    const ctaTrigger = cta
      ? ScrollTrigger.create({
          trigger: cta,
          start: "top 70%",
          onEnter: () => {
            beforeCta.current = false
            apply()
          },
          onLeaveBack: () => {
            beforeCta.current = true
            apply()
          }
        })
      : null

    window.addEventListener("scroll", checkOverlap, { passive: true })
    checkOverlap()

    return () => {
      heroTrigger.kill()
      ctaTrigger?.kill()
      window.removeEventListener("scroll", checkOverlap)
    }
  }, [checkOverlap])

  // The floating "Get Yaven" button doesn't follow the page on mobile.
  if (isMobile) return null

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
      <BlueprintPanel />
    </div>
  )
}

export default function Home() {
  const isMobile = useIsMobile()

  // Mobile and desktop layouts have very different heights. When the layout
  // switches (incl. the post-hydration mobile collapse), recompute all
  // ScrollTrigger positions so scroll-driven reveals (e.g. the footer CTA
  // "Less admin. More flow.") fire at the right spot instead of staying hidden.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [isMobile])

  return (
    <>
      <StickyGetYaven />
      <HeroSectionND />
      <MeetYavenSection />
      <CardWrap z={3} behindBg="var(--primary)">
        <div data-cream>
          <TriageSection />
        </div>
      </CardWrap>
      <div
        style={{
          position: "relative",
          zIndex: 5,
          background: "var(--cream)",
          paddingTop: "80px",
          marginTop: "-2px"
        }}
      >
        <CommandsSection />
      </div>
      <CardWrap z={3} behindBg="var(--primary)">
        <div data-cream>
          <ProposalsCrmSection />
        </div>
      </CardWrap>
      <CardWrap z={4} behindBg="var(--cream)">
        <div
          style={{
            position: "relative",
            zIndex: 5,
            background: "var(--primary)",
            paddingTop: "80px",
            marginTop: "-2px"
          }}
        >
          <FooterCTASection />
        </div>
      </CardWrap>

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
