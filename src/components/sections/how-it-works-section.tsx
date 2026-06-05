"use client"

import Image from "next/image"
import { useState } from "react"
import { FadeIn } from "@/components/fade-in"

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
    actions: ["Review", "Send"]
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

export function HowItWorksSection() {
  const [currentCard, setCurrentCard] = useState(0)
  const [currentPlaybook, setCurrentPlaybook] = useState(0)

  return (
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
                How yaven works.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-500">
                Think of yaven like a virtual intern. It lives on your computer,
                ready when you need it and asleep when you don&apos;t.
                Here&apos;s what that looks like in practice.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <Image
                src="/cloud-pet.png"
                alt="yaven cloud pet"
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
                Tell yaven how your week runs.
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 max-w-sm pt-1">
                Your tools, your goals, what repeats. Chasing invoice payments?
                Sending LinkedIn outreach? Tailoring your CV for every
                application? Describe it in plain language. You don&apos;t need
                to know how to automate anything. That part is on yaven.
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
                      Cold outreach to 10 new leads a week · Tailor CV and cover
                      letter for new job listings · Follow up on unpaid invoices
                    </p>
                  </div>
                  <div className="bg-zinc-50 rounded-xl px-4 py-3 border border-zinc-100">
                    <p className="text-xs text-zinc-500 mb-2">
                      yaven is mapping your recurring workflows...
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
                yaven maps the workflow, strings together the right agents, and
                sets it running. No configuration, no code. One playbook per
                recurring task. Share yours, tweak it, or start from one someone
                else has already built.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="flex-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setCurrentPlaybook(
                      i => (i - 1 + playbookCards.length) % playbookCards.length
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
                yaven handles the groundwork. When something needs a genuine
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
                      alt="yaven"
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain shrink-0"
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
                      <button className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#4a6bbf] text-white">
                        {notificationCards[currentCard].actions[0]}
                      </button>
                      <button className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#7696dc] text-white">
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
                Open yaven to see what&apos;s running, check history, update a
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
                disablePictureInPicture
                x-webkit-airplay="deny"
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
  )
}
