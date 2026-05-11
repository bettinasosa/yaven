import type { BlueprintInput } from "./types"

export function buildBlueprintPrompt(answers: BlueprintInput) {
  const role = answers.role.trim() || "knowledge worker"
  const tools = answers.toolsUsed.join(", ") || "Not specified"
  const painfulTasks = answers.painfulTasks.join(", ") || "Not specified"

  return (
    "You are designing an AI automation plan for a real person who wants to know exactly what could be automated for them.\n\n" +
    "Here is everything they told us about their work:\n\n" +
    `Role: "${role}"\n` +
    `Tools they use daily: "${tools}"\n` +
    `Tasks that eat their time and that they want automated: "${painfulTasks}"\n\n` +
    "Generate exactly 4 specific automations for this person. Every automation must be grounded in what they told you — directly reference their actual tasks and tools. Do not invent things they didn't mention.\n\n" +
    "Rules for each automation:\n" +
    "- taskName: 2-5 words, concrete noun phrase. Examples: CRM auto-logging, Follow-up drafting, Prospect enrichment, Pipeline alerts, Weekly report assembly, Candidate outreach. No verbs. No generic names like 'Task Automation'.\n" +
    "- description: 2-3 sentences. Must:\n" +
    "  * Name the exact tool they mentioned or the exact task they flagged\n" +
    "  * Explain HOW the automation works (what triggers it, what it does, where the result goes)\n" +
    "  * Say what they no longer have to do manually. End with a punchy closing: No copy-paste. / Review and send, don't write from scratch. / No manual data entry. / Zero cleanup. / Nothing to remember.\n" +
    "  * Be written in present tense, active voice\n" +
    "  * Sound like it is already built and working, not hypothetical\n\n" +
    "Good examples for Sales / BD with HubSpot and Apollo:\n" +
    "  taskName: CRM auto-logging\n" +
    "  description: After every call, your notes are automatically summarised and pushed to HubSpot with the contact, deal stage, and next action filled in. No switching between tabs, no copy-paste into the CRM. No copy-paste.\n\n" +
    "  taskName: Follow-up drafting\n" +
    "  description: As soon as a call ends, a follow-up email is drafted from the transcript — matching your tone, referencing what was discussed, and ready to send in one click. You never start from a blank page. Review and send, don't write from scratch.\n\n" +
    "  taskName: Prospect enrichment\n" +
    "  description: New prospects flow from Apollo through Clay into HubSpot automatically, enriched with company size, funding stage, and tech stack. No manual research tab. No manual data entry.\n\n" +
    "Bad (too vague): AI handles email tasks automatically.\n" +
    "Bad (no tool named): Notes are summarised and sent somewhere.\n" +
    "Bad (hypothetical): This could help you save time on reports.\n" +
    "Bad (no explanation of how): Follow-up emails are sent automatically.\n\n" +
    "Use the person's ACTUAL tools and tasks from their answers above. Every automation should feel like it was written specifically for them.\n\n" +
    "Output ONLY valid JSON, no preamble, no code fences, no explanation:\n\n" +
    '{ "opportunities": [{ "taskName": "...", "description": "..." }] }'
  )
}
