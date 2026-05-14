"use client"

import Image from "next/image"
import { useState, Fragment } from "react"
import { ChevronDown } from "lucide-react"
import { WaitlistButton } from "@/components/waitlist-button"
import { FadeIn } from "@/components/fade-in"
import { HeroRefractionVideo } from "@/components/hero-refraction-video"

/* ── Goal card mockup (professional) ────────────────────── */
/* ── Social proof data ───────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Someone showed me ChatGPT could turn my lecture slides into flashcards automatically. I'd been doing that by hand for two years. It hadn't occurred to me to ask.",
    name: "Ellie",
    role: "Postgraduate Student, Medicine"
  },
  {
    quote:
      "Every time I open ChatGPT, it has no idea who I am. I find myself re-explaining the same context just to get a useful answer.",
    name: "Sarah",
    role: "Digital Strategy and Transformation"
  },
  {
    quote:
      "I can see there's time to be saved. I just don't know where to start, and I don't really have the time to figure it out.",
    name: "James",
    role: "PhD Researcher, Engineering"
  },
  {
    quote:
      "I use AI every day — emails, recipes, trip planning. But apparently it can do a lot more than that. I just haven't worked out what.",
    name: "Lauren",
    role: "Administrator, Church Organisation"
  },
  {
    quote:
      "I build automations at work. Somehow I've never set one up for myself. I know I should — I just don't know where to begin.",
    name: "Marcus",
    role: "Analyst, Search Consultancy"
  },
  {
    quote:
      "How does AI apply to my personal life? I don't know yet. I'd need someone to sit down with me and work it out.",
    name: "Priya",
    role: "Postgraduate Student, Immunology"
  },
  {
    quote:
      "AI is helpful for the boring stuff. But I'm not ready to let it run anything without checking it first.",
    name: "Rachel",
    role: "Clinical Scientist, NHS"
  },
  {
    quote:
      "I got into the habit of doing my own research. It's hard to know which parts of that to hand over.",
    name: "Anna",
    role: "Masters Graduate, Nutrition"
  },
  {
    quote:
      "I can identify individual things AI would improve. I just can't find the one thing that ties it all together.",
    name: "Phil",
    role: "Managing Director"
  },
  {
    quote:
      "The gap between what AI can do and what a normal person can actually get AI to do is only growing.",
    name: "Steve",
    role: "Strategy and Growth"
  },
  {
    quote:
      "Tracking my work and doing my work happen in completely separate systems. There's no connection between them.",
    name: "Mckenna",
    role: "Digital Strategy and Transformation"
  },
  {
    quote:
      "I've built five custom workflows for myself. But my team can't do that.",
    name: "Nasir",
    role: "Sales"
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
    <div
      className="w-[18rem] shrink-0 rounded-2xl bg-white border border-zinc-100 p-6 flex flex-col gap-5 min-h-56 sm:w-84 transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: "0 4px 24px rgba(32,83,165,0.10), 0 1px 4px rgba(0,0,0,0.04)"
      }}
    >
      <span className="text-3xl leading-none text-[#5B99C4] font-instrument-serif select-none">
        &ldquo;
      </span>
      <p className="text-zinc-700 text-sm leading-relaxed flex-1 -mt-3">
        {quote}
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-zinc-100">
        <div className="w-7 h-7 rounded-full bg-[#EEF3FA] flex items-center justify-center shrink-0">
          <span className="text-[10px] font-semibold text-[#2053A5]">
            {name[0]}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-800">{name}</p>
          <p className="text-[10px] tracking-[0.12em] uppercase text-zinc-400 mt-0.5">
            {role}
          </p>
        </div>
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
              className="btn-press shrink-0 disabled:opacity-60 mb-4"
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
    a: "No. Yaven is built for people who work in complex systems, not people who build them. If you can describe a workflow, Yaven can help run it."
  },
  {
    q: "How is this different from just using ChatGPT?",
    a: "ChatGPT is a conversation. You ask, it answers, and then it forgets. Every session starts from scratch, and nothing happens unless you prompt it. Yaven is different at the level of how it works. It connects to your actual tools, remembers what you're working on between sessions, and runs tasks in the background without being asked. You describe a workflow once. Yaven maps it, automates the repeatable parts, and flags the bits that need you. The output isn't a text response you then have to act on. It's the work, done."
  },
  {
    q: "Can I customise Yaven?",
    a: "Yes. You can adjust how Yaven presents itself, tune the personality of individual agents so they match your tone and working style, and set preferences for how much it does versus flags for your review. The more it knows about how you work, the better it gets at it."
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
    a: "We're onboarding our first users now. Join the waitlist and we'll reach out directly. No queue number, just a conversation."
  },
  {
    q: "Is my data private?",
    a: "Yes. Your workflows, goals, and data are yours. We don't use your content to train models or share it with third parties."
  }
]

/* ── Professional content ────────────────────────────────── */
function ProfessionalSections() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [currentCard, setCurrentCard] = useState(0)
  const [currentPlaybook, setCurrentPlaybook] = useState(0)

  const playbookCards = [
    {
      title: "LinkedIn outreach — new leads",
      icon: "/logos/linkedin.png",
      schedule: "↻ Runs every Monday · no setup required",
      agents: [
        {
          label: "AUTO",
          agent: "Research agent",
          task: "Finds 10 relevant profiles based on your criteria",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "AUTO",
          agent: "Writing agent",
          task: "Drafts a personalised message in your voice for each",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "REVIEW",
          agent: "Outreach agent",
          task: "Sends on Monday morning once you approve",
          color: "bg-[#f5c0c1] text-zinc-900"
        }
      ]
    },
    {
      title: "CV & cover letter — new listings",
      icon: "/logos/notion.png",
      schedule: "↻ Runs daily when new listings appear",
      agents: [
        {
          label: "AUTO",
          agent: "Research agent",
          task: "Pulls new job listings matching your criteria",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "AUTO",
          agent: "Writing agent",
          task: "Tailors your CV and cover letter to each role",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "REVIEW",
          agent: "Delivery agent",
          task: "Saves drafts — you decide which ones to send",
          color: "bg-[#f5c0c1] text-zinc-900"
        }
      ]
    },
    {
      title: "Invoice chasing — overdue clients",
      icon: "/logos/gmail.png",
      schedule: "↻ Runs every Friday · no setup required",
      agents: [
        {
          label: "AUTO",
          agent: "Finance agent",
          task: "Pulls overdue invoices from your accounting tool",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "AUTO",
          agent: "Writing agent",
          task: "Drafts a friendly reminder in your tone",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "REVIEW",
          agent: "Outreach agent",
          task: "Nothing sent until you say so",
          color: "bg-[#f5c0c1] text-zinc-900"
        }
      ]
    },
    {
      title: "Monthly expense report",
      icon: "/logos/excel.png",
      schedule: "↻ Runs on the 1st of each month",
      agents: [
        {
          label: "AUTO",
          agent: "Finance agent",
          task: "Pulls transactions from your connected accounts",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "AUTO",
          agent: "Organising agent",
          task: "Categorises and totals by client or project",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        },
        {
          label: "AUTO",
          agent: "Reporting agent",
          task: "Formats into a spreadsheet, ready to export",
          color: "border border-[#5B99C4] text-[#5B99C4] bg-white"
        }
      ]
    }
  ]

  const notificationCards = [
    {
      msg: "Your 10 LinkedIn messages are ready. Personalised to each profile, written in your tone. Want to send them or tweak a few first?",
      actions: ["Send all", "Review first"]
    },
    {
      msg: "Tailored your CV and cover letter for the four roles you saved this week. Each one adjusted to match the job description.",
      actions: ["Review them", "Send one"]
    },
    {
      msg: "Pulled this month's expenses into a spreadsheet, categorised, and totalled by client. Ready to export or turn into an invoice.",
      actions: ["Export", "Review first"]
    },
    {
      msg: "Friendly invoice reminder drafted for the three clients who are overdue. Nothing sent until you say so.",
      actions: ["Send them", "Edit first"]
    },
    {
      msg: "Research summary done. Pulled the key points from the eight sources you flagged, formatted into a one-pager.",
      actions: ["Open it", "Add more"]
    }
  ]

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
          style={{ height: "auto" }}
          aria-hidden="true"
        />
        <FadeIn className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-12">
            A gap is opening up.
          </h2>
          <div className="flex flex-col gap-12 sm:gap-16">
            {/* Row 1: paragraph + chart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-zinc-500">
                <p>
                  Most people use AI like a faster Google. Type a question, get
                  an answer, repeat tomorrow.
                </p>
                <p>
                  The people pulling ahead have worked out which half of their
                  job repeats, and handed it off. They come back to decisions,
                  not groundwork. The 5% of power users aren&apos;t necessarily
                  smarter; until now, the tools have just been built for them.
                </p>
                <p>Yaven is built for the 83% who aren&apos;t there yet.</p>
              </div>
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
                repeat. Follow-ups sent. Notes logged. Reports found. You decide
                what you want to handle, and what you want to hand over. When
                something needs a human decision, it brings it to your
                attention. Everything else is covered for you.
              </p>
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
            <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16 mb-10 sm:mb-20">
              <div className="flex-1">
                <h2
                  id="how-it-works"
                  className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-4"
                >
                  How Yaven works.
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-500">
                  Think of Yaven like a virtual pet. It lives on your computer,
                  ready when you need it and asleep when you don&apos;t.
                  Here&apos;s what that looks like in practice.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <Image
                  src="/cloud-pet.png"
                  alt="Yaven cloud pet"
                  width={420}
                  height={180}
                  className="w-52 sm:w-72 md:w-96 object-contain hover-drop-shadow-blue"
                />
              </div>
            </div>
          </FadeIn>
          <div className="space-y-16 sm:space-y-32">
            {/* Step 1 */}
            <div className="relative flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start">
              <FadeIn className="flex-1 space-y-1 lg:pt-2">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  01
                </span>
                <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                  Tell Yaven how your week runs.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Your tools, your goals, what repeats. Chasing invoice
                  payments? Sending LinkedIn outreach? Tailoring your CV for
                  every application? Describe it in plain language. You
                  don&apos;t need to know how to automate anything. That part is
                  on Yaven.
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
                        Cold outreach to 10 new leads a week · Tailor CV and
                        cover letter for new job listings · Follow up on unpaid
                        invoices
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
                style={{ height: "auto" }}
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
                  Yaven maps the workflow, strings together the right agents,
                  and sets it running. No configuration, no code. One playbook
                  per recurring task. Share yours, tweak it, or start from one
                  someone else has already built.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCurrentPlaybook(
                        i =>
                          (i - 1 + playbookCards.length) % playbookCards.length
                      )
                    }
                    className="btn-press shrink-0 !px-3 !py-2 !text-sm"
                  >
                    ←
                  </button>
                  <div
                    className="flex-1 rounded-2xl bg-white border border-zinc-200 overflow-hidden text-sm"
                    style={{
                      boxShadow:
                        "0 8px 32px rgba(32,83,165,0.18), 0 2px 8px rgba(0,0,0,0.06)"
                    }}
                  >
                    <div className="px-5 py-4 border-b border-zinc-100 flex items-center gap-3">
                      <Image
                        src={playbookCards[currentPlaybook].icon}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded object-contain shrink-0"
                      />
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mb-0.5">
                          Playbook created
                        </p>
                        <p className="text-zinc-800 font-medium leading-tight">
                          {playbookCards[currentPlaybook].title}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                      {playbookCards[currentPlaybook].agents.map(row => (
                        <div key={row.agent} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 text-[10px] font-semibold w-14 text-center py-0.5 rounded ${row.color} shrink-0`}
                          >
                            {row.label}
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
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-zinc-400">
                          {playbookCards[currentPlaybook].schedule}
                        </p>
                        <div className="flex gap-1.5">
                          {playbookCards.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPlaybook(i)}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentPlaybook ? "bg-zinc-400" : "bg-zinc-200"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPlaybook(i => (i + 1) % playbookCards.length)
                    }
                    className="btn-press shrink-0 !px-3 !py-2 !text-sm"
                  >
                    →
                  </button>
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
                  It works. You decide.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Yaven handles the groundwork. When something needs a genuine
                  human call (a decision, an approval, a judgement) it flags it.
                  Everything else is covered. How much you hand over is entirely
                  up to you.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCurrentCard(
                        i =>
                          (i - 1 + notificationCards.length) %
                          notificationCards.length
                      )
                    }
                    className="btn-press shrink-0 !px-3 !py-2 !text-sm"
                  >
                    ←
                  </button>
                  <div
                    className="flex-1 rounded-xl bg-white border border-zinc-200 px-5 py-7 flex flex-col gap-5 min-h-[13rem]"
                    style={{
                      boxShadow:
                        "0 8px 32px rgba(32,83,165,0.18), 0 2px 8px rgba(0,0,0,0.06)"
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/logo.png"
                        alt="Yaven"
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-md object-cover shrink-0"
                      />
                      <span className="text-base tracking-tight text-[#2053A5] font-instrument-serif">
                        yaven
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-700 flex-1">
                      {notificationCards[currentCard].msg}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {notificationCards.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentCard(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentCard ? "bg-[#5B99C4]" : "bg-[#5B99C4]/30"}`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#2053A5] text-white">
                          {notificationCards[currentCard].actions[0]}
                        </button>
                        <button className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#EEF3FA] text-[#2053A5]">
                          {notificationCards[currentCard].actions[1]}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setCurrentCard(i => (i + 1) % notificationCards.length)
                    }
                    className="btn-press shrink-0 !px-3 !py-2 !text-sm"
                  >
                    →
                  </button>
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
                  Check in. Or don&apos;t.
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Open Yaven to see what&apos;s running, check history, update a
                  playbook, or manage a connection. Close it when you don&apos;t
                  need it. The work doesn&apos;t stop either way.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                  style={{ mixBlendMode: "multiply" }}
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
          style={{ height: "auto" }}
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
                  <Fragment key={`row1-${i}`}>
                    <TestimonialCard
                      quote={t.quote}
                      name={t.name}
                      role={t.role}
                    />
                    {(i + 1) % 4 === 0 && <CTAMarqueeCard />}
                  </Fragment>
                ))}
              </div>
              <div className="testimonial-marquee-track-reverse flex w-max gap-4">
                {[...testimonials, ...testimonials].map((t, i) => (
                  <Fragment key={`row2-${i}`}>
                    <TestimonialCard
                      quote={t.quote}
                      name={t.name}
                      role={t.role}
                    />
                    {(i + 1) % 4 === 0 && <CTAMarqueeCard />}
                  </Fragment>
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
          className="btn-press shrink-0 disabled:opacity-50 mb-2"
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
              "radial-gradient(ellipse 80% 70% at 20% 70%, rgba(20,50,120,0.5) 0%, transparent 70%)"
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
              Focus in a distracted world.
            </h1>

            <div
              className="text-base text-white max-w-lg mt-6 leading-relaxed space-y-3"
              style={{ textShadow: "0 1px 8px rgba(20,50,120,0.7), 0 2px 20px rgba(20,50,120,0.5)" }}
            >
              <p>
                You constantly switch tabs and apps. You copy-paste from
                ChatGPT, rinse, repeat. You know there are better ways to work.
                You just haven&apos;t had time to figure out what they are.
              </p>
              <p>That&apos;s what Yaven is for.</p>
            </div>

            <div className="mt-8 flex items-center gap-3 animate-fade-rise-delay-2 mb-2">
              <WaitlistButton label="Get early access" className="btn-press" />
            </div>

            <p
              className="mt-6 text-sm animate-fade-rise-delay-2 text-shine font-bold"
              style={{ animationDuration: "4s", textShadow: "0 1px 8px rgba(20,50,120,0.7), 0 2px 20px rgba(20,50,120,0.5)" }}
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
          style={{ height: "auto" }}
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
