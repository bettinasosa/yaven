"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HeroSectionND } from "@/components/sections/hero-section-nd"
import { MeetYavenSection } from "@/components/sections/meet-yaven-section"
import { TriageSection } from "@/components/sections/triage-section"
import { ProposalsCrmSection } from "@/components/sections/proposals-crm-section"
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

export default function Home() {
  return (
    <>
      <HeroSectionND />
      <MeetYavenSection />
      <CardWrap z={3}>
        <ProposalsCrmSection />
      </CardWrap>
      <div
        style={{
          position: "relative",
          zIndex: 4,
          background: "#fff",
          paddingTop: "80px"
        }}
      >
        <div
          style={{
            borderRadius: "48px 48px 0 0",
            overflow: "clip",
            boxShadow: "0 -16px 64px rgba(0,0,0,0.18)"
          }}
        >
          <CommandsSection />
        </div>
      </div>
      {/* <TriageSection /> */}
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
