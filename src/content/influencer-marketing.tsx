import { homeCopy } from "./home"
import type { SiteCopy } from "./types"

/**
 * /influencer-marketing — for agencies with creators on one side and brand
 * clients on the other, where the job is mostly chasing: deliverables, edits,
 * usage rights, and where the March campaign has got to.
 *
 * The demos are the two directions that chasing runs in: a brand asking for a
 * status you don't have to hand, and a brief whose revision terms everyone
 * remembers differently.
 */
export const influencerMarketingCopy: SiteCopy = {
  hero: {
    tagline: ["Forty creators.", "One deadline."],
    sub: ({ apps }) => (
      <>
        The AI workforce that lives in your menu bar,
        <br />
        tracking who owes what to whom
        <br />
        across all your {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "A menu bar assistant for campaign chasing.",
    body: [
      ({ pill, u }) => (
        <>
          It connects to creator and client {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("imessage", -3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} notes and {pill("notion", 3)} briefs, and keeps{" "}
          {u("one live picture")} of every campaign. Who has filmed, who has
          been paid, who has gone quiet.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft the chase in your voice without opening
          the thread. Use {keys("⌥", "A")} to answer anything on your screen,
          including the brief. It learns which messages you want to read and
          which you&apos;d rather it {u("just sent")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("Local-first")}. Rates, contracts and creator conversations stay
          on your machine. Nothing is uploaded to our servers or synced to a
          cloud.
        </>
      )
    ],
    draft: {
      logo: "slack",
      senderName: "Nadia K.",
      senderMeta: "Lumen Skincare · brand client",
      inbound:
        "Where are we on the March creators? Client review is Thursday and I have nothing to show them.",
      youType: "reassure, be specific",
      drafted:
        "Six of the eight are filmed and in edit, back with us Wednesday. The other two shoot tomorrow. You'll have a full cut Thursday morning, and I'll send rough links tonight so you're not sitting there empty-handed."
    },
    ask: {
      logo: "google",
      docName: "Lumen_Q1_brief_v3.pdf",
      clauses: [
        {
          num: "2.1",
          text: () => (
            <>
              Each creator delivers one in-feed video and three stories, filmed
              vertically.
            </>
          )
        },
        {
          num: "2.2",
          text: ({ b }) => (
            <>Revisions are limited to {b("two (2) rounds")} per creator.</>
          )
        }
      ],
      question: "They're asking for a third round. Do we owe them that?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("granola")} call with Nadia on Feb 9, </>
      ),
      answered:
        "revisions were capped at two rounds per creator, and anything beyond that was agreed as billable. Usage rights were extended to six months in the same call."
    }
  },

  triage: {
    headline: "Yaven knows who's waiting…",
    body: [
      ({ u }) => (
        <>
          Creators in one inbox, brands in another, and the campaign living in
          neither. Yaven pulls all of it into a{" "}
          {u("single notification centre")} so the creator who has been waiting
          four days stops being invisible.
        </>
      ),
      ({ u }) => (
        <>
          {u("Nobody goes quiet unnoticed")}. Yaven tracks every deliverable
          and every promise, drafts the chase in your voice, and{" "}
          {u("preps you before every client call")} with the actual status.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Things only you can handle. Yaven knows what is and isn't urgent.",
        items: [
          { text: "Lumen: where are the March cuts?", tag: "Client" },
          { text: "Creator asking to renegotiate", tag: "Rate" },
          { text: "Usage rights expire Friday", tag: "Deadline" }
        ]
      },
      {
        label: "Already handled",
        desc: "Drafted using your tone, context, and rules.",
        items: [
          { text: "Re: when do I get paid?", tag: "✓ replied" },
          { text: "Invoice #214 overdue", tag: "✓ nudged" },
          { text: "Shoot date confirmations", tag: "✓ sent" },
          { text: "Receipt filed to expenses", tag: "✓ sorted" }
        ]
      },
      {
        label: "Can wait",
        desc: "Queued for when you have the headspace.",
        items: [
          { text: "New creator inbound, 40k", tag: "This weekend" },
          { text: "Invite: creator economy dinner", tag: "Next month" }
        ]
      }
    ]
  },

  proposals: {
    headline: "…and who delivers.",
    slides: [
      {
        title: "Yaven remembers every creator",
        body: () => (
          <>
            What they charge, what they delivered last time, whether they filed
            on time. It spots the creator who fits the brief you just got, the
            one whose rate you already negotiated, the one you promised the next
            campaign to, then drafts the outreach.
          </>
        )
      },
      {
        title: "Brief in, roster out",
        body: () => (
          <>
            Yaven pulls the brief, your past campaigns and your rate history,
            and drafts the creator list with costings before you reply.
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
      senderName: "Tjalling",
      senderInitials: "TJ",
      senderLogo: "gmail",
      inbound: ({ b }) => (
        <>
          Following up on our conversation at Creator Summit &apos;26.
          <br />
          Do you have {b("availability this week")} for a call?
        </>
      ),
      reply: ({ b, link }) => (
        <>
          Tjalling met you at {b("Creator Summit '26")}. He works with a mutual,{" "}
          {b("Oliver Normand")}. I drafted a reply with your {link("calendar link")}.
        </>
      )
    },
    sourceCards: [
      {
        title: "The brief",
        detail: "Skincare launch, eight creators, March"
      },
      {
        title: "Past campaign",
        detail: "Lumen Q4, six creators, £18,000"
      },
      {
        title: "Your rates",
        detail: "Mid-tier creators, £900 to £1,400 a post"
      }
    ],
    proposal: {
      label: "Campaign plan",
      title: "Skincare launch, eight creators",
      client: "Lumen Skincare"
    },
    conference: {
      name: "Ariel Thomas",
      company: "Halo Talent",
      rows: [
        { label: "Spoke at", value: "Creator Summit '26" },
        { label: "Mutual", value: "Asker K." },
        { label: "Talked about", value: "Rate cards after TikTok" }
      ]
    }
  },

  faq: [
    {
      q: "So what actually is this?",
      a: (
        <>
          A second brain that lives in your Mac&apos;s menu bar. It connects to
          all of your inbound (slack, mail, telegram, imessage), calendar, notes
          and briefs, learns how you work, and keeps track of every creator,
          every deliverable and every promise across every live campaign.
          <br />
          <br />
          Right now it prioritises your inbox so the client chasing a deadline
          sits above the noise, drafts replies in your voice from any app on
          your Mac, and preps you before every call. The more you use it, the
          more it handles on its own. Currently in beta.
        </>
      )
    },
    {
      q: "Does it connect to Instagram or TikTok DMs?",
      a: (
        <>
          Not yet, and we&apos;d rather say so than let you find out after
          installing. Yaven reads email, Slack, Telegram and iMessage, which is
          where the brand side of your work lives. If your creator
          conversations happen entirely in Instagram DMs, it will only cover
          half your day right now. Both are on the roadmap.
        </>
      )
    },
    ...homeCopy.faq.slice(2)
  ]
}
