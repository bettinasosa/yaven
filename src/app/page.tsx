import { WaitlistButton } from "@/components/waitlist-button";

const features = [
  {
    number: "01",
    heading: "Every session, one view.",
    body: "See every Claude Code instance running, what each one is doing, what's blocked, what's done. No more tab-hunting to find the agent waiting on you.",
    visual: (
      <div className="space-y-3">
        {[
          { title: "Auth refactor", status: "Blocked", time: "2 min ago", state: "blocked" },
          { title: "Q4 research", status: "Running", time: "4 min ago", state: "running" },
          { title: "API integration", status: "Done", time: "11 min ago", state: "done" },
          { title: "UI polish", status: "Running", time: "15 min ago", state: "running" },
          { title: "DB migration", status: "Blocked", time: "22 min ago", state: "blocked" },
          { title: "Docs draft", status: "Running", time: "31 min ago", state: "running" },
        ].map((s) => (
          <div key={s.title} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <span className="text-sm text-zinc-700 font-inter">{s.title}</span>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-inter ${s.state === "blocked" ? "text-amber-600" : s.state === "done" ? "text-emerald-600" : "text-zinc-400"}`}>
                {s.status}
              </span>
              <span className="text-xs text-zinc-300 font-inter">{s.time}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    heading: "Pick up where you left off.",
    body: "Drop into any thread and Yaven briefs you on what happened since you stepped away. State, decisions, current step. Re-enter the work in 10 seconds, not 10 minutes.",
    visual: (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 space-y-5">
        <p className="text-xs tracking-[0.18em] uppercase text-zinc-400 font-inter">Briefing — Auth refactor</p>
        <p className="text-sm text-zinc-600 font-inter leading-relaxed">
          Session ran for 43 min. JWT middleware rewritten. Refresh token rotation implemented. One open question on cookie vs localStorage.
        </p>
        <div className="space-y-2">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-inter">Decisions made</p>
          {["Switched to httpOnly cookies", "Dropped legacy /auth/v1 endpoint", "RS256 over HS256"].map((d) => (
            <div key={d} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-sm text-zinc-500 font-inter">{d}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs text-amber-700 font-inter">Open question for you</p>
          <p className="text-sm text-zinc-600 font-inter mt-1">Should refresh tokens persist across browser sessions?</p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    heading: "Move context between agents.",
    body: "Port state from one session to another in one click. The auth refactor learns what the API session decided. The drafting agent picks up the research. No re-explaining.",
    visual: (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-2">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-inter">API session</p>
          <p className="text-sm text-zinc-700 font-inter font-medium">Rate-limit: 100 req/min</p>
          <p className="text-sm text-zinc-700 font-inter font-medium">Auth: Bearer token</p>
          <p className="text-sm text-zinc-700 font-inter font-medium">Base URL locked</p>
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            <div className="w-8 h-px bg-zinc-300" />
            <span className="text-zinc-400 text-lg">→</span>
            <div className="w-8 h-px bg-zinc-300" />
          </div>
          <span className="text-xs text-zinc-400 font-inter">context</span>
          <div className="flex sm:hidden items-center">
            <span className="text-zinc-400 text-lg">↓</span>
          </div>
        </div>
        <div className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-2">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-inter">Auth refactor</p>
          <p className="text-sm text-emerald-600 font-inter font-medium">✓ Knows rate limits</p>
          <p className="text-sm text-emerald-600 font-inter font-medium">✓ Auth scheme loaded</p>
          <p className="text-sm text-emerald-600 font-inter font-medium">✓ Base URL inherited</p>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    heading: "Know when something's done.",
    body: "Yaven surfaces completions, blockers, and decisions that need you. Your decision queue is one inbox, priority-ranked, no notification spam.",
    visual: (
      <div className="space-y-3">
        <p className="text-xs tracking-[0.18em] uppercase text-zinc-400 font-inter mb-4">Decision queue</p>
        {[
          { label: "Auth refactor ready to merge", tag: "Approve" },
          { label: "API session hit rate limit — retry or pause?", tag: "Redirect" },
          { label: "Q4 research draft complete", tag: "Review" },
          { label: "DB migration requires schema sign-off", tag: "Approve" },
          { label: "Docs draft needs tone review", tag: "View" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 gap-4">
            <span className="text-sm text-zinc-600 font-inter leading-snug">{item.label}</span>
            <button className="shrink-0 rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-500 hover:text-zinc-900 hover:border-zinc-500 transition-colors font-inter cursor-pointer">
              {item.tag}
            </button>
          </div>
        ))}
      </div>
    ),
  },
];

const pillars = [
  {
    title: "You stay in control.",
    body: "Nothing executes without your approval where it matters.",
  },
  {
    title: "One view, many agents.",
    body: "Run as many parallel sessions as you want. The overseer scales with you.",
  },
  {
    title: "Plug into what you use.",
    body: "Claude Code first. Claude.ai, OpenAI, Gemini, and local agents on the roadmap.",
  },
];

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
        <div className="absolute inset-0 bg-white/15 z-1" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-white to-transparent z-2 pointer-events-none" />

        <nav className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <span className="text-3xl tracking-tight text-zinc-900 font-instrument-serif">
              Yaven<sup className="text-xs">®</sup>
            </span>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 min-h-[calc(100vh-88px)]">
          <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl text-zinc-900 font-instrument-serif animate-fade-rise">
            Focus in a Distracted World
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-zinc-600 font-inter animate-fade-rise-delay">
            We&apos;re designing tools for deep thinkers, bold creators, and
            quiet rebels. Amid the chaos, we build digital spaces for sharp
            focus and inspired work.
          </p>
          <WaitlistButton
            label="Join the Waitlist"
            className="liquid-glass rounded-full px-14 py-5 text-base text-zinc-900 mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-fade-rise-delay-2"
          />
        </div>
      </section>

      {/* ── The Pain ───────────────────────────────────────── */}
      <section className="bg-white px-6 py-32">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-inter mb-8">
            The Pain
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-10">
            You&apos;re not running agents. You&apos;re babysitting tabs.
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-500 font-inter">
            <p>
              Six Claude windows open. One researching, one drafting, one
              debugging, three on background tasks. Context bleeds between them.
              You lose track of which is at what stage. There&apos;s no system
              for done vs needs your input.
            </p>
            <p>
              The 1000x productivity is real — until you become the bottleneck
              distilling everyone&apos;s work. Then it&apos;s just six tabs and
              a fried brain.
            </p>
          </div>
        </div>
      </section>

      {/* ── Positioning bullets ────────────────────────────── */}
      <section className="bg-white px-6 pb-32">
        <div className="max-w-3xl mx-auto border-t border-zinc-200 pt-20 space-y-8">
          {[
            {
              label: "Cross-session memory.",
              body: "Yaven watches every Claude Code instance you've got running and remembers state on your behalf.",
            },
            {
              label: "Context portability.",
              body: "Move work between agents in one click. No re-explaining, no copy-pasting prompts.",
            },
            {
              label: "Plug-and-play.",
              body: "Sits on top of Claude Code. No replacement tool, no new chat to learn, no prompt engineering.",
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-6">
              <span className="w-1 shrink-0 rounded-full bg-zinc-300 mt-1" />
              <p className="text-base sm:text-lg text-zinc-500 font-inter leading-relaxed">
                <span className="text-zinc-900 font-medium">{item.label}</span>{" "}
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="bg-white px-6 pb-32">
        <div className="max-w-6xl mx-auto space-y-40">
          {features.map((f, i) => (
            <div
              key={f.number}
              className={`flex flex-col gap-16 lg:flex-row lg:items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 space-y-6">
                <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-inter">
                  {f.number}
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-1px] text-zinc-900 font-instrument-serif">
                  {f.heading}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-500 font-inter max-w-md">
                  {f.body}
                </p>
              </div>
              <div className="flex-1">{f.visual}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Three-pillar credibility ────────────────────────── */}
      <section className="bg-white px-6 py-32 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-1.2px] text-zinc-900 font-instrument-serif mb-20 max-w-xl">
            Built for people who run more than two Claudes.
          </h2>
          <div className="grid gap-px bg-zinc-200 sm:grid-cols-3 rounded-2xl overflow-hidden">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white px-8 py-10 space-y-3">
                <h4 className="text-lg text-zinc-900 font-instrument-serif">
                  {p.title}
                </h4>
                <p className="text-sm leading-relaxed text-zinc-500 font-inter">
                  {p.body}
                </p>
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
            className="inline-block liquid-glass rounded-full px-14 py-5 text-base text-zinc-900 hover:scale-[1.03] transition-transform cursor-pointer"
          />
        </div>
      </section>
    </>
  );
}
