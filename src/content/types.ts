import type { ReactNode } from "react"

/**
 * The shape of every word on the marketing page.
 *
 * One page renders four ways — the home page plus three audience-specific
 * copies at /fractional-cmo and friends. Only the words change; the structure,
 * animation and layout are identical everywhere.
 *
 * Two rules keep that true, and both are load-bearing:
 *
 * 1. **Variants change strings, never structure.** The scroll-pinned sections
 *    are tuned to a fixed number of beats (three triage cards, three proposal
 *    slides), and the floating CTA finds its trigger points with
 *    `document.querySelector` on markers in the shell. Fixed-length tuples
 *    below are what stop a variant quietly changing either.
 *
 * 2. **Headline slots are plain strings, never rich copy.** `ScrollCutReveal`
 *    runs GSAP `SplitText` over its children and reverts it on cleanup, which
 *    rebuilds their DOM. Nested elements lose their handlers and the line masks
 *    mis-clip. If a headline needs emphasis, it needs a different reveal.
 *
 * Length matters too, because the layout was tuned to today's copy — fixed card
 * heights and pinned scroll distances. Keep variant copy within roughly 15% of
 * the home page's length for the same slot, and check the result on screen;
 * text that fits at 1440px wide can still overflow a pinned section at 1280.
 */

/**
 * Inline elements a section lends to its own rich copy.
 *
 * Rich copy can't just contain JSX: the components it would need (`IconPill`,
 * the underline span, the shortcut badge) are private to the section that
 * renders them, so a copy module importing them would form a cycle. Instead the
 * copy is a function, and the section passes in the pieces at render time.
 *
 * Each slot asks only for what it uses, via `Pick`, so it stays obvious from
 * the type which inline elements a given paragraph is allowed to reach for.
 */
export interface InlineKit {
  /** Draws an underline on as it scrolls into view. */
  u(children: ReactNode): ReactNode
  /** The hero's "apps" word, which bursts app icons out of itself on hover. */
  apps(): ReactNode
  /** An app logo inline in a sentence. `name` is a file in /public/logos. */
  pill(name: string, tilt?: number): ReactNode
  /** A keyboard shortcut, e.g. `keys("⌥", "D")`. */
  keys(...keys: string[]): ReactNode
  /** Bold, for the one phrase in a contract clause that matters. */
  b(children: ReactNode): ReactNode
  /** A link-coloured phrase inside a mock message. Not a real link. */
  link(children: ReactNode): ReactNode
}

/** A paragraph that needs inline elements. See {@link InlineKit}. */
export type Rich<K = InlineKit> = (kit: K) => ReactNode

export interface DraftDemo {
  /**
   * Which app this arrived in — a file in /public/logos, shown beside "Draft".
   * Part of the scenario, not decoration: a message that would realistically
   * reach this audience over email should not be badged LinkedIn.
   */
  logo: string
  senderName: string
  senderMeta: string
  /** The message that came in. */
  inbound: string
  /** The shorthand the user types to steer the reply. */
  youType: string
  /**
   * What Yaven writes back. Plain string — it is typed out character by
   * character inside a scroll window, so a much longer one finishes after the
   * reader has already scrolled past.
   */
  drafted: string
}

export interface AskDemo {
  /** Which app the document is open in — a file in /public/logos. */
  logo: string
  /** Filename on the chip above the document. */
  docName: string
  /** Two numbered clauses. The question below should be about the second. */
  clauses: readonly [
    { num: string; text: Rich<Pick<InlineKit, "b">> },
    { num: string; text: Rich<Pick<InlineKit, "b">> }
  ]
  /** What the user asks about the document. */
  question: string
  /** The start of the answer, before the typing begins. */
  answerLead: Rich<Pick<InlineKit, "pill">>
  /** The rest of the answer, typed out. Plain string, same reason as `drafted`. */
  answered: string
}

export interface Slide {
  title: string
  body: Rich<Record<string, never>>
}

export interface NetworkDemo {
  senderName: string
  /** Two letters for the avatar circle. */
  senderInitials: string
  /** Which app it arrived in — a file in /public/logos. */
  senderLogo: string
  inbound: Rich<Pick<InlineKit, "b">>
  reply: Rich<Pick<InlineKit, "b" | "link">>
}

export interface SourceCard {
  title: string
  detail: string
}

export interface ConferenceDemo {
  name: string
  company: string
  /** Exactly three facts — the card's height is built for three rows. */
  rows: readonly [
    { label: string; value: string },
    { label: string; value: string },
    { label: string; value: string }
  ]
}

export interface TriageItem {
  /** The message line. */
  text: string
  /** The little chip on the right — "Client", "✓ replied", "Next month". */
  tag: string
}

export interface TriageCard {
  label: string
  desc: string
  /** Length is free — the cards already carry 3, 4 and 2 respectively. */
  items: readonly TriageItem[]
}

export interface SiteCopy {
  hero: {
    /**
     * The big two-line headline, rendered one line per entry.
     *
     * Line breaks are the copy's business, not the layout's: the break sits
     * where it does because of how long these particular words are at this
     * font size. Different words want a different break.
     */
    tagline: readonly [string, string]
    /** The paragraph under it. Writes its own line breaks, for the same reason. */
    sub: Rich<Pick<InlineKit, "apps">>
  }

  meetYaven: {
    headline: string
    subhead: string
    /** Exactly three — the stack between them is a fixed gap. */
    body: readonly [
      Rich<Pick<InlineKit, "pill" | "keys" | "u">>,
      Rich<Pick<InlineKit, "pill" | "keys" | "u">>,
      Rich<Pick<InlineKit, "pill" | "keys" | "u">>
    ]
    /** The ⌥D demo: an inbound message, and the reply Yaven writes back. */
    draft: DraftDemo
    /** The ⌥A demo: a document on screen, and a question answered from it. */
    ask: AskDemo
  }

  triage: {
    headline: string
    body: readonly [Rich<Pick<InlineKit, "u">>, Rich<Pick<InlineKit, "u">>]
    /**
     * Exactly three. Card colours, rotation and stack offsets are keyed by
     * index in the component, and the pinned scroll distance is tuned to three
     * cards arriving.
     */
    cards: readonly [TriageCard, TriageCard, TriageCard]
  }

  proposals: {
    headline: string
    /**
     * Exactly three, and rendered from here by BOTH the mobile and desktop
     * layouts. They used to be written out twice, which is how the two drifted
     * apart; one source is what stops that happening again.
     */
    slides: readonly [Slide, Slide, Slide]
    /** The mock message thread — an inbound note and Yaven's reply. */
    network: NetworkDemo
    /** The three scraps that collapse into a finished proposal. Exactly three. */
    sourceCards: readonly [SourceCard, SourceCard, SourceCard]
    /** The proposal they collapse into. */
    proposal: { label: string; title: string; client: string }
    /** The person you met at a conference, and what Yaven knows about them. */
    conference: ConferenceDemo
  }

  /**
   * The one list whose length may vary between audiences — the FAQ sits in
   * normal flow and its pin is defined relative to its own height, so adding or
   * dropping a question doesn't desync anything.
   *
   * Answers are plain nodes rather than {@link Rich} because they only ever use
   * ordinary markup, so there's no section-private component to pass in.
   */
  faq: readonly { q: string; a: ReactNode }[]
}
