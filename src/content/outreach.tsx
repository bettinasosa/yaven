import { homeCopy } from "./home"
import type { SiteCopy } from "./types"

/**
 * /outreach — Yaven sold as an outreach assistant rather than a second brain.
 *
 * The whole page hangs off ⌥D and ⌥A plus the lead finder and CRM, and the
 * positioning is the opposite of the category: nothing sends itself. Every
 * message is drafted in your voice for you to approve, which is what makes it
 * worth reading at the other end and what keeps the account yours.
 *
 * The competition automates connection requests from a headless browser holding
 * your session cookie, which is what gets people restricted. That distinction
 * carries the FAQ.
 */
export const outreachCopy: SiteCopy = {
  hero: {
    tagline: ["Supercharge", "your outreach."],
    sub: ({ apps }) => (
      <>
        Finds them, researches them, writes to them
        <br />
        in your words. You read it and you send it,
        <br />
        from wherever you already work: {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "An AI workforce for outreach that leaves the sending to you.",
    body: [
      ({ pill, u }) => (
        <>
          It finds people worth talking to, checks who you already know, and
          pulls what it needs from your {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} call notes and {pill("notion", 3)} docs, so
          every message {u("says something only you could have written")}.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft the message, the reply or the follow-up
          in your voice, in the tab you are already in. Use {keys("⌥", "A")} to
          ask what changed at their company, what they said last time, or
          whether you have a way in. Every draft {u("waits for you")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("No bot logs in as you")}. Nothing fires connection requests
          overnight and your session cookie never sits on somebody else&apos;s
          server, which is why this works inside LinkedIn at all. You do the
          reading and the sending. That is the part that keeps the account
          yours.
        </>
      )
    ],
    draft: {
      logo: "linkedin",
      senderName: "Lola H.",
      senderMeta: "cold · Head of Growth, Halcyon",
      inbound:
        "Posted: \"Third quarter running outbound. Reply rates down 40% and I genuinely think the tools are the problem.\"",
      youType: "agree with the diagnosis, don't pitch yet",
      drafted:
        "The 40% tracks what everyone is seeing, and I think you have the cause right. The tools got fast at sending, which is the part that stopped working. Curious whether yours fell evenly or only on the sequenced steps. Happy to compare notes either way."
    },
    ask: {
      logo: "linkedin",
      docName: "Lola H. · Head of Growth",
      clauses: [
        {
          num: "1",
          text: () => (
            <>Joined Halcyon four months ago, from a company half the size.</>
          )
        },
        {
          num: "2",
          text: ({ b }) => (
            <>Posts weekly about {b("outbound reply rates")} falling.</>
          )
        }
      ],
      question: "Have we spoken before, and what did they say?",
      answerLead: ({ pill }) => (
        <>Across your {pill("gmail")} and your CRM, </>
      ),
      answered:
        "you emailed them in March at their last company. They said the budget was not theirs to spend. It is now, and the objection was never the product."
    }
  },

  triage: {
    headline: "Yaven knows who replied…",
    body: [
      ({ u }) => (
        <>
          Replies in your inbox, leads in a spreadsheet, and the follow-up you
          meant to send living in neither. Yaven pulls all of it into a{" "}
          {u("single notification centre")} and tells you who is actually
          waiting on you.
        </>
      ),
      ({ u }) => (
        <>
          {u("Nobody warm goes cold")}. Yaven tracks who opened, who replied and
          who you chased twice, drafts the next message in your voice, and{" "}
          {u("preps you before every call")}{" "}
          that comes out of it.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Replies only you can answer. Yaven knows who is close.",
        items: [
          { text: "Lola: asked what they'd gain", tag: "Reply" },
          { text: "Warm intro offered by Asker", tag: "Referral" },
          { text: "Call booked, no notes yet", tag: "Today" }
        ]
      },
      {
        label: "Drafted, waiting on you",
        desc: "Written in your voice. Nothing sends until you approve it.",
        items: [
          { text: "Follow-up to Halcyon, day seven", tag: "Review" },
          { text: "Reply to a not-right-now", tag: "Review" },
          { text: "Intro request via mutual", tag: "Review" },
          { text: "Thanks-for-the-time note", tag: "Review" }
        ]
      },
      {
        label: "Can wait",
        desc: "Queued for when you have the headspace.",
        items: [
          { text: "New leads matching your ICP", tag: "This weekend" },
          { text: "Invite: founders dinner, Oct 12", tag: "Next month" }
        ]
      }
    ]
  },

  proposals: {
    headline: "…and who you already know.",
    slides: [
      {
        title: "Finds them, then keeps them",
        body: () => (
          <>
            Describe who you sell to and Yaven builds the list, then holds it in
            a CRM that remembers every touch: who replied, who went quiet, who
            you have chased twice and should leave alone.
          </>
        )
      },
      {
        title: "A template per kind of person",
        body: () => (
          <>
            The way you open with a founder is not the way you open with a head
            of procurement. Keep a template for each, and Yaven picks the right
            one and fills it with things that are true about them.
          </>
        )
      },
      {
        title: "The no that became a yes",
        body: () => (
          <>
            Someone said not right now in March and has just moved to a company
            with a budget. Yaven spots the change, reminds you what they
            actually objected to, and opens on that.
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
          You got in touch a while back. I&apos;ve moved since.
          <br />
          Is that {b("still something you do")}?
        </>
      ),
      reply: ({ b, link }) => (
        <>
          Ariel said {b("no budget")} in March, at a company half this size. They
          run growth at {b("Halcyon")} now. I drafted a reply that picks up
          where you left off, with your {link("calendar link")}.
        </>
      )
    },
    sourceCards: [
      {
        title: "Their last post",
        detail: "Reply rates down 40%, thinks the tools are the problem"
      },
      {
        title: "Your CRM",
        detail: "Emailed March, said the budget was not theirs"
      },
      {
        title: "What changed",
        detail: "New role since June, and now it is"
      }
    ],
    proposal: {
      label: "Drafted message",
      title: "Third and final follow-up",
      client: "Lola H."
    },
    conference: {
      name: "Ariel Thomas",
      company: "Halcyon Group",
      rows: [
        { label: "Last replied", value: "March, no budget" },
        { label: "Changed", value: "New role, runs growth" },
        { label: "Objected to", value: "Price, not the product" }
      ]
    }
  },

  faq: [
    {
      q: "So what actually is this?",
      a: (
        <>
          An outreach assistant that lives on your Mac. It finds people
          matching who you sell to, keeps them in a CRM, reads what they have
          been posting and what you last said to them, and drafts the first
          touch, the reply and the follow-up in your words.
          <br />
          <br />
          Nothing sends itself. Every draft waits for you to read it, which
          is why the messages don&apos;t read like everybody else&apos;s.
          Currently in beta.
        </>
      )
    },
    {
      q: "Will this get me restricted on LinkedIn?",
      a: (
        <>
          Not through us, because we never touch your account. The tools that
          get people restricted run a headless browser holding your session
          cookie and fire connection requests and messages on a timer. That is
          what platforms detect and act on.
          <br />
          <br />
          Yaven writes drafts on your machine. You send them yourself, as
          yourself, at human speed. Nothing of ours logs in as you, and your
          session never leaves your Mac.
        </>
      )
    },
    ...homeCopy.faq.slice(2)
  ]
}
