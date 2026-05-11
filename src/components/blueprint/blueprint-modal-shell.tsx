"use client"

import { useEffect, type ReactNode } from "react"

type BlueprintModalShellProps = {
  onRestart: () => void
  onClose: () => void
  isClosing?: boolean
  expanded?: boolean
  children: ReactNode
}

export function BlueprintModalShell({
  onRestart,
  onClose,
  isClosing,
  expanded,
  children
}: BlueprintModalShellProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Automation blueprint"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/10 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`flex w-[calc(100vw-2rem)] max-w-[58rem] flex-col overflow-hidden rounded-[1.5rem] bg-[#FDFDF9] shadow-[0_28px_100px_rgba(15,23,42,0.22)] ring-1 ring-white/50 md:h-[88vh] ${expanded ? "h-[90vh]" : "h-[80vh]"} ${isClosing ? "animate-puff-out" : ""}`}
        onClick={event => event.stopPropagation()}
      >

        <main className="min-h-0 flex-1 flex flex-col overflow-hidden text-zinc-900">
          <div className="mx-auto flex w-full flex-1 flex-col min-h-0 overflow-y-auto px-6 pt-6 pb-4 sm:px-10 sm:pt-10 sm:pb-6 md:px-12 md:pt-12 md:pb-6 animate-fade-rise">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
