import { homeCopy } from "./home"
import type { SiteCopy } from "./types"

/**
 * /boutique-agency — for founders of small agencies, where every decision
 * still routes through one person and new business competes for attention with
 * whatever is shipping this week.
 *
 * The demos are the two jobs colliding: an inbound enquiry that needs
 * qualifying, and a signed contract nobody can remember the terms of.
 */
export const boutiqueAgencyCopy: SiteCopy = {
  hero: {
    tagline: ["Run the work.", "Win the next."],
    sub: ({ apps }) => (
      <>
        The AI workforce that lives in your menu bar,
        <br />
        so new business stops losing to whatever
        <br />
        shipped today across all your {apps()}.
      </>
    )
  },

  meetYaven: {
    headline: "Meet Yaven.",
    subhead: "A menu bar assistant for doing both jobs.",
    body: [
      ({ pill, u }) => (
        <>
          It connects to your {pill("gmail", -3)}
          {pill("telegram-icon", 3)}
          {pill("imessage", -3)}
          {pill("slack", 3)} inbound, {pill("gcal", 2)} calendar,{" "}
          {pill("granola", -2)} notes and {pill("notion", 3)} docs, and puts the
          enquiry, the contract and the overdue invoice{" "}
          {u("in front of you")} instead of three folders down.
        </>
      ),
      ({ keys, u }) => (
        <>
          Use {keys("⌥", "D")} to draft any reply in your voice, from any app.
          Use {keys("⌥", "A")} to answer anything on your screen. It learns what
          you want to see and what you&apos;d rather it{" "}
          {u("just handled")}.
        </>
      ),
      ({ u }) => (
        <>
          {u("Local-first")}. Client work, pitch decks and contracts stay on
          your machine. Nothing is uploaded to our servers or synced to a cloud.
        </>
      )
    ],
    draft: {
      logo: "gmail",
      senderName: "Dan R.",
      senderMeta: "Inbound · referred by Halcyon",
      inbound:
        "Hi, we're looking for an agency for a rebrand in Q3. Are you taking on new work?",
      youType: "keen, but qualify budget",
      drafted:
        "Thanks Dan, and thanks to whoever pointed you our way. We are taking on Q3 work. Before I put time in the diary, could you share the rough budget range? Saves us both a call if we're not in the same ballpark."
    },
    ask: {
      logo: "google",
      docName: "Halcyon_MSA_signed.pdf",
      clauses: [
        {
          num: "5.1",
          text: ({ b }) => (
            <>
              Either party may terminate this agreement on {b("sixty (60) days")}{" "}
              written notice.
            </>
          )
        },
        {
          num: "5.2",
          text: () => (
            <>Fees are fixed for the initial term and reviewed annually.</>
          )
        }
      ],
      question: "What notice do they have to give us?",
      answerLead: ({ pill }) => (
        <>Since your last {pill("granola")} call with Dan on May 2, </>
      ),
      answered:
        "notice went from thirty days to sixty at their request, in exchange for fixing fees for the first year. Nothing else moved from your v2 redline."
    }
  },

  triage: {
    headline: "Yaven knows what matters…",
    body: [
      ({ u }) => (
        <>
          Everything routes through you, so everything lands in your inbox.
          Yaven pulls it into a {u("single notification centre")} and separates
          the enquiry worth dropping everything for from the eleventh Slack
          thread about a font.
        </>
      ),
      ({ u }) => (
        <>
          {u("New business stops getting buried")} under delivery. Yaven tracks
          every conversation, drafts replies in your voice, and{" "}
          {u("preps you before every pitch")} with the context you need.
        </>
      )
    ],
    cards: [
      {
        label: "Needs you now",
        desc: "Things only you can handle. Yaven knows what is and isn't urgent.",
        items: [
          { text: "Inbound: rebrand, Q3 start", tag: "New business" },
          { text: "Can we move Thursday's call?", tag: "Client" },
          { text: "Redlines back from their legal", tag: "Deadline" }
        ]
      },
      {
        label: "Already handled",
        desc: "Drafted using your tone, context, and rules.",
        items: [
          { text: "Re: proposal timeline?", tag: "✓ replied" },
          { text: "Invoice #214 overdue", tag: "✓ nudged" },
          { text: "Studio availability question", tag: "✓ sent" },
          { text: "Receipt filed to expenses", tag: "✓ sorted" }
        ]
      },
      {
        label: "Can wait",
        desc: "Queued for when you have the headspace.",
        items: [
          { text: "Awards deadline, entries open", tag: "This weekend" },
          { text: "Invite: founders dinner, Oct 12", tag: "Next month" }
        ]
      }
    ]
  },

  proposals: {
    headline: "…and who matters.",
    slides: [
      {
        title: "Yaven knows who you know",
        body: () => (
          <>
            Every client, every pitch you lost, every supplier you liked. It
            spots the old client whose project is coming around again, the intro
            you said you&apos;d make, the prospect who went quiet in March, then
            drafts the message for you.
          </>
        )
      },
      {
        title: "Call ended, proposal ready",
        body: () => (
          <>
            Yaven pulls the notes, your past work and your rate card, and drafts
            a ready-to-send proposal before you close the call.
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
          Following up on our conversation at Design Expo &apos;26.
          <br />
          Do you have {b("availability this week")} for a call?
        </>
      ),
      reply: ({ b, link }) => (
        <>
          Tjalling met you at {b("Design Expo '26")}. He works with a mutual,{" "}
          {b("Oliver Normand")}. I drafted a reply with your {link("calendar link")}.
        </>
      )
    },
    sourceCards: [
      {
        title: "Call notes",
        detail: "Rebrand, six-week timeline, no in-house design"
      },
      {
        title: "Past project",
        detail: "Gigi's Art Gallery, brand + site, £22,000"
      },
      {
        title: "Your rate card",
        detail: "Brand projects start at £25,000"
      }
    ],
    proposal: {
      label: "Proposal",
      title: "Rebrand + website build",
      client: "Halcyon Group"
    },
    conference: {
      name: "Ariel Thomas",
      company: "The Design Co.",
      rows: [
        { label: "Spoke at", value: "Design Expo '26" },
        { label: "Mutual", value: "Asker K." },
        { label: "Talked about", value: "Brand optimisation" }
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
          and docs, learns how you work, and builds a picture of every client,
          pitch and promise so nothing falls through while you&apos;re heads
          down on delivery.
          <br />
          <br />
          Right now it prioritises your inbox so the enquiry worth answering
          sits above the noise, drafts replies in your voice from any app on
          your Mac, and preps you before every meeting. The more you use it, the
          more it handles on its own. Currently in beta.
        </>
      )
    },
    {
      q: "Can my team use it, or is this just for me?",
      a: (
        <>
          Right now it&apos;s built for one person, and that person is usually
          the founder, because that&apos;s where everything routes. Each
          install learns one individual&apos;s voice and context and keeps it on
          that machine. Team features are on the roadmap; if that&apos;s the
          thing you need, say so when you join and we&apos;ll tell you where it
          is.
        </>
      )
    },
    ...homeCopy.faq.slice(2)
  ]
}
