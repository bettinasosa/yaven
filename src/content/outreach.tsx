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
    tagline: ["Outreach.", "Not slop."],
    sub: ({ apps }) => (
      <>
        Finds the leads, drafts every message in your voice,
        <br />
        and sends nothing until you say so —
        <br />
        from your menu bar, across your {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "An outreach assistant that never sends on its own.",
    body: [
      ({ pill, u }) => (
        <>
          It finds people worth talking to, checks who you already know, and
          pulls what it needs from your {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} call notes and {pill("notion", 3)} docs — so
          every message {u("says something only you could have written")}.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft the message, the reply or the follow-up
          in your voice, from any app. Use {keys("⌥", "A")} to ask who someone
          is and how you know them before you write. Every draft{" "}
          {u("waits for you")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("No bot logs in as you")}. Nothing fires connection requests
          overnight, and your session cookie never sits on somebody else&apos;s
          server. You press send, which is the part that keeps the account
          yours.
        </>
      )
    ],
    draft: {
      logo: "gmail",
      senderName: "Lola H.",
      senderMeta: "reply · cold outreach, day four",
      inbound:
        "Interesting, though we already use something similar. What would we actually gain by switching?",
      youType: "honest, don't oversell, ask about their setup",
      drafted:
        "Fair question, and if it's working I wouldn't switch either. The difference is usually that ours drafts rather than sends, so nothing goes out sounding like a template. Worth fifteen minutes only if the current one is costing you edits — what are you running?"
    },
    ask: {
      logo: "notion",
      docName: "Outreach_playbook.pdf",
      clauses: [
        {
          num: "1.2",
          text: () => (
            <>
              First touch references something specific and asks nothing.
            </>
          )
        },
        {
          num: "1.4",
          text: ({ b }) => (
            <>Never more than {b("three follow-ups")} without a reply.</>
          )
        }
      ],
      question: "Have I already chased this one twice?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("gmail")} thread with Lola on May 2, </>
      ),
      answered:
        "you've followed up twice with no reply. Your own rule allows one more, so this is the last one before it goes back to the list."
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
          {u("preps you before every call")} that comes out of it.
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
        title: "Yaven finds the leads",
        body: () => (
          <>
            Tell it who you sell to and it builds the list, keeps it in a CRM
            you actually own, and flags the ones where you have a mutual worth
            asking. No scraping your connections, no bot logging in as you.
          </>
        )
      },
      {
        title: "Every message, drafted not sent",
        body: () => (
          <>
            Yaven pulls what it knows about them, what you last said, and your
            own rules, then writes the message and waits. You edit or you send.
          </>
        )
      },
      {
        title: "The no that became a yes",
        body: () => (
          <>
            Someone said not right now in March and has just moved to a company
            with a budget. Yaven spots the change, reminds you what they
            actually objected to, and opens on that rather than on hello again.
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
          You got in touch a while back — I&apos;ve moved since.
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
        detail: "Hiring two SDRs, says outbound reply rates have halved"
      },
      {
        title: "Your history",
        detail: "Two follow-ups, no reply, last touched May 2"
      },
      {
        title: "Who you both know",
        detail: "Asker K., worked with them at Halcyon"
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
          An outreach assistant that lives in your Mac&apos;s menu bar. It finds
          people matching who you sell to, keeps them in a CRM, checks who you
          already know, and drafts every message in your voice — the first
          touch, the reply, the follow-up.
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
          cookie and fire connection requests and messages on a timer — that is
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
