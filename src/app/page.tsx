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
    body: "Claude, ChatGPT, Gemini. Yaven sits above the models. You don't manage which one does what. Yaven does.",
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
  },
  {
    number: "05",
    heading: "We show you where to start.",
    body: "Most people know AI can save them time. They don't know which tasks, which tools, or how to connect them. Yaven audits your week and tells you exactly what to hand off, so you're not starting from a blank page.",
    visual: (
      <div className="rounded-2xl bg-white border border-zinc-200 shadow-sm overflow-hidden text-sm">
        <div className="px-5 py-3 border-b border-zinc-100">
          <p className="text-[10px] tracking-[0.15em] uppercase text-zinc-400 mb-0.5">
            Your automation audit
          </p>
          <p className="text-zinc-800 font-medium">
            3 quick wins found this week
          </p>
        </div>
        <div className="px-5 py-4 space-y-3.5">
          {[
            {
              task: "Weekly pipeline report",
              save: "~2 hrs",
              note: (
                <>
                  Auto-compiled from{" "}
                  <span className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-md bg-[#EEF3FA] align-middle mx-1 rotate-3">
                    <Image
                      src="/logos/hubspot.png"
                      alt="HubSpot"
                      width={10}
                      height={10}
                      className="object-contain"
                    />
                  </span>{" "}
                  every Friday
                </>
              )
            },
            {
              task: "Follow-up emails after calls",
              save: "~1.5 hrs",
              note: (
                <>
                  <span className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-md bg-[#EEF3FA] align-middle mr-1 -rotate-2">
                    <Image
                      src="/logos/gmail.png"
                      alt="Gmail"
                      width={10}
                      height={10}
                      className="object-contain"
                    />
                  </span>
                  Drafted from your call transcript, ready to send
                </>
              )
            },
            {
              task: "Logging call notes to CRM",
              save: "~1 hr",
              note: (
                <>
                  Pushed to{" "}
                  <span className="inline-flex items-center justify-center w-[16px] h-[16px] rounded-md bg-[#EEF3FA] align-middle mx-1 rotate-6">
                    <Image
                      src="/logos/salesforce.png"
                      alt="Salesforce"
                      width={10}
                      height={10}
                      className="object-contain"
                    />
                  </span>{" "}
                  after each meeting
                </>
              )
            }
          ].map(item => (
            <div key={item.task} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-[10px] font-semibold text-[#83A5D4]">
                →
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-zinc-800">
                    {item.task}
                  </p>
                  <span className="shrink-0 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    {item.save}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 bg-zinc-50 border-t border-zinc-100">
          <p className="text-xs text-zinc-400">
            Total time back this week:{" "}
            <span className="font-semibold text-zinc-700">~4.5 hours</span>
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
  },
  {
    quote:
      "I spend an hour after every client call writing notes, updating the CRM, and drafting the follow-up. The call itself was thirty minutes.",
    role: "Account Executive, B2B SaaS"
  },
  {
    quote:
      "Month-end is three days of pulling the same numbers into the same format. I know exactly what's coming and I dread it every time.",
    role: "Finance Manager, Series B startup"
  },
  {
    quote:
      "I send forty personalised LinkedIn messages a week. Nothing about them is actually personalised — I just don't have the time.",
    role: "SDR, enterprise software"
  },
  {
    quote:
      "Every new client engagement starts with the same deck structure. I rebuild it from scratch every single time.",
    role: "Management Consultant"
  },
  {
    quote:
      "Scheduling is my whole morning. By the time I've sorted everyone's calendars, half my useful hours are gone.",
    role: "Executive Assistant, PE firm"
  },
  {
    quote:
      "I repurpose every piece of content across six channels. Someone always does it wrong, or it just doesn't get done.",
    role: "Content Lead, DTC brand"
  },
  {
    quote:
      "Writing user stories takes longer than building the features they describe. That can't be right.",
    role: "Product Manager, fintech"
  },
  {
    quote:
      "I'm the person everyone asks for the numbers. I'm not an analyst — I just happen to know where to look.",
    role: "Ops Manager, logistics startup"
  },
  {
    quote:
      "Chasing invoices is the worst part of running my own business. Some weeks it takes more time than the actual work.",
    role: "Freelance Designer"
  }
]

function TestimonialCard({ quote, role }: { quote: string; role: string }) {
  return (
    <div className="w-[18rem] shrink-0 rounded-2xl bg-white border border-zinc-200 shadow-sm p-6 flex flex-col gap-5 min-h-56 sm:w-[21rem] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 text-base leading-relaxed text-zinc-500">
            <p>
              There&apos;s a gap opening up in every industry. On one side:
              people who&apos;ve figured out how to make AI do the repetitive
              half of their job. On the other: everyone still doing it
              themselves. The difference isn&apos;t intelligence. It&apos;s
              knowing what to hand off.
            </p>
            <p>
              Yaven is that starting point. Tell it how your week runs. It maps
              what should be automated, builds the workflow, and runs it. You
              stay focused on the work only you can do. No code. No
              configuration. Just your work, moving faster.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Use cases ──────────────────────────────────────── */}
      <section className="bg-white px-6 pb-20 sm:pb-40">
        <FadeIn className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-8 lg:pt-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif">
                Built for the way you actually work.
              </h2>
              <div className="space-y-8 text-base sm:text-lg leading-relaxed text-zinc-600">
                <p>
                  Most people know they should be using AI more. They just
                  don&apos;t know where to start.{" "}
                  <span className="text-shimmer-dark font-bold italic">
                    yaven
                  </span>{" "}
                  does.
                </p>
                <p>
                  Tell Yaven what&apos;s on your plate. The{" "}
                  <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-lg bg-[#EEF3FA] align-middle -rotate-3">
                    <Image
                      src="/logos/gmail.png"
                      alt="emails"
                      width={15}
                      height={15}
                      className="object-contain"
                    />
                  </span>{" "}
                  emails you haven&apos;t replied to, the meeting you
                  haven&apos;t prepped for, the{" "}
                  <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-lg bg-[#EEF3FA] align-middle rotate-2 text-sm">
                    👤
                  </span>{" "}
                  new hire starting Monday. You come back to drafted replies, a
                  prepared brief, and the right tasks already{" "}
                  <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-lg bg-[#EEF3FA] align-middle -rotate-3">
                    <Image
                      src="/logos/monday.png"
                      alt="Monday"
                      width={15}
                      height={15}
                      className="object-contain"
                    />
                  </span>{" "}
                  moving. It tracks everything, sends what needs sending, and
                  flags what needs you.
                </p>
                <p>
                  Moving to a new area? Tell Yaven what matters: schools,
                  commute, budget. It researches, emails the estate agents, and
                  surfaces the important stuff while you get on with your day.
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
      <section
        className="relative overflow-hidden px-6 py-20 sm:py-40"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, #EEF3FA 12%, #EEF3FA 88%, white 100%)"
        }}
      >
        <Image
          src="/cloud.png"
          alt=""
          width={520}
          height={280}
          className="pointer-events-none select-none absolute -left-36 bottom-24 w-[380px] opacity-50 sm:w-[520px]"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10 sm:mb-20">
              How it works.
            </h2>
          </FadeIn>
          <div className="space-y-16 sm:space-y-32">
            {/* Step 1 */}
            <div className="relative flex flex-col gap-10 sm:gap-16 lg:flex-row lg:items-start">
              <Image
                src="/cloud.png"
                alt=""
                width={440}
                height={236}
                className="pointer-events-none select-none absolute -right-20 -top-12 w-[260px] opacity-35 sm:w-[380px] hidden sm:block -z-10"
                aria-hidden="true"
              />
              <FadeIn className="flex-1 space-y-1 lg:pt-2">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  01
                </span>
                <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                  Tell Yaven what you&apos;re working toward.
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 max-w-sm pt-1">
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
            <div className="flex flex-col gap-10 sm:gap-16 lg:flex-row-reverse lg:items-start">
              <FadeIn className="flex-1 space-y-1 lg:pt-2">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  02
                </span>
                <h3 className="text-xl sm:text-2xl tracking-[-0.4px] text-zinc-900 font-instrument-serif">
                  It builds the playbook.
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 max-w-sm pt-1">
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
                  It runs. You decide.
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 max-w-sm pt-1">
                  Agents handle the complex. Automations handle the routine. You
                  come back to the calls only you can make, then it moves on.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1 space-y-2">
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
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Yaven gives you ────────────────────────────── */}
      <section className="relative overflow-hidden bg-white px-6 py-20 sm:py-40">
        <Image
          src="/cloud.png"
          alt=""
          width={460}
          height={250}
          className="pointer-events-none select-none absolute -left-24 bottom-32 w-[320px] opacity-25 sm:w-[460px]"
          aria-hidden="true"
        />
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
      <section
        className="relative overflow-hidden px-6 py-20 sm:py-40"
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
                {[...testimonials.slice(0, 7), ...testimonials.slice(0, 7)].map(
                  (t, i) => (
                    <TestimonialCard
                      key={`row1-${t.role}-${i}`}
                      quote={t.quote}
                      role={t.role}
                    />
                  )
                )}
              </div>
              <div className="testimonial-marquee-track-reverse flex w-max gap-4">
                {[...testimonials.slice(7), ...testimonials.slice(7)].map(
                  (t, i) => (
                    <TestimonialCard
                      key={`row2-${t.role}-${i}`}
                      quote={t.quote}
                      role={t.role}
                    />
                  )
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-20 sm:py-40">
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
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0b0d12]">
        <HeroRefractionVideo src="/hero-bg.mp4" playbackRate={0.6} />

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

            <p className="text-base font-medium max-w-lg mt-8 leading-relaxed text-[#1a2744]/70 animate-fade-rise-delay">
              Tell us how you work, we&apos;ll show you what&apos;s wasting your
              time, and leave you to do the bits only you can.
            </p>

            <div className="mt-8 max-w-[440px] animate-fade-rise-delay-2">
              <BlueprintPanel />
            </div>

            <p className="mt-8 text-xs text-[#1a2744]/50 animate-fade-rise-delay-2">
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
      <section
        className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-40 text-center"
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
          <h2 className="text-4xl sm:text-5xl leading-[1.05] tracking-[-1.2px] font-instrument-serif text-zinc-900">
            Your industry is moving.
            <span>Get ahead of it.</span>
          </h2>
          <p className="text-base leading-relaxed text-zinc-600">
            Early access is limited. Get in before the queue fills up.
          </p>
          <WaitlistButton label="Join the Waitlist" glass />
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
                href="mailto:hello@yaven.ai"
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
