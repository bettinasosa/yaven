"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

type StateProps = {
  onClick: () => void
}

const loadingPuns = [
  "Teaching robots to handle your Mondays...",
  "Finding the meetings that could've been emails...",
  "Interviewing your calendar for suspicious activity...",
  "Building your personal army of quiet helpers...",
  "Turning your chaos into choreography...",
  "Calculating the hours you're about to get back...",
  "Identifying which tasks hate you most..."
]

export function IdleBlueprintState({ onClick }: StateProps) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onClick}
        className="btn-hero-shadow inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FDFDF9] px-8 py-4 text-sm font-semibold text-zinc-900 transition-all hover:scale-[1.03]"
      >
        Show me
        <ArrowRight className="size-4" />
      </button>
    </div>
  )
}

export function IntroBlueprintState({ onClick }: StateProps) {
  return (
    <div className="flex flex-1 flex-col text-center">
      <div className="flex justify-center pt-2">
        <Image
          src="/logo.png"
          alt="Yaven"
          width={48}
          height={48}
          className="size-12 rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-3">
          <h3 className="text-5xl leading-tight text-zinc-900 font-instrument-serif">
            Reclaim your week.
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600">
            A few questions about your day. We&apos;ll show you what could run
            itself; and hand the hours back to you.
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-10 py-3.5 text-sm font-semibold text-white shadow-sm animate-slow-bounce hover:animate-none hover:scale-[1.02] transition-transform"
        >
          Start
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function GeneratingBlueprintState() {
  const [punIndex, setPunIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setPunIndex(prev => (prev + 1) % loadingPuns.length)
        setVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
      <span className="inline-flex size-16 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-[#83A5D4]/25">
        <Image
          src="/logo.png"
          alt="Yaven"
          width={56}
          height={56}
          className="size-14 rounded-xl object-cover"
        />
      </span>
      <span className="size-5 rounded-full border-2 border-[#83A5D4]/20 border-t-[#83A5D4] animate-spin" />
      <p
        className="max-w-xs text-base font-medium text-zinc-700 font-instrument-serif transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {loadingPuns[punIndex]}
      </p>
    </div>
  )
}
