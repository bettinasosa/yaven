"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { WaitlistButton } from "@/components/waitlist-button"
import { FadeIn } from "@/components/fade-in"
import { BlueprintPanel } from "@/components/blueprint/blueprint-panel"
import { HeroRefractionVideo } from "@/components/hero-refraction-video"

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
    <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
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

/* ── Social proof data ───────────────────────────────────── */
const testimonials = [
  {
    quote:
      "I'd need an AI coach sitting with me to even know where the opportunities are.",
    name: "Matthew",
    role: "Head of Artist and Industry Development"
  },
  {
    quote:
      "Tracking my work and doing my work happen in completely separate systems. There's no connection between them.",
    name: "Mckenna",
    role: "Digital Strategy and Transformation"
  },
  {
    quote:
      "The gap between what AI can do and what a normal person can actually get it to do is only growing.",
    name: "Steve",
    role: "Strategy and Growth"
  },
  {
    quote:
      "I've built five custom workflows for myself. But my team can't do that.",
    name: "Nasir",
    role: "Sales"
  },
  {
    quote:
      "I can identify individual things AI would improve. I just can't find the one thing that ties it all together.",
    name: "Phil",
    role: "Managing Director"
  }
]

function TestimonialCard({
  quote,
  name,
  role
}: {
  quote: string
  name: string
  role: string
}) {
  return (
    <div className="w-[18rem] shrink-0 rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 flex flex-col gap-5 min-h-56 sm:w-84 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-zinc-700 text-sm leading-relaxed italic flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="text-xs font-semibold text-zinc-700">{name}</p>
        <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mt-0.5">
          {role}
        </p>
      </div>
    </div>
  )
}

/* ── CTA card inside the marquee ─────────────────────────── */
function CTAMarqueeCard() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[22rem] shrink-0 rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 flex flex-col justify-between gap-6 min-h-56 sm:w-[26rem]">
      {submitted ? (
        <p className="text-base font-medium text-zinc-700 my-auto">
          You&apos;re on the list — we&apos;ll be in touch soon.
        </p>
      ) : (
        <>
          <p className="text-xl leading-snug font-bold italic text-[#7696dc] font-instrument-serif">
            Want to see what your week looks like without the noise?
          </p>
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex flex-1 items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1 focus-within:border-zinc-400">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-press-dark shrink-0 disabled:opacity-60"
            >
              {loading ? "Saving…" : "Get early access"}
            </button>
          </form>
        </>
      )}
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
    a: (
      <>
        We&apos;re building integrations with the tools people actually use:{" "}
        {[
          { src: "/logos/notion.png", label: "Notion", rotate: "rotate-3" },
          { src: "/logos/gmail.png", label: "Gmail", rotate: "-rotate-2" },
          { src: "/logos/hubspot.png", label: "HubSpot", rotate: "rotate-6" },
          {
            src: "/logos/monday.png",
            label: "Monday.com",
            rotate: "-rotate-3"
          },
          { src: "/logos/linkedin.png", label: "LinkedIn", rotate: "rotate-2" }
        ].map(({ src, label, rotate }) => (
          <span
            key={label}
            className={`inline-flex items-center justify-center w-[22px] h-[22px] rounded-lg bg-[#EEF3FA] align-middle mx-1 ${rotate}`}
          >
            <Image
              src={src}
              alt={label}
              width={14}
              height={14}
              className="object-contain"
            />
          </span>
        ))}
        , Slack, Airtable, and more. Tell us what you need when you join the
        waitlist.
      </>
    )
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
      <section className="relative overflow-hidden bg-white px-6 pt-20 sm:pt-36 pb-28 sm:pb-52">
        <Image
          src="/cloud.png"
          alt=""
          width={520}
          height={280}
          className="pointer-events-none select-none absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] opacity-40 sm:w-[520px]"
          aria-hidden="true"
        />
        <FadeIn className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-12">
            You are a master of many domains.
          </h2>
          <div className="flex flex-col gap-12 sm:gap-16">
            {/* Row 1: paragraph + chart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center">
              <p className="text-base sm:text-lg leading-relaxed text-zinc-500">
                There&apos;s a gap opening up in every industry. On one side:
                people who&apos;ve figured out how to make AI do the repetitive
                half of their job. On the other: everyone still doing it
                themselves. The difference isn&apos;t intelligence. It&apos;s
                knowing what to hand off, and having trust that something can
                actually do it accurately.
              </p>
              {/* EY Survey Chart */}
              <div
                className="rounded-2xl bg-[#5B99C4]/10 px-6 py-6"
                style={{ boxShadow: "0 2px 12px rgba(32,83,165,0.08)" }}
              >
                <div className="space-y-4">
                  {/* Bar 1 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span>Use AI for basic tasks</span>
                      <span className="font-medium text-zinc-700">88%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#F5C0C1]"
                        style={{ width: "88%" }}
                      />
                    </div>
                  </div>
                  {/* Bar 2 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span>Use AI to transform their work</span>
                      <span className="font-medium text-zinc-700">5%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: "5%", background: "#5B99C4" }}
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-xs text-zinc-400 leading-snug">
                  Source: EY Work Reimagined Survey 2025,
                  <br />
                  15,000 employees across 29 countries
                </p>
              </div>
            </div>

            {/* Row 2: Yaven logo + paragraph */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Yaven"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-2xl hover-shadow-blue"
                />
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-500">
                Yaven connects to all your devices and tools. It learns your
                habits, follows how your week runs, and handles the tasks that
                repeat. Follow-ups sent. Notes logged. Reports found. When
                something needs a human decision, it brings it to your
                attention. Everything else is handled for you. No code. No
                configuration. Just your work, moving forward.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Use cases ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-6 pb-20 sm:pb-40">
        <Image
          src="/cloud.png"
          alt=""
          width={520}
          height={280}
          className="pointer-events-none select-none absolute -left-36 bottom-0 w-[380px] opacity-40 sm:w-[520px]"
          aria-hidden="true"
        />
        <FadeIn className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-8 lg:pt-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif">
                Built for the way you actually work.
              </h2>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-600">
                <p>
                  Work, operations, personal — it doesn&apos;t matter what the
                  task is.{" "}
                  <span className="text-shimmer-dark font-bold italic">
                    yaven
                  </span>{" "}
                  handles it.
                </p>
                <p>
                  Your investor update drafted in your tone and ready to send.
                  Your new hire onboarded without a checklist in sight. Your
                  holiday researched, compared, and waiting for your final word.
                </p>
                <p>
                  You come back to decisions, not groundwork. It runs in the
                  background, flags what needs you, and keeps everything moving.
                  No prompting. No babysitting.
                </p>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <GoalCard
                title="Investor update — May"
                tag="Work"
                status="active"
                tasks={[
                  { label: "Portfolio data pulled", state: "done" },
                  { label: "Draft written in your tone", state: "done" },
                  { label: "Sending to distribution list...", state: "active" }
                ]}
              />
              <GoalCard
                title="New hire onboarding — Jamie"
                tag="Operations"
                status="review"
                tasks={[
                  { label: "IT access set up", state: "done" },
                  { label: "Intro meetings scheduled", state: "done" },
                  { label: "First week plan drafted", state: "done" }
                ]}
                footer="Welcome pack ready for your review"
              />
              <GoalCard
                title="Holiday research — Japan"
                tag="Personal"
                status="review"
                tasks={[
                  { label: "5 itineraries compared", state: "done" },
                  { label: "Budget tracker built", state: "done" },
                  {
                    label:
                      "Flights and hotels found — here's what we think you'll like",
                    state: "done"
                  }
                ]}
                footer="Your approval needed before anything is booked"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 pt-0 pb-20 sm:pb-40"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, #fff 12%, #FFFF 72%, #FFFFFF 88%, white 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10 sm:mb-20">
              How it works.
            </h2>
          </FadeIn>
          <div className="space-y-16 sm:space-y-32">
            {/* Step 1 */}
            <div className="relative flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start">
              <FadeIn className="flex-1 space-y-1 lg:pt-2">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  01
                </span>
                <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                  Tell Yaven what you&apos;re working toward.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Your day-to-day, your goals, your tools, how your week runs.
                  The more it understands your world, the more it can do in it.
                  You don&apos;t need to know what to automate. Yaven figures
                  that out from what you tell it.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1 relative z-10">
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
              </FadeIn>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col gap-10 sm:gap-16 lg:flex-row-reverse lg:items-start">
              <Image
                src="/cloud.png"
                alt=""
                width={440}
                height={236}
                className="pointer-events-none select-none absolute -left-20 -top-12 w-[260px] opacity-35 sm:w-[380px] hidden sm:block -z-10"
                aria-hidden="true"
              />
              <FadeIn className="flex-1 space-y-1 lg:pt-2">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  02
                </span>
                <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                  It builds the playbook.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Yaven maps your workflows, orchestrates the right agents, and
                  starts automating the repeatable. No configuration required.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1">
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
              </FadeIn>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start">
              <FadeIn className="flex-1 space-y-1 lg:pt-2">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  03
                </span>
                <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                  It runs in the background. You make the calls.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Most AI tools wait to be asked. Yaven doesn&apos;t. Once it
                  knows your workflow, it runs quietly in the corner of your
                  screen. Following up, logging, updating, compiling. When
                  something genuinely needs you, it lands in your inbox. You
                  approve, edit, or redirect, and it moves on.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1 space-y-3">
                {[
                  {
                    msg: "Investor update sent. Pulled your numbers from Notion, kept your usual tone, and hit send at 8am like always.",
                    note: "Every Friday · no input needed"
                  },
                  {
                    msg: "Jamie's welcome pack is out. IT access, intro meetings, and first-week plan all handled.",
                    note: "Triggered on contract signing"
                  }
                ].map(item => (
                  <div
                    key={item.msg}
                    className="rounded-xl bg-white px-4 py-3 space-y-1.5"
                    style={{ boxShadow: "0 2px 12px rgba(32,83,165,0.08)" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B99C4] shrink-0" />
                      <p className="text-[10px] tracking-[0.12em] uppercase text-[#5B99C4] font-medium">
                        Yaven
                      </p>
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-600">
                      {item.msg}
                    </p>
                    <p className="text-[10px] text-zinc-400">{item.note}</p>
                  </div>
                ))}
                <div
                  className="rounded-xl bg-[#EEF3FA] px-4 py-4 space-y-3"
                  style={{ boxShadow: "0 4px 16px rgba(32,83,165,0.12)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B99C4] shrink-0" />
                    <p className="text-[10px] tracking-[0.12em] uppercase text-[#5B99C4] font-medium">
                      Yaven
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed text-[#2053A5]">
                    I&apos;ve drafted your board update. Pulled last
                    month&apos;s metrics, matched your tone from the last one,
                    and kept it under two minutes to read. Ready to go — just
                    need you to say the word.
                  </p>
                  <div className="flex justify-end">
                    <button className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-[#5B99C4] text-white shrink-0">
                      Send it
                    </button>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-10 sm:gap-16 lg:flex-row-reverse lg:items-center">
              <FadeIn className="flex-1 space-y-1 lg:pt-2">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-500">
                  04
                </span>
                <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                  In when you want. Out when you don&apos;t.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Open the agent playground when you want to dig in or
                  customise. Close it when you don&apos;t. Either way, the work
                  is moving. Not a tab you forget to check. A system that&apos;s
                  already working.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                >
                  <source src="/agent-team.mp4" type="video/mp4" />
                </video>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 pt-0 pb-20 sm:pb-40"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, #EEF3FA 12%, #EEF3FA 88%, white 100%)"
        }}
      >
        <Image
          src="/cloud.png"
          alt=""
          width={480}
          height={260}
          className="pointer-events-none select-none absolute -right-28 top-16 w-[340px] opacity-30 sm:w-[480px]"
          aria-hidden="true"
        />
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
            <div className="testimonial-marquee -mx-6 px-6 space-y-4">
              <div className="testimonial-marquee-track flex w-max gap-4">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <TestimonialCard
                    key={`row1-${i}`}
                    quote={t.quote}
                    name={t.name}
                    role={t.role}
                  />
                ))}
              </div>
              <div className="testimonial-marquee-track-reverse flex w-max gap-4">
                <CTAMarqueeCard />
                {testimonials.map((t, i) => (
                  <TestimonialCard
                    key={`row2a-${i}`}
                    quote={t.quote}
                    name={t.name}
                    role={t.role}
                  />
                ))}
                <CTAMarqueeCard />
                {testimonials.map((t, i) => (
                  <TestimonialCard
                    key={`row2b-${i}`}
                    quote={t.quote}
                    name={t.name}
                    role={t.role}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="bg-white px-6 pt-0 pb-20 sm:pb-40">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-8 sm:mb-16">
              Frequently asked questions.
            </h2>
          </FadeIn>
          <div>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={0.04}>
                <div className="border-t border-zinc-200">
                  <button
                    type="button"
                    aria-expanded={openFaqIndex === i}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full items-center justify-between gap-4 text-left py-8"
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
                        ? "grid-rows-[1fr] pt-3 pb-6 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base sm:text-lg leading-relaxed text-zinc-600">
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

/* ── Inline waitlist form ─────────────────────────────────── */
function InlineWaitlistForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p className="text-base font-medium text-zinc-700">
        You&apos;re on the list — we&apos;ll be in touch soon.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 min-w-0 rounded-full border border-zinc-300 bg-white px-5 py-[0.7em] text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors shadow-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-press shrink-0 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Get early access"}
        </button>
      </form>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(to right, #2053A5, #036CB0)" }}
      >
        <HeroRefractionVideo src="/hero-bg.mp4" playbackRate={0.45} flipX />

        {/* Text area overlay — improves white text legibility over clouds */}
        <div
          className="absolute inset-0 z-2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 20% 70%, rgba(0,0,0,0.18) 0%, transparent 70%)"
          }}
        />

        {/* Bottom fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-2 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, white)"
          }}
        />

        {/* Top fade — gradient colour bleeding into the video */}
        <div
          className="absolute top-0 left-0 right-0 z-2 pointer-events-none"
          style={{
            height: "55vh",
            background: "linear-gradient(to right, #2053A5, #036CB0)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)"
          }}
        />
        {/* Blur layer — softens the hard edge where gradient meets video */}
        <div
          className="absolute top-0 left-0 right-0 z-2 pointer-events-none"
          style={{
            height: "55vh",
            backdropFilter: "blur(60px)",
            WebkitBackdropFilter: "blur(60px)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 20%, transparent 75%)"
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 pt-8 flex items-center justify-between">
          <span className="text-4xl tracking-tight text-white font-instrument-serif">
            yaven
          </span>
          <a
            href="https://calendly.com/nickprice2000/yaven-support"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press"
          >
            Book a call
          </a>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-start px-6 pb-16 pt-40 sm:px-8 lg:pb-20 lg:pt-56">
          <div className="max-w-3xl">
            <h1
              className="text-5xl leading-[0.98] tracking-normal text-white font-instrument-serif animate-fade-rise sm:text-6xl xl:text-7xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
            >
              Focus in a distracted world
            </h1>

            <div
              className="text-base font-black text-white max-w-lg mt-6 leading-relaxed"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
            >
              Tell us how you work, we&apos;ll show you what&apos;s wasting your
              time, and leave you to do the bits only you can.
            </div>

            <div className="mt-8 max-w-[440px] animate-fade-rise-delay-2">
              <BlueprintPanel />
            </div>

            <p
              className="mt-6 text-sm animate-fade-rise-delay-2 text-shine font-bold"
              style={{ animationDuration: "4s" }}
            >
              явен (yaven) — Bulgarian for open, plain to see, obvious.
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────── */}
      <ProfessionalSections />

      {/* ── Footer CTA ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 pt-0 pb-20 sm:pb-40 text-center"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, #EEF3FA 20%, #EEF3FA 80%, white 100%)"
        }}
      >
        <Image
          src="/cloud.png"
          alt=""
          width={440}
          height={240}
          className="pointer-events-none select-none absolute -right-24 bottom-0 w-[300px] opacity-30 sm:w-[440px]"
          aria-hidden="true"
        />
        <Image
          src="/cloud.png"
          alt=""
          width={360}
          height={200}
          className="pointer-events-none select-none absolute -left-28 top-8 w-[260px] opacity-25 sm:w-[360px]"
          aria-hidden="true"
        />
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
          <span className="block text-4xl tracking-tight text-zinc-900 font-instrument-serif">
            yaven
          </span>
          <h2 className="text-4xl sm:text-5xl leading-[1.05] tracking-[-1.2px] font-instrument-serif text-zinc-900 flex flex-col">
            Your industry is moving.
            <span> Get ahead of it.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-zinc-600">
            Early access is limited. Get in before the queue fills up.
          </p>
          <InlineWaitlistForm />
        </FadeIn>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-[#0b0d12] px-6 py-28 sm:py-44">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Yaven"
                width={36}
                height={36}
                className="size-9 rounded-xl object-cover"
              />
              <span className="text-2xl tracking-tight text-[#F2F2E5] font-instrument-serif">
                yaven
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <a
                href="https://x.com/yavenai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex items-center justify-center size-9 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3.5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/yaven/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center size-9 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/30 leading-relaxed">
              © 2026 Yaven. All rights reserved.
            </p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center">
              <WaitlistButton
                label="Join Waitlist"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              />
              <a
                href="mailto:support@yaven.us"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Email founders
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}
