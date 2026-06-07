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
          {/* Blob 1 — cream/white specular highlight */}
          <div
            className="yv-orb-drift-1"
            style={{
              position: "absolute",
              top: "8%",
              left: "-5%",
              width: "55%",
              height: "60%",
              borderRadius: "42% 58% 64% 36% / 38% 52% 48% 62%",
              background: "radial-gradient(ellipse at 32% 30%, rgba(255,255,255,0.9) 0%, rgba(227,213,187,0.6) 25%, transparent 50%)",
              filter: "blur(14px)",
              opacity: 0.8
            }}
          />
          {/* Blob 2 — warm orange/gold */}
          <div
            className="yv-orb-drift-2"
            style={{
              position: "absolute",
              bottom: "10%",
              right: "-8%",
              width: "55%",
              height: "60%",
              borderRadius: "58% 42% 36% 64% / 52% 38% 62% 48%",
              background: "radial-gradient(ellipse at 50% 55%, rgba(215,130,73,0.55) 0%, rgba(190,167,34,0.35) 35%, transparent 65%)",
              filter: "blur(18px)",
              opacity: 0.78
            }}
          />
          {/* Blob 3 — primary blue accent */}
          <div
            className="yv-orb-drift-3"
            style={{
              position: "absolute",
              top: "-5%",
              left: "25%",
              width: "50%",
              height: "55%",
              borderRadius: "64% 36% 48% 52% / 42% 58% 36% 64%",
              background: "radial-gradient(ellipse at 60% 50%, rgba(38,127,229,0.6) 0%, rgba(38,127,229,0.3) 38%, transparent 65%)",
              filter: "blur(14px)",
              opacity: 0.8
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
