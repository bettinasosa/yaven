import { WaitlistButton } from "@/components/waitlist-button";

const features = [
  {
    number: "01",
    heading: "Every session, one view.",
    body: "See every Claude Code instance you've got running in one place. What it's working on, where it's blocked, what's finished. No more tab-hunting to find the one waiting on you.",
  },
  {
    number: "02",
    heading: "Pick up where you left off.",
    body: "Drop into any thread and the overseer briefs you on what happened since you stepped away. State, decisions, current step. You re-enter the work in 10 seconds, not 10 minutes.",
  },
  {
    number: "03",
    heading: "Port context between sessions.",
    body: "Move context from one agent to another in one click. The auth refactor learns what the API session decided. The drafting agent picks up the research. No re-explaining, no copy-pasting prompts.",
  },
  {
    number: "04",
    heading: "Easily customise agent system prompts.",
    body: "",
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
        <div className="absolute inset-0 bg-white/10 z-1" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-white to-transparent z-2 pointer-events-none" />

        <nav className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <span className="text-3xl tracking-tight text-zinc-900 font-instrument-serif">
              Yaven<sup className="text-xs">®</sup>
            </span>
          </div>
        </nav>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-40 min-h-[calc(100vh-88px)]">
          <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl text-zinc-900 font-instrument-serif animate-fade-rise">
            Focus in a Distracted World
          </h1>
          <p className="text-base sm:text-lg max-w-xl mt-10 leading-relaxed text-zinc-600 font-inter animate-fade-rise-delay">
            We&apos;re designing tools for deep thinkers, bold creators, and
            quiet rebels. Amid the chaos, we build agentic orchestration tools
            for sharp focus and inspired work.
          </p>
          <WaitlistButton
            label="Join the Waitlist"
            className="mt-14 rounded-full bg-zinc-900 text-white px-12 py-4 text-sm font-inter hover:bg-zinc-700 hover:scale-[1.03] transition-all cursor-pointer animate-fade-rise-delay-2 shadow-lg"
          />
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
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-inter mb-16">
            What Yaven does
          </p>
          <div className="grid gap-px bg-zinc-200 sm:grid-cols-2 rounded-2xl overflow-hidden">
            {features.map((f) => (
              <div key={f.number} className="bg-white px-8 py-10 space-y-4">
                <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-inter">
                  {f.number}
                </p>
                <h3 className="text-xl sm:text-2xl leading-snug tracking-[-0.5px] text-zinc-900 font-instrument-serif">
                  {f.heading}
                </h3>
                {f.body && (
                  <p className="text-sm leading-relaxed text-zinc-500 font-inter">
                    {f.body}
                  </p>
                )}
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
  );
}
