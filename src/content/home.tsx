import type { SiteCopy } from "./types"

/**
 * The copy the home page has always had, lifted out of the components verbatim.
 *
 * This is the reference every variant is measured against, so keep it a
 * faithful copy of what shipped — reword the home page here on purpose, not as
 * a side effect of extracting something else.
 */
export const homeCopy: SiteCopy = {
  hero: {
    tagline: ["Less admin.", "More flow."],
    sub: ({ apps }) => (
      <>
        The AI workforce that lives in your menu bar,
        <br />
        handling the admin that eats your day
        <br />
        across all your {apps()}.
      </>
    )
  },

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
  },

  faq: [
    {
      q: "So what actually is this?",
      a: (
        <>
          A second brain that lives in your Mac&apos;s menu bar. It connects to
          all of your inbound (telegram, imessage, slack, mail etc.), calendar,
          notes and docs, learns how you work, and builds a picture of your
          conversations, and commitments so nothing falls through the cracks.
          <br />
          <br />
          Right now it intelligently prioritises your inbox so the most critical
          messages are always at the top of your desk, drafts replies on one click
          in your voice from any app on your Mac, and preps you before every
          meeting. The more you use it, the more it handles on its own. Currently
          in beta.
        </>
      )
    },
    {
      q: "How is this different from ChatGPT or Claude?",
      a: (
        <>
          A chat box waits for you to drive it: you write the prompt, paste the
          context, copy the answer back. Yaven already read the thread, knows the
          client, and queued the reply before you opened it. You approve, it
          learns. The more you use it, the less you have to touch.
        </>
      )
    },
    {
      q: "Where does my data go?",
      a: (
        <>
          Yaven is local-first. Your emails, drafts, and the profile it builds
          stay on your Mac, not on our servers, not synced to a cloud. When you
          ask it to draft or answer, only the relevant text is sent to your
          existing model provider for that single request. Nothing is stored
          afterward. Yaven never sends, files, or changes anything without your
          explicit approval.
        </>
      )
    },
    {
      q: "I handle client data under NDA. Can I trust this?",
      a: (
        <>
          That&apos;s exactly why it&apos;s local-first. Your files and context
          never leave your machine unless you trigger a draft. When you do, only
          the relevant snippet goes to your existing model provider for that one
          request, nothing is retained. You control every action, every send.
        </>
      )
    },
    {
      q: "What does it connect to?",
      a: (
        <>
          Gmail, Google Calendar, Apple Calendar, iMessage, Telegram, Granola,
          Spotify, your files and docs. Many more integrations are coming through
          the beta.
        </>
      )
    },
    {
      q: "Is it Mac only?",
      a: (
        <>
          Yes, for now. Yaven is built native for macOS. Windows is on the
          roadmap.
        </>
      )
    },
    {
      q: "When do I get access?",
      a: (
        <>
          Yaven is in beta. We onboard a small group every week, personally. Join
          the waitlist and we&apos;ll reach out.
        </>
      )
    }
  ]
}
