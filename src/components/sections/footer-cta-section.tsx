"use client"

import { WaitlistInline } from "@/components/waitlist-inline"
import { ScrollCutReveal } from "@/components/effects/scroll-cut-reveal"
// Script §8 — Footer CTA. Full-screen beat before the sticky footer.
export function FooterCTASection() {
  return (
    // Pinned for a full extra viewport so the CTA reads as its own page
    // rather than a transition into the footer.
    <div data-hide-getyaven className="relative h-[200vh] bg-[var(--primary)]">
      {/* Blur-in from previous section */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[180px] z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(38,127,229,0.9) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)"
        }}
      />

      <section className="sticky top-0 h-screen flex flex-col items-center justify-center px-[clamp(28px,5vw,48px)] py-6 overflow-hidden bg-[var(--primary)]">
        <div className="relative text-center z-2">
          <ScrollCutReveal
            className="font-medium tracking-[-0.02em] leading-[1.1] text-white mx-auto max-w-[800px]"
            style={{ fontFamily: "var(--font-instrument-serif)", fontSize: "var(--fs-title)" }}
          >
            Less admin. More flow.
          </ScrollCutReveal>

          <div className="mt-[clamp(40px,7vh,64px)] flex justify-center">
            <div className="w-[min(540px,100%)]">
              <WaitlistInline variant="hero" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
