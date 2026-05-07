"use client"

import { useState } from "react"
import { WaitlistButton } from "@/components/waitlist-button"
import { FadeIn } from "@/components/fade-in"

const CYAN = "#b1fbff"

/* ── Agent bot icon ──────────────────────────────────────── */
function AgentIcon({
  color = CYAN,
  size = 20
}: {
  color?: string
  size?: number
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L29 9.5 L29 22.5 L16 30 L3 22.5 L3 9.5 Z" fill={color} />
      <circle cx="12" cy="14" r="2.2" fill="#0b0d12" />
      <circle cx="20" cy="14" r="2.2" fill="#0b0d12" />
      <path
        d="M11 20 Q16 23.5 21 20"
        stroke="#0b0d12"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/* ── Agent session tab mockup ────────────────────────────── */
function AgentTab({
  title,
  status,
  lines,
  agentColor = CYAN
}: {
  title: string
  status: "running" | "blocked" | "done"
  lines: string[]
  agentColor?: string
}) {
  const dot =
    status === "running"
      ? "bg-emerald-400"
      : status === "blocked"
        ? "bg-amber-400"
        : "bg-zinc-600"
  const label =
    status === "running" ? "Running" : status === "blocked" ? "Blocked" : "Done"
  const labelColor =
    status === "running"
      ? "text-emerald-400"
      : status === "blocked"
        ? "text-amber-400"
        : "text-zinc-500"

  return (
    <div className="rounded-xl overflow-hidden border border-white/8 text-left font-mono text-xs shadow-2xl">
      <div className="flex items-center gap-2 bg-[#161819] px-4 py-2.5">
        <AgentIcon color={agentColor} size={15} />
        <span className="text-zinc-300 text-xs truncate">{title}</span>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          <span className={`text-[10px] ${labelColor}`}>{label}</span>
        </div>
      </div>
      <div className="bg-[#0d0d0d] px-4 py-3 space-y-1.5">
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              line.startsWith("●")
                ? "text-emerald-400"
                : line.startsWith("!")
                  ? "text-amber-400"
                  : line.startsWith(">")
                    ? "text-zinc-600"
                    : "text-zinc-400"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ── Goal card mockup (professional) ────────────────────── */
function GoalCard({
  title,
  tag,
  status,
  tasks,
  footer
}: {
  title: string
  tag?: string
  status: "active" | "review" | "done"
  tasks: { label: string; state: "done" | "active" | "pending" }[]
  footer?: string
}) {
  const s =
    status === "active"
      ? {
          dot: "bg-emerald-400",
          text: "text-emerald-600",
          label: "In progress"
        }
      : status === "review"
        ? {
            dot: "bg-amber-400",
            text: "text-amber-600",
            label: "Needs your input"
          }
        : { dot: "bg-zinc-300", text: "text-zinc-400", label: "Done" }

  return (
    <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
      <div className="px-5 py-4 border-b border-zinc-100 flex items-start justify-between gap-4">
        <div>
          {tag && (
            <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mb-1">
              {tag}
            </p>
          )}
          <span className="text-zinc-800 font-medium leading-snug">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          <span className={`text-[10px] ${s.text}`}>{s.label}</span>
        </div>
      </div>
      <div className="px-5 py-4 space-y-2.5">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-start gap-2.5">
            {task.state === "done" && (
              <span className="text-emerald-500 text-xs leading-5 mt-px shrink-0">
                ✓
              </span>
            )}
            {task.state === "active" && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            )}
            {task.state === "pending" && (
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 mt-1.5 shrink-0" />
            )}
            <span
              className={
                task.state === "done"
                  ? "text-zinc-500"
                  : task.state === "active"
                    ? "text-zinc-700"
                    : "text-zinc-400"
              }
            >
              {task.label}
            </span>
          </div>
        ))}
      </div>
      {footer && (
        <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
          <span className="text-xs text-zinc-500">{footer}</span>
        </div>
      )}
    </div>
  )
}

/* ── View toggle ─────────────────────────────────────────── */
function ViewToggle({
  view,
  onChange
}: {
  view: "professional" | "developer"
  onChange: (v: "professional" | "developer") => void
}) {
  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/15">
      {(["professional", "developer"] as const).map(v => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${
            view === v
              ? "bg-white text-zinc-900 font-medium"
              : "text-white/60 hover:text-white/90"
          }`}
        >
          {v === "professional" ? "Professional" : "Developer"}
        </button>
      ))}
    </div>
  )
}

/* ── Developer features data ─────────────────────────────── */
const devFeatures = [
  {
    number: "01",
    heading: "Every session, one view.",
    body: "See every agent session you've got running in one place. What it's working on, where it's blocked, what's finished. No more tab-hunting.",
    visual: (
      <div className="space-y-3">
        <AgentTab
          title="auth-refactor"
          status="blocked"
          agentColor="#f97316"
          lines={[
            "● Rewriting JWT middleware",
            "! Waiting: cookie strategy decision",
            "> Last active 2 min ago"
          ]}
        />
        <AgentTab
          title="q4-research"
          status="running"
          agentColor="#8b5cf6"
          lines={[
            "● Scanning competitor pricing pages",
            "● Summarising into report draft",
            "> Last active 4 min ago"
          ]}
        />
        <AgentTab
          title="api-integration"
          status="done"
          agentColor={CYAN}
          lines={[
            "● Rate limiting implemented",
            "● Bearer auth wired up",
            "> Completed 11 min ago"
          ]}
        />
      </div>
    )
  },
  {
    number: "02",
    heading: "Pick up where you left off.",
    body: "Drop into any thread and the overseer briefs you on what happened since you stepped away. Back in 10 seconds, not 10 minutes.",
    visual: (
      <AgentTab
        title="auth-refactor — briefing"
        status="running"
        agentColor="#f97316"
        lines={[
          "> Session ran 43 min",
          "● JWT middleware rewritten",
          "● Refresh token rotation done",
          "! Open: cookie vs localStorage?",
          "! Open: persist tokens cross-session?",
          "> Awaiting your decision to continue"
        ]}
      />
    )
  },
  {
    number: "03",
    heading: "Port context between sessions.",
    body: "Move context from one agent to another in one click. No re-explaining, no copy-pasting prompts.",
    visual: (
      <div className="space-y-3">
        <AgentTab
          title="api-integration → auth-refactor"
          status="done"
          agentColor={CYAN}
          lines={[
            "> Context transfer initiated",
            "● Rate limit: 100 req/min",
            "● Auth scheme: Bearer token",
            "● Transferred to auth-refactor ✓"
          ]}
        />
        <AgentTab
          title="auth-refactor"
          status="running"
          agentColor="#f97316"
          lines={[
            "● Context received from api-integration",
            "● Applying rate-limit constraints...",
            "> Continuing without re-briefing"
          ]}
        />
      </div>
    )
  },
  {
    number: "04",
    heading: "Easily customise agent system prompts.",
    body: "",
    visual: (
      <AgentTab
        title="system-prompt editor"
        status="running"
        agentColor="#10b981"
        lines={[
          "> Editing: auth-refactor agent",
          "● You are a senior backend engineer...",
          "● Prefer httpOnly cookies over localStorage",
          "● Always ask before modifying schema",
          "> Saved & applied to session ✓"
        ]}
      />
    )
  }
]

/* ── Professional features data ─────────────────────────── */
const proFeatures = [
  {
    number: "01",
    heading: "One view of everything.",
    body: "Every goal you've set. Every task in progress. Every result waiting for your review. No tab-hunting, no status updates, no re-explaining.",
    visual: (
      <div className="space-y-3">
        <GoalCard
          title="Newsletter — May edition"
          tag="Content"
          status="active"
          tasks={[
            { label: "Topic research done", state: "done" },
            { label: "Outline approved", state: "done" },
            { label: "Writing intro section...", state: "active" }
          ]}
        />
        <GoalCard
          title="New hire onboarding — Sarah"
          tag="HR"
          status="review"
          tasks={[
            { label: "IT setup confirmed", state: "done" },
            { label: "Welcome doc drafted", state: "done" },
            { label: "Intro meetings scheduled", state: "done" }
          ]}
          footer="Welcome pack ready for your review"
        />
      </div>
    )
  },
  {
    number: "02",
    heading: "Context that carries.",
    body: "Your agents share what they know. Research feeds into writing. A client brief informs the outreach. Nothing gets lost between sessions.",
    visual: (
      <div className="space-y-2">
        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-zinc-100">
            <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mb-0.5">
              Research goal
            </p>
            <p className="text-zinc-800 font-medium">
              Customer interview synthesis
            </p>
          </div>
          <div className="px-5 py-3 space-y-1.5">
            <p className="text-xs text-emerald-600">
              ✓ 8 interview transcripts processed
            </p>
            <p className="text-xs text-emerald-600">
              ✓ Pain points and themes mapped
            </p>
            <p className="text-xs text-zinc-400">
              → Context passed to next goal
            </p>
          </div>
        </div>
        <div className="flex justify-center py-1">
          <div className="w-px h-5 bg-zinc-200" />
        </div>
        <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
          <div className="px-5 py-3 border-b border-zinc-100">
            <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mb-0.5">
              Writing goal
            </p>
            <p className="text-zinc-800 font-medium">
              Product spec — v2 feature set
            </p>
          </div>
          <div className="px-5 py-3 space-y-1.5">
            <p className="text-xs text-zinc-500">
              Using interview insights from research goal
            </p>
            <p className="text-xs text-emerald-600">
              ● Drafting section 2 — user pain points...
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    number: "03",
    heading: "You're in control.",
    body: "Yaven won't make the calls that need a human. It surfaces decisions, gets your input, and moves on. You stay the director. It does the work.",
    visual: (
      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
        <div className="px-5 py-4 border-b border-zinc-100">
          <p className="text-[10px] tracking-[0.15em] uppercase text-amber-500 mb-1.5">
            Decision needed
          </p>
          <p className="text-zinc-800 font-medium">
            Partnership outreach — APAC
          </p>
        </div>
        <div className="px-5 py-4 space-y-3">
          <p className="text-zinc-500 text-sm leading-relaxed">
            3 outreach emails drafted. Waiting for your approval before sending.
          </p>
          <div className="bg-zinc-50 rounded-xl px-4 py-3 text-zinc-500 text-xs leading-relaxed border border-zinc-100 italic">
            &ldquo;Hi Mei, I came across your work on regional distribution and
            thought there might be a strong fit...&rdquo;
          </div>
        </div>
        <div className="px-5 py-4 border-t border-zinc-100 flex gap-3">
          <button className="flex-1 rounded-lg bg-zinc-900 text-white text-xs py-2.5 font-medium">
            Approve &amp; send
          </button>
          <button className="flex-1 rounded-lg border border-zinc-200 text-zinc-600 text-xs py-2.5">
            Edit drafts
          </button>
        </div>
      </div>
    )
  },
  {
    number: "04",
    heading: "Works across all major models.",
    body: "Claude, ChatGPT, Gemini. Yaven sits above the models. You don't manage which one does what — Yaven does.",
    visual: (
      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
        <div className="px-5 py-4 border-b border-zinc-100">
          <p className="text-zinc-800 font-medium">Active on this goal</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Newsletter — May edition
          </p>
        </div>
        <div className="px-5 py-5 space-y-4">
          {[
            {
              name: "Claude",
              task: "Drafting the newsletter intro",
              color: "#d97706"
            },
            {
              name: "GPT-4",
              task: "Fact-checking statistics",
              color: "#10b981"
            },
            {
              name: "Gemini",
              task: "Formatting for web publish",
              color: "#3b82f6"
            }
          ].map(m => (
            <div key={m.name} className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: m.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-zinc-700 text-xs font-medium">{m.name}</p>
                <p className="text-zinc-400 text-xs truncate">{m.task}</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100">
          <p className="text-xs text-zinc-400">
            Yaven routes automatically — you don&apos;t choose
          </p>
        </div>
      </div>
    )
  }
]

/* ── Professional content ────────────────────────────────── */
function ProfessionalSections() {
  return (
    <>
      {/* Intro */}
      <section className="bg-white px-6 py-32">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10">
            You have things to get done. Yaven handles them.
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-600">
            <p>
              Not a chatbot. Not another tab. Yaven is where your goals, work
              projects, research, outreach, decisions, planning, live and get
              completed. You set the direction. Your agents handle the work.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Use cases */}
      <section className="bg-white px-6 pb-32">
        <FadeIn className="max-w-6xl mx-auto border-t border-zinc-200 pt-20">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-8 lg:pt-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif">
                Built for the way you actually work.
              </h2>
              <div className="space-y-8 text-base sm:text-lg leading-relaxed text-zinc-600">
                <p>
                  Someone is running AEO research for three clients, briefing a
                  newsletter, and tracking a pipeline across two companies. They
                  tell Yaven what needs to happen. They come back to progress,
                  not questions.
                </p>
                <p>
                  Another is onboarding a new portfolio manager at an asset
                  management firm. Yaven handles the CRM updates, the briefing
                  documents, and the follow-up emails while they focus on the
                  relationship.
                </p>
                <p>
                  You want to research a kitchen renovation, compare
                  contractors, and keep track of costs. Tell Yaven once. It
                  builds the brief while you get on with your day.
                </p>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <GoalCard
                title="AEO Research — 3 clients"
                tag="Research"
                status="active"
                tasks={[
                  { label: "Competitor analysis complete", state: "done" },
                  { label: "Top questions mapped", state: "done" },
                  { label: "Writing FAQ briefs...", state: "active" }
                ]}
              />
              <GoalCard
                title="Portfolio manager onboarding"
                tag="Client work"
                status="review"
                tasks={[
                  { label: "CRM updated", state: "done" },
                  { label: "Briefing document drafted", state: "done" },
                  { label: "Follow-up email ready", state: "done" }
                ]}
                footer="Draft email waiting for your approval"
              />
              <GoalCard
                title="Kitchen renovation research"
                tag="Personal"
                status="done"
                tasks={[
                  { label: "3 contractors compared", state: "done" },
                  { label: "Cost tracker built", state: "done" }
                ]}
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* How it works */}
      <section className="bg-zinc-50 px-6 py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-20">
              How it works.
            </h2>
          </FadeIn>
          <div className="space-y-32">
            {/* Step 1 — text left, visual right */}
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
                <div className="flex gap-8 flex-1 lg:pt-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 pt-1.5 w-4 shrink-0">
                    1
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                      Tell Yaven what you're working toward.
                    </h3>
                    <p className="text-base leading-relaxed text-zinc-600 max-w-sm">
                      Your goals, your tools, how your week runs. The more it
                      understands your world, the more it can do in it.
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
                    <div className="px-5 py-3 border-b border-zinc-100">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400">
                        Getting to know your work
                      </p>
                    </div>
                    <div className="px-5 py-4 space-y-4">
                      <div>
                        <p className="text-xs text-zinc-400 mb-2">
                          Tools you use daily
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            "/logos/notion.png",
                            "/logos/gmail.png",
                            "/logos/hubspot.png",
                            "/logos/monday.png",
                            "/logos/linkedin.png"
                          ].map((l, i) => (
                            <img
                              key={i}
                              src={l}
                              alt=""
                              className="w-6 h-6 rounded object-contain opacity-40"
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 mb-1">
                          What you're focused on
                        </p>
                        <p className="text-xs text-zinc-700 leading-relaxed">
                          Growing partnerships in APAC, managing a team of 6,
                          weekly investor updates
                        </p>
                      </div>
                      <div className="bg-zinc-50 rounded-xl px-4 py-3 border border-zinc-100">
                        <p className="text-xs text-zinc-500 mb-2">
                          Yaven is mapping your recurring workflows...
                        </p>
                        <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                          <div className="h-full bg-zinc-800 rounded-full w-[65%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Step 2 — text right, visual left */}
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-16 lg:flex-row-reverse lg:items-start">
                <div className="flex gap-8 flex-1 lg:pt-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 pt-1.5 w-4 shrink-0">
                    2
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                      It builds the playbook.
                    </h3>
                    <p className="text-base leading-relaxed text-zinc-600 max-w-sm">
                      Yaven maps your workflows, orchestrates the right agents,
                      and starts automating the repeatable — without you
                      configuring a thing.
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
                    <div className="px-5 py-3 border-b border-zinc-100">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mb-0.5">
                        Playbook created
                      </p>
                      <p className="text-zinc-800 font-medium">
                        APAC partnership outreach
                      </p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      {[
                        {
                          agent: "Research agent",
                          task: "Scans LinkedIn + news for warm leads",
                          state: "auto"
                        },
                        {
                          agent: "Outreach agent",
                          task: "Drafts and sends personalised emails",
                          state: "auto"
                        },
                        {
                          agent: "CRM agent",
                          task: "Logs replies and updates HubSpot",
                          state: "auto"
                        }
                      ].map(row => (
                        <div key={row.agent} className="flex items-start gap-3">
                          <span className="mt-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 shrink-0">
                            AUTO
                          </span>
                          <div>
                            <p className="text-xs font-medium text-zinc-700">
                              {row.agent}
                            </p>
                            <p className="text-xs text-zinc-400">{row.task}</p>
                          </div>
                        </div>
                      ))}
                      <div className="h-px bg-zinc-100" />
                      <p className="text-xs text-zinc-400">
                        ↻ Runs every Monday morning · no setup required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Step 3 — text left, visual right */}
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
                <div className="flex gap-8 flex-1 lg:pt-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 pt-1.5 w-4 shrink-0">
                    3
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                      It runs. You decide.
                    </h3>
                    <p className="text-base leading-relaxed text-zinc-600 max-w-sm">
                      Agents handle the complex. Automations handle the routine.
                      You come back to the calls only you can make — then it
                      moves on.
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    {
                      label: "Investor update email",
                      note: "Sent automatically · every Friday",
                      auto: true
                    },
                    {
                      label: "LinkedIn post — product launch",
                      note: "Drafted and scheduled · no action needed",
                      auto: true
                    },
                    {
                      label: "New hire welcome pack",
                      note: "Sent automatically · triggered on Workday",
                      auto: true
                    }
                  ].map(item => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-white border border-zinc-200 px-4 py-3 flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div>
                        <p className="text-xs font-medium text-zinc-700">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {item.note}
                        </p>
                      </div>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 shrink-0">
                        AUTO
                      </span>
                    </div>
                  ))}
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-amber-800">
                        Partnership proposal — Mei Chen
                      </p>
                      <p className="text-[11px] text-amber-600 mt-0.5">
                        Ready to send · needs your sign-off
                      </p>
                    </div>
                    <button className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-amber-800 text-white shrink-0">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What Yaven gives you */}
      <section className="bg-white px-6 py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-20">
              What Yaven gives you.
            </h2>
          </FadeIn>
          <div className="space-y-32">
            {proFeatures.map((f, i) => (
              <FadeIn key={f.number} delay={0.05}>
                <div
                  className={`flex flex-col gap-16 lg:flex-row lg:items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1 space-y-5 lg:pt-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                      {f.number}
                    </p>
                    <h3 className="text-xl sm:text-2xl leading-[1.1] tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                      {f.heading}
                    </h3>
                    {f.body && (
                      <p className="text-base leading-relaxed text-zinc-600 max-w-sm">
                        {f.body}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">{f.visual}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Developer content ───────────────────────────────────── */
function DeveloperSections() {
  return (
    <>
      <section className="bg-white px-6 py-32">
        <FadeIn className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-shimmer-dark font-instrument-serif text-2xl leading-none">
              Y
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
              The problem
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10">
            Six tabs. Zero memory. All in your head.
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-600">
            <p>
              You&apos;re running multiple agent sessions on different threads.
              One refactoring auth, one writing tests, one researching a fix.
              You step away for a meeting. You come back and have to ask each
              session &ldquo;where were we?&rdquo;
            </p>
            <p>
              Agents have memory inside each session. They don&apos;t transfer
              this to each other. You become the human glue holding the workflow
              together.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="bg-white px-6 pb-32">
        <FadeIn className="max-w-3xl mx-auto border-t border-zinc-200 pt-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10">
            Your agents shouldn&apos;t live in tabs.
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-600">
            <p>
              You don&apos;t need fewer agents. You need a layer above them that
              remembers what each one is doing, knows when they&apos;re done,
              and moves context where it needs to go.
            </p>
            <p className="font-medium">
              <strong className="text-shimmer-dark font-bold italic">
                We&apos;re building that layer.
              </strong>
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="bg-zinc-50 px-6 py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-20">
              What Yaven does
            </h2>
          </FadeIn>
          <div className="space-y-32">
            {devFeatures.map((f, i) => (
              <FadeIn key={f.number} delay={0.05}>
                <div
                  className={`flex flex-col gap-16 lg:flex-row lg:items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1 space-y-5 lg:pt-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                      {f.number}
                    </p>
                    <h3 className="text-xl sm:text-2xl leading-[1.1] tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                      {f.heading}
                    </h3>
                    {f.body && (
                      <p className="text-base leading-relaxed text-zinc-600 max-w-sm">
                        {f.body}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">{f.visual}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default function Home() {
  const [view, setView] = useState<"professional" | "developer">("professional")

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0b0d12]">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-white to-transparent z-2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 pt-8 flex items-center justify-between">
          <span className="text-4xl tracking-tight text-[#1a2744] font-instrument-serif">
            Yaven<sup className="text-xs">®</sup>
          </span>
          <ViewToggle view={view} onChange={setView} />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-8 pt-10 pb-40 min-h-[calc(100vh-72px)] max-w-7xl mx-auto w-full">
          <div className="max-w-none">
            <h1 className="text-[5.5vw] leading-[0.95] tracking-[-2.46px] text-[#1a2744] font-instrument-serif animate-fade-rise whitespace-nowrap">
              Focus in a Distracted World
            </h1>

            <p className="text-base sm:text-lg max-w-lg mt-10 leading-relaxed text-black animate-fade-rise-delay">
              Tell Yaven what you want to accomplish. It works through it — so
              you come back to results, not{" "}
              <strong className="text-shimmer font-bold italic">chaos</strong>.
            </p>

            <WaitlistButton
              label="Join the Waitlist"
              className="mt-10 rounded-full bg-shimmer text-zinc-900 px-10 py-3.5 text-sm font-medium hover:brightness-110 hover:scale-[1.03] transition-all cursor-pointer animate-fade-rise-delay-2 shadow-lg"
            />

            <p className="mt-6 text-sm font-medium text-black animate-fade-rise-delay-2">
              явен (yaven) — Bulgarian for{" "}
              <span className="italic">open, plain to see, obvious.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────── */}
      {view === "professional" ? (
        <ProfessionalSections />
      ) : (
        <DeveloperSections />
      )}

      {/* ── Footer CTA ─────────────────────────────────────── */}
      <section className="bg-white px-6 py-32 text-center border-t border-zinc-200">
        <FadeIn className="max-w-2xl mx-auto space-y-8">
          <div className="flex justify-center">
            <span className="text-shimmer-dark font-instrument-serif text-8xl leading-none">
              Y
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl leading-[1.05] tracking-[-1.2px] text-zinc-900 font-instrument-serif">
            {view === "professional"
              ? "Stop juggling. Start doing."
              : "Stop babysitting. Start building."}
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Early access is limited. Get in before the queue fills up.
          </p>
          <WaitlistButton
            label="Join the Waitlist"
            className="inline-block rounded-full bg-shimmer text-zinc-900 px-14 py-5 text-base font-medium hover:brightness-110 hover:scale-[1.03] transition-all cursor-pointer shadow-lg"
          />
        </FadeIn>
      </section>
    </>
  )
}
