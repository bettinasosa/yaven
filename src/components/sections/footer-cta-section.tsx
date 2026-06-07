"use client"

import { useRef } from "react"
import { WaitlistInline } from "@/components/waitlist-inline"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"

// Script §8 — Footer CTA. Full-screen beat before the sticky footer.
export function FooterCTASection() {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])

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
        {/* Blobs + grain layer */}
        <div
          className="blob-layer"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none"
          }}
        >
          {/* Blob 1 — top left, warm */}
          <div
            className="yv-orb-breathe"
            style={{
              position: "absolute",
              top: "10%",
              left: "-5%",
              width: "55%",
              height: "60%",
              borderRadius: "42% 58% 64% 36% / 38% 52% 48% 62%",
              background: "radial-gradient(ellipse at 40% 40%, rgba(215,130,73,0.35) 0%, rgba(38,127,229,0.2) 40%, transparent 70%)",
              filter: "blur(40px)",
              opacity: 0.7
            }}
          />
          {/* Blob 2 — bottom right, blue/violet */}
          <div
            className="yv-orb-breathe"
            style={{
              position: "absolute",
              bottom: "5%",
              right: "-8%",
              width: "60%",
              height: "65%",
              borderRadius: "58% 42% 36% 64% / 52% 38% 62% 48%",
              background: "radial-gradient(ellipse at 55% 55%, rgba(158,142,200,0.4) 0%, rgba(38,127,229,0.25) 45%, transparent 72%)",
              filter: "blur(44px)",
              opacity: 0.65,
              animationDelay: "-2s"
            }}
          />
          {/* Blob 3 — center top, light blue */}
          <div
            className="yv-orb-breathe"
            style={{
              position: "absolute",
              top: "-10%",
              left: "30%",
              width: "45%",
              height: "50%",
              borderRadius: "64% 36% 48% 52% / 42% 58% 36% 64%",
              background: "radial-gradient(ellipse at 50% 50%, rgba(77,163,240,0.4) 0%, rgba(38,127,229,0.15) 50%, transparent 75%)",
              filter: "blur(36px)",
              opacity: 0.6,
              animationDelay: "-4s"
            }}
          />
        </div>

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
            Get the boring half handled.
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
