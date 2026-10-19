import type { Metadata } from "next"
import { AgencyEditorial, EditorialSection } from "@/components/agency-editorial"
import { ConversationStarter } from "./careers-interactions"
import styles from "./careers.module.css"

export const metadata: Metadata = {
  title: "Come build something different | yaven",
  description: "Help shape a better relationship with technology. Explore working with yaven across engineering, AI, design, content, growth and community.",
  alternates: { canonical: "/careers" },
}

export default function CareersPage() {
  return <AgencyEditorial
    title="Come build something different."
    intro="We’re building AI that people can trust with real responsibility."
    closing={<ConversationStarter />}
  >
    <div className={styles.opening}>
      <p>That means thinking as carefully about human behavior, privacy, and design as we do about the technology itself.</p>
      <p>We’re optimistic about what this could make possible: more freedom to pursue an idea, build a business, or do work that once felt out of reach.</p>
      <p>We want to help shape that future, and we care deeply about how we get there.</p>
      <p><strong>Not just build what’s next. Question what should come next.</strong></p>
    </div>
    <EditorialSection title="What we’re building.">
      <p>We keep coming back to one question:</p>
      <p><strong>How should humans interact with technology, and how could we make that interaction better?</strong></p>
      <p>For decades, we’ve adapted ourselves to computers. We’ve learned their interfaces, organized our work around their limitations, and spent an extraordinary amount of time managing the software that was supposed to help us.</p>
      <p>We believe that relationship is about to change.</p>
      <p>Imagine technology that understands your context, anticipates what you need, and can take meaningful action on your behalf. Where computers adapt to people, rather than the other way around.</p>
      <p>A future where a handful of people can accomplish what once required entire organizations. Where ambitious ideas aren’t limited by the resources, time, or infrastructure needed to pursue them.</p>
      <p><strong>We’re interested in helping shape that future, not just building another software company.</strong></p>
      <p>We’re starting with work. More specifically, the endless coordination, administration, and fragmented information that get in the way of running a business.</p>
      <p>yaven is our first step toward a more natural relationship with computing: AI that understands your work, helps move things forward, and gives you more room to focus on what matters.</p>
      <p>Getting there raises fascinating questions about engineering, design, privacy, human behavior, and trust.</p>
      <p>How do people learn to delegate to AI? How do we build systems that earn responsibility? How do we preserve human agency as computers become increasingly capable?</p>
      <p>These are the problems we’re excited to work on.</p>
    </EditorialSection>
    <EditorialSection title="The kind of people we like working with.">
      <h3 className={styles.subheading}>Curious minds.</h3>
      <p>People who get excited about an engineering problem, a clever interface, an interesting research paper, a beautiful piece of art, or something completely unrelated that makes them think differently.</p>
      <p>We don’t think curiosity should stop at the boundaries of your job description.</p>
      <p>Some of the most interesting things happen when disciplines collide.</p>
      <h3 className={styles.subheading}>Independent thinkers.</h3>
      <p>We don’t want people who agree with us simply because we’re the founders.</p>
      <p>We like people who question assumptions, form their own opinions, and aren’t afraid to challenge ours.</p>
      <p>People who care more about finding the best solution than being right.</p>
      <h3 className={styles.subheading}>People who care about what they put into the world.</h3>
      <p>We like people who notice things.</p>
      <p>The awkward interaction everyone else has learned to live with. The sentence that doesn’t quite sound right (and don’t even get us started on AI slop). The unnecessary complexity in a system. The tiny details that make an experience memorable.</p>
      <p>It’s not about making everything perfect. It’s about knowing what matters, understanding why, and caring enough to get it right.</p>
      <h3 className={styles.subheading}>People who understand people.</h3>
      <p>We’re fascinated by human behavior, culture, communication, and the reasons people do what they do.</p>
      <p>Whether you’re designing a product, creating content, growing a community, or finding a way to bring something new to market, understanding people is at the heart of the work.</p>
      <h3 className={styles.subheading}>People who make things real.</h3>
      <p>We have no shortage of ideas. The difficult part is deciding which ones deserve our attention and turning them into something people actually care about.</p>
      <p>We value people who experiment, follow through, learn from mistakes, and keep improving what they make.</p>
    </EditorialSection>
    <EditorialSection title="Different disciplines. Shared curiosity.">
      <p>We’re building a technology company, but we don’t believe the most interesting contributions will come from engineers alone.</p>
      <p>We’re interested in people working across:</p>
      <ul className={styles.disciplines}>
        <li><strong>Engineering &amp; AI:</strong> Building reliable, intelligent systems and new ways of interacting with computers.</li>
        <li><strong>Design &amp; Creative:</strong> Making complex technology intuitive, useful, and a pleasure to experience.</li>
        <li><strong>Content &amp; Culture:</strong> Exploring ideas through writing, film, storytelling, and creative experimentation.</li>
        <li><strong>Growth &amp; Go-to-Market:</strong> Understanding markets, building relationships, and finding interesting ways to bring yaven to people.</li>
        <li><strong>Community &amp; Experiences:</strong> Bringing people together and creating conversations and experiences worth being part of.</li>
      </ul>
      <p>These aren’t rigid categories. Some of the most interesting people work across several of them.</p>
    </EditorialSection>
    <EditorialSection title="What working here is like.">
      <p>We’re a small team building something ambitious, and we’re still figuring plenty of things out.</p>
      <p>We work closely together, experiment often, and value people who take ownership of what they do.</p>
      <p>We run our own company on yaven and work directly with agencies using it. Ideas get tested against real problems, not just debated in meetings.</p>
      <p>We care about good work, but we’re not interested in complexity for its own sake.</p>
      <p>We want people to have the freedom to explore, the confidence to disagree, and the responsibility to follow through.</p>
      <p>We’re also human.</p>
      <p>We like tinkering with new technology, exploring strange ideas, making things outside work, and having lives beyond our laptops.</p>
      <p>We believe in non-linear careers and in the perspectives people bring from different places, disciplines, and experiences.</p>
      <p><strong>We’re building technology to give people more freedom. We’d like to build a company that reflects that belief.</strong></p>
    </EditorialSection>
    <EditorialSection title="Come say hello.">
      <p>We may not have an immediate opening that’s right for you, but we’d rather meet someone interesting before we’ve written the perfect job description than miss them because they don’t fit into one.</p>
      <p>If you’ve made something you’re proud of, have an unusual perspective, or find yourself thinking about the same problems we do, we’d love to hear from you.</p>
      <p>Tell us what you’ve been working on, what excites you, and where you think you could make a difference.</p>
    </EditorialSection>
  </AgencyEditorial>
}
