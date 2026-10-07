"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ArrowRight, Check, ChevronRight, FileText, Layers } from "lucide-react"
import { FillButton } from "@/components/ui/fill-button"
import { usePrefersReducedMotion } from "@/components/effects/use-prefers-reduced-motion"
import { agencyExamples } from "./_shared/crowd-copy"
import { ClientConversation, InboundConversation, ReconnectionStory, useCasePlayback } from "./crowd-case-scenes"
import { CrowdDeck } from "./crowd-deck"
import styles from "./crowd-cases.module.css"

gsap.registerPlugin(ScrollTrigger)
const stickyQuery = "(min-width: 960px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)"
const STEP_DURATION = 1.7
const COPY_REVEAL_DURATION = .45
const CARD_TRANSITION_DURATION = .92
const LAST_HOLD = .8

// Prospecting keeps the research → match → draft sequence.
const prospectTasks = [
  { work: 0, running: "Researching the new CMO…", start: 150, end: 1100, icon: Check },
  { work: 1, running: "Finding your closest work…", start: 1250, end: 2050, icon: Layers },
  { work: 2, running: "Writing your introduction…", start: 2200, end: 3450, icon: FileText },
] as const
const prospectCues = prospectTasks.flatMap(task => [task.start, task.end])

function CardExample({ active }: { active: boolean }) {
  const index = 0
  const [selected, setSelected] = useState<number | null>(null)
  const { panel, visible, time } = useCasePlayback(active, prospectCues)
  const sequence = prospectTasks
  const complete = time >= sequence[sequence.length - 1].end
  const example = agencyExamples[index]
  const detailId = `crowd-detail-${index}`

  return <div ref={panel} className={styles.paper} data-visible={visible} style={{ backdropFilter: "blur(22px) saturate(1.15)", WebkitBackdropFilter: "blur(22px) saturate(1.15)" }}>
    <div className={styles.paperHead}>
      <span className={styles.brand}>yaven</span>
      <span className={styles.status} data-working={!complete}>{complete ? example.status : "Working on it"}</span>
    </div>
    <div className={styles.context} id={detailId} aria-live="polite" aria-atomic="true">
      {selected === null
        ? <p className={styles.scenario}>{example.scene}</p>
        : <div className={styles.workDetail}><h4>{example.work[selected].name}</h4><p>{example.work[selected].detail}</p></div>}
    </div>
    <div className={styles.workRows} role="group" aria-label={`Explore the work: ${example.heading}`}>
      {sequence.map(task => {
        const item = example.work[task.work]
        const state = time < task.start ? "waiting" : time < task.end ? "working" : "done"
        const ResultIcon = task.icon
        return <FillButton
          key={item.name} type="button" className={styles.workRow} data-task-state={state}
          aria-label={item.name} aria-pressed={selected === task.work} aria-controls={detailId}
          onClick={() => setSelected(value => value === task.work ? null : task.work)}
          icon={<ChevronRight size={15} aria-hidden="true" />}>
          <span className={styles.taskIndicator} aria-hidden="true">
            {state === "done" ? <>
              <span className={styles.completionCheck}><Check size={15} className={styles.check} /></span>
              <span className={styles.resultIcon}><ResultIcon size={15} className={styles.check} /></span>
            </> : <span className={styles.spinner} />}
          </span>
          <span className={styles.taskLabel} aria-hidden="true">{state === "working" ? task.running : item.name}</span>
        </FillButton>
      })}
    </div>
    <FillButton type="button" className={styles.workButton} aria-expanded={selected !== null} aria-controls={detailId}
      onClick={() => setSelected(value => value === null ? example.work.length - 1 : null)}
      icon={<ArrowRight size={17} aria-hidden="true" />}>
      {selected === null ? "See the work" : "Back to the example"}
    </FillButton>
  </div>
}

export function CrowdCases() {
  const [active, setActive] = useState(0)
  const [scrollDriven, setScrollDriven] = useState(false)
  const root = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add(stickyQuery, () => {
      const section = root.current
      if (!section) return
      const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-deck-card]"))
      const copies = Array.from(section.querySelectorAll<HTMLElement>("[data-case-copy]"))
      const stack = section.querySelector<HTMLElement>("[data-case-stack]")
      const heading = section.querySelector<HTMLElement>("[data-case-heading]")
      if (!stack) return
      setScrollDriven(true)

      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: section, start: "top top", end: "bottom bottom",
        scrub: .7, invalidateOnRefresh: true,
        onRefresh: trigger => {
          const duration = (cards.length - 1) * STEP_DURATION + LAST_HOLD
          setActive(Math.min(cards.length - 1, Math.floor((trigger.progress * duration + CARD_TRANSITION_DURATION / 2) / STEP_DURATION)))
        },
      } })
      if (heading) timeline.to(heading, {
        y: () => -(heading.offsetTop + heading.offsetHeight + 24),
        opacity: 0, duration: .7, ease: "none",
      }, 0)
      cards.forEach((card, index) => gsap.set(card, {
        y: index * 22, scale: 1 - index * .045, opacity: 1, zIndex: cards.length - index,
      }))
      gsap.set(copies, { autoAlpha: 0, y: 20 })
      copies.forEach((copy, index) => timeline.to(copy, {
        autoAlpha: 1, y: 0, duration: COPY_REVEAL_DURATION, ease: "power2.out",
      }, index * STEP_DURATION))
      for (let index = 0; index < cards.length - 1; index++) {
        const at = (index + 1) * STEP_DURATION - CARD_TRANSITION_DURATION
        // The front card leaves upward; the next card settles in the same centre.
        timeline.to(copies[index], { autoAlpha: 0, y: -12, duration: .28, ease: "power1.in" }, at)
        timeline.to(cards[index], {
          y: () => -stack.clientHeight * 1.1,
          duration: CARD_TRANSITION_DURATION, ease: "power1.inOut",
        }, at)
        timeline.to(cards[index], { opacity: 0, duration: .16, ease: "none" }, at + CARD_TRANSITION_DURATION - .16)
        cards.slice(index + 1).forEach((card, depth) => timeline.to(card, {
          y: depth * 22, scale: 1 - depth * .045,
          duration: CARD_TRANSITION_DURATION, ease: "power1.inOut",
        }, at))
      }
      timeline.to({}, { duration: LAST_HOLD }, (cards.length - 1) * STEP_DURATION)
      timeline.eventCallback("onUpdate", () => {
        setActive(Math.min(cards.length - 1, Math.floor((timeline.time() + CARD_TRANSITION_DURATION / 2) / STEP_DURATION)))
      })
      return () => { setScrollDriven(false) }
    })
    let mounted = true
    document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh() })
    return () => { mounted = false; media.revert() }
  }, [])

  useEffect(() => {
    // Mobile and reduced-motion layouts use button navigation, not the scrubbed deck.
    if (scrollDriven || window.matchMedia(stickyQuery).matches || !root.current) return
    if (reduced) {
      gsap.set(root.current.querySelectorAll("[data-case-copy]"), { clearProps: "opacity,visibility,transform" })
      return
    }
    const copy = root.current.querySelector<HTMLElement>(`[data-case-copy="${active}"]`)
    if (!copy) return
    let reveal: gsap.core.Tween | undefined
    gsap.set(copy, { autoAlpha: 0, y: 20 })
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      reveal = gsap.to(copy, {
        autoAlpha: 1, y: 0, duration: COPY_REVEAL_DURATION, ease: "power2.out",
      })
      observer.disconnect()
    }, { threshold: .15 })
    observer.observe(copy)
    // Do not restore inline styles here: a newly activated desktop timeline owns them.
    return () => { observer.disconnect(); reveal?.kill() }
  }, [active, scrollDriven, reduced])

  return <section ref={root} id="work" className={styles.track} aria-labelledby="cases-heading">
    <div className={styles.section} data-scroll-driven={scrollDriven}>
      <header className={styles.head} data-case-heading>
        <h2 id="cases-heading">Grow your agency</h2>
      </header>
      <div className={styles.layout}>
        {agencyExamples.map((example, index) => <div key={example.name} className={styles.copy}
          data-case-copy={index} data-side={index % 2 ? "right" : "left"}
          aria-hidden={index !== active || undefined} aria-live="polite" aria-atomic="true">
          <h3>{example.heading}</h3><p>{example.body}</p>
        </div>)}
        <div className={styles.visual}>
          <div data-case-stack>
            <CrowdDeck active={active} scrollDriven={scrollDriven} playing cards={agencyExamples.map((example, index) => ({
              id: `crowd-case-${index}`, content: index === 0 ? <CardExample active={index === active} />
                : index === 1 ? <InboundConversation active={index === active} />
                : index === 2 ? <ClientConversation active={index === active} />
                : <ReconnectionStory active={index === active} />,
            }))} />
          </div>
        </div>
      </div>
      {!scrollDriven && <nav className={styles.mobileNavigation} aria-label="Browse agency examples">
        <FillButton type="button" aria-label="Previous example" disabled={active === 0} onClick={() => setActive(value => Math.max(0, value - 1))}><ArrowLeft size={20} aria-hidden="true" /></FillButton>
        <span aria-live="polite">{active + 1} / {agencyExamples.length}</span>
        <FillButton type="button" aria-label="Next example" disabled={active === agencyExamples.length - 1} onClick={() => setActive(value => Math.min(agencyExamples.length - 1, value + 1))}><ArrowRight size={20} aria-hidden="true" /></FillButton>
      </nav>}
    </div>
  </section>
}
