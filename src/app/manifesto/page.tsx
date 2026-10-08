import type { Metadata } from "next"
import { ShaderShowcase } from "@/app/studio/omega/shader-showcase"
import { FlowChapter } from "@/app/studio/flow-chapter"
import { AgencyEditorial, EditorialSection } from "@/components/agency-editorial"

export const metadata: Metadata = {
  title: "The way we work is changing | yaven",
  description: "The best independent businesses are increasingly built from small core teams, trusted specialists and AI agents. yaven is building the platform that brings them together.",
  alternates: { canonical: "/manifesto" },
}

export default function ManifestoPage() {
  return <AgencyEditorial artwork={<FlowChapter hold={.3}><ShaderShowcase /></FlowChapter>} title="The way we work is changing." intro="The best independent businesses are increasingly built from small core teams, trusted specialists and AI agents. yaven is building the platform that brings them together.">
    <EditorialSection title="Headcount no longer measures capacity."><p>For a hundred years, a business grew by hiring. More work meant more people, and more people meant more management. Agents break the link. A team of eight takes on the work of forty.</p></EditorialSection>
    <EditorialSection title="The best people are going independent."><p>Senior talent is leaving large companies to work for themselves or in small studios. They keep the client relationships and the craft. Until now, they gave up the back office and the reach. Agents give those back.</p></EditorialSection>
    <EditorialSection title="Junior work is changing first."><p>Research, first drafts, decks and admin used to be how people learned the job. Agents now do much of it. Teams have to teach judgment sooner, and the people who learn it early will run the firms of the next decade.</p></EditorialSection>
    <EditorialSection title="What stays human is what clients pay for."><p>Ideas, taste, judgment and trust stay with people. Everything else becomes infrastructure.</p></EditorialSection>
    <EditorialSection title="People decide."><p>Agents prepare the work. A person reviews it and decides what goes out, and the accountability stays with them.</p></EditorialSection>
    <EditorialSection title="More people will run their own business."><p>When capacity stops depending on headcount, starting a business gets cheaper and staying small stops being a limit. We expect more independent firms, and better ones.</p><p>yaven is building the platform for this way of working. We&apos;re starting with independent agencies, because they&apos;re already living it.</p></EditorialSection>
  </AgencyEditorial>
}
