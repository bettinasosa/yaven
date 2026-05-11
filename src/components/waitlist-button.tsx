"use client";

import { useState } from "react";
import { BubbleButton } from "@/components/bubble-button";

const WORK_TYPES = [
  "Founder",
  "Freelancer",
  "Consultant",
  "Creator",
  "Operator",
  "Sales / BD",
  "Marketing",
  "Product",
  "Engineering",
  "Recruiting",
  "Customer Success",
  "Finance / Ops",
  "Executive Assistant",
  "Research",
  "Student",
  "Other",
];

interface WaitlistButtonProps {
  label?: string;
  className?: string;
  glass?: boolean;
}

export function WaitlistButton({
  label = "Join the Waitlist",
  className,
  glass,
}: WaitlistButtonProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [workType, setWorkType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, workType }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      setWorkType("");
      setError("");
    }, 300);
  }

  return (
    <>
      {glass ? (
        <BubbleButton onClick={() => setOpen(true)}>{label}</BubbleButton>
      ) : (
        <button onClick={() => setOpen(true)} className={className}>
          {label}
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl flex flex-col max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-6 text-zinc-400 hover:text-zinc-700 transition-colors text-2xl leading-none cursor-pointer z-10"
            >
              ×
            </button>

            {submitted ? (
              <div className="py-12 px-8 sm:px-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-3xl font-instrument-serif text-zinc-900">
                    You&apos;re on the list.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    We&apos;ll be in touch as soon as early access opens — you&apos;ll be among the first to get in.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: "→", text: "A personal onboarding call to map your workflows" },
                    { icon: "→", text: "Full access to your agent workspace from day one" },
                    { icon: "→", text: "Direct line to the team while we build together" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <span className="text-[#2053A5] text-sm font-bold shrink-0 mt-0.5">{icon}</span>
                      <p className="text-sm text-zinc-600 leading-snug">{text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  In the meantime, if you have questions or want to share what you&apos;re building, reach us at{" "}
                  <a href="mailto:hello@yaven.ai" className="underline hover:text-zinc-600 transition-colors">hello@yaven.ai</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 px-8 sm:px-10 pt-8 sm:pt-10 pb-4">
                  <p className="text-2xl sm:text-3xl font-instrument-serif text-zinc-900 mb-2">
                    Join the waitlist
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                    We&apos;re opening access in small batches — tell us a bit about yourself and we&apos;ll reach out when your spot is ready.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-zinc-500 block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 font-inter placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-500 block mb-2">
                        What do you do?
                      </label>
                      <div className="relative">
                        <select
                          value={workType}
                          onChange={(e) => setWorkType(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-inter text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors cursor-pointer pr-10"
                        >
                          <option value="" disabled>
                            Select one…
                          </option>
                          {WORK_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">
                          ▾
                        </span>
                      </div>
                    </div>
                    {error && (
                      <p className="text-xs text-red-500 font-inter">{error}</p>
                    )}
                  </div>
                </div>

                {/* Sticky submit button */}
                <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-4 bg-white rounded-b-3xl">
                  <button
                    type="submit"
                    disabled={loading || !email || !workType}
                    className="w-full rounded-full text-white text-base font-bold py-3.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "#2053A5" }}
                    onMouseEnter={e => { if (!loading && email && workType) (e.currentTarget as HTMLButtonElement).style.background = "rgba(32,83,165,0.8)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#2053A5" }}
                  >
                    {loading ? "Saving…" : "Get early access"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
