/**
 * Which audience each URL speaks to.
 *
 * Deliberately strings only, with no JSX and no imports from the copy modules:
 * the route files are Server Components and import their metadata from here.
 * A `SiteCopy` object holds functions, so it can never cross the server/client
 * boundary — routes pass this id instead and the client provider looks the copy
 * up. See `copy-context.tsx`.
 */
export type VariantId =
  | "home"
  | "fractionalCmo"
  | "boutiqueAgency"
  | "influencerMarketing"

/** URL path for each variant, so links and analytics read from one place. */
export const VARIANT_PATHS: Record<VariantId, string> = {
  home: "/",
  fractionalCmo: "/fractional-cmo",
  boutiqueAgency: "/boutique-agency",
  influencerMarketing: "/influencer-marketing"
}
