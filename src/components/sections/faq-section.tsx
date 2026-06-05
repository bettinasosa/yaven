"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

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

export function FAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  return (
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
  )
}
