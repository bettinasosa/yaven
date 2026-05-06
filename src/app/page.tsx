import { WaitlistButton } from "@/components/waitlist-button"

/* ── Claude Code session mockup ──────────────────────────── */
function ClaudeTab({
  title,
  status,
  lines
}: {
  title: string
  status: "running" | "blocked" | "done"
  lines: string[]
}) {
  const statusColor =
    status === "running"
      ? "bg-emerald-400"
      : status === "blocked"
        ? "bg-amber-400"
        : "bg-zinc-500"
  const statusLabel =
    status === "running" ? "Running" : status === "blocked" ? "Blocked" : "Done"

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 text-left font-mono text-xs shadow-xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2.5">
        <span className={`w-2.5 h-2.5 rounded-full ${statusColor}`} />
        <span className="text-zinc-300 text-xs">{title}</span>
        <span
          className={`ml-auto text-[10px] ${status === "blocked" ? "text-amber-400" : status === "done" ? "text-zinc-500" : "text-emerald-400"}`}
        >
          {statusLabel}
        </span>
      </div>
      {/* Terminal body */}
      <div className="bg-zinc-900 px-4 py-3 space-y-1.5">
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              line.startsWith("●")
                ? "text-emerald-400"
                : line.startsWith("!")
                  ? "text-amber-400"
                  : line.startsWith(">")
                    ? "text-zinc-500"
                    : "text-zinc-300"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

const features = [
  {
    number: "01",
    heading: "Every session, one view.",
    body: "See every Claude Code instance you've got running in one place. What it's working on, where it's blocked, what's finished. No more tab-hunting.",
    visual: (
      <div className="space-y-3">
        <ClaudeTab
          title="auth-refactor"
          status="blocked"
          lines={[
            "● Rewriting JWT middleware",
            "! Waiting: cookie strategy decision",
            "> Last active 2 min ago"
          ]}
        />
        <ClaudeTab
          title="q4-research"
          status="running"
          lines={[
            "● Scanning competitor pricing pages",
            "● Summarising into report draft",
            "> Last active 4 min ago"
          ]}
        />
        <ClaudeTab
          title="api-integration"
          status="done"
          lines={[
            "● Rate limiting implemented",
            "● Bearer auth wired up",
            "> Completed 11 min ago"
          ]}
        />
      </div>
    )
  },
  {
    number: "02",
    heading: "Pick up where you left off.",
    body: "Drop into any thread and the overseer briefs you on what happened since you stepped away. State, decisions, current step. Back in 10 seconds, not 10 minutes.",
    visual: (
      <ClaudeTab
        title="auth-refactor — briefing"
        status="running"
        lines={[
          "> Session ran 43 min",
          "● JWT middleware rewritten",
          "● Refresh token rotation done",
          "! Open: cookie vs localStorage?",
          "! Open: persist tokens cross-session?",
          "> Awaiting your decision to continue"
        ]}
      />
    )
  },
  {
    number: "03",
    heading: "Port context between sessions.",
    body: "Move context from one agent to another in one click. No re-explaining, no copy-pasting prompts.",
    visual: (
      <div className="space-y-3">
        <ClaudeTab
          title="api-integration → auth-refactor"
          status="done"
          lines={[
            "> Context transfer initiated",
            "● Rate limit: 100 req/min",
            "● Auth scheme: Bearer token",
            "● Base URL: api.yaven.ai/v2",
            "● Transferred to auth-refactor ✓"
          ]}
        />
        <ClaudeTab
          title="auth-refactor"
          status="running"
          lines={[
            "● Context received from api-integration",
            "● Applying rate-limit constraints...",
            "> Continuing without re-briefing"
          ]}
        />
      </div>
    )
  },
  {
    number: "04",
    heading: "Easily customise agent system prompts.",
    body: "",
    visual: (
      <ClaudeTab
        title="system-prompt editor"
        status="running"
        lines={[
          "> Editing: auth-refactor agent",
          "● You are a senior backend engineer...",
          "● Prefer httpOnly cookies over localStorage",
          "● Always ask before modifying schema",
          "> Saved & applied to session ✓"
        ]}
      />
    )
  }
]

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-white">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Left-side gradient so dark text is readable */}
        <div className="absolute inset-0 bg-linear-to-r from-white/50 via-white/10 to-transparent z-1 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-white to-transparent z-2 pointer-events-none" />

        <nav className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <span className="text-3xl tracking-tight text-zinc-900 font-instrument-serif">
              Yaven<sup className="text-xs">®</sup>
            </span>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col justify-center px-8 pt-16 pb-40 min-h-[calc(100vh-88px)] max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] text-zinc-900 font-instrument-serif animate-fade-rise">
              Focus in a Distracted World
            </h1>
            <p className="text-base sm:text-lg max-w-lg mt-10 leading-relaxed text-zinc-900 font-inter animate-fade-rise-delay">
              We&apos;re designing tools for deep thinkers, bold creators, and
              quiet rebels. Amid the chaos, we build agentic orchestration tools
              for sharp focus and inspired work.
            </p>
            <WaitlistButton
              label="Join the Waitlist"
              className="mt-10 rounded-full bg-zinc-900 text-white px-12 py-4 text-sm font-inter hover:bg-zinc-700 hover:scale-[1.03] transition-all cursor-pointer animate-fade-rise-delay-2 shadow-lg"
            />
            <p className="mt-6 text-xs text-zinc-600 font-inter animate-fade-rise-delay-2">
              явен (yaven) — Bulgarian for{" "}
              <span className="italic">open, manifest, plain to see.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── The Pain ───────────────────────────────────────── */}
      <section className="bg-white px-6 py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10">
            Six tabs. Zero memory. All in your head.
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-500 font-inter">
            <p>
              You&apos;re running multiple Claude Code instances on different
              threads. One refactoring auth, one writing tests, one researching
              a fix. You step away for a meeting. You come back and have to ask
              each session &ldquo;where were we?&rdquo;
            </p>
            <p>
              Agents have memory inside each session. They don&apos;t transfer
              this to each other. You become the human glue holding the workflow
              together.
            </p>
          </div>
        </div>
      </section>

      {/* ── Solution ───────────────────────────────────────── */}
      <section className="bg-white px-6 pb-32">
        <div className="max-w-3xl mx-auto border-t border-zinc-200 pt-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10">
            Your agents shouldn&apos;t live in tabs.
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-500 font-inter">
            <p>
              You don&apos;t need fewer agents. You need a layer above them that
              remembers what each one is doing, knows when they&apos;re done,
              and moves context where it needs to go.
            </p>
            <p className="text-zinc-900 font-medium">
              We&apos;re building that layer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="bg-white px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl text-zinc-900 font-instrument-serif mb-20">
            What Yaven does
          </p>
          <div className="space-y-32">
            {features.map((f, i) => (
              <div
                key={f.number}
                className={`flex flex-col gap-16 lg:flex-row lg:items-start ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 space-y-5 lg:pt-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-inter">
                    {f.number}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-[-0.8px] text-zinc-900 font-instrument-serif">
                    {f.heading}
                  </h3>
                  {f.body && (
                    <p className="text-base leading-relaxed text-zinc-500 font-inter max-w-sm">
                      {f.body}
                    </p>
                  )}
                </div>
                <div className="flex-1">{f.visual}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────────────── */}
      <section className="bg-zinc-50 px-6 py-32 text-center border-t border-zinc-200">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl leading-[1.05] tracking-[-1.2px] text-zinc-900 font-instrument-serif">
            Stop babysitting. Start building.
          </h2>
          <p className="text-base text-zinc-500 font-inter leading-relaxed">
            Early access is limited. Get in before the queue fills up.
          </p>
          <WaitlistButton
            label="Join the Waitlist"
            className="inline-block rounded-full bg-zinc-900 text-white px-14 py-5 text-base font-inter hover:bg-zinc-700 hover:scale-[1.03] transition-all cursor-pointer shadow-lg"
          />
        </div>
      </section>
    </>
  )
}
