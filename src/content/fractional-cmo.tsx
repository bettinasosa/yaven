import { homeCopy } from "./home"
import type { SiteCopy } from "./types"

/**
 * /fractional-cmo — for people running marketing for three or four companies
 * at once, each with its own Slack, its own retainer, and its own idea of
 * what's in scope.
 *
 * The demos are the tailoring that matters: scope creep in a client Slack, and
 * a retainer document that says something different from what everyone
 * remembers agreeing.
 */
export const fractionalCmoCopy: SiteCopy = {
  hero: {
    tagline: ["Four clients.", "One inbox."],
    sub: ({ apps }) => (
      <>
        The AI workforce that lives in your menu bar,
        <br />
        keeping every client&apos;s context straight
        <br />
        across all your {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "A menu bar assistant for running four clients.",
    body: [
      ({ pill, u }) => (
        <>
          It connects to every client&apos;s {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("imessage", -3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} notes and {pill("notion", 3)} docs, and keeps
          them {u("in separate lanes")}. Whose deadline, whose budget, whose
          intro you promised.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft a reply in your voice without opening
          the thread. Use {keys("⌥", "A")} to answer anything on your screen.
          It learns which clients you want to review and which you{" "}
          {u("let it handle")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("Local-first")}. Client work stays on your machine. Nothing is
          uploaded to our servers or synced to a cloud, which is the answer to
          the NDA question before anyone asks it.
        </>
      )
    ],
    draft: {
      logo: "slack",
      senderName: "Priya M.",
      senderMeta: "Northwind · retainer client",
      inbound:
        "Quick one, can you also run paid social for launch week? Assuming that's in scope?",
      youType: "warm, but it's out of scope",
      drafted:
        "Happy to take it on. Paid social sits outside the current retainer, so I'll send a short add-on scope this afternoon rather than quietly absorb it. Do you want it priced for launch week only, or ongoing?"
    },
    ask: {
      logo: "google",
      docName: "Northwind_SOW_v4.pdf",
      clauses: [
        {
          num: "3.1",
          text: () => (
            <>
              Retained hours are allocated monthly and do not carry forward.
            </>
          )
        },
        {
          num: "3.2",
          text: ({ b }) => (
            <>Scope covers strategy and oversight, not {b("media buying")}.</>
          )
        }
      ],
      question: "Didn't we agree paid social was included?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("granola")} call with Priya on April 3, </>
      ),
      answered:
        "paid media was moved out of scope to hold the retainer at twenty hours. She asked for it to be quoted separately once launch dates firmed up."
    }
  },

  triage: {
    headline: "Yaven knows whose is urgent…",
    body: [
      ({ u }) => (
        <>
          Four clients, four Slacks, four inboxes. Yaven pulls all of it into a{" "}
          {u("single notification centre")} and tells you which one actually
          needs you now, so the loudest client stops winning by default.
        </>
      ),
      ({ u }) => (
        <>
          {u("Nothing slips between clients")}. Yaven tracks what you promised
          whom, drafts the updates in your voice, and{" "}
          {u("preps you before every call")} so you never open with the wrong
          company&apos;s numbers.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Things only you can handle. Yaven knows which client can wait.",
        items: [
          { text: "Northwind: can we move Thursday?", tag: "Client" },
          { text: "Referral from an old client", tag: "New business" },
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
          { text: "Invite: CMO dinner, Oct 12", tag: "Next month" }
        ]
      }
    ]
  },

  proposals: {
    headline: "…and what you promised.",
    slides: [
      {
        title: "Yaven remembers every client",
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
        title: "Conference follow-ups, handled",
        body: () => (
          <>
            It finds their work, your mutual connections, and drafts a
            follow-up in your voice before the connection goes cold.
          </>
        )
      }
    ],
    network: {
      senderName: "Marcus",
      senderInitials: "MC",
      senderLogo: "gmail",
      inbound: ({ b }) => (
        <>
          Following up on our conversation at MeasureFest &apos;26.
          <br />
          Do you have {b("availability this week")} for a call?
        </>
      ),
      reply: ({ b, link }) => (
        <>
          Marcus met you at {b("MeasureFest '26")}. He works with a mutual,{" "}
          {b("Oliver Normand")}. I drafted a reply with your {link("calendar link")}.
        </>
      )
    },
    sourceCards: [
      {
        title: "Call notes",
        detail: "Q3 push, launch in six weeks, no in-house team"
      },
      {
        title: "Past retainer",
        detail: "Meridian, £6,000/month, twenty hours"
      },
      {
        title: "Your rates",
        detail: "Retainers start at £5,500/month"
      }
    ],
    proposal: {
      label: "Scope of work",
      title: "Q3 retainer + launch support",
      client: "Northwind"
    },
    conference: {
      name: "Ariel Thomas",
      company: "Halcyon Group",
      rows: [
        { label: "Spoke at", value: "MeasureFest '26" },
        { label: "Mutual", value: "Asker K." },
        { label: "Talked about", value: "Attribution after GA4" }
      ]
    }
  },

  faq: [
    {
      q: "So what actually is this?",
      a: (
        <>
          A second brain that lives in your Mac&apos;s menu bar. It connects to
          every client&apos;s inbound (slack, mail, telegram, imessage),
          calendar, notes and docs, learns how you work, and keeps each
          client&apos;s context separate so you stop paying the switching cost
          twenty times a day.
          <br />
          <br />
          Right now it prioritises across all your clients at once, drafts
          replies in your voice from any app on your Mac, and preps you before
          every call. The more you use it, the more it handles on its own.
          Currently in beta.
        </>
      )
    },
    {
      q: "I sign NDAs with every client. Can I use this?",
      a: (
        <>
          That&apos;s exactly why it&apos;s local-first. Client files and
          context never leave your machine unless you trigger a draft. When you
          do, only the relevant snippet goes to your existing model provider for
          that one request, and nothing is retained. No client&apos;s data ever
          touches another client&apos;s context.
        </>
      )
    },
    ...homeCopy.faq.slice(2)
  ]
}
