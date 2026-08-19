# Website analytics

The marketing site sends events to PostHog project **465520** — the same project
as the macOS app. Every website event is prefixed `web_`.

- **Event definitions:** `src/lib/analytics/events.ts` — the single source of
  truth. `track()` only accepts names from that map, so a typo is a type error.
- **Dashboard:** [Yaven Website](https://us.posthog.com/project/465520/dashboard/2011378)
  (separate from "Yaven Product", which answers whether users stick).
- **Rebuild the dashboard:** `POSTHOG_API_KEY=phx_… python3 scripts/yaven_website_dashboard.py`

## Setup

Two environment variables, both needed in Vercel for production:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_…          # publishable browser key, ships in the bundle by design
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Without `NEXT_PUBLIC_POSTHOG_KEY` the whole layer no-ops silently, so the site
still builds and runs with no analytics configured.

## Where it hooks in

| File | Role |
| --- | --- |
| `src/instrumentation-client.ts` | Starts PostHog before React hydrates |
| `src/lib/analytics/posthog.ts` | Init config, `track()`, `register()`, URL scrubbing |
| `src/lib/analytics/events.ts` | Event names and property shapes |
| `src/lib/analytics/context.ts` | First-touch attribution, referral presence |
| `src/lib/analytics/use-form-seen.ts` | Fires `web_signup_form_seen` on scroll-into-view |
| `src/components/web-analytics.tsx` | `web_page_viewed` on load and route change |

## The events

| Event | Fires when | Key properties |
| --- | --- | --- |
| `web_page_viewed` | First load and every route change | `path`, `is_referral_landing`, `has_referral` |
| `web_signup_form_seen` | Email field becomes visible — scrolled into view, or the panel modal opening | `surface`, `placement` |
| `web_signup_started` | First focus of the email field | `surface`, `placement` |
| `web_signup_submitted` | Client validation passed, request sent | `surface`, `placement`, `beta_application`, `has_referral` |
| `web_signup_succeeded` | Waitlist accepted it | `+ already_registered`, `role`, `has_mac` |
| `web_signup_failed` | Attempt did not land | `+ reason` |
| `web_beta_optin_started` | "become a beta tester" clicked | `surface`, `placement` |
| `web_beta_mac_answered` | The Mac question answered — on the answer, not on submit | `has_mac`, `placement` |
| `web_beta_optin_completed` | Beta application accepted | `role`, `has_mac`, `placement` |
| `web_referral_landing` | `/w/[code]` opened, before the redirect | `has_code` |
| `web_referral_link_copied` | Own referral link copied from the success state | `surface`, `placement` |

Every event also carries first-touch `utm_*`, `landing_page` and
`referrer_domain` as super properties, so a signup reports the campaign that
brought the visitor in rather than whatever the URL said at the moment they
converted.

### Surfaces

`surface` is one of `hero`, `footer`, `blueprint`, `waitlist_panel`, matching the
`signup_source` column in Supabase — with one deliberate exception. The panel is
always `waitlist_panel` here, even when Supabase records the row as `beta_panel`,
because it is one form the user can switch into beta mode partway through and the
funnel only joins up if the surface stays constant. **Supabase `beta_panel` ==
`surface: waitlist_panel` and `beta_application: true`.**

`placement` (`hero_cta` / `sticky_cta`) exists because `BlueprintPanel` renders
twice on the home page and both write the same `signup_source`. It is the only
way to tell the two buttons apart.

Two of the four surfaces are currently unreachable: `WaitlistInline` is only
mounted in the footer (never with `variant="hero"`), and `WaitlistForm` — the
`blueprint` surface — is not mounted anywhere. Both are instrumented and ready,
but they will report zero until something renders them.

## Privacy

`src/app/privacy/page.tsx` describes this setup and must be updated alongside it.
As configured:

- No cookies. A single random device id in `localStorage`, nothing else.
- `person_profiles: 'identified_only'`, and we never call `identify()` — every
  visitor stays anonymous.
- Autocapture, session recording, heatmaps, dead clicks and surveys all off.
- `respect_dnt: true` — Do Not Track and Global Privacy Control stop collection.
- Email, name and referral codes are never sent. `before_send` in
  `posthog.ts` rewrites `/w/<code>` to `/w/[code]` in every URL property (PostHog
  captures `$current_url` by itself) and drops any property that looks like an
  email address.

**Open question for a human:** under a strict PECR reading, storing an analytics
identifier on a UK/EU visitor's device wants consent, which would mean a cookie
banner. The current setup is the cookieless, no-advertising, DNT-respecting
posture that most sites take without one. `posthog-js` supports
`cookieless_mode: 'on_reject'` if a banner is added later.

## Gotchas

- **`web_search_triggered` is not a website event.** It is the macOS app's in-app
  web search. Never build a tile that matches on the `web_` prefix — always list
  event names explicitly, which the dashboard script does.
- **Dev and preview traffic is not excluded by default.** Visits from
  `localhost`, `127.0.0.1` and `*.vercel.app` are tagged with the
  `$internal_or_test_user` person property; the reliable event-level filter is
  `$host = www.yaven.ai`. The dashboard ships unfiltered so it shows data from
  day one — add that filter once real traffic arrives.
- **PostHog draws funnel charts blank inside a dashboard tile** in the current
  build. They render correctly when you click the tile title. The headline
  drop-off is therefore also served as a HogQL table, which always renders.
