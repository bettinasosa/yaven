import type { Metadata } from "next"
import Link from "next/link"
import { AgencyEditorial, EditorialSection } from "@/components/agency-editorial"
import { fillButtonClass } from "@/components/ui/fill-button"
import styles from "./about.module.css"

export const metadata: Metadata = {
  title: "Two founders. A team of agents. A slightly unreasonable ambition. | yaven",
  description: "Meet Bettina Sosa and Nick Price, the engineers building yaven. Our story, our backgrounds, and how we think about a better relationship with technology.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return <AgencyEditorial
    title="Two founders. A team of agents. A slightly unreasonable ambition."
    intro="We’re Bettina and Nick, the co-founders of yaven."
    closing={<Link className={`${fillButtonClass} ${styles.careers}`} href="/careers"><span>Come build with us ↗</span></Link>}
  >
    <div className={styles.opening}>
      <p>We’re both engineers, with different backgrounds and a shared fascination with what technology makes possible.</p>
      <p>We’ve spent our careers building software, exploring emerging technologies, and thinking about how the next generation of computing might change the way people work and live.</p>
      <p>We started yaven with a simple idea: what if running a business didn’t have to involve quite so much running around?</p>
    </div>
    <EditorialSection title="It started with a problem we knew ourselves.">
      <p>Building a company means wearing an extraordinary number of hats.</p>
      <p>One minute you’re developing the product. The next you’re chasing an email, preparing for a meeting, figuring out your next customers, or trying to remember something someone mentioned two weeks ago.</p>
      <p>You end up spending much of your time coordinating the work instead of doing the work you actually started the company to do.</p>
      <p>As engineers, our instinct was to build something.</p>
      <p>We started creating AI agents to help us run our own business.</p>
      <p>The more we explored what was possible, the more we realized this could become something much bigger.</p>
      <p>What if small businesses could have the operational capabilities of much larger organizations, without needing the same resources?</p>
      <p>What if technology could understand what’s going on across your work, help you make decisions, and take care of the things that need doing?</p>
      <p>And what if interacting with computers could feel a little less like operating software, and a little more like working with someone who understands you?</p>
      <p>That’s the idea behind yaven.</p>
    </EditorialSection>
    <EditorialSection title="Meet the humans.">
      <h3 className={styles.name}>Bettina Sosa</h3>
      <p className={styles.role}><em>Co-founder &amp; CEO</em></p>
      <p>Hey, I’m Betts.</p>
      <p>I’m a design engineer, entrepreneur, and endlessly curious person who likes making things.</p>
      <p>I studied Design Engineering at Imperial College London, graduating with an MEng. My career has taken me through software engineering, blockchain, encryption, zero-knowledge cryptography, and developer tools.</p>
      <p>I’ve been a startup’s first hire, worked as Head of Engineering in crypto, and built my own agency. I’ve also explored design beyond software, from biomaterials to work exhibited at the Design Museum in London and recognized with Creative Conscience Gold and Silver awards.</p>
      <p>I’ve always been fascinated by the relationship between humans and technology.</p>
      <p>Not just what computers can do, but how the things we create change the way people think, behave, work, and experience the world.</p>
      <p>I love good engineering, thoughtful design, art, unusual ideas, and people who care deeply about their craft.</p>
      <p>I’m especially interested in what happens when different disciplines meet. When a technical breakthrough makes an entirely new kind of experience possible, or when understanding human behavior changes how we approach an engineering problem.</p>
      <h4 className={styles.subheading}>A little about how I think and work</h4>
      <p>I’ve never been particularly good at accepting that something should be done a certain way simply because that’s how it’s always been done.</p>
      <p>I like understanding where rules come from, why systems exist, and whether the problems they were designed to solve still exist.</p>
      <p>I’m not interested in challenging conventions just for the sake of it. Most things exist for a reason.</p>
      <p>I simply don’t believe that makes them optimal.</p>
      <p>I tend to have a lot of ideas, sometimes more than is practical, and I’m learning that the difficult part isn’t coming up with possibilities. It’s choosing which ones matter enough to pursue.</p>
      <p>I care deeply about quality, but I don’t think having good taste is enough. The interesting challenge is building the ability to produce great work consistently.</p>
      <p>As a founder, I want to work with independent thinkers who challenge my ideas, bring their own perspectives, and genuinely care about what they create.</p>
      <p>I have strong opinions, but I don’t want to be surrounded by people who agree with me.</p>
      <h4 className={styles.subheading}>Outside of work</h4>
      <p>I’ve lived in more than 14 countries over the last couple of years, and moving between places and cultures has shaped how I see the world.</p>
      <p>I’m interested in fashion, especially vintage pieces, and I’ve grown a fashion channel on Instagram. I also love making things with my hands, from LEGO rings and laser-cut jewelry to 3D-printed pieces and natural-stone necklaces.</p>
      <p>I like the space where technology meets physical materials, where something can be technically interesting, useful, and beautiful at the same time.</p>
      <p>I’m usually exploring some combination of technology, design, art, and whatever has caught my attention that week.</p>
      <p>I’m still figuring a lot of things out. That’s part of what makes building interesting.</p>
      <h3 className={styles.name}>Nick Price</h3>
      <p className={styles.role}><em>Co-founder &amp; CTO</em></p>
      <p>Nick is an engineer and researcher whose background spans physical chemistry, scientific computing, machine learning, and AI infrastructure.</p>
      <p>He studied physical chemistry at Imperial College London and completed his master’s research at MIT, where his thesis won a best thesis prize and his research was published in a leading scientific journal.</p>
      <p>He went on to build digital twins, computational models of physical systems, and embedded machine-learning models at an energy storage startup. Later, he worked on AI agent infrastructure for a hedge fund’s internal trading system.</p>
      <p>Working with agents himself made the interface problem hard to ignore: parallel sessions, scattered context, and constant switching between tabs and terminals.</p>
      <p>That experience became part of the inspiration for yaven.</p>
      <p>Nick is particularly interested in the engineering challenges of making intelligent systems useful, reliable, and understandable. Not just what agents can do, but how people direct them, follow their work, and stay in control.</p>
      <h4 className={styles.subheading}>A little about how Nick thinks and works</h4>
      <p>Nick brings a research-driven approach to engineering, shaped by his experience working on complex scientific and technical systems.</p>
      <p>He’s interested in understanding how things work beneath the surface, from the models powering a system to how its behavior emerges in practice.</p>
      <p>At yaven, he leads the technical direction and works on turning increasingly capable AI into systems people can genuinely rely on.</p>
      <h4 className={styles.subheading}>Outside of work</h4>
      <p>Nick’s first job was at a record shop, where two years of salary went on vinyl. He learnt to DJ at a local working men’s club in Sheffield and still plays sets whenever he can, from a reggae bar in Japan to a boat party in Hungary and parties across the UK and US.</p>
      <p>Collecting and playing records taught him about curation: what to surface, when to bring it in, and how to read a room. That attention to timing and context carries into the way he builds.</p>
      <p>Away from his laptop and turntables, he enjoys climbing, cooking, reading, playing football and going to the pub with friends. He also has a serious collection of band T-shirts.</p>
    </EditorialSection>
  </AgencyEditorial>
}
