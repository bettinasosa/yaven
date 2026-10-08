"use client"

import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { ArrowUp, FileText, ScanSearch } from "lucide-react"
import styles from "./assistant-chat.module.css"

type Reply = { text: string; sources?: readonly string[] }
type Message = Reply & { id: number; role: "user" | "assistant" }
type Example = { label: string; request: string; activity: string; reply: Reply }

const personalExamples: readonly Example[] = [
  {
    label: "Find my files",
    request: "Find the latest Juicy proposal and the budget sheet for this email.",
    activity: "Finding the proposal and matching budget…",
    reply: { text: "The revised proposal and its matching budget are ready below. The older proposal has a different scope, so I’ve left that one out. Review these before attaching them to your email.", sources: ["Juicy — proposal v3.pdf", "Juicy — launch budget.xlsx"] },
  },
  {
    label: "Draft a reply",
    request: "Draft a reply to this client using the scope we agreed on our last call.",
    activity: "Reading the agreed scope and call notes…",
    reply: { text: "Hi Alex, yes — the two landing pages are covered in the agreed scope. The extra motion work would be an addition. I’ll send over a separate estimate so you can decide before we get started.", sources: ["Signed proposal", "Last client call"] },
  },
  {
    label: "Help with this tool",
    request: "Show me how to export just the selected frames in Figma.",
    activity: "Preparing the steps…",
    reply: { text: "Select the frames you want in the Layers panel. In the right sidebar, open Export, choose the format and scale, then select Export frames. Only those selected frames will be included." },
  },
]

const sharedExamples: readonly Example[] = [
  {
    label: "Prepare client reviews",
    request: "Prepare the team’s Juicy review with open requests, recent decisions and who owns what.",
    activity: "Bringing together the team’s project updates…",
    reply: { text: "Thursday’s review is ready: Gigi owns the two landing pages; Asker owns launch copy. The pages are approved, but the motion dates still need confirming. I’ve brought the decisions and open requests into one brief for everyone on the account.", sources: ["Juicy — team review brief", "Open requests & owners"] },
  },
  {
    label: "Research target accounts",
    request: "Build a shortlist of fintech companies for our agency, with connections and an angle for each.",
    activity: "Comparing target accounts with the agency’s work…",
    reply: { text: "The shortlist is ready for the team to review. Each account includes a recent buying signal, a relevant portfolio project and a possible introduction. The strongest angle is a new marketing lead preparing a brand refresh.", sources: ["Fintech account shortlist", "Connections & portfolio matches"] },
  },
  {
    label: "Follow our clients’ markets",
    request: "Brief the account team on Juicy’s Germany launch and the local competitors we should discuss.",
    activity: "Gathering market context for the account team…",
    reply: { text: "The briefing compares local competitors’ positioning, launch channels and messaging. It also highlights questions for Juicy: who they want to reach first, what needs localising and which claims need evidence before launch.", sources: ["Germany — competitor briefing", "Launch discussion points"] },
  },
]

export function AssistantChat({ shared = false, active = true }: { shared?: boolean; active?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const [activity, setActivity] = useState("")
  const nextId = useRef(1)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const thread = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const inputId = useId()
  const examples = shared ? sharedExamples : personalExamples

  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current) }, [])
  useEffect(() => {
    if (active && thread.current) thread.current.scrollTop = thread.current.scrollHeight
  }, [active, messages, activity])

  function send(request: string) {
    const value = request.trim()
    if (!value || timer.current !== null) return
    const example = examples.find(item => item.request.toLowerCase() === value.toLowerCase())
    const userId = nextId.current++
    const replyId = nextId.current++
    setMessages(current => [...current, { id: userId, role: "user", text: value }])
    setDraft("")
    setActivity(example?.activity ?? "Opening your request…")
    input.current?.focus({ preventScroll: true })
    timer.current = setTimeout(() => {
      setMessages(current => [...current, { id: replyId, role: "assistant", ...(example?.reply ?? {
        text: "In the Mac app, you can ask about what’s on your screen or hand over a task here. This website preview isn’t connected to your computer. Pick an example to see how it works.",
      }) }])
      setActivity("")
      timer.current = null
    }, 650)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    send(draft)
  }

  return <div className={styles.chat}>
    <form className={styles.composer} onSubmit={submit}>
      <ScanSearch className={styles.contextIcon} size={22} aria-hidden="true" />
      <label className={styles.srOnly} htmlFor={inputId}>Message yaven</label>
      <textarea ref={input} id={inputId} value={draft} onChange={event => setDraft(event.target.value)} placeholder={shared ? "Ask your agency’s agents anything…" : "Ask about this screen…"} rows={1} maxLength={1000} onKeyDown={event => {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
          event.preventDefault()
          event.currentTarget.form?.requestSubmit()
        }
      }} />
      <button type="submit" aria-label="Send message" disabled={!draft.trim() || Boolean(activity)}><ArrowUp size={20} aria-hidden="true" /></button>
    </form>
    <div className={styles.suggestions} role="group" aria-label="Try an example message">{examples.map(example => <button type="button" key={example.label} disabled={Boolean(activity)} aria-pressed={draft === example.request} onClick={() => {
      setDraft(example.request)
      input.current?.focus({ preventScroll: true })
    }}>{example.label}</button>)}</div>
    <div ref={thread} className={styles.thread} data-empty={messages.length === 0} role="log" aria-label={shared ? "Chat with your shared agents" : "Chat with your assistant"} aria-live="polite" aria-relevant="additions">
      {messages.map(message => <article key={message.id} className={message.role === "user" ? styles.userMessage : styles.agentMessage} aria-label={message.role === "user" ? "You" : "yaven"}>
        <span className={styles.author}>{message.role === "user" ? "You" : "yaven"}</span>
        <p>{message.text}</p>
        {message.sources && <div className={styles.sources} aria-label="Sources">{message.sources.map(source => <span key={source}><FileText size={13} aria-hidden="true" />{source}</span>)}</div>}
      </article>)}
      {activity && <p className={styles.activity} role="status">{activity}</p>}
    </div>
    <p className={styles.caption}>Illustrative conversation. Example data; no apps connected.</p>
  </div>
}
