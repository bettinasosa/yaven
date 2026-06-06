# yaven — landing page script
Edit the copy lines directly. `ALT:` lines are alternatives to pick from or delete.
Animation names in [brackets] reference fancycomponents.dev or components already in the repo.
Rule for the whole page: never say notch, menu bar, or macOS UI. The form factor
is a running tease that pays off only when they install.
---
## Header + Subtext (Hero)
**Copy**
> **yaven**
>
Less admin. More flow.
Sub:
> yaven chases the invoices, warms the leads, drafts the replies,
> while you focus on the things only you can do.
CTA: **Join the waitlist**
**Animation**
- Wordmark: [Scramble In] — already built (`scramble-intro.tsx`), letters resolve into "yaven"
- Headline: [Vertical Cut Reveal], one beat after the wordmark settles
- Background: slow [Animated Gradient] drift in the blue, barely perceptible
- Wordmark hover: [Variable Font Hover By Letter] if we ever move to a variable font; otherwise [Letter Swap Hover]
- CTA hover: [Underline To Background] fill
---
## Section 1 — The Drop (problem)
Full-viewport scrolling lines. One per screen-third, mindmarket style.
**Copy**
> the invoice you forgot to chase.
>
> the leads from Tuesday's conference.
>
> the proposal due Friday.
>
> the 14 unread responses.

Punchline (after the last line locks):
> None of it needs *you*. It just needs doing.
**Animation**
- Reuse `text-parallax-section`: each line slides at a different scroll speed, alternating full/15% opacity
- The word "you" in the punchline: [Text Highlighter] sweep in the red (#DF4F3E)
- Each line gets a [Strikethrough draw-on] as the next one arrives — the list is being dealt with before your eyes. This is the wow moment of the section.
---
## Section 2 — What it is (cryptic reveal)
**Copy**
> Meet yaven.
>
> Yaven is the assistant that you never knew you needed. 
> Yaven sits with you all day, ready whenever you need, proactively suggesting things it can handle for you.
> No new tabs, apps, or chat boxes to switch between. Yaven is the future of ambient AI. 

**Animation**
- "Meet yaven." enters with [Scroll And Swap]
- A small abstract glyph (reuse `yaven-glyph`) [Float]s near the text — present but unexplained. Do NOT shape it like a notch.
- Cursor near the paragraph: [Text Cursor Proximity] — words lean toward the pointer. The site pays attention to you, like the product does.
---
## Section 3 — Two commands (Draft + Ask)
This is the showcase section. Split screen or stacked panels.
**Copy**
> Two commands.
**Draft**
> It writes where your cursor is - with the thread, the client,
> and the way *you* write already in its head.
> Your voice. Not Claude’s.
**Ask**
> Question anything on your screen, without leaving it.
> "What did we quote them in March?" Answered. Page never changed.
**Animation**
- Draft panel: [Typewriter] types a real reply into a fake email thread, mid-sentence, in context. Show it picking up after the user's own half-written sentence — that's the "knows how you write" proof.
- Ask panel: a question types out, the answer slides in [Vertical Cut Reveal], the page behind it visibly never scrolls or navigates
- Panels: [Stacking Cards] on scroll, Draft on top first, Ask peels over it
- Section header: [Breathing Text] at very low amplitude
---
## Section 4 — The follow-ups (conference / payment / client)
Three cards. mindmarket-style parallel structure: pain in plain words, then what yaven did about it.
**Copy**
Card 1 — Conference:
> 300 badge scans. 4 worth keeping.
> yaven finds them and writes the intros before your flight lands.
Card 2 — Payment:
> Invoice 47 days overdue?
> The polite nudge is drafted. The firm one is queued behind it.
Card 3 — Client:
> Quiet since the kickoff call?
> yaven notices on day 6. Not month 6.
**Animation**
- [Stacking Cards] — each card overlaps the last on scroll
- Numbers ("300", "47 days", "day 6"): [Basic Number Ticker] counts up as the card lands
- Card hover: subtle [Parallax Floating] on an inner illustration layer
- "Not month 6.": render small and flat, then [Underline Animation] in red
---
## Section 5 — Proposals + CRM
**Copy**
Proposals:
> Call ends. Proposal exists.
> Built from your notes while the conversation is still warm.
CRM:
> A CRM that fills itself in.
> Every call, email, and promise — logged. You never typed a field.
**Animation**
- Proposals: [Gooey SVG Filter] — scattered note fragments melt together into one clean document shape. Strongest visual metaphor on the page; worth building properly.
- CRM: a contact card assembles itself line by line, [Typewriter] but fast, like someone else is doing the data entry
- "filled itself in": fields flash cream (#E3D5BB) as they populate
---
## Section 6 — Inbound triage
**Copy**
> Five inboxes. One queue.
>
> yaven sorts what needs you now, what it can answer itself,
> and what can wait until Friday.
**Animation**
- [Simple Marquee] of incoming message snippets streaming across the section
- Messages visibly sort mid-marquee: some drop into a "you" pile, some get answered inline (tiny [Typewriter] flash), some grey out and drift down
- Pile counts: [Basic Number Ticker]
---
## Section 7 — The tease (form factor, never revealed)
Short. Almost empty viewport. This is the memorable beat people quote.
**Copy**
> Where does it live?
>
> Closer than you think.
ALT: > Look up.
(stronger, but a near-giveaway — decide how cryptic you want to be)
**Animation**
- Dead-stop scroll section, lots of negative space
- "Where does it live?" in [Scramble Hover] — touching the question scrambles it, the answer stays out of reach
- [Pixel Trail] follows the cursor here and only here — something is present on this screen that wasn't before
- Optional: the floating glyph from Section 2 slowly rises and exits the top of the viewport. Says it without saying it.
---
## Section 8 — Footer CTA
**Copy**
> Get the boring half handled.
CTA: **Join the waitlist**
Then the existing giant "yaven" wordmark footer.
**Animation**
- Keep the existing [Sticky Footer] giant-wordmark treatment
- CTA button: [Cursor Attractor] — button leans slightly toward the pointer as it approaches
- Wordmark: [Scroll And Swap] letters settle as you hit page bottom
---
## Micro-interactions (page-wide)
- All section headers: [Vertical Cut Reveal] on scroll-enter, consistent so it reads as a system
- Links: [Letter Swap Hover], never plain underlines
- Waitlist input focus: border draws on like the strikethroughs in Section 1
- 404 / empty states: [Screensaver] bouncing glyph
- Keep one restraint rule: max one "wow" animation visible per viewport. The Gooey proposal merge, the marquee triage, and the Section 1 strikethroughs are the three set pieces — everything else stays quiet so they land.


Notes:

- Lets make the yaven header bigger
- Lets also capitalise Yaven throughout
- Lets make the logo boxing font too
- Lets make the crossing out animation slower
- I also dont like the red colour, id prefer something else warmer
- I really like the animation between the meet yaven section and the 'Two commands' section, where it takes the whole page and scrolling activates the animation. scrolling doesnt actually 'scroll'. all sections should be like that:

- for example, it should be landing page -> new section called meet yaven. then this stuff appears and gets checked off as you scroll: the invoice you forgot to chase.
the leads from Tuesday's conference.
the proposal due Friday.
the 14 unread responses.
None of it needs you. It just needs doing.

- i love the animation next to this: Call ends.
Proposal
exists.
Built from your notes while the conversation is still warm.

lets add more of these :) 

the rest we can edit later.


Notes 2:

- colour bleeds from landing page to meet yaven
- Backwards R on meet yaven remove it. lets make this section much cooler, add some micro animations like next to this section (Call ends. Proposal exists.
Built from your notes while the conversation is still warm.)

Lets make this look more like a chat conversation:

Draft
It writes where your cursor is - with the thread, the client, and the way youwrite already in its head. Your voice. Not Claude's.

Re: Updated proposal — Hartwell & Co
Sarah: Could you send over the revised numbers when you get a chance? We'd like to move before the end of the month.
Hi Sarah — good speaking earlier. The revised numbers are attached, same scope we walked through but with the onboarding fee folded in. If it all looks right I can have the contract over to you by Thursday.
