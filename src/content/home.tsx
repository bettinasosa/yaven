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

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "A menu bar assistant that lives on your Mac.",
    body: [
      ({ pill, u }) => (
        <>
          It connects to all your {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("imessage", -3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} notes, {pill("notion", 3)} docs and more,
          collating everything important in {u("one place")}. The intro, the
          contract, the unpaid invoice, none of it gets buried.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft any reply, anywhere, in your voice. Use{" "}
          {keys("⌥", "A")} to answer anything on your screen. Yaven learns how
          much to let you review, and how much you want it to{" "}
          {u("handle automatically")}, as you use it.
        </>
      ),
      ({ u }) => (
        <>
          {u("Local-first")}. Your messages, drafts, and context stay on your
          machine. Nothing is uploaded to our servers or synced to a cloud.
        </>
      )
    ],
    draft: {
      logo: "linkedin",
      senderName: "Lola H.",
      senderMeta: "Recruiter · Founding Designer role",
      inbound:
        "Hi Bettina! Your work is stunning, we're hiring a founding designer. Open to a quick chat?",
      youType: "politely decline, warm",
      drafted:
        "Thanks so much for reaching out, Lola! I'm really flattered. I'm not looking to go in-house right now, but I'd love to stay connected. If anything changes on my end I'll definitely reach out."
    },
    ask: {
      logo: "google",
      docName: "Martinas_Bakehouse_v3.pdf",
      clauses: [
        {
          num: "4.1",
          text: () => (
            <>
              All deliverables remain the sole property of the Client upon full
              payment.
            </>
          )
        },
        {
          num: "4.2",
          text: ({ b }) => <>Payment due within {b("sixty (60)")} days of invoice date.</>
        }
      ],
      question: "I thought this was 30 days? Why did it change?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("granola")} call with Pablo on May 12, </>
      ),
      answered:
        "his team updated the payment window from 30 to 60 days. He mentioned cash-flow timing on their end. The rest of the scope is unchanged from your v2 redline."
    }
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
