"use client"

import { WaitlistInline } from "@/components/waitlist-inline"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
import { HeroBlobs } from "@/components/hero-blobs"

// Script §8 — Footer CTA. Full-screen beat before the sticky footer.
export function FooterCTASection() {
  return (
    // Pinned for a full extra viewport so the CTA reads as its own page
    // rather than a transition into the footer.
    <div
      style={{
        position: "relative",
        height: "200vh",
        background: "var(--primary)"
      }}
    >
      {/* Blur-in from previous section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, rgba(38,127,229,0.9) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none"
        }}
      />

      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          overflow: "hidden"
        }}
      >
        <HeroBlobs />

        <div style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
          <ScrollCutReveal
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(44px, 7vw, 110px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--cream)",
              margin: "0 auto",
              maxWidth: "900px"
            }}
          >
            Focus on the work only you can do.
          </ScrollCutReveal>

          <div
            style={{
              marginTop: "clamp(40px, 7vh, 64px)",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div style={{ width: "min(480px, 100%)" }}>
              <WaitlistInline />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
