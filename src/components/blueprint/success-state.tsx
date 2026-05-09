"use client"

import { Check } from "lucide-react"

export function SuccessState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center gap-5 animate-fade-rise">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <Check className="size-7" />
      </span>
      <div className="space-y-2">
        <h3 className="text-3xl leading-tight text-zinc-900 font-instrument-serif">
          You&apos;re on the list.
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 max-w-xs mx-auto">
          We saved your blueprint. We&apos;ll reach out when Yaven is ready to build it with you.
        </p>
      </div>
    </div>
  )
}
