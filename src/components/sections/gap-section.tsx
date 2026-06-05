import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

export function GapSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-20 sm:pt-36 pb-28 sm:pb-52">
      <Image
        src="/cloud.png"
        alt=""
        width={520}
        height={280}
        className="pointer-events-none select-none absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] opacity-40 sm:w-[520px]"
        style={{ height: "auto" }}
        aria-hidden="true"
      />
      <FadeIn className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-1.5px] text-zinc-900 font-instrument-serif mb-12">
          A gap is opening up.
        </h2>
        <div className="flex flex-col gap-12 sm:gap-16">
          {/* Row 1: paragraph + chart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-zinc-500">
              <p>
                Most people use AI like a faster Google. Type a question, get an
                answer, repeat tomorrow.
              </p>
              <p>
                The people pulling ahead have worked out which half of their job
                repeats, and handed it off. They come back to decisions, not
                groundwork. The 5% of power users aren&apos;t necessarily
                smarter; until now, the tools have just been built for them.
              </p>
              <p>Yaven is built for the 83% who aren&apos;t there yet.</p>
            </div>
            {/* EY Survey Chart */}
            <div
              className="rounded-2xl bg-[#5B99C4]/10 px-6 py-6"
              style={{ boxShadow: "0 2px 12px rgba(32,83,165,0.08)" }}
            >
              <div className="space-y-4">
                {/* Bar 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>Use AI for basic tasks</span>
                    <span className="font-medium text-zinc-700">88%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#F5C0C1]"
                      style={{ width: "88%" }}
                    />
                  </div>
                </div>
                {/* Bar 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>Use AI to transform their work</span>
                    <span className="font-medium text-zinc-700">5%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: "5%", background: "#5B99C4" }}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-5 text-xs text-zinc-400 leading-snug">
                Source: EY Work Reimagined Survey 2025,
                <br />
                15,000 employees across 29 countries
              </p>
            </div>
          </div>

          {/* Row 2: Yaven logo + paragraph */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="flex items-center justify-center order-2 sm:order-1">
              <Image
                src="/logo.png"
                alt="Yaven"
                width={120}
                height={120}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              />
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-zinc-500 order-1 sm:order-2">
              Yaven connects to all your devices and tools. It learns your
              habits, follows how your week runs, and handles the tasks that
              repeat. Follow-ups sent. Notes logged. Reports found. You decide
              what you want to handle, and what you want to hand over. When
              something needs a human decision, it brings it to your attention.
              Everything else is covered for you.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
