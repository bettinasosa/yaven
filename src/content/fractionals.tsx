import { homeCopy } from "./home"
import type { SiteCopy } from "./types"

/**
 * /fractionals — for anyone selling a senior seat by the day: fractional CMOs,
 * CFOs, COOs, chiefs of staff.
 *
 * Broader than the CMO page it replaces, so the demos avoid one discipline's
 * vocabulary. What every fractional shares is a retainer with a fixed number of
 * hours, several companies each believing they are the priority, and scope that
 * drifts one favour at a time.
 */
export const fractionalsCopy: SiteCopy = {
  hero: {
    tagline: ["Four companies.", "One inbox."],
    sub: ({ apps }) => (
      <>
        The AI workforce that lives in your menu bar,
        <br />
        keeping every company&apos;s context straight
        <br />
        across all your {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "An AI assistant for fractional CMOs, CFOs and chiefs of staff.",
    body: [
      ({ pill, u }) => (
        <>
          It connects to every company&apos;s {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("imessage", -3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} notes and {pill("notion", 3)} docs, and keeps
          them {u("in separate lanes")}. Whose board meeting, whose runway,
          whose hire you promised to sit in on.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft a reply in your voice without opening
          the thread. Use {keys("⌥", "A")} to answer anything on your screen.
          It learns which companies you want to review and which you{" "}
          {u("let it handle")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("Local-first")}. Company data stays on your machine. Nothing is
          uploaded to our servers or synced to a cloud, which is the answer to
          the NDA question before anyone asks it.
        </>
      )
    ],
    draft: {
      logo: "slack",
      senderName: "Lola H.",
      senderMeta: "Northwind · retained",
      inbound:
        "Quick one, can you sit in on the two ops interviews Thursday? Assuming that's in scope?",
      youType: "warm, but it's out of scope",
      drafted:
        "Happy to. Hiring panels sit outside the current retainer, so I'll send a short add-on this afternoon rather than quietly absorb it. Do you want it priced for these two, or for the whole round?"
    },
    ask: {
      logo: "google",
      docName: "Northwind_SOW_v4.pdf",
      clauses: [
        {
          num: "3.1",
          text: () => (
            <>
              Retained days are allocated monthly and do not carry forward.
            </>
          )
        },
        {
          num: "3.2",
          text: ({ b }) => (
            <>Scope covers strategy and oversight, not {b("execution")}.</>
          )
        }
      ],
      question: "Didn't we agree hiring panels were included?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("granola")} call with Lola on April 3, </>
      ),
      answered:
        "hiring support was moved out of scope to hold the retainer at four days a month. They asked for it to be quoted separately once the round opened."
    }
  },

  triage: {
    headline: "Yaven knows whose is urgent…",
    body: [
      ({ u }) => (
        <>
          Four companies, four Slacks, four inboxes. Yaven pulls all of it into
          a {u("single notification centre")} and tells you which one actually
          needs you now, so the loudest company stops winning by default.
        </>
      ),
      ({ u }) => (
        <>
          {u("Nothing slips between companies")}. Yaven tracks what you promised
          whom, drafts the updates in your voice, and{" "}
          {u("preps you before every call")} so you never open with the wrong
          company&apos;s numbers.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Things only you can handle. Yaven knows which company can wait.",
        items: [
          { text: "Northwind: can we move Thursday?", tag: "Client" },
          { text: "Referral from an old client", tag: "New business" },
          { text: "Board pack due before Friday", tag: "Deadline" }
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
          { text: "Invite: operators dinner, Oct 12", tag: "Next month" }
        ]
      }
    ]
  },

  proposals: {
    headline: "…and what you promised.",
    slides: [
      {
        title: "Yaven remembers every company",
        body: () => (
          <>
            Including the ones from three years ago. It spots the old client
            whose budget cycle is coming around again, the intro you said
            you&apos;d make, the founder worth a hello before they hire someone
            else, then drafts the message for you.
          </>
        )
      },
      {
        title: "Call ended, scope ready",
        body: () => (
          <>
            Yaven pulls the notes, your past retainers, and your rates, and
            drafts the scope of work before you close the call.
          </>
        )
      },
      {
        title: "Intros you can answer properly",
        body: () => (
          <>
            A founder gets your name from an investor and emails on a Tuesday
            night. Yaven tells you who passed on your name, what the company
            does and what they are short of, so the reply sounds like you
            already knew.
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
          Asker suggested I get in touch — we&apos;re raising and have{" "}
          {b("no senior finance hire")} until Q4.
          <br />
          Any chance of a call this week?
        </>
      ),
      reply: ({ b, link }) => (
        <>
          {b("Asker K.")} introduced Ariel. You did the same three days a month
          for {b("Meridian")} at their stage. I drafted a reply with your{" "}
          {link("calendar link")}.
        </>
      )
    },
    sourceCards: [
      {
        title: "Call notes",
        detail: "Series A closing, no senior finance hire until Q4"
      },
      {
        title: "Past retainer",
        detail: "Meridian, £6,000/month, four days"
      },
      {
        title: "Your rates",
        detail: "Retainers start at £5,500/month"
      }
    ],
    proposal: {
      label: "Scope of work",
      title: "Q3 retainer + board support",
      client: "Northwind"
    },
    conference: {
      name: "Ariel Thomas",
      company: "Northwind",
      rows: [
        { label: "Introduced by", value: "Asker K., their investor" },
        { label: "Stage", value: "Series A, closing this quarter" },
        { label: "Short of", value: "A finance lead until Q4" }
      ]
    }
  },

  faq: [
    {
      q: "So what actually is this?",
      a: (
        <>
          A second brain that lives in your Mac&apos;s menu bar. It connects to
          every company&apos;s inbound (slack, mail, telegram, imessage),
          calendar, notes and docs, learns how you work, and keeps each
          company&apos;s context separate so you stop paying the switching cost
          twenty times a day.
          <br />
          <br />
          Right now it prioritises across all your companies at once, drafts
          replies in your voice from any app on your Mac, and preps you before
          every call. The more you use it, the more it handles on its own.
          Currently in beta.
        </>
      )
    },
    {
      q: "I sign NDAs with every company. Can I use this?",
      a: (
        <>
          That&apos;s exactly why it&apos;s local-first. Company files and
          context never leave your machine unless you trigger a draft. When you
          do, only the relevant snippet goes to your existing model provider for
          that one request, and nothing is retained. No company&apos;s data ever
          touches another&apos;s context.
        </>
      )
    },
    ...homeCopy.faq.slice(2)
  ]
}
