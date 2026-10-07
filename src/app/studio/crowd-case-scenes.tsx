"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ArrowUpRight, FileText, Mail, Presentation, BriefcaseBusiness, X } from "lucide-react"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import styles from "./crowd-case-scenes.module.css"

const conversationCues = [200, 900, 1550]
const inboxCues = [150, 1050]
const relationshipCues = [150, 850]

/** A visible example plays once per visit; hidden cards never run their sequence. */
export function useCasePlayback(active: boolean, cues: readonly number[]) {
  const panel = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const element = panel.current
    if (!element) return
    let inView = false
    const syncVisibility = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncVisibility()
    }, { threshold: .3 })
    observer.observe(element)
    document.addEventListener("visibilitychange", syncVisibility)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", syncVisibility) }
  }, [])
  useEffect(() => {
    if (!active || !visible || reduced) return
    const timers = [window.setTimeout(() => setElapsed(0), 0), ...cues.map(time => window.setTimeout(() => setElapsed(time), time))]
    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [active, visible, reduced, cues])
  return { panel, visible, time: reduced ? Infinity : active && visible ? elapsed : 0 }
}

const artifacts = {
  market: {
    title: "Germany market briefing", type: "Strategy deck · Draft",
    intro: "A working brief for the spring launch, ready for your team to develop.",
    sections: [
      { heading: "Positioning", body: "Compare the client’s proposition with local and international competitors. Map price points, brand promises and the proof behind each claim." },
      { heading: "Creative & channels", body: "Review paid-social creative, creator partnerships and retail presence. Identify messages to test in German, rather than translating the existing campaign word for word." },
      { heading: "For the next client call", body: "Confirm the launch date, priority audiences, distribution and budget. Agree which research gaps need local customer interviews." },
    ],
  },
  proposal: {
    title: "Spring launch proposal", type: "Scope of work · Draft",
    intro: "A starting scope for the agency to review before it goes to the client.",
    sections: [
      { heading: "Discover", body: "Competitor and audience research, a positioning workshop and a German-language messaging brief." },
      { heading: "Develop", body: "Campaign routes, a launch content plan and a paid-social testing framework, led by your creative team." },
      { heading: "Agree together", body: "Confirm deliverables, production partners, timing and fees with the team before sharing a proposal." },
    ],
  },
  reply: {
    title: "Re: A new skincare launch", type: "Email reply · Draft",
    intro: "Thanks for getting in touch. We’d love to hear more about the launch.",
    sections: [
      { heading: "A relevant starting point", body: "I’ve pulled together our closest beauty work so you can see how we approach positioning and launch campaigns." },
      { heading: "Before we talk", body: "Which markets are you launching in, and when? It would also help to know what’s already in place, from brand strategy to production, and your budget range." },
      { heading: "Next step", body: "Happy to find a time this week to talk through the brief. Your team can add the selected portfolio links and review the reply here." },
    ],
  },
  note: {
    title: "A reason to catch up", type: "Personal note · Draft",
    intro: "Hey, I saw you’re hiring a brand designer. Is there something new in the works?",
    sections: [
      { heading: "Pick up the conversation", body: "Really enjoyed our last project together. If the team could use a hand while you’re hiring, we’d love to hear what you’re planning." },
      { heading: "Keep it personal", body: "Add a detail from your last project, check your availability and make the note your own before sending." },
    ],
  },
} as const

type Artifact = keyof typeof artifacts

function ArtifactPreview({ artifact, onClose }: { artifact: Artifact; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const content = artifacts[artifact]
  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflow = document.documentElement.style.overflow
    element?.showModal()
    document.documentElement.style.overflow = "hidden"
    return () => {
      element?.close()
      document.documentElement.style.overflow = overflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={dialog} className={styles.preview} aria-labelledby={titleId} data-lenis-prevent onCancel={event => { event.preventDefault(); onClose() }} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); onClose() } }}>
    <div className={styles.previewBar}><span>{content.type}</span><button type="button" onClick={onClose} aria-label="Close document preview"><X size={20} /></button></div>
    <h2 id={titleId}>{content.title}</h2><p>{content.intro}</p>
    {content.sections.map(section => <section key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></section>)}
  </dialog>
}

const glass = { backdropFilter: "blur(22px) saturate(1.15)", WebkitBackdropFilter: "blur(22px) saturate(1.15)" }

export function ClientConversation({ active }: { active: boolean }) {
  const { panel, time } = useCasePlayback(active, conversationCues)
  const [preview, setPreview] = useState<Artifact | null>(null)
  return <div ref={panel} className={styles.conversation} aria-label="Client launch conversation">
    <div className={`${styles.clientMessage} ${styles.arrival}`} data-shown={time >= conversationCues[0]} style={glass}>
      <span className={styles.sender}>Client team <span>Just now</span></span>
      <p>Germany launch is happening next spring! 🎉<br />Let’s talk about the campaign on Thursday?</p>
    </div>
    <div className={`${styles.agentMessage} ${styles.arrival}`} data-shown={time >= conversationCues[1]}>
      <span className={styles.agentName}>yaven</span>
      <p>Great news. I’ve prepared a briefing on competitor positioning, pricing and paid-social angles for Germany, plus a draft launch scope for Thursday.</p>
    </div>
    <div className={`${styles.documents} ${styles.arrival}`} data-shown={time >= conversationCues[2]}>
      <button type="button" className={styles.document} style={glass} onClick={() => setPreview("market")} aria-haspopup="dialog">
        <span className={`${styles.documentCover} ${styles.deckCover}`} aria-hidden="true"><Presentation size={23} /></span>
        <span><strong>Germany market briefing</strong><small>Strategy deck · Draft</small></span><ArrowUpRight size={16} aria-hidden="true" />
      </button>
      <button type="button" className={styles.document} style={glass} onClick={() => setPreview("proposal")} aria-haspopup="dialog">
        <span className={`${styles.documentCover} ${styles.proposalCover}`} aria-hidden="true"><FileText size={23} /></span>
        <span><strong>Spring launch proposal</strong><small>Scope of work · Draft</small></span><ArrowUpRight size={16} aria-hidden="true" />
      </button>
    </div>
    {preview && <ArtifactPreview artifact={preview} onClose={() => setPreview(null)} />}
  </div>
}

export function InboundConversation({ active }: { active: boolean }) {
  const { panel, time } = useCasePlayback(active, inboxCues)
  const [preview, setPreview] = useState<Artifact | null>(null)
  return <div ref={panel} className={styles.inbox} aria-label="An inquiry and a prepared reply">
    <div className={`${styles.email} ${styles.arrival}`} data-shown={time >= inboxCues[0]} style={glass}>
      <div className={styles.emailTop}><span><Mail size={15} aria-hidden="true" /> New inquiry</span><time>21:06</time></div>
      <h4>A new skincare launch</h4>
      <p>We’re looking for an agency to help with positioning and our launch campaign. Could we see some of your beauty work?</p>
    </div>
    <div className={`${styles.reply} ${styles.arrival}`} data-shown={time >= inboxCues[1]} style={glass}>
      <span className={styles.sender}><span className={styles.agentName}>yaven</span><span>Ready for your morning</span></span>
      <p>I’ve matched the brief to your beauty projects and drafted a reply with questions on timing, markets and budget.</p>
      <button type="button" className={styles.action} onClick={() => setPreview("reply")} aria-haspopup="dialog">Review the reply <ArrowUpRight size={17} aria-hidden="true" /></button>
    </div>
    {preview && <ArtifactPreview artifact={preview} onClose={() => setPreview(null)} />}
  </div>
}

export function ReconnectionStory({ active }: { active: boolean }) {
  const { panel, time } = useCasePlayback(active, relationshipCues)
  const [preview, setPreview] = useState<Artifact | null>(null)
  return <div ref={panel} className={styles.relationship} aria-label="A past-client opportunity">
    <div className={`${styles.signal} ${styles.arrival}`} data-shown={time >= relationshipCues[0]} style={glass}>
      <span className={styles.signalIcon}><BriefcaseBusiness size={22} aria-hidden="true" /></span>
      <div><span className={styles.sender}>A past client is hiring</span><h4>Brand designer</h4><p>Your last project together was 14 months ago.</p></div>
    </div>
    <div className={`${styles.note} ${styles.arrival}`} data-shown={time >= relationshipCues[1]} style={glass}>
      <span className={styles.agentName}>yaven</span>
      <p className={styles.noteIntro}>A good moment to pick things back up.</p>
      <blockquote>“Hey, I saw you’re hiring a brand designer. Is there something new in the works?”</blockquote>
      <button type="button" className={styles.action} onClick={() => setPreview("note")} aria-haspopup="dialog">Review the note <ArrowUpRight size={17} aria-hidden="true" /></button>
    </div>
    {preview && <ArtifactPreview artifact={preview} onClose={() => setPreview(null)} />}
  </div>
}
