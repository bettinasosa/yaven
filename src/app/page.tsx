"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { WaitlistButton } from "@/components/waitlist-button"
import { FadeIn } from "@/components/fade-in"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"

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

/* ── Social proof data ───────────────────────────────────── */
const testimonials = [
  {
    quote:
      "I know I'm leaving hours on the table every week. I just need someone to show me where the gaps are.",
    role: "Head of Business Development, music fintech"
  },
  {
    quote:
      "The data exists — it's all in our project tracker. We just don't have anyone pulling on it forensically.",
    role: "Managing Director, asset management"
  },
  {
    quote:
      "I track my work in one tool and actually do the work in another. There's no real connection between them.",
    role: "Product Manager, global manufacturing"
  },
  {
    quote:
      "I've built five custom AI workflows for myself. But my team can't do that — and the gap is only growing.",
    role: "Head of Sales, SaaS"
  },
  {
    quote:
      "The tools that exist are either too technical for normal people or too simple to be genuinely useful.",
    role: "CEO, research & insights"
  }
]

function TestimonialCard({ quote, role }: { quote: string; role: string }) {
  return (
    <div className="w-[18rem] shrink-0 rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 flex flex-col gap-5 min-h-56 sm:w-[21rem]">
      <p className="text-zinc-700 text-sm leading-relaxed italic flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400">
        {role}
      </p>
    </div>
  )
}

/* ── FAQ data ─────────────────────────────────────────────── */
const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "No. Yaven is built for people who work in complex systems — not people who build them. If you can describe a workflow, Yaven can help run it."
  },
  {
    q: "How is this different from just using ChatGPT?",
    a: "ChatGPT answers questions in a conversation. Yaven manages ongoing work. It remembers context between sessions, connects to the tools you already use, and keeps things moving without constant input from you."
  },
  {
    q: "What tools does Yaven connect to?",
    a: "We're building integrations with the tools people actually use: Notion, Gmail, HubSpot, Slack, Monday.com, LinkedIn, Airtable, and more. Tell us what you need when you join the waitlist."
  },
  {
    q: "When will I get access?",
    a: "We're onboarding our first users now. Join the waitlist and we'll reach out directly — no queue number, just a conversation."
  },
  {
    q: "Is my data private?",
    a: "Yes. Your workflows, goals, and data are yours. We don't use your content to train models or share it with third parties."
  }
]

/* ── Professional content ────────────────────────────────── */
function ProfessionalSections() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  return (
    <>
      {/* ── Intro: master of many domains ──────────────────── */}
      <section className="bg-white px-6 py-16 sm:py-32">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10">
            You are a master of many domains.
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-600">
            <p>
              You move between emails, Slack, meetings, spreadsheets, CRMs —
              each with its own language and priorities. Keeping on top of all
              of it is exactly what makes you effective. But it shouldn&apos;t
              have to sit entirely in your head.
            </p>
            <p>
              Not a chatbot. Not another tab. Yaven is where your goals,
              projects, research, outreach, and decisions live and get
              completed. You set the direction. Your agents handle the work. And
              you don&apos;t need to be an engineer to use it.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Use cases ──────────────────────────────────────── */}
      <section className="bg-white px-6 pb-16 sm:pb-32">
        <FadeIn className="max-w-6xl mx-auto border-t border-zinc-200 pt-10 sm:pt-20">
          <div className="flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-8 lg:pt-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif">
                Built for the way you actually work.
              </h2>
              <div className="space-y-8 text-base sm:text-lg leading-relaxed text-zinc-600">
                <p>
                  You&apos;re running SEO research for three clients, briefing a
                  newsletter, and tracking a pipeline across two companies. You
                  describe the workflow to Yaven. You come back to progress —
                  and the questions that only you can answer.
                </p>
                <p>
                  Maybe you&apos;re onboarding a new hire at your firm. Yaven
                  handles the CRM updates, the briefing documents, and the
                  follow-up emails while you focus on the relationship.
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
                title="SEO research — 3 clients"
                tag="Research"
                status="active"
                tasks={[
                  { label: "Competitor analysis complete", state: "done" },
                  { label: "Top keywords mapped", state: "done" },
                  { label: "Writing content briefs...", state: "active" }
                ]}
              />
              <GoalCard
                title="New hire onboarding — Alex"
                tag="Operations"
                status="review"
                tasks={[
                  { label: "CRM updated", state: "done" },
                  { label: "Briefing document drafted", state: "done" },
                  { label: "Intro meetings scheduled", state: "done" }
                ]}
                footer="Welcome pack ready for your review"
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

      {/* ── How it works ───────────────────────────────────── */}
      <section className="bg-zinc-50 px-6 py-16 sm:py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10 sm:mb-20">
              How it works.
            </h2>
          </FadeIn>
          <div className="space-y-16 sm:space-y-32">
            {/* Step 1 */}
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-10 sm:gap-10 sm:gap-16 lg:flex-row lg:items-start">
                <div className="flex-1 space-y-1 lg:pt-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                    01
                  </span>
                  <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                    Tell Yaven what you&apos;re working toward.
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-600 max-w-sm pt-1">
                    Your day-to-day, your goals, your tools, how your week runs.
                    The more it understands your world, the more it can do in
                    it.
                  </p>
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
                            "/logos/linkedin.png",
                            "/logos/asana.png"
                          ].map((l, i) => (
                            <Image
                              key={i}
                              src={l}
                              alt=""
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded object-contain opacity-40"
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400 mb-1">
                          What you&apos;re focused on
                        </p>
                        <p className="text-xs text-zinc-700 leading-relaxed">
                          Weekly investor updates · Q2 content calendar for four
                          clients · onboarding two new hires
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

            {/* Step 2 */}
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-10 sm:gap-16 lg:flex-row-reverse lg:items-start">
                <div className="flex-1 space-y-1 lg:pt-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                    02
                  </span>
                  <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                    It builds the playbook.
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-600 max-w-sm pt-1">
                    Yaven maps your workflows, orchestrates the right agents,
                    and starts automating the repeatable — without you
                    configuring a thing.
                  </p>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
                    <div className="px-5 py-3 border-b border-zinc-100">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mb-0.5">
                        Playbook created
                      </p>
                      <p className="text-zinc-800 font-medium">
                        Weekly investor update
                      </p>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      {[
                        {
                          agent: "Research agent",
                          task: "Pulls portfolio performance data"
                        },
                        {
                          agent: "Writing agent",
                          task: "Drafts the update in your tone and format"
                        },
                        {
                          agent: "Outreach agent",
                          task: "Sends to your distribution list"
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
                        ↻ Runs every Friday morning · no setup required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-10 sm:gap-10 sm:gap-16 lg:flex-row lg:items-start">
                <div className="flex-1 space-y-1 lg:pt-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                    03
                  </span>
                  <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                    It runs. You decide.
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-600 max-w-sm pt-1">
                    Agents handle the complex. Automations handle the routine.
                    You come back to the calls only you can make — then it moves
                    on.
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    {
                      label: "Investor update email",
                      note: "Sent automatically · every Friday"
                    },
                    {
                      label: "Monthly client report — 4 accounts",
                      note: "Compiled and sent · no action needed"
                    },
                    {
                      label: "New hire welcome pack",
                      note: "Sent automatically · on contract signing"
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
                        Q3 proposal — Northfield Partners
                      </p>
                      <p className="text-[11px] text-amber-600 mt-0.5">
                        Draft ready · needs your sign-off before sending
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

      {/* ── What Yaven gives you ────────────────────────────── */}
      <section className="bg-white px-6 py-16 sm:py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10 sm:mb-20">
              What Yaven gives you.
            </h2>
          </FadeIn>
          <div className="space-y-16 sm:space-y-32">
            {proFeatures.map((f, i) => (
              <FadeIn key={f.number} delay={0.05}>
                <div
                  className={`flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1 space-y-1 lg:pt-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                      {f.number}
                    </p>
                    <h3 className="text-xl sm:text-2xl leading-[1.1] tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                      {f.heading}
                    </h3>
                    {f.body && (
                      <p className="text-base leading-relaxed text-zinc-600 max-w-sm pt-1">
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

      {/* ── Social proof ───────────────────────────────────── */}
      <section className="bg-zinc-50 px-6 py-16 sm:py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-4">
              Built with people like you.
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 mb-8 sm:mb-16 max-w-xl">
              Before we wrote a line of code, we sat down with the people
              who&apos;d use it. Here&apos;s what we heard.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="testimonial-marquee -mx-6 px-6">
              <div className="testimonial-marquee-track flex w-max gap-4">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <TestimonialCard
                    key={`${t.role}-${i}`}
                    quote={t.quote}
                    role={t.role}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-16 sm:py-32 border-t border-zinc-200">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-8 sm:mb-16">
              Frequently asked questions.
            </h2>
          </FadeIn>
          <div>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={0.04}>
                <div className="border-t border-zinc-200 py-8">
                  <button
                    type="button"
                    aria-expanded={openFaqIndex === i}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                  >
                    <span className="text-lg font-medium text-zinc-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
                        openFaqIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    className={`grid transition-all duration-300 ease-out ${
                      openFaqIndex === i
                        ? "grid-rows-[1fr] pt-3 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base leading-relaxed text-zinc-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
            <div className="border-t border-zinc-200" />
          </div>
        </div>
      </section>
    </>
  )
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.35
    }
  }, [])

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0b0d12]">
        <video
          ref={videoRef}
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
          <span className="text-4xl tracking-tight text-[#F2F2E5] font-instrument-serif">
            yaven
          </span>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-center px-6 pb-16 pt-24 sm:px-8 lg:pb-20 lg:pt-36">
          <div className="max-w-3xl">
            <h1 className="text-5xl leading-[0.98] tracking-normal text-[#1a2744] font-instrument-serif animate-fade-rise sm:text-6xl xl:text-7xl">
              Focus in a distracted world
            </h1>

            <p className="text-base font-semibold max-w-lg mt-8 leading-relaxed text-black animate-fade-rise-delay">
              Tell us how you work, we'll show you what could run on its own
            </p>

            <div className="mt-8 max-w-[440px] animate-fade-rise-delay-2">
              <BlueprintPanel />
            </div>

            <p className="mt-8 text-xs text-black/70 animate-fade-rise-delay-2">
              <span className="font-bold">явен (yaven)</span>{" "}
              <span className="italic">
                {" "}
                — Bulgarian for open, plain to see, obvious.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────── */}
      <ProfessionalSections />

      {/* ── Footer CTA ─────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 sm:py-32 text-center bg-white border-t border-zinc-200">
        <FadeIn className="max-w-2xl mx-auto space-y-8">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Yaven"
              width={96}
              height={96}
              className="size-20 rounded-2xl object-cover sm:size-24"
            />
          </div>
          <h2 className="text-4xl sm:text-5xl leading-[1.05] tracking-[-1.2px] font-instrument-serif text-zinc-900">
            Stop juggling. Start doing.
          </h2>
          <p className="text-base leading-relaxed text-zinc-600">
            Early access is limited. Get in before the queue fills up.
          </p>
          <WaitlistButton
            label="Join the Waitlist"
            className="inline-block rounded-full bg-[#F2F2E5] text-zinc-900 px-8 sm:px-14 py-4 sm:py-5 text-base font-medium hover:scale-[1.03] transition-all cursor-pointer btn-hero-shadow"
          />
        </FadeIn>
      </section>
    </>
  )
}
