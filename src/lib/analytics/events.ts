/**
 * Every analytics event the marketing site sends, in one place.
 *
 * Read this file instead of grepping components. If you add an event, add it
 * here first — `track()` only accepts names from this map.
 *
 * Naming: every event is prefixed `web_`. The PostHog project (465520) is
 * shared with the macOS app, and the app's consumers filter by explicit event
 * name, so the prefix is what keeps the two products readable side by side.
 *
 * One collision to know about: the macOS app already sends `web_search_triggered`
 * (its in-app web search). It is NOT a website event. Never build a tile with a
 * "starts with web_" filter — always list event names explicitly.
 *
 * Privacy rule, enforced by `beforeSend` in ./posthog.ts: no email, no name, no
 * referral code ever leaves as a property. Referral presence is a boolean, and
 * `/w/<code>` URLs are rewritten to `/w/[code]` before they are sent.
 */

/**
 * A signup surface. Matches the `signup_source` column in Supabase, with one
 * deliberate exception: the panel is always `waitlist_panel` here, even when the
 * row lands in Supabase as `beta_panel`. The panel is one form the user can
 * switch into beta mode partway through, so holding `surface` constant is what
 * lets seen → started → submitted → succeeded join up as a funnel. Read
 * `beta_application: true` to identify the rows Supabase calls `beta_panel`.
 */
export type Surface = "hero" | "footer" | "blueprint" | "waitlist_panel"

/** Where a `waitlist_panel` was mounted. The panel renders twice on the home page. */
export type Placement = "hero_cta" | "sticky_cta"

/** Why a signup attempt did not succeed. */
export type FailureReason =
  | "invalid_email" // client-side check rejected the address
  | "incomplete_beta_fields" // beta mode, role or the Mac question unanswered
  | "rejected" // API answered 4xx — bad payload, failed validation
  | "server" // API answered 5xx
  | "network" // request never completed

export const EVENTS = {
  /**
   * A page was viewed, carrying first-touch attribution. Fires on first load and
   * on every client-side route change.
   * Props: path, landing_page, utm_*, referrer_domain, is_referral_landing, has_referral
   */
  PAGE_VIEWED: "web_page_viewed",

  /**
   * The email field of a signup form became visible to the user — scrolled into
   * view for inline forms, or the modal opening for the panel. This is the event
   * that separates "nobody saw it" from "saw it and ignored it". Once per mount.
   * Props: surface, placement?
   */
  SIGNUP_FORM_SEEN: "web_signup_form_seen",

  /** First focus of the email field. Once per mount. Props: surface, placement? */
  SIGNUP_STARTED: "web_signup_started",

  /**
   * Client-side validation passed and the request to /api/waitlist went out.
   * Props: surface, placement?, beta_application, has_referral
   */
  SIGNUP_SUBMITTED: "web_signup_submitted",

  /**
   * The waitlist accepted the signup. `already_registered` distinguishes a new
   * row from a repeat of an address already on the list.
   * Props: surface, placement?, already_registered, beta_application, has_referral, role?, has_mac?
   */
  SIGNUP_SUCCEEDED: "web_signup_succeeded",

  /** A signup attempt did not land. Props: surface, placement?, reason, beta_application */
  SIGNUP_FAILED: "web_signup_failed",

  /** The user chose "become a beta tester" inside the panel. Props: surface, placement? */
  BETA_OPTIN_STARTED: "web_beta_optin_started",

  /**
   * The user answered the "do you have a Mac?" question. Fires on the answer,
   * not on submit, so the Mac-eligible share is measurable even for people who
   * abandon afterwards. Props: has_mac, placement?
   */
  BETA_MAC_ANSWERED: "web_beta_mac_answered",

  /** A beta application was accepted. Props: role, has_mac, placement? */
  BETA_OPTIN_COMPLETED: "web_beta_optin_completed",

  /**
   * Someone landed on /w/[code]. Fires before the redirect to /, which is what
   * made referral traffic invisible until now. Never carries the code itself.
   * Props: has_code
   */
  REFERRAL_LANDING: "web_referral_landing",

  /** The user copied their own referral link from the success state. Props: surface, placement? */
  REFERRAL_LINK_COPIED: "web_referral_link_copied"
} as const

export type EventName = (typeof EVENTS)[keyof typeof EVENTS]
