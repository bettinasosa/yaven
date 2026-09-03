import { homeCopy } from "./home"
import type { SiteCopy } from "./types"

/**
 * /coaches — for people who sell a programme to their own audience: health,
 * fitness, business, executive coaches running £1k+ packages out of their DMs.
 *
 * The tailoring that matters here is that the inbox *is* the business. Every
 * enquiry arrives as a DM among a hundred other DMs, the pipeline lives in the
 * coach's head, and the thing that loses money is a warm lead going cold over
 * four days rather than a badly written reply.
 */
export const coachesCopy: SiteCopy = {
  hero: {
    tagline: ["Every enquiry.", "Answered."],
    sub: ({ apps }) => (
      <>
        The AI workforce that lives in your menu bar,
        <br />
        so nobody who asked about your programme
        <br />
        gets lost across your {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "A menu bar assistant for coaches who sell from their DMs.",
    body: [
      ({ pill, u }) => (
        <>
          It connects to your {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("imessage", -3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} call notes and {pill("notion", 3)} docs, and
          keeps {u("every enquiry in one place")}. Who asked about pricing, who
          went quiet, who you promised to check in on.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to answer an enquiry in your voice without
          opening the thread. Use {keys("⌥", "A")} to answer anything on your
          screen. It learns which messages you want to read and which you{" "}
          {u("let it handle")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("Local-first")}. What your clients tell you stays on your machine.
          Nothing is uploaded to our servers or synced to a cloud, which matters
          when half your inbox is people describing their health.
        </>
      )
    ],
    draft: {
      logo: "imessage",
      senderName: "Hannah R.",
      senderMeta: "enquiry · from your Instagram",
      inbound:
        "Hey! Saw your post about the 12-week programme. What's the investment and do you have space in January?",
      youType: "warm, send the price, offer a call",
      drafted:
        "Thanks for reaching out! The 12-week one-to-one is £1,800, paid up front or in three. January has two spots left. Easiest thing is a quick call so I can check it's the right fit before you commit — here's my calendar."
    },
    ask: {
      logo: "notion",
      docName: "Programme_Terms_2026.pdf",
      clauses: [
        {
          num: "2.1",
          text: () => (
            <>
              Sessions not used within the twelve-week term are not carried
              forward.
            </>
          )
        },
        {
          num: "2.4",
          text: ({ b }) => (
            <>Clients may pause once for up to {b("four weeks")}.</>
          )
        }
      ],
      question: "Didn't I say she could pause twice?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("granola")} call with Hannah on Jan 9, </>
      ),
      answered:
        "you agreed one pause of four weeks, and said a second would need the term extending. She asked you to put it in writing before she paid."
    }
  },

  triage: {
    headline: "Yaven knows who is ready…",
    body: [
      ({ u }) => (
        <>
          Enquiries in your DMs, clients in your email, and the waitlist for
          January living in neither. Yaven pulls all of it into a{" "}
          {u("single notification centre")} and tells you who is actually close
          to signing.
        </>
      ),
      ({ u }) => (
        <>
          {u("Nobody asks twice")}. Yaven tracks who asked about pricing and
          never heard back, drafts the follow-up in your voice, and{" "}
          {u("preps you before every call")} so you open knowing their goal.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Things only you can handle. Yaven knows who is close.",
        items: [
          { text: "Hannah: asked about January spots", tag: "Enquiry" },
          { text: "Refund request, week three", tag: "Client" },
          { text: "Podcast wants you next week", tag: "Deadline" }
        ]
      },
      {
        label: "Already handled",
        desc: "Drafted using your tone, context, and rules.",
        items: [
          { text: "Re: do you take payment plans?", tag: "✓ replied" },
          { text: "Session moved to Thursday", tag: "✓ rebooked" },
          { text: "Check-in to the January cohort", tag: "✓ sent" },
          { text: "Receipt filed to expenses", tag: "✓ sorted" }
        ]
      },
      {
        label: "Can wait",
        desc: "Queued for when you have the headspace.",
        items: [
          { text: "Brand wants to send you product", tag: "This weekend" },
          { text: "Invite: coaching summit, Oct 12", tag: "Next month" }
        ]
      }
    ]
  },

  proposals: {
    headline: "…and who went quiet.",
    slides: [
      {
        title: "Yaven remembers every enquiry",
        body: () => (
          <>
            Including the one from four months ago who said &ldquo;maybe in the
            new year&rdquo;. It spots the person whose new year has arrived, the
            client whose programme ends in a fortnight, the follow-up you meant
            to send, then drafts the message for you.
          </>
        )
      },
      {
        title: "Call ended, offer ready",
        body: () => (
          <>
            Yaven pulls the call notes, your programme terms, and your prices,
            and drafts the offer before you close the call.
          </>
        )
      },
      {
        title: "The friend of a client who finished",
        body: () => (
          <>
            Somebody messages saying Hannah sent them. Yaven knows who Hannah
            is, what she did, and how it went, so you can answer with the thing
            that will actually land rather than asking who referred them.
          </>
        )
      }
    ],
    network: {
      senderName: "Priya",
      senderInitials: "PN",
      senderLogo: "gmail",
      inbound: ({ b }) => (
        <>
          Hi! Hannah said I should speak to you.
          <br />
          Do you have {b("space in January")}?
        </>
      ),
      reply: ({ b, link }) => (
        <>
          {b("Hannah R.")} finished her twelve weeks in March and referred two
          people since. Priya trains at the same gym. I drafted a reply with
          your {link("calendar link")}.
        </>
      )
    },
    sourceCards: [
      {
        title: "Call notes",
        detail: "Wants strength and habits, training for a spring race"
      },
      {
        title: "Past programme",
        detail: "12 weeks one-to-one, £1,800, paid in three"
      },
      {
        title: "Your prices",
        detail: "One-to-one from £1,800, group from £600"
      }
    ],
    proposal: {
      label: "Programme offer",
      title: "12-week one-to-one, January start",
      client: "Hannah R."
    },
    conference: {
      name: "Priya Nayar",
      company: "Referred by Hannah R.",
      rows: [
        { label: "Hannah finished", value: "12 weeks, March" },
        { label: "How it went", value: "Ran her first half marathon" },
        { label: "Also referred", value: "Two others since" }
      ]
    }
  },

  faq: [
    {
      q: "So what actually is this?",
      a: (
        <>
          A second brain that lives in your Mac&apos;s menu bar. It connects to
          your inbound (mail, imessage, telegram, slack), calendar, notes and
          docs, learns how you write, and keeps every enquiry and client in one
          place so nobody warm gets buried under everybody else.
          <br />
          <br />
          Right now it tells you who is closest to signing, drafts replies in
          your voice from any app on your Mac, and preps you before every call.
          The more you use it, the more it handles on its own. Currently in
          beta.
        </>
      )
    },
    {
      q: "My enquiries come through Instagram DMs. Does that work?",
      a: (
        <>
          Not yet, and that&apos;s the honest answer. Yaven reads mail, Slack,
          Telegram and iMessage today — Instagram and TikTok DMs are not
          connected. If that&apos;s where every enquiry starts for you, it will
          only pick things up once the conversation moves to email or a booked
          call, which is usually the point where money is discussed.
        </>
      )
    },
    ...homeCopy.faq.slice(2)
  ]
}
