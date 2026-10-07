/** Approved agency copy. Functional UI labels sit alongside their examples. */
export const crowdHero = {
  headline: "AI agents for running and growing your agency.",
  body: "yaven is built for independent agencies and studios. It finds opportunities, keeps up with your clients and gets work done across your business.",
  cta: "See yaven in action",
} as const

export const agencyExamples = [
  {
    category: "Grow your agency", name: "Find new clients", heading: "Find new clients",
    body: "yaven watches for companies which fit your agency and the right moment to reach out: a new marketing lead, a funding round, a product launch. It researches each one and drafts outreach in your voice.",
    status: "Introduction ready",
    scene: "A startup on your target list hires a new CMO. yaven finds the closest work in your portfolio and drafts an introduction.",
    work: [
      { name: "Company researched", detail: "A startup on your target list has hired a new CMO: a new person to introduce your agency to." },
      { name: "Portfolio work matched", detail: "The closest work in your portfolio, brought together for the introduction." },
      { name: "Introduction drafted", detail: "An introduction in your voice, with your most relevant work. Ready for your review." },
    ],
  },
  {
    category: "Grow your agency", name: "Win inbound leads", heading: "Win the leads which come to you",
    body: "When a brief, inquiry or RFP lands, yaven checks whether it fits your agency, researches the company and drafts a reply with your most relevant work.",
    status: "Reply ready",
    scene: "A skincare brand sends an inquiry at 9pm. By morning, yaven has researched the brand, matched it to your closest beauty work and drafted a reply.",
    work: [
      { name: "Brand researched", detail: "The skincare brand behind the 9pm inquiry, researched before your team starts the day." },
      { name: "Beauty work matched", detail: "Your closest beauty work, gathered to show the brand why your agency fits the brief." },
      { name: "Reply drafted", detail: "A reply with that work, prepared by morning. Your team reviews it before it goes out." },
    ],
  },
  {
    category: "Grow your agency", name: "Keep clients", heading: "Keep clients for longer",
    body: "yaven follows each client's market and competitors, and explains what each change means for your work, so you bring ideas before they ask.",
    status: "Briefing ready",
    scene: "Your client is launching in Germany next spring. yaven maps the local competition and prepares a briefing before your next call.",
    work: [
      { name: "Launch context gathered", detail: "Your client's plans to launch in Germany next spring, brought into the briefing." },
      { name: "Local competition mapped", detail: "The local competitors and what they could mean for your client's launch." },
      { name: "Call briefing prepared", detail: "The launch plans and competitor research, together before your next client call." },
    ],
  },
  {
    category: "Grow your agency", name: "Reconnect", heading: "Reconnect with past clients",
    body: "yaven keeps track of everyone you've worked with and tells you when they're likely to need you again.",
    status: "Note ready",
    scene: "A past client posts a job for a brand designer. yaven reminds you it's been 14 months since your last project together and drafts a note.",
    work: [
      { name: "Hiring signal found", detail: "A past client is looking for a brand designer: a reason to get back in touch." },
      { name: "Last project recalled", detail: "Your last project together was 14 months ago. That relationship gives the note its context." },
      { name: "Reconnection note drafted", detail: "A note to reconnect, based on your previous work together and their new need." },
    ],
  },
] as const

export const personalAssistant = {
  heading: "Your own assistant, right where you work.",
  body: "Everyone on your team has yaven on their Mac. Ask about a client, hand over a task or work through something together, next to the apps you already use.",
  examples: [
    { name: "Call prep", request: "Get me ready for my call with Juicy." },
    { name: "Decisions", request: "What did we decide in our last conversation?" },
    { name: "Draft reply", request: "Draft a reply using the proposal we sent." },
  ],
} as const

export const sharedAgents = {
  heading: "Shared agents for the whole agency.",
  body: "Give your team's recurring work to agents everyone shares. Set the brief once and review what they bring back.",
  jobs: [
    { name: "Research target accounts", body: "A shortlist of companies worth approaching, with the background, connections and an angle for each." },
    { name: "Prepare client reviews", body: "Recent conversations, open requests and news worth raising, ready before the meeting." },
    { name: "Follow your market", body: "The companies and topics your agency cares about, with what each development means for your work." },
  ],
} as const

export const crowdQuestions = [
  { question: "Who is yaven for?", answer: "Independent marketing, branding, design and creative agencies, from solo studios to larger teams. Consultants and in-house teams who work like an agency are welcome too." },
  { question: "How is yaven different from ChatGPT or Claude?", answer: "Chat tools answer the questions you ask. yaven knows your clients and their markets, and brings you opportunities with the work already prepared. It's a proactive assistant built for running and growing an independent agency." },
  { question: "Does yaven do our creative work?", answer: "No. Ideas, taste and creative production stay with your team. yaven handles the research, admin, new business and follow-up which pull you away from creative and strategic work." },
  { question: "What does yaven connect to?", answer: "yaven connects to 20+ tools, including several email inboxes, calendars, Notion, Google Workspace, Granola, WhatsApp, Telegram and CRMs. You decide what yaven sees." },
  { question: "What happens to our data?", answer: "In yaven, your personal context is stored locally on your Mac, and you can open and edit it any time. We don't train models on your business or client data.", link: { href: "/privacy", label: "Read our privacy policy" } },
  { question: "Does anything go to a client without our approval?", answer: "No. yaven prepares the work, and your team decides what goes out." },
  { question: "Do we need Macs?", answer: "Yes. yaven runs on Mac and sits in the notch at the top of your screen." },
  { question: "How do we get started?", answer: "Tell us about your agency. We set yaven up with you or your team and improve it with you on real work." },
  { question: "What does it cost?", answer: "It depends on the size of your team and where you start. We'll walk you through it in our first conversation." },
  { question: "Can I join the waitlist instead?", answer: "Yes. If you work solo or want to try yaven on your own first, join the waitlist and we'll invite you as places open.", link: { href: "#waitlist", label: "Join the waitlist" } },
] as const

export const onboardingSteps = [
  { title: "Start with your agency.", body: "We learn how you work and choose where yaven starts." },
  { title: "Set it up.", body: "We connect the tools you choose and configure yaven around your clients." },
  { title: "Test it on real work.", body: "Your team uses it day to day, and we improve it with your feedback." },
  { title: "Grow from there.", body: "Add new jobs for yaven as your team settles in." },
] as const
