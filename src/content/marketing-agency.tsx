import { homeCopy } from "./home"
import type { SiteCopy } from "./types"

/**
 * /marketing-agency — for general marketing agencies rather than a specialism.
 *
 * Written from Baron's feedback: the work that eats the week is strategy,
 * staying current on what's changed, and client management. So the tailoring
 * leans on the reading nobody has time for — the platform change, the
 * competitor launch, the thing a client will ask about on Thursday — and on
 * holding several accounts straight at once.
 */
export const marketingAgencyCopy: SiteCopy = {
  hero: {
    tagline: ["Every account.", "Straight."],
    sub: ({ apps }) => (
      <>
        The AI workforce that lives in your menu bar,
        <br />
        keeping every account, deadline and change
        <br />
        straight across all your {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "An AI assistant for marketing agencies.",
    body: [
      ({ pill, u }) => (
        <>
          It connects to every account&apos;s {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("imessage", -3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} notes and {pill("notion", 3)} docs, and keeps
          them {u("in separate lanes")}. Whose deadline, whose budget, whose
          approval you are still waiting on.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft a reply in your voice without opening
          the thread. Use {keys("⌥", "A")} to answer anything on your screen,
          including the deck you are halfway through. It learns what you want to
          see and what you&apos;d rather it {u("just handles")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("Local-first")}. Client work stays on your machine. Nothing is
          uploaded to our servers or synced to a cloud, which is the answer to
          the procurement question before anyone asks it.
        </>
      )
    ],
    draft: {
      logo: "slack",
      senderName: "Lola H.",
      senderMeta: "Halcyon · retained account",
      inbound:
        "Board's asking why our CPMs jumped last month. Can you get us something before Thursday?",
      youType: "yes, but flag it's platform-wide",
      drafted:
        "Yes, I'll have it with you Wednesday. Worth saying up front: the rise tracks a platform-wide auction change rather than anything in your account. I'll show your numbers against the category so the board can see the difference."
    },
    ask: {
      logo: "google",
      docName: "Halcyon_MSA_v3.pdf",
      clauses: [
        {
          num: "4.2",
          text: () => (
            <>
              Reporting is delivered monthly; ad hoc analysis is quoted
              separately.
            </>
          )
        },
        {
          num: "4.5",
          text: ({ b }) => (
            <>Media spend is billed at cost plus {b("twelve percent")}.</>
          )
        }
      ],
      question: "Is the board deck covered, or do we quote it?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("granola")} call with Lola on May 2, </>
      ),
      answered:
        "monthly reporting was agreed as standard and anything board-facing was to be quoted. They said they'd rather be told before the work started than see it on the invoice."
    }
  },

  triage: {
    headline: "Yaven knows what changed…",
    body: [
      ({ u }) => (
        <>
          Six accounts, six Slacks, and an industry that moves faster than
          anyone can read. Yaven pulls it into a{" "}
          {u("single notification centre")} and tells you what actually needs
          you now, so the loudest account stops winning by default.
        </>
      ),
      ({ u }) => (
        <>
          {u("Nothing slips between accounts")}. Yaven tracks what you promised
          whom, drafts the updates in your voice, and{" "}
          {u("preps you before every call")} so you never open with the wrong
          client&apos;s numbers.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Things only you can handle. Yaven knows which account can wait.",
        items: [
          { text: "Halcyon: board asking about CPMs", tag: "Account" },
          { text: "Pitch brief in, due Monday", tag: "New business" },
          { text: "Redlines back from their legal", tag: "Deadline" }
        ]
      },
      {
        label: "Already handled",
        desc: "Drafted using your tone, context, and rules.",
        items: [
          { text: "Re: where are we on Q3?", tag: "✓ replied" },
          { text: "Invoice #214 overdue", tag: "✓ nudged" },
          { text: "Weekly update to Meridian", tag: "✓ sent" },
          { text: "Receipt filed to expenses", tag: "✓ sorted" }
        ]
      },
      {
        label: "Can wait",
        desc: "Queued for when you have the headspace.",
        items: [
          { text: "Competitor weekly digest", tag: "This weekend" },
          { text: "Invite: agency leaders dinner", tag: "Next month" }
        ]
      }
    ]
  },

  proposals: {
    headline: "…and what you promised.",
    slides: [
      {
        title: "Yaven remembers every account",
        body: () => (
          <>
            Including the ones that lapsed two years ago. It spots the old
            client whose budget cycle is coming around again, the intro you said
            you&apos;d make, the prospect worth a hello before they brief
            somebody else, then drafts the message for you.
          </>
        )
      },
      {
        title: "Call ended, scope ready",
        body: () => (
          <>
            Yaven pulls the notes, your past scopes, and your rate card, and
            drafts the scope of work before you close the call.
          </>
        )
      },
      {
        title: "The pitch you lost, coming back",
        body: () => (
          <>
            Agencies get replaced roughly every three years, which means the
            business you lost in 2024 is in play again now. Yaven watches for
            the signs and reminds you what they picked instead, and why.
          </>
        )
      }
    ],
    network: {
      senderName: "Ariel",
      senderInitials: "AT",
      senderLogo: "gmail",
      inbound: ({ b }) => (
        <>
          We&apos;re reviewing agencies again for next year.
          <br />
          Would you be open to {b("re-pitching")} in September?
        </>
      ),
      reply: ({ b, link }) => (
        <>
          You pitched Ariel in {b("March 2024")} and lost on price. They have since
          moved to {b("Halcyon")}, where the budget is roughly double. I drafted
          a reply with your {link("calendar link")}.
        </>
      )
    },
    sourceCards: [
      {
        title: "Call notes",
        detail: "Rebrand plus paid, launch in Q3, no in-house team"
      },
      {
        title: "Past scope",
        detail: "Meridian, retained, £9,000/month"
      },
      {
        title: "Your rate card",
        detail: "Retained accounts start at £8,000/month"
      }
    ],
    proposal: {
      label: "Scope of work",
      title: "Q3 retainer + launch support",
      client: "Halcyon"
    },
    conference: {
      name: "Ariel Thomas",
      company: "Halcyon Group",
      rows: [
        { label: "You pitched", value: "March 2024, brand + paid" },
        { label: "Lost to", value: "An incumbent, on price" },
        { label: "Changed", value: "New role, budget roughly doubled" }
      ]
    }
  },

  faq: [
    {
      q: "So what actually is this?",
      a: (
        <>
          A second brain that lives in your Mac&apos;s menu bar. It connects to
          every account&apos;s inbound (slack, mail, telegram, imessage),
          calendar, notes and docs, learns how you work, and keeps each
          account&apos;s context separate so you stop paying the switching cost
          twenty times a day.
          <br />
          <br />
          Right now it prioritises across every account at once, drafts replies
          in your voice from any app on your Mac, and preps you before every
          call. The more you use it, the more it handles on its own. Currently
          in beta.
        </>
      )
    },
    {
      q: "Can my team use it, or is this just for me?",
      a: (
        <>
          Today it is one person, one Mac. It learns your voice and your
          judgement, which is what makes the drafts worth sending. Shared
          accounts are on the roadmap and not in the beta. Most agencies start
          with whoever carries the most context, usually a founder or an account
          lead, because that is where the switching cost is highest.
        </>
      )
    },
    ...homeCopy.faq.slice(2)
  ]
}
