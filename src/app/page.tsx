import { HeroSection } from "@/components/sections/hero-section"
import { TextParallaxSection } from "@/components/sections/text-parallax-section"
import { LocomotiveSections } from "@/components/sections/locomotive-sections"
import { FooterSection } from "@/components/sections/footer-section"

const FOOTER_H = 660

export default function Home() {
  return (
    <>
      <HeroSection />
      <TextParallaxSection />
      <LocomotiveSections />

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
    </>
  )
}
