"use client"

export function SuccessState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center gap-6 animate-fade-rise">
      <span
        className="inline-flex size-14 items-center justify-center font-bold text-2xl"
        style={{
          background: "var(--cream)",
          border: "var(--bd)",
          borderRadius: "50%",
          boxShadow: "var(--shadow-sm)",
          color: "var(--ink)"
        }}
      >
        ✓
      </span>
      <div className="space-y-2">
        <h3
          className="font-bold leading-tight"
          style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "var(--ink)" }}
        >
          You&apos;re on the list.
        </h3>
        <p
          className="text-sm font-medium leading-relaxed max-w-xs mx-auto"
          style={{ color: "#1A1A1A", opacity: 0.65 }}
        >
          We saved your blueprint. We&apos;ll reach out when yaven is ready to
          build it with you.
        </p>
      </div>
    </div>
  )
}
