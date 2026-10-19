import type { Metadata } from "next"
import Link from "next/link"
import { ShaderShowcase } from "@/app/studio/omega/shader-showcase"
import { FlowChapter } from "@/app/studio/flow-chapter"
import { AgencyEditorial, EditorialSection } from "@/components/agency-editorial"
import { fillButtonClass } from "@/components/ui/fill-button"
import styles from "./manifesto.module.css"

export const metadata: Metadata = {
  title: "A better relationship with technology | yaven",
  description: "How should humans interact with technology, and how could we make that interaction better? What we believe about capability, craft, human agency and the future of computing.",
  alternates: { canonical: "/manifesto" },
}

export default function ManifestoPage() {
  return <AgencyEditorial
    artwork={<FlowChapter hold={.3}><ShaderShowcase /></FlowChapter>}
    title="A better relationship with technology."
    intro={<strong>How should humans interact with technology, and how could we make that interaction better?</strong>}
    closing={<nav className={styles.actions} aria-label="Explore yaven">
      <Link className={fillButtonClass} href="/"><span>Explore yaven</span></Link>
      <Link className={fillButtonClass} href="/about"><span>Meet the team</span></Link>
    </nav>}
  >
    <div className={styles.opening}>
      <p>It’s a question we keep coming back to.</p>
      <p>We’ve spent decades building software to make our lives easier. Yet somehow, we’ve ended up spending much of our time managing it.</p>
      <p>We switch between applications, chase updates, move information from one place to another, and learn to operate increasingly complicated systems that were supposed to help us.</p>
      <p>We’ve become remarkably good at adapting ourselves to our tools.</p>
      <p><strong>We think it’s time our tools adapted to us.</strong></p>
    </div>
    <EditorialSection title="Just because something works doesn’t mean it’s the best we can do.">
      <p>We’ve never been particularly interested in accepting systems simply because they’re established.</p>
      <p>Most conventions exist for a reason. They were solutions to real problems, built around the possibilities and limitations of their time.</p>
      <p>But the fact that something made sense yesterday doesn’t make it the best solution tomorrow.</p>
      <p>New technologies create opportunities to reconsider old assumptions.</p>
      <p>We don’t believe everything needs reinventing. We just think some things genuinely deserve to be.</p>
      <p>And right now, the way we interact with computers is one of them.</p>
    </EditorialSection>
    <EditorialSection title="Technology should expand what people can do.">
      <p>For a long time, the scale of what you could accomplish depended on the size of your organization.</p>
      <p>More ambition meant more people. More projects meant more coordination. More opportunities came with more overhead.</p>
      <p>We believe that’s beginning to change.</p>
      <p>Imagine a world where a handful of extraordinary people can build what once required entire organizations.</p>
      <p>Where independent businesses don’t have to choose between staying small and thinking big.</p>
      <p>Where technology understands the context of your work, takes care of the things that need doing, and leaves you with more space to think, create, and make decisions.</p>
      <p><strong>We don’t think the future of work is about doing more work. It’s about making more things possible.</strong></p>
    </EditorialSection>
    <EditorialSection title="Having taste is easy. Making things with taste, consistently, not so much.">
      <p>We’re fascinated by what happens when technology makes creation easier.</p>
      <p>But when anyone can generate almost anything, the question of what deserves to exist becomes more important.</p>
      <p>Taste matters. Judgment matters. Originality matters.</p>
      <p>So does the craft of turning those things into something real.</p>
      <p>We care about good engineering, thoughtful design, beautiful interactions, and products that feel almost obvious once they exist.</p>
      <p>We reject unnecessary complexity, awkward experiences, superficial branding, and technology that looks impressive but makes people’s lives harder.</p>
      <p>We want to build things that work beautifully.</p>
      <p>And we want to become exceptionally good at doing that, over and over again.</p>
    </EditorialSection>
    <EditorialSection title="Human agency is not negotiable.">
      <p>As computers become more capable, the question of who remains in control becomes more important.</p>
      <p>We believe technology should work on your behalf, without taking away your judgment.</p>
      <p>That people should have meaningful control over their information, their tools, and the decisions that affect them.</p>
      <p>That privacy isn’t merely a feature, but an important part of independence.</p>
      <p>And that intelligence, however powerful, shouldn’t require us to surrender our autonomy.</p>
      <p>We want a future where technology makes people more capable, not less human.</p>
    </EditorialSection>
    <EditorialSection title="We want our work to represent something.">
      <p>We’re ambitious about building yaven into a successful company.</p>
      <p>But that’s not the whole ambition.</p>
      <p>We’re interested in contributing something original. In exploring ideas worth exploring. In making things with care, curiosity, and conviction.</p>
      <p>We’re more interested in helping shape the future of computing than simply building another software company.</p>
      <p>That doesn’t mean we’ll always be right.</p>
      <p>We’ll experiment, change our minds, discover things that don’t work, and probably spend an unreasonable amount of time debating details most people won’t notice.</p>
      <p>But we believe the details matter.</p>
      <p>We believe independent thinking matters.</p>
      <p>And we believe building something genuinely different is worth the effort.</p>
    </EditorialSection>
    <EditorialSection title="We’re starting with work.">
      <p>More specifically, the unnecessary complexity that stands between people and what they’re trying to accomplish.</p>
      <p>The endless coordination, administration, switching between tools, and keeping track of things that consume our attention.</p>
      <p>We’re building yaven to take care of that work.</p>
      <p>An AI teammate that understands the context of your business, helps move things forward, and gives small teams the capacity to pursue bigger ambitions.</p>
      <p>We’re starting with independent businesses, agencies, and creative teams. People whose most valuable contribution isn’t managing software, but bringing ideas into the world.</p>
      <p>It’s our first step toward a much bigger vision.</p>
      <p><strong>More independence. More possibility. More room to be human.</strong></p>
      <p>That’s the future we’re building toward.</p>
    </EditorialSection>
  </AgencyEditorial>
}
