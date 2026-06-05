"use client"

import Image from "next/image"
import { useState, Fragment } from "react"
import { FadeIn } from "@/components/fade-in"

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
      <span className="text-3xl leading-none text-[#7696dc] font-instrument-serif select-none">
        &ldquo;
      </span>
      <p className="text-zinc-700 text-sm leading-relaxed flex-1 -mt-3">
        {quote}
      </p>
      <div className="pt-2 border-t border-zinc-100">
        <p className="text-xs font-semibold text-zinc-800">{name}</p>
        <p className="text-[10px] tracking-[0.12em] uppercase text-zinc-400 mt-0.5">
          {role}
        </p>
      </div>
    </div>
  )
}

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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 min-w-0 items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1 focus-within:border-zinc-400">
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
              className="btn-press sm:shrink-0 disabled:opacity-60 mb-0 sm:mb-4"
            >
              {loading ? "Saving…" : "Get early access"}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export function SocialProofSection() {
  return (
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
  )
}
