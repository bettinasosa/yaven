import { HeroSection } from "@/components/sections/hero-section"
import { TextParallaxSection } from "@/components/sections/text-parallax-section"
import { MeetYavenSection } from "@/components/sections/meet-yaven-section"
import { CommandsSection } from "@/components/sections/commands-section"
import { FollowUpsSection } from "@/components/sections/follow-ups-section"
import { ProposalsCrmSection } from "@/components/sections/proposals-crm-section"
import { TriageSection } from "@/components/sections/triage-section"
import { FooterCTASection } from "@/components/sections/footer-cta-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <MeetYavenSection />
      <TextParallaxSection />
      <CommandsSection />
      <FollowUpsSection />
      <ProposalsCrmSection />
      <TriageSection />
      <FooterCTASection />

      {/* ── Footer — its own full page ── */}
      <div style={{ height: "100vh" }}>
        <FooterSection />
      </div>
    </>
  )
}
