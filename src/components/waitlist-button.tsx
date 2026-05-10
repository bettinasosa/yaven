"use client";

import { useState } from "react";

const WORK_TYPES = [
  "Founder",
  "Product",
  "Engineering",
  "Design",
  "Hobby / Personal",
  "Other",
];

interface WaitlistButtonProps {
  label?: string;
  className?: string;
}

export function WaitlistButton({
  label = "Join the Waitlist",
  className,
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
      <button onClick={() => setOpen(true)} className={className}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
              <div className="text-center py-12 px-8 sm:px-10 space-y-3">
                <p className="text-3xl font-instrument-serif text-zinc-900">
                  You&apos;re on the list.
                </p>
                <p className="text-zinc-500 font-inter text-sm leading-relaxed">
                  We&apos;ll reach out when early access opens.
                  <br />
                  Until then — keep building.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 px-8 sm:px-10 pt-8 sm:pt-10 pb-4">
                  <p className="text-2xl sm:text-3xl font-instrument-serif text-zinc-900 mb-2">
                    Join the waitlist
                  </p>
                  <p className="text-sm text-zinc-500 font-inter mb-8 leading-relaxed">
                    We&apos;ll reach out when early access opens.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-inter block mb-2">
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
                      <label className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-inter block mb-2">
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
                    disabled={loading || !email}
                    className="w-full rounded-full bg-zinc-900 text-white text-sm font-inter py-3.5 hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
