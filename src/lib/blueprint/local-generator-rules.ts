import type { AutomationCategory } from "./types"

export const FALLBACK_TASKS = [
  "turn messy notes into follow-ups",
  "summarize meetings",
  "track recurring follow-ups",
  "create weekly status updates"
]

export const HUMAN_LED_DEFAULTS = [
  "Final approval before external messages are sent.",
  "Sensitive relationship or client decisions.",
  "Strategic tradeoffs where context, taste, or risk matters.",
  "Hiring, pricing, negotiation, or compliance decisions."
]

export const CATEGORY_KEYWORDS: Record<AutomationCategory, string[]> = {
  communication: ["email", "follow", "message", "slack", "call", "meeting"],
  admin: ["schedule", "invoice", "calendar", "data entry", "admin"],
  research: ["research", "brief", "scan", "compare"],
  sales: ["lead", "crm", "proposal", "pipeline", "outreach", "sales"],
  marketing: ["content", "post", "newsletter", "campaign", "marketing"],
  operations: ["report", "tracker", "docs", "notion", "process", "update"],
  engineering: ["ticket", "code", "github", "linear", "jira", "review"],
  strategy: ["prioritize", "decision", "strategy", "plan", "roadmap"],
  customer_work: ["client", "customer", "support", "success", "delivery"],
  other: []
}

export const TOOL_KEYWORDS = [
  "gmail",
  "outlook",
  "slack",
  "notion",
  "sheets",
  "hubspot",
  "airtable",
  "linear",
  "jira",
  "github",
  "calendar"
]

export function titleCase(value: string) {
  return value
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function firstNonEmpty(values: string[], fallback: string) {
  return values.find(value => value.trim()) ?? fallback
}

export function uniq(values: string[]) {
  return Array.from(new Set(values.map(value => value.trim()).filter(Boolean)))
}

export function includesAny(value: string, keywords: string[]) {
  const normalized = value.toLowerCase()
  return keywords.some(keyword => normalized.includes(keyword))
}

type WhyTemplate = {
  keywords: string[]
  text: (tools: string[]) => string
}

function findTool(tools: string[], ...patterns: string[]): string | null {
  return tools.find(t => patterns.some(p => t.toLowerCase().includes(p))) ?? null
}

const WHY_TEMPLATES: WhyTemplate[] = [
  // CRM / logging
  {
    keywords: ["log call", "logging call", "call note", "crm"],
    text: tools => {
      const crm = findTool(tools, "hubspot", "salesforce") ?? "your CRM"
      return `Call notes summarised and pushed to ${crm} after every meeting. No copy-paste.`
    }
  },
  // Follow-ups
  {
    keywords: ["follow-up", "follow up", "followup"],
    text: () =>
      "Context-aware follow-ups written from your call transcript. Review and send, don't write from scratch."
  },
  // Outreach / LinkedIn
  {
    keywords: ["outreach", "linkedin", "connection request"],
    text: tools => {
      const src = findTool(tools, "apollo", "clay") ?? "your prospect list"
      return `Personalised outreach drafted from ${src}. Not templated — written to each person.`
    }
  },
  // Prospect / lead lists
  {
    keywords: ["prospect list", "lead list", "enriching contact", "contact data", "enrich"],
    text: tools => {
      const crm = findTool(tools, "hubspot", "salesforce") ?? "your CRM"
      const src = findTool(tools, "apollo", "clay")
      return src
        ? `${src} → Clay → ${crm}, automatic. No manual data entry.`
        : `Prospect data pulled and synced to ${crm} automatically. No manual enrichment.`
    }
  },
  // Deal stages / pipeline
  {
    keywords: ["deal stage", "pipeline", "stale deal"],
    text: tools => {
      const crm = findTool(tools, "hubspot", "salesforce") ?? "your CRM"
      return `Stale deals flagged in ${crm} with suggested next actions. No weekly review needed.`
    }
  },
  // Cold email sequences
  {
    keywords: ["cold email", "email sequence"],
    text: () =>
      "Cold email sequences written from your ICP and positioning. Review once, run forever."
  },
  // Weekly reports / pipeline report
  {
    keywords: ["pipeline report", "weekly report", "performance report", "weekly pipeline"],
    text: tools => {
      const crm = findTool(tools, "hubspot", "salesforce", "apollo") ?? "your tools"
      return `Report compiled from ${crm} data every week. No manual pulling, no formatting.`
    }
  },
  // Scheduling meetings / follow-up meetings
  {
    keywords: ["scheduling", "schedule meeting", "schedule follow", "rescheduling"],
    text: tools => {
      const cal = findTool(tools, "calendly", "google calendar", "cal.com") ?? "your calendar"
      return `Meetings booked via ${cal} rules. No back-and-forth emails.`
    }
  },
  // Social content / posting
  {
    keywords: ["social content", "posting social", "schedule post", "scheduling post"],
    text: tools => {
      const tool = findTool(tools, "buffer", "hootsuite", "later") ?? "your scheduler"
      return `Content queued in ${tool} from a single brief. No manual posting across channels.`
    }
  },
  // Analytics / pulling analytics
  {
    keywords: ["analytics", "pulling analytic", "pull analytic", "performance data"],
    text: tools => {
      const src = findTool(tools, "google analytics", "mixpanel", "amplitude") ?? "your analytics tools"
      return `Numbers pulled from ${src} and formatted into a ready-to-share summary. No manual copy-paste.`
    }
  },
  // Repurposing content
  {
    keywords: ["repurpos", "short clip", "content across channel"],
    text: () =>
      "Long-form content broken into posts, threads, and clips. One source, every format, zero extra work."
  },
  // First-draft copy / writing copy
  {
    keywords: ["first-draft", "first draft", "writing copy", "draft copy"],
    text: () =>
      "First-draft copy written from your brief and brand voice. You edit, not rewrite from scratch."
  },
  // Briefing freelancers
  {
    keywords: ["briefing freelancer", "brief freelancer"],
    text: () =>
      "Freelancer briefs written from your campaign notes. Consistent format, sent the moment you need them."
  },
  // Chasing approvals
  {
    keywords: ["chasing approval", "chase approval", "chasing sign-off", "sign-off"],
    text: () =>
      "Approval reminders sent automatically on schedule. Nothing waits in a draft folder."
  },
  // Investor updates
  {
    keywords: ["investor update", "investor report"],
    text: () =>
      "Investor update written from your metrics and week's notes. Consistent format, every time."
  },
  // Job descriptions
  {
    keywords: ["job description", "job desc"],
    text: () =>
      "Job descriptions written from your hiring notes. Structured, consistent, ready to post."
  },
  // Meeting notes / recaps
  {
    keywords: ["meeting note", "meeting recap", "tidying note", "tidy note", "standup", "standup update"],
    text: () =>
      "Meeting ends, notes appear. Decisions and action items structured before you close the tab."
  },
  // Status updates / weekly updates
  {
    keywords: ["status update", "weekly update", "weekly status", "weekly team update", "product update"],
    text: () =>
      "Weekly update drafted from your activity and notes. Review and send — no writing from scratch."
  },
  // Summarising docs / summarising research
  {
    keywords: ["summaris", "summariz", "summarising doc", "summarising research", "summarising customer"],
    text: () =>
      "Docs and research condensed to key points before they reach you or your team. No reading walls of text."
  },
  // Introductions / scheduling introductions
  {
    keywords: ["intro email", "scheduling intro", "introduction"],
    text: () =>
      "Intro emails drafted and sent the moment you make the connection. Nothing to remember or follow up on."
  },
  // Invoices / chasing invoices / payment reminders
  {
    keywords: ["invoice", "payment reminder", "chasing invoice"],
    text: () =>
      "Invoice reminders sent automatically on due dates. No manual chasing, no awkward emails."
  },
  // PR descriptions / release notes
  {
    keywords: ["pr description", "release note", "documenting api"],
    text: tools => {
      const src = findTool(tools, "github", "linear", "jira") ?? "your repo"
      return `PR descriptions and release notes drafted from ${src} diffs and ticket context. No blank-page writing.`
    }
  },
  // Copying tickets / ticket status
  {
    keywords: ["ticket", "copying ticket", "candidate status", "deal stage"],
    text: tools => {
      const pm = findTool(tools, "linear", "jira", "asana") ?? "your project tool"
      return `Tickets updated in ${pm} from call notes and Slack context. No manual copying between tools.`
    }
  },
  // Candidate outreach / recruiting outreach
  {
    keywords: ["candidate outreach", "personalised candidate"],
    text: tools => {
      const src = findTool(tools, "linkedin", "greenhouse", "lever", "ashby") ?? "your ATS"
      return `Personalised candidate outreach drafted from ${src} profiles. Review and send — not written from scratch.`
    }
  },
  // Interview scheduling / scheduling interviews
  {
    keywords: ["scheduling interview", "schedule interview"],
    text: tools => {
      const cal = findTool(tools, "calendly", "google calendar") ?? "your calendar"
      return `Interviews self-scheduled by candidates via ${cal}. No back-and-forth emails.`
    }
  },
  // Interview notes / offer emails
  {
    keywords: ["interview note", "offer email", "rejection email"],
    text: () =>
      "Interview notes summarised and offer or rejection emails drafted after every call. No manual writeup."
  },
  // QBR decks / building decks
  {
    keywords: ["qbr", "deck", "slide", "building slide", "building deck"],
    text: () =>
      "Deck drafted from your notes, metrics, and past calls. You review the story, not build it slide by slide."
  },
  // Health scores / CRM updates
  {
    keywords: ["health score", "updating health"],
    text: tools => {
      const crm = findTool(tools, "hubspot", "salesforce", "gainsight", "churnzero") ?? "your CRM"
      return `Health scores updated in ${crm} from recent activity and notes. No manual entry after every call.`
    }
  },
  // Support tickets / logging tickets
  {
    keywords: ["support ticket", "logging support", "log support"],
    text: tools => {
      const tool = findTool(tools, "intercom", "zendesk", "hubspot") ?? "your support tool"
      return `Support tickets logged and routed in ${tool} from your call notes. No manual entry.`
    }
  },
  // Renewal reminders
  {
    keywords: ["renewal reminder", "renewal"],
    text: () =>
      "Renewal reminders sent to the right accounts at the right time. Nothing slips through."
  },
  // Proposals / SOWs
  {
    keywords: ["proposal", "sow", "statement of work"],
    text: () =>
      "Proposals and SOWs drafted from your client brief and past examples. Review and send, not build from scratch."
  },
  // Project status updates
  {
    keywords: ["project status", "status report"],
    text: () =>
      "Project status updates written from your notes and task list. Consistent, sent on schedule."
  },
  // Time trackers
  {
    keywords: ["time tracker", "toggl", "harvest"],
    text: tools => {
      const tool = findTool(tools, "toggl", "harvest") ?? "your time tracker"
      return `Time entries logged in ${tool} automatically from your calendar and activity. No manual tracking.`
    }
  },
  // Onboarding clients
  {
    keywords: ["onboarding client", "onboard client"],
    text: () =>
      "Client onboarding docs and welcome emails generated from your intake form. Consistent every time."
  },
  // Reconciling transactions
  {
    keywords: ["reconcil", "reconciling transaction"],
    text: tools => {
      const tool = findTool(tools, "quickbooks", "xero", "stripe") ?? "your finance tool"
      return `Transactions matched and flagged in ${tool} automatically. No manual reconciliation.`
    }
  },
  // Expense reports
  {
    keywords: ["expense report", "expense"],
    text: () =>
      "Expense reports generated from your receipts and card data. No manual categorising or formatting."
  },
  // Pulling financials
  {
    keywords: ["monthly financial", "pulling financial", "pulling monthly"],
    text: tools => {
      const tool = findTool(tools, "quickbooks", "xero", "google sheets", "excel") ?? "your finance tools"
      return `Monthly financials pulled from ${tool} and formatted into a ready-to-share summary.`
    }
  },
  // Coordinating travel
  {
    keywords: ["coordinating travel", "travel"],
    text: () =>
      "Travel details compiled and briefing docs sent before every trip. Nothing to chase or reformat."
  },
  // Managing email triage
  {
    keywords: ["email triage", "triage"],
    text: () =>
      "Inbox triaged and priority emails flagged before you open your laptop. You focus on the ones that need you."
  },
  // Following up on action items
  {
    keywords: ["action item", "following up on action"],
    text: () =>
      "Action items tracked and follow-up reminders sent automatically. Nothing falls through after a meeting."
  },
  // Preparing briefing docs
  {
    keywords: ["briefing doc", "brief doc", "preparing brief"],
    text: () =>
      "Briefing docs prepared from past context before every meeting or call. You arrive ready."
  },
  // Repurposing newsletters / email newsletters
  {
    keywords: ["email newsletter", "newsletter"],
    text: tools => {
      const tool = findTool(tools, "beehiiv", "convertkit", "mailchimp", "klaviyo") ?? "your email tool"
      return `Newsletter drafted from your long-form content and sent via ${tool}. One source, every format.`
    }
  },
  // Video descriptions / tags
  {
    keywords: ["video description", "video tag", "youtube"],
    text: () =>
      "Video titles, descriptions, and tags written from your transcript. SEO-ready before you publish."
  },
  // Responding to comments
  {
    keywords: ["responding to comment", "respond to comment"],
    text: () =>
      "Comment replies drafted in your voice. Review and post — no writing each one from scratch."
  },
  // Compiling analytics reports
  {
    keywords: ["compiling analytic", "analytics report"],
    text: tools => {
      const src = findTool(tools, "google analytics", "mixpanel", "amplitude", "meta ads") ?? "your analytics"
      return `Analytics pulled from ${src} and formatted into a weekly summary. No manual compiling.`
    }
  },
  // Pulling data across tools
  {
    keywords: ["pulling data", "data across tool"],
    text: () =>
      "Data pulled from every tool into one place automatically. No manual consolidation before every meeting."
  },
  // Building leadership reports
  {
    keywords: ["leadership report", "building leadership"],
    text: () =>
      "Leadership reports built from live data and sent on schedule. No last-minute scrambling."
  },
  // Chasing people for status / updates
  {
    keywords: ["chasing people", "chasing for status", "chasing for update", "chase people"],
    text: () =>
      "Status requests sent automatically. Updates collected without you having to ask twice."
  },
  // Updating trackers
  {
    keywords: ["updating tracker", "update tracker", "managing recurring"],
    text: tools => {
      const tool = findTool(tools, "airtable", "notion", "google sheets", "excel") ?? "your tracker"
      return `Trackers in ${tool} updated from meeting notes and activity. No manual entry after every call.`
    }
  },
  // Spreadsheet updates
  {
    keywords: ["spreadsheet", "updating spreadsheet", "manually updating"],
    text: tools => {
      const tool = findTool(tools, "google sheets", "excel", "airtable") ?? "your spreadsheet"
      return `${tool} updated automatically from source data. You just review the numbers.`
    }
  },
  // Copy-pasting / logging same thing
  {
    keywords: ["copy-past", "copy past", "logging the same", "log the same", "same thing in multiple"],
    text: () =>
      "Data entered once and synced everywhere it needs to go. No logging the same thing in two places."
  },
  // Drafting reports from research
  {
    keywords: ["drafting report", "report from research"],
    text: () =>
      "Reports drafted from your research and notes. You review the output, not build it from raw material."
  },
  // Writing repetitive emails
  {
    keywords: ["repetitive email", "writing repetitive"],
    text: () =>
      "Repetitive emails written in your tone from templates you control. Review and send, never rewrite."
  },
  // Generic: writing emails / messages
  {
    keywords: ["writing email", "drafting email", "email draft"],
    text: () =>
      "Emails drafted from context and sent for your review. You approve, not write."
  }
]

export function buildWhyAutomatable(task: string, tools: string[]): string {
  const lower = task.toLowerCase()
  const match = WHY_TEMPLATES.find(({ keywords }) =>
    keywords.some(k => lower.includes(k))
  )
  return (
    match?.text(tools) ??
    `${titleCase(task)} handled by AI in the background. You review the result, not do the work.`
  )
}
