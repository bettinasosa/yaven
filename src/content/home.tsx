import type { SiteCopy } from "./types"

/**
 * The copy the home page has always had, lifted out of the components verbatim.
 *
 * This is the reference every variant is measured against, so keep it a
 * faithful copy of what shipped — reword the home page here on purpose, not as
 * a side effect of extracting something else.
 */
export const homeCopy: SiteCopy = {
  triage: {
    headline: "Yaven knows what matters…",
    body: [
      ({ u }) => (
        <>
          One queue instead of ten different apps. Yaven pulls everything into
          a {u("single notification centre")} that only demands your attention
          when something actually needs you, so you can stay focused.
        </>
      ),
      ({ u }) => (
        <>
          {u("Important threads never get buried")}. Yaven tracks every
          conversation, drafts replies in your voice, and{" "}
          {u("preps you before every meeting")} with the context you need.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Things only you can handle. Yaven knows what is and isn't urgent.",
        items: [
          { text: "Can we move Thursday's call?", tag: "Client" },
          { text: "Intro: Fatimah ↔ you", tag: "Warm lead" },
          { text: "Redlines back from their legal", tag: "Deadline" }
        ]
      },
      {
        label: "Already handled",
        desc: "Drafted using your tone, context, and rules.",
        items: [
          { text: "Re: proposal timeline?", tag: "✓ replied" },
          { text: "Invoice #214 overdue", tag: "✓ nudged" },
          { text: "Meeting action items", tag: "✓ sent" },
          { text: "Receipt filed to expenses", tag: "✓ sorted" }
        ]
      },
      {
        label: "Can wait",
        desc: "Queued for when you have the headspace.",
        items: [
          { text: "Competitor weekly digest", tag: "This weekend" },
          { text: "Invite: founders dinner, Oct 12", tag: "Next month" }
        ]
      }
    ]
  }
}
