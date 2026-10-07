# yaven — landing page copy reference

Approved agency copy supplied: 2026-10-06. Applied to `/studio/alt/crowd`,
`/manifesto` and `/about`. The Crowd page now follows this order: hero,
four growth cards, personal assistant and shared agents, closing
graphic and manifesto link, Questions, agency application and waitlist.

The implementation source of truth is
`src/app/studio/_shared/crowd-copy.ts`, with the long-form copy in
`src/app/manifesto/page.tsx` and `src/app/about/page.tsx`.

The earlier script below remains a reference for the other existing variants;
it is not the approved copy for the Crowd redesign.

---

## Hero

**Design rule:** Never use decorative tags, badges, eyebrows, kickers, or
tagline strips above or below the hero, or at the top or bottom of other
sections. Apply this to every audience version. Lead with the headline,
supporting copy, and actions.

**Copy**

> **yaven**
>
> Your business can be bigger than your team.
>
> yaven helps independent studios and agencies find their next project and bring in
> the right people to deliver it. AI agents keep track of client conversations,
> follow-ups, and ongoing work.
>
> CTA: **Get early access** (opens the signup form)
>
> Signup: Tell us a little about your business. We’ll get in touch to see how yaven could help.


**Nav**

> Top left: yaven logo mark
> Top right: "Book a call" link (Calendly)

---

## Meet yaven (scroll-pinned section)

**Copy**

> **Meet yaven.**
>
> A menu bar assistant that lives on your Mac.
>
> It connects to your [Gmail] email, [Google Calendar] calendar, [HubSpot] CRM, [Notion] docs and more, collating everything important in one place. The intro, the contract, the unpaid invoice, none of it gets buried.
>
> Use [⌥ D] to draft any reply, anywhere, in your voice. [⌥ A] answers anything on your screen. yaven learns how much to let you review, and how much you want it to handle automatically, as you use it.
>
> Local-first. Your emails, drafts, and context stay on your machine. Nothing is uploaded to our servers or synced to a cloud.
>
> Try the demo! press [⌥ D] or [⌥ A]

**Interactive cards**

Draft card (LinkedIn DM):

> Lola H. — Recruiter, Founding Designer role
> "Hi Bettina! Your work is stunning, we're hiring a founding designer. Open to a quick chat?"
> You type: "politely decline, warm"
> [⌥ D] triggers yaven draft:
> "Thanks so much for reaching out, Lola! I'm really flattered. I'm not looking to go in-house right now, but I'd love to stay connected. If anything changes on my end I'll definitely reach out."

Ask card (contract document):

> Martinas_Bakehouse_v3.pdf
> 4.1 All deliverables remain the sole property of the Client upon full payment.
> 4.2 Payment due within **sixty (60)** days of invoice date.
> "Ask about this document"
> [⌥ A] triggers question: "I thought this was 30 days? Why did it change?"
> yaven answer: "Since your last [Granola] call with Pablo on May 12, his team updated the payment window from 30 to 60 days. He mentioned cash-flow timing on their end. The rest of the scope is unchanged from your v2 redline."

---

## Triage Section (cream background, scroll-pinned)

**Header**

> **yaven knows what matters...**

**Body**

> One queue instead of ten different apps. yaven pulls everything into a single notification centre that only demands your attention when something actually needs you, so you can stay focused.
>
> Important threads never get buried. yaven tracks every conversation, drafts replies in your voice, and preps you before every meeting with the context you need.

**Triage cards (stacking on scroll)**

Card 1 — Needs you now (blue):

> Things only you can handle. yaven knows what is and isn't urgent.
>
> - "Can we move Thursday's call?" — Client
> - "Intro: Fatimah <> you" — Warm lead
> - "Contract redlines from legal" — Deadline

Card 2 — Already handled (red):

> Drafted using your tone, context, and rules.
>
> - "Re: proposal timeline?" — replied
> - "Invoice #214 overdue" — nudged
> - "Meeting recap sent" — drafted
> - "Receipt filed to expenses" — sorted

Card 3 — Can wait (purple/pink):

> Queued for when you have the headspace.
>
> - "AI Weekly digest" — Friday
> - "Webinar invite: Q3 outlook" — Next week

---

## Proposals + CRM Section (cream background, scroll-pinned)

**Header**

> **...and who matters.**

**Slide 1 — Network mapping**

Tjalling card:

> Tjalling — via Gmail
> "Following up on our conversation at Config. Do you have availability this week for a call?"

yaven response card:

> "Tjalling met you at Config '26. He works with a mutual, Oliver Normand. I drafted a reply with your calendar link."

Text:

> **yaven knows who you know**
>
> It remembers everyone you've met and what you talked about. It spots the old client whose project is coming around again, the intro you said you'd make, the person worth a hello before they forget you, then drafts your messages and proposals proactively.

**Slide 2 — Proposals (gooey animation)**

> **Call ended, proposal ready**
>
> yaven pulls notes, context, and pricing from your past work and drafts a ready-to-send proposal before you close the call.

**Slide 3 — Conference follow-up (badge card)**

Badge card:

> Ariel Thomas — The Design Co.
> Spoke at: Design Expo '26
> Mutual: Asker K.
> Talked about: Brand optimisation
> Status: "Needs follow-up" (red) -> "Follow-up drafted with yaven" (green)

Text:

> **Conference follow-ups, handled**
>
> It finds their work, your mutual connections, and drafts a follow-up in your voice before the connection goes cold.

**CRM card (glass card)**

> Otto's Bakehouse — "1 of 100 yaven sourced"
>
> - Matched: Fits your ideal client
> - Outreach: Intro drafted in your voice
> - Replied: Call booked Thursday
> - Logged: Synced after the call

---

## Finale — "Who's building this?" (cream background)

> **So, who's building this?**
>
> [Imperial] [MIT] [Oxford] [Harvard] logos
>
> We're a small team of former Imperial, MIT, Oxford and Harvard researchers. Between us: digital twin research in Q1 journals, AI agent infrastructure in production across multiple startups and an asset management firm, product design awards and work exhibited at the Design Museum London, an open-source AI tool with thousands of users, two stints as founding engineers, and a freelance practice grown from zero to $20k MRR in months; we were the customer first.

---

## FAQ (dark blue background)

> **FAQ**
>
> **So what actually is this?**
> A second brain that lives in your Mac's menu bar. It connects to your email, calendar, messages, and docs, learns how you work, and builds a picture of every client, conversation, and commitment so nothing falls through the cracks.
> Right now it intelligently prioritises your inbox so the most critical messages are always at the top of your desk, drafts replies in your voice from any app on your Mac, and preps you before every meeting. The more you use it, the more handling on its own. Currently in beta.
>
> **How is this different from ChatGPT or Claude?**
> A chat box waits for you to drive it: you write the prompt, paste the context, copy the answer back. yaven already read the thread, knows the client, and queued the reply before you opened it. You approve, it learns. The more you use it, the less you have to touch.
>
> **Where does my data go?**
> yaven is local-first. Your emails, drafts, and the profile it builds stay on your Mac, not on our servers, not synced to a cloud. When you ask it to draft or answer, only the relevant text is sent to your existing model provider for that single request. Nothing is stored afterward. yaven never sends, files, or changes anything without your explicit approval.
>
> **I handle client data under NDA. Can I trust this?**
> That's exactly why it's local-first. Your files and context never leave your machine unless you trigger a draft. When you do, only the relevant snippet goes to your existing model provider for that one request, nothing is retained. You control every action, every send.
>
> **What does it connect to?**
> Gmail, Google Calendar, Apple Calendar, iMessage, Telegram, Granola, Spotify, your files and docs. Many more integrations are coming through the beta.
>
> **Is it Mac only?**
> Yes, for now. yaven is built native for macOS. Windows is on the roadmap.
>
> **When do I get access?**
> yaven is in beta. We onboard a small group every week, personally. Join the waitlist and we'll reach out.

---

## Footer (dark ink background)

**Columns**

> Follow: X, LinkedIn, Instagram
> Contact: support@yaven.us, Book a call (Calendly)
> Legal: Privacy Policy, Terms of Service
> Join the waitlist: [inline waitlist form]

**Bottom**

> Giant "yaven" wordmark + yaven logo + "© 2026 yaven"

## Brand spelling

Always write **yaven** in lowercase in visible copy, headings, buttons, metadata,
accessibility labels and design files, including at the start of a sentence.
Keep code identifiers unchanged.
