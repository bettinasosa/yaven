#!/usr/bin/env python3
"""
Creates the "Yaven Website" dashboard in PostHog — where waitlist signups come
from, and where people fall out on the way.

Separate from "Yaven Product" on purpose: that one answers "do users stick?",
this one answers "does the site convert, and who is it converting?". They share
project 465520 with the macOS app, so every tile names its events explicitly and
never matches on the `web_` prefix — the app already owns `web_search_triggered`,
which is its in-app web search and nothing to do with this site.

The event taxonomy these tiles read is defined in src/lib/analytics/events.ts.
Change it there first.

Usage:
    POSTHOG_API_KEY=phx_xxx python3 scripts/yaven_website_dashboard.py [PROJECT_ID]

    # Add tiles to an existing dashboard instead of creating another one:
    DASHBOARD_ID=123456 POSTHOG_API_KEY=phx_xxx python3 scripts/yaven_website_dashboard.py

The personal API key needs dashboard:write and insight:write. Keys are read from
the environment and never stored in this repo.

Note on filtering: tiles are deliberately unfiltered by host, so they show data
from day one. Once real traffic arrives, add a dashboard filter of
`$host = www.yaven.ai` to drop localhost and Vercel preview noise. Visits from
those hosts are also tagged with the `$internal_or_test_user` person property.
"""

import os
import sys
import requests

HOST = "https://us.posthog.com"
PROJECT = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("POSTHOG_PROJECT_ID", "465520")

KEY = os.environ.get("POSTHOG_API_KEY")
if not KEY:
    sys.exit("Set POSTHOG_API_KEY (a personal API key with dashboard:write + insight:write).")

HEADERS = {"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}

# Kept in sync with src/lib/analytics/events.ts.
SEEN = "web_signup_form_seen"
STARTED = "web_signup_started"
SUBMITTED = "web_signup_submitted"
SUCCEEDED = "web_signup_succeeded"
FAILED = "web_signup_failed"
VIEWED = "web_page_viewed"


# ── query builders (PostHog `query` format) ──────────────────────────────────
def event(name, math=None, props=None):
    node = {"kind": "EventsNode", "event": name, "name": name}
    if math:
        node["math"] = math
    if props:
        node["properties"] = props
    return node


def viz(source):
    return {"kind": "InsightVizNode", "source": source}


def sql(query):
    return {"kind": "DataVisualizationNode", "source": {"kind": "HogQLQuery", "query": query}}


def trends(series, days=30, interval="day", breakdown_prop=None, display=None):
    source = {
        "kind": "TrendsQuery",
        "series": series,
        "interval": interval,
        "dateRange": {"date_from": f"-{days}d"},
    }
    if breakdown_prop:
        source["breakdownFilter"] = {"breakdown": breakdown_prop, "breakdown_type": "event"}
    if display:
        source["trendsFilter"] = {"display": display}
    return viz(source)


def funnel(events, days=30):
    return viz({
        "kind": "FunnelsQuery",
        "series": [event(e) for e in events],
        "dateRange": {"date_from": f"-{days}d"},
    })


# ── PostHog resources ────────────────────────────────────────────────────────
def get_or_create_dashboard(name):
    existing = os.environ.get("DASHBOARD_ID")
    if existing:
        print(f"Reusing dashboard id {existing}")
        return existing
    r = requests.post(f"{HOST}/api/projects/{PROJECT}/dashboards/", headers=HEADERS, json={
        "name": name,
        "description": (
            "Where waitlist signups come from and where people drop off. Events are "
            "defined in src/lib/analytics/events.ts in the Website repo. Add a "
            "$host = www.yaven.ai filter to exclude localhost and preview traffic."
        ),
    })
    if not r.ok:
        sys.exit(f"Dashboard create failed ({r.status_code}): {r.text[:400]}")
    did = r.json()["id"]
    print(f"Created dashboard '{name}' (id {did})")
    return did


def set_layout(dash_id):
    """Lay the tiles out two-up, tallest first.

    Without an explicit layout PostHog auto-sizes, and a funnel chart in an
    auto-sized tile renders blank — it needs more height than a table does.
    Tiles are laid out in creation order reversed, which is reading order.
    """
    r = requests.get(f"{HOST}/api/projects/{PROJECT}/dashboards/{dash_id}/", headers=HEADERS)
    if not r.ok:
        print(f"  ! could not read tiles for layout ({r.status_code})")
        return
    tiles = sorted(r.json().get("tiles", []), key=lambda t: -t["id"])
    payload = []
    for i, tile in enumerate(tiles):
        col, row = i % 2, i // 2
        payload.append({"id": tile["id"], "layouts": {
            "sm": {"i": str(tile["id"]), "x": col * 6, "y": row * 6, "w": 6, "h": 6},
            "xs": {"i": str(tile["id"]), "x": 0, "y": i * 5, "w": 1, "h": 5},
        }})
    patch = requests.patch(f"{HOST}/api/projects/{PROJECT}/dashboards/{dash_id}/",
                           headers=HEADERS, json={"tiles": payload})
    print(f"  layout: {'ok' if patch.ok else f'FAILED {patch.status_code}: {patch.text[:200]}'}")


def insight(dash_id, name, query, description=None):
    body = {"name": name, "query": query, "dashboards": [int(dash_id)]}
    if description:
        body["description"] = description
    r = requests.post(f"{HOST}/api/projects/{PROJECT}/insights/", headers=HEADERS, json=body)
    print(f"  + {name}: {'ok' if r.ok else f'FAILED {r.status_code}: {r.text[:250]}'}")
    return r.json().get("id") if r.ok else None


# ── HogQL ────────────────────────────────────────────────────────────────────
def funnel_by(dimension, label, days=30):
    """Seen → started → submitted → succeeded, split by a property. A breakdown
    bar chart sorts by value and so reads out of funnel order — hence a table."""
    return f"""
select
  coalesce(nullif(toString(properties.{dimension}), ''), '(none)') as {label},
  countIf(event = '{SEEN}')      as seen,
  countIf(event = '{STARTED}')   as started,
  countIf(event = '{SUBMITTED}') as submitted,
  countIf(event = '{SUCCEEDED}') as signups,
  round(100.0 * countIf(event = '{SUCCEEDED}')
        / nullif(countIf(event = '{SEEN}'), 0), 1) as seen_to_signup_pct
from events
where timestamp > now() - interval {days} day
  and event in ('{SEEN}', '{STARTED}', '{SUBMITTED}', '{SUCCEEDED}')
group by {label}
order by signups desc, seen desc
"""


def conversion_by(dimension, label, days=90):
    """Visitors → signups by acquisition source. People, not events: one visitor
    who reloads five times is one visitor."""
    return f"""
select
  coalesce(nullif(toString(properties.{dimension}), ''), '(none)') as {label},
  count(distinct if(event = '{VIEWED}', person_id, null))    as visitors,
  count(distinct if(event = '{SUCCEEDED}', person_id, null)) as signups,
  round(100.0 * count(distinct if(event = '{SUCCEEDED}', person_id, null))
        / nullif(count(distinct if(event = '{VIEWED}', person_id, null)), 0), 1) as conversion_pct
from events
where timestamp > now() - interval {days} day
  and event in ('{VIEWED}', '{SUCCEEDED}')
group by {label}
order by visitors desc
"""


# PostHog's funnel visualisation renders blank inside a dashboard tile (it is
# fine on its own insight page), so the headline drop-off is also served as a
# table, which always renders. Steps are strictly sequential in the UI — you
# cannot submit a form you never saw — so counting people per step gives the
# same answer as an ordered funnel.
FUNNEL_STEPS_SQL = f"""
with c as (
  select
    count(distinct if(event = '{VIEWED}', person_id, null))    as s1,
    count(distinct if(event = '{SEEN}', person_id, null))      as s2,
    count(distinct if(event = '{STARTED}', person_id, null))   as s3,
    count(distinct if(event = '{SUBMITTED}', person_id, null)) as s4,
    count(distinct if(event = '{SUCCEEDED}', person_id, null)) as s5
  from events
  where timestamp > now() - interval 30 day
    and event in ('{VIEWED}', '{SEEN}', '{STARTED}', '{SUBMITTED}', '{SUCCEEDED}')
)
select step, people, kept_from_previous_pct, lost_here from (
  select 1 as ord, '1 - viewed a page' as step, s1 as people,
         null as kept_from_previous_pct, null as lost_here from c
  union all
  select 2, '2 - saw a signup form', s2, round(100.0 * s2 / nullif(s1, 0), 1), s1 - s2 from c
  union all
  select 3, '3 - started typing', s3, round(100.0 * s3 / nullif(s2, 0), 1), s2 - s3 from c
  union all
  select 4, '4 - submitted', s4, round(100.0 * s4 / nullif(s3, 0), 1), s3 - s4 from c
  union all
  select 5, '5 - joined the waitlist', s5, round(100.0 * s5 / nullif(s4, 0), 1), s4 - s5 from c
) order by ord
"""

SEEN_NOT_STARTED_SQL = f"""
select
  coalesce(nullif(toString(properties.surface), ''), '(none)') as surface,
  countIf(event = '{SEEN}')    as saw_the_form,
  countIf(event = '{STARTED}') as typed_something,
  countIf(event = '{SEEN}') - countIf(event = '{STARTED}') as looked_and_left,
  round(100.0 * (countIf(event = '{SEEN}') - countIf(event = '{STARTED}'))
        / nullif(countIf(event = '{SEEN}'), 0), 1) as looked_and_left_pct
from events
where timestamp > now() - interval 30 day and event in ('{SEEN}', '{STARTED}')
group by surface
order by saw_the_form desc
"""

MAC_SHARE_SQL = """
select
  countIf(properties.has_mac = true)  as has_a_mac,
  countIf(properties.has_mac = false) as no_mac,
  round(100.0 * countIf(properties.has_mac = true) / nullif(count(), 0), 1) as mac_eligible_pct
from events
where timestamp > now() - interval 90 day and event = 'web_beta_mac_answered'
"""

# Answered on the question, not on submit — most people who say "no" never submit,
# so counting only submissions would flatter the Mac-eligible share.
MAC_BY_SOURCE_SQL = """
select
  coalesce(nullif(toString(properties.utm_source), ''), '(none)') as utm_source,
  countIf(properties.has_mac = true)  as has_a_mac,
  countIf(properties.has_mac = false) as no_mac,
  round(100.0 * countIf(properties.has_mac = true) / nullif(count(), 0), 1) as mac_eligible_pct
from events
where timestamp > now() - interval 90 day and event = 'web_beta_mac_answered'
group by utm_source
order by has_a_mac + no_mac desc
"""

REFERRAL_SQL = f"""
select
  count(distinct if(event = 'web_referral_landing', person_id, null)) as referral_landings,
  count(distinct if(event = '{SUCCEEDED}' and properties.has_referral = true, person_id, null)) as signups_from_referral,
  count(distinct if(event = 'web_referral_link_copied', person_id, null)) as links_copied
from events
where timestamp > now() - interval 90 day
  and event in ('web_referral_landing', '{SUCCEEDED}', 'web_referral_link_copied')
"""


def main():
    did = get_or_create_dashboard("Yaven Website")

    # Reading order, most important first.
    tiles = [
        # ── The funnel ───────────────────────────────────────────────────────
        ("★ Signup funnel — drop-off at each step (30d)", sql(FUNNEL_STEPS_SQL),
         "People, not events. 'Saw a signup form' means the email field was "
         "actually on screen, which is what separates a form nobody saw from one "
         "they saw and ignored."),

        ("Signup funnel — chart view",
         funnel([VIEWED, SEEN, STARTED, SUBMITTED, SUCCEEDED]),
         "Same steps as the table above, with time-to-convert. PostHog draws "
         "funnels blank inside a dashboard tile — click the title to open it."),

        ("★ Funnel by surface — which CTA earns its place",
         sql(funnel_by("surface", "surface")),
         "waitlist_panel covers both the hero button and the sticky one; the next "
         "tile splits them. Supabase records a beta application as beta_panel, "
         "which here is waitlist_panel with beta_application = true."),

        ("Panel: hero button vs sticky top-right button",
         sql(funnel_by("placement", "placement")),
         "Both write the same signup_source, so this is the only place the two "
         "buttons can be told apart."),

        ("Saw the form and left without typing", sql(SEEN_NOT_STARTED_SQL), None),

        # ── Where signups come from ──────────────────────────────────────────
        ("★ Conversion by utm_source (90d)", sql(conversion_by("utm_source", "utm_source")),
         "First-touch. '(none)' is untagged traffic — direct, or a link somebody "
         "forgot to tag."),

        ("★ Conversion by referring domain (90d)",
         sql(conversion_by("referrer_domain", "referrer_domain")), None),

        ("Conversion by campaign (90d)", sql(conversion_by("utm_campaign", "utm_campaign")), None),

        ("Signups per day by surface",
         trends([event(SUCCEEDED, "total")], breakdown_prop="surface"), None),

        ("Page views per day by utm_source",
         trends([event(VIEWED, "total")], breakdown_prop="utm_source"), None),

        # ── Mac eligibility ──────────────────────────────────────────────────
        ("★ Mac-eligible share of beta interest (90d)", sql(MAC_SHARE_SQL),
         "Yaven is Mac-only. This counts the answer to 'do you have a Mac?' as "
         "given, not only for people who went on to submit."),

        ("Mac-eligible share by utm_source (90d)", sql(MAC_BY_SOURCE_SQL),
         "A channel that sends mostly non-Mac users is spend that cannot convert, "
         "however good its click-through looks."),

        ("Beta opt-in funnel",
         funnel(["web_beta_optin_started", "web_beta_mac_answered", "web_beta_optin_completed"]),
         None),

        # ── Referrals ────────────────────────────────────────────────────────
        ("Referrals: landings, signups, links copied (90d)", sql(REFERRAL_SQL),
         "/w/[code] redirects to / immediately, so before this instrumentation "
         "referral traffic was indistinguishable from someone typing yaven.ai."),

        ("Referral landings → signup", funnel(["web_referral_landing", SUCCEEDED], days=90), None),

        # ── Health ───────────────────────────────────────────────────────────
        ("New signups vs already on the list",
         trends([event(SUCCEEDED, "total")], breakdown_prop="already_registered"),
         "A repeat submission from an address already on the list is not a new "
         "signup and must never be added to one."),

        ("Signup failures by reason",
         trends([event(FAILED, "total")], breakdown_prop="reason"),
         "invalid_email is a user typo; rejected/server/network are ours to fix."),
    ]

    # PostHog stacks each new tile above the last, so create them backwards to
    # leave the dashboard reading top-down in the order above.
    print("\nCreating tiles:")
    for name, query, description in reversed(tiles):
        insight(did, name, query, description)

    set_layout(did)

    print(f"\n{len(tiles)} tiles. Open {HOST}/project/{PROJECT}/dashboard/{did}")


if __name__ == "__main__":
    main()
