"use client"

import { useState } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { TextParallaxSection } from "@/components/sections/text-parallax-section"
import { MeetYavenSection } from "@/components/sections/meet-yaven-section"
import { TriageSection } from "@/components/sections/triage-section"
import { ProposalsCrmSection } from "@/components/sections/proposals-crm-section"
import { CommandsSection } from "@/components/sections/commands-section"
import { FooterCTASection } from "@/components/sections/footer-cta-section"
import { FooterSection } from "@/components/sections/footer-section"
import { HeroSectionND } from "@/components/sections/hero-section-nd"
import { TextParallaxSectionND } from "@/components/sections/text-parallax-section-nd"
import { LocomotiveSections } from "@/components/sections/locomotive-sections"
import { MindMarketLayout } from "@/components/sections/mindmarket-layout"

const FOOTER_H = 660

type Layout = "betts" | "newdesign" | "mindmarket"

export default function Home() {
  const [layout, setLayout] = useState<Layout>("betts")

  return (
    <>
      {layout === "betts" ? (
        <>
          <HeroSection />
          <TextParallaxSection />
          <MeetYavenSection />
          <TriageSection />
          <ProposalsCrmSection />
          <CommandsSection />
          <FooterCTASection />
        </>
      ) : layout === "newdesign" ? (
        <>
          <HeroSectionND />
          <TextParallaxSectionND />
          <LocomotiveSections />
        </>
      ) : (
        <MindMarketLayout />
      )}

      {/* ── Sticky footer ── */}
      <div
        className="relative"
        style={{
          height: FOOTER_H,
          clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
          zIndex: 1,
        }}
      >
        <div style={{ position: "relative", height: `calc(100vh + ${FOOTER_H}px)`, top: "-100vh" }}>
          <div style={{ height: FOOTER_H, position: "sticky", top: `calc(100vh - ${FOOTER_H}px)` }}>
            <FooterSection />
          </div>
        </div>
      </div>

      {/* ── Layout toggle — top right ── */}
      <div
        style={{
          position: "fixed",
          top: "24px",
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
        {([
          { key: "betts" as const, label: "Default" },
          { key: "newdesign" as const, label: "V2" },
          { key: "mindmarket" as const, label: "M" }
        ]).map(v => (
          <button
            key={v.key}
            onClick={() => setLayout(v.key)}
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
              background: layout === v.key ? "rgba(0,0,0,0.75)" : "transparent",
              color: layout === v.key ? "#fff" : "rgba(0,0,0,0.55)",
              transition: "all 0.15s ease"
            }}
          >
            {v.label}
          </button>
        ))}
      </div>
    </>
  )
}
