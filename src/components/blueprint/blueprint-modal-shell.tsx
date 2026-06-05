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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(55, 48, 163, 0.12)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className={`flex w-[calc(100vw-2rem)] max-w-[58rem] flex-col overflow-hidden md:h-[88vh] ${expanded ? "h-[90vh]" : "h-[80vh]"} ${isClosing ? "animate-puff-out" : ""}`}
        style={{
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "22px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.16), 0 6px 24px rgba(0,0,0,0.08)",
        }}
        onClick={event => event.stopPropagation()}
      >
        <main className="min-h-0 flex-1 flex flex-col overflow-hidden">
          <div className="mx-auto flex w-full flex-1 flex-col min-h-0 overflow-y-auto px-6 pt-6 pb-4 sm:px-10 sm:pt-10 sm:pb-6 md:px-12 md:pt-12 md:pb-6 animate-fade-rise">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
