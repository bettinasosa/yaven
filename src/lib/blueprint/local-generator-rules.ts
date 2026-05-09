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
