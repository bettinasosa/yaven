import type {
  AgentTeam,
  AutomationOpportunity,
  BlueprintInput,
  WorkflowSchematic,
  WorkflowSchematicStep
} from "./types"

const AGENT_NAME_POOL = [
  "Iris",
  "Theo",
  "Marcus",
  "Juno",
  "Ada",
  "Wren",
  "Cleo",
  "Ezra",
  "Mara",
  "Nico",
  "Remy",
  "Sage",
  "Mila",
  "Orla",
  "Vera",
  "Kit",
  "Noa",
  "Rafi",
  "Lena",
  "Owen"
]
const FALLBACK_ROLES = [
  "Source Collector",
  "Draft Builder",
  "Quality Reviewer",
  "Handoff Runner"
]
const FALLBACK_SCHEDULES = [
  "Every 30 min",
  "Daily 9am",
  "On demand",
  "Weekly Mon"
]

function firstNonEmpty(values: string[], fallback: string) {
  return values.find(value => value.trim()) ?? fallback
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function hashText(value: string) {
  return value.split("").reduce((hash, char) => {
    return (hash * 31 + char.charCodeAt(0)) >>> 0
  }, 0)
}

function pickAgentNames(context: string, count = 4) {
  const offset = hashText(context) % AGENT_NAME_POOL.length

  return Array.from({ length: count }, (_, index) => {
    return AGENT_NAME_POOL[(offset + index * 3) % AGENT_NAME_POOL.length]
  })
}

function shortText(value: string, maxLength: number) {
  const trimmed = value.trim()
  if (trimmed.length <= maxLength) return trimmed
  return `${trimmed.slice(0, maxLength - 1).trim()}...`
}

function mermaidText(value: string, maxLength = 46) {
  return shortText(value, maxLength)
    .replace(/"/g, "'")
    .replace(/[{}[\]]/g, "")
}

function includesAny(value: string, keywords: string[]) {
  const normalized = value.toLowerCase()
  return keywords.some(keyword => normalized.includes(keyword))
}

export function getAgentTeamContext(
  answers: BlueprintInput,
  opportunity?: AutomationOpportunity | null
) {
  const role = answers.role || "knowledge worker"
  const task =
    answers.desiredFirstAutomation ||
    firstNonEmpty(answers.painfulTasks, "") ||
    firstNonEmpty(answers.repeatedTasks, "") ||
    opportunity?.taskName ||
    "turning messy work into finished outputs"
  const tools = answers.toolsUsed.slice(0, 4).join(", ")
  const day = answers.typicalDay.trim()
  const drain = [
    task,
    tools ? `using ${tools}` : "",
    day ? `Context: ${day}` : ""
  ]
    .filter(Boolean)
    .join(". ")

  return { role, drain }
}

export function buildAgentTeamPrompt(
  answers: BlueprintInput,
  opportunity?: AutomationOpportunity | null
) {
  const { role } = getAgentTeamContext(answers, opportunity)
  const tools = answers.toolsUsed.join(", ") || "Not specified"
  const painfulTasks = answers.painfulTasks.join(", ") || "Not specified"
  const agentNames = AGENT_NAME_POOL.join(", ")

  return (
    "You are designing an AI automation plan for a real person who wants to know exactly what could be automated for them.\n\n" +
    `Their role: "${role.replace(/"/g, "'")}"\n` +
    `Tools they use every day: "${tools.replace(/"/g, "'")}"\n` +
    `Tasks that eat their time (everything they flagged, including any custom ones they typed): "${painfulTasks.replace(/"/g, "'")}"\n\n` +
    "You must return TWO things:\n\n" +
    "PART 1 - Automation opportunities\n" +
    "Generate 3-4 specific automations for this person based on their actual tasks and tools.\n\n" +
    "Rules for opportunities:\n" +
    "- taskName: 2-5 words, concrete noun phrase. Examples: CRM auto-logging, Follow-up drafting, Prospect enrichment, Pipeline alerts, Weekly report assembly, Candidate outreach. No verbs. No generic names like Task Automation.\n" +
    "- description: 1-2 SHORT sentences. Must:\n" +
    "  * Name the specific tool (e.g. pushed to HubSpot, Apollo to Clay to Salesforce, synced to Notion)\n" +
    "  * Say what the person no longer has to do. End with a punchy closing like: No copy-paste. / Review and send, don't write from scratch. / No manual data entry. / No weekly review needed. / Zero cleanup. / Nothing to remember.\n" +
    "  * Be written in present tense, active voice\n" +
    "  * Sound like it is already built and working, not hypothetical\n\n" +
    "Good examples for Sales / BD with HubSpot and Apollo:\n" +
    "  taskName: CRM auto-logging\n" +
    "  description: Call notes summarised and pushed to HubSpot after every meeting. No copy-paste.\n\n" +
    "  taskName: Follow-up drafting\n" +
    "  description: Context-aware follow-ups written from your call transcript. Review and send, don't write from scratch.\n\n" +
    "  taskName: Prospect enrichment\n" +
    "  description: Apollo to Clay to HubSpot, automatic. No manual data entry.\n\n" +
    "  taskName: Pipeline alerts\n" +
    "  description: Stale deals flagged with suggested next actions. No weekly review needed.\n\n" +
    "Bad (too vague): AI handles email tasks automatically.\n" +
    "Bad (no tool named): Notes are summarised and sent somewhere.\n" +
    "Bad (hypothetical): This could help you save time on reports.\n\n" +
    "Use the person's ACTUAL tools from their answers, not generic placeholders.\n\n" +
    "PART 2 - Agent team\n" +
    "Design exactly 4 agents that would deliver the automations above.\n\n" +
    "Rules for agents:\n" +
    "- Each agent must be specific to their actual answers, no generic AI assistant fluff\n" +
    `- Names must be unique human first names. Use names like ${agentNames} or similar. Never repeat a name and never include the word AI, Bot, or Agent in the name\n` +
    "- Roles are 2-4 word job titles (Inbox Triager, Pipeline Cleaner, Research Scout), not generic (Assistant, Helper)\n" +
    "- The handles sentence references their specific situation, tools, outputs, or repeated tasks; uses concrete verbs; and avoids hedging (could, may, helps with)\n" +
    "- Schedules should vary across the team: mix of always-on, periodic, daily, weekly. Not all every 30 min\n" +
    "- The hours estimate should be realistic for their answers, between 4 and 20 hrs/week\n" +
    "- The summary names what the user gets back, not what the agents do\n\n" +
    "Output ONLY valid JSON, no preamble, no code fences, no explanation. Use this exact structure:\n\n" +
    '{\n' +
    '  "hoursPerWeek": <integer between 4 and 20>,\n' +
    '  "summary": "<one short sentence about what this frees the user up to focus on>",\n' +
    '  "opportunities": [\n' +
    '    {\n' +
    '      "taskName": "<2-5 word noun phrase>",\n' +
    '      "description": "<1-2 sentences, tool-specific, ends with punchy closing>"\n' +
    '    }\n' +
    '  ],\n' +
    '  "agents": [\n' +
    '    {\n' +
    '      "name": "<distinctive first name>",\n' +
    '      "role": "<2-4 word job title>",\n' +
    '      "handles": "<one concrete sentence about what they do, referencing the user\'s specific drain>",\n' +
    '      "schedule": "<short cadence: Every 30 min / Daily 9am / On demand / Weekly Mon>"\n' +
    '    }\n' +
    '  ]\n' +
    '}'
  )
}

function getFallbackHandles(
  answers: BlueprintInput,
  opportunity?: AutomationOpportunity | null
) {
  const { drain } = getAgentTeamContext(answers, opportunity)
  const tools = answers.toolsUsed.slice(0, 3).join(", ") || "their daily tools"
  const output =
    firstNonEmpty(answers.regularOutputs, "") ||
    firstNonEmpty(opportunity?.expectedOutputs ?? [], "") ||
    opportunity?.taskName ||
    "the finished output"

  return [
    `Collects the raw material for ${drain} from ${tools} before it turns into manual cleanup.`,
    `Turns the messy pieces behind ${drain} into a structured first version of ${output}.`,
    `Checks ${output.toLowerCase()} for gaps, unclear details, and anything that needs a human decision.`,
    `Sends the approved ${output.toLowerCase()} back to the right place in ${tools} with the next step attached.`
  ]
}

function normalizeName(value: string) {
  return value.replace(/[^a-z]/gi, "").toLowerCase()
}

function isBadName(value: string, usedNames: Set<string>) {
  const normalized = normalizeName(value)
  return (
    !normalized ||
    usedNames.has(normalized) ||
    /\b(ai|bot|agent)\b/i.test(value)
  )
}

function isWeakRole(value: string) {
  return !value.trim() || /\b(assistant|helper|agent|bot)\b/i.test(value)
}

function isWeakHandle(value: string, usedHandles: Set<string>) {
  const normalized = value.toLowerCase().replace(/\s+/g, " ").trim()

  return (
    normalized.length < 35 ||
    usedHandles.has(normalized) ||
    /\b(could|may|helps with|assist|assists)\b/i.test(value)
  )
}

export function normalizeAgentTeam(
  agentTeam: AgentTeam,
  answers: BlueprintInput,
  opportunity?: AutomationOpportunity | null
): AgentTeam {
  const { drain } = getAgentTeamContext(answers, opportunity)
  const names = pickAgentNames(`${answers.role} ${drain}`)
  const handles = getFallbackHandles(answers, opportunity)
  const sourceAgents = agentTeam.agents.slice(0, 4)
  const usedNames = new Set<string>()
  const usedHandles = new Set<string>()

  const agents = Array.from({ length: 4 }, (_, index) => {
    const source = sourceAgents[index]
    const fallbackName = names[index] ?? AGENT_NAME_POOL[index]
    const sourceName = source?.name.trim() ?? ""
    const name = isBadName(sourceName, usedNames) ? fallbackName : sourceName
    const normalizedName = normalizeName(name)
    usedNames.add(normalizedName)

    const sourceRole = source?.role.trim() ?? ""
    const role = isWeakRole(sourceRole)
      ? FALLBACK_ROLES[index] ?? "Workflow Owner"
      : sourceRole

    const sourceHandle = source?.handles.trim() ?? ""
    const normalizedHandle = sourceHandle.toLowerCase().replace(/\s+/g, " ").trim()
    const handlesText = isWeakHandle(sourceHandle, usedHandles)
      ? handles[index] ?? handles[handles.length - 1]
      : sourceHandle
    usedHandles.add(
      handlesText.toLowerCase().replace(/\s+/g, " ").trim() || normalizedHandle
    )

    return {
      name,
      role,
      handles: handlesText,
      schedule:
        source?.schedule.trim() ||
        FALLBACK_SCHEDULES[index] ||
        FALLBACK_SCHEDULES[FALLBACK_SCHEDULES.length - 1]
    }
  })

  const usedSchedules = new Set<string>()
  const variedAgents = agents.map((agent, index) => {
    const normalizedSchedule = agent.schedule.toLowerCase()
    if (!usedSchedules.has(normalizedSchedule)) {
      usedSchedules.add(normalizedSchedule)
      return agent
    }

    const schedule =
      FALLBACK_SCHEDULES.find(item => !usedSchedules.has(item.toLowerCase())) ??
      FALLBACK_SCHEDULES[index % FALLBACK_SCHEDULES.length]
    usedSchedules.add(schedule.toLowerCase())
    return { ...agent, schedule }
  })

  return {
    hoursPerWeek: clamp(Math.round(agentTeam.hoursPerWeek || 8), 4, 20),
    summary:
      agentTeam.summary.trim() ||
      "You get the finished work back faster, with less repeated cleanup.",
    agents: variedAgents
  }
}

export function buildLocalAgentTeam(
  answers: BlueprintInput,
  opportunity?: AutomationOpportunity | null
): AgentTeam {
  const { drain } = getAgentTeamContext(answers, opportunity)
  const context = [
    drain,
    answers.typicalDay,
    ...answers.repeatedTasks,
    ...answers.toolsUsed
  ].join(" ")
  const tools = answers.toolsUsed.slice(0, 3).join(", ") || "your tools"
  const output =
    firstNonEmpty(answers.regularOutputs, "") ||
    firstNonEmpty(opportunity?.expectedOutputs ?? [], "") ||
    opportunity?.taskName ||
    "finished work"
  const hoursPerWeek = Math.min(
    20,
    Math.max(4, 5 + answers.repeatedTasks.length * 2 + answers.toolsUsed.length)
  )
  const names = pickAgentNames(`${answers.role} ${context}`)

  if (includesAny(context, ["onboarding", "training", "loom", "sop", "docs"])) {
    const [docName, qaName, gapName, progressName] = names

    return {
      hoursPerWeek,
      summary:
        "You get cleaner onboarding docs, answered team questions, and fewer training follow-ups.",
      agents: [
        {
          name: docName,
          role: "Onboarding Doc Builder",
          handles:
            "Turns Loom walkthroughs, rough notes, and Google Docs drafts into structured onboarding pages and SOPs in Notion.",
          schedule: "On demand"
        },
        {
          name: qaName,
          role: "Training Q&A Keeper",
          handles:
            "Monitors Slack for onboarding questions and answers from existing docs, past decisions, and saved walkthroughs.",
          schedule: "Every 30 min"
        },
        {
          name: gapName,
          role: "Knowledge Gap Tracker",
          handles:
            `Reviews the questions ${qaName} could not answer each week and flags the onboarding topics that still need better documentation.`,
          schedule: "Weekly Mon"
        },
        {
          name: progressName,
          role: "Progress Monitor",
          handles:
            "Tracks each teammate's onboarding checklist, sends overdue nudges, and surfaces a weekly progress digest.",
          schedule: "Daily 9am"
        }
      ]
    }
  }

  if (includesAny(context, ["report", "dashboard", "stripe", "metrics", "numbers"])) {
    const [dataName, reportName, anomalyName, publishName] = names

    return {
      hoursPerWeek,
      summary:
        "You get client-ready reporting back without manually rebuilding the same dashboard story each week.",
      agents: [
        {
          name: dataName,
          role: "Data Fetcher",
          handles:
            "Pulls dashboard numbers, Stripe hours, and project tags into the weekly reporting workspace.",
          schedule: "Weekly Sun"
        },
        {
          name: reportName,
          role: "Report Assembler",
          handles:
            "Turns the raw metrics into a client-ready report draft with sections, totals, and status bullets.",
          schedule: "Weekly Mon"
        },
        {
          name: anomalyName,
          role: "Anomaly Spotter",
          handles:
            "Checks the weekly numbers for spikes, missing tags, and changes that need a human explanation.",
          schedule: "Daily 9am"
        },
        {
          name: publishName,
          role: "Slack Publisher",
          handles:
            "Posts the finished report summary to the right Slack channel and links the Notion record.",
          schedule: "On demand"
        }
      ]
    }
  }

  return {
    hoursPerWeek,
    summary: `You get ${output.toLowerCase()} back faster, with less weekly cleanup work.`,
    agents: names.map((name, index) => ({
      name,
      role: FALLBACK_ROLES[index],
      handles: [
        `${name} watches ${tools} for the raw material behind ${drain}.`,
        `${name} turns ${drain} into a structured first version of ${output}.`,
        `${name} checks the draft for gaps, unclear numbers, and anything needing your approval.`,
        `${name} sends the reviewed ${output.toLowerCase()} back to the right place in ${tools}.`
      ][index],
      schedule: FALLBACK_SCHEDULES[index]
    }))
  }
}

export function buildAgentTeamSchematic(agentTeam: AgentTeam): WorkflowSchematic {
  const steps: WorkflowSchematicStep[] = agentTeam.agents.map((agent, index) => ({
    id: `agent_${index + 1}`,
    label: `${agent.name} — ${agent.role}`,
    detail: `${agent.handles} Runs ${agent.schedule}.`
  }))
  const [firstAgent, secondAgent, thirdAgent, fourthAgent] = agentTeam.agents

  return {
    title: "Your AI agent team",
    summary: `${agentTeam.hoursPerWeek} hrs/week freed. ${agentTeam.summary}`,
    steps,
    mermaid: `flowchart LR
  drain["Weekly drain<br/>${mermaidText(firstAgent?.handles ?? "Recurring work")}"]:::trigger
  a1["${mermaidText(firstAgent?.name ?? "Iris")}<br/>${mermaidText(firstAgent?.role ?? "Source Collector")}<br/>${mermaidText(firstAgent?.schedule ?? "Always on")}"]:::ai
  a2["${mermaidText(secondAgent?.name ?? "Theo")}<br/>${mermaidText(secondAgent?.role ?? "Draft Builder")}<br/>${mermaidText(secondAgent?.schedule ?? "Daily 9am")}"]:::ai
  a3{"${mermaidText(thirdAgent?.name ?? "Juno")}<br/>${mermaidText(thirdAgent?.role ?? "Quality Reviewer")}<br/>${mermaidText(thirdAgent?.schedule ?? "On demand")}"}:::review
  a4["${mermaidText(fourthAgent?.name ?? "Ada")}<br/>${mermaidText(fourthAgent?.role ?? "Handoff Runner")}<br/>${mermaidText(fourthAgent?.schedule ?? "Weekly Mon")}"]:::output
  result["You get back<br/>${mermaidText(agentTeam.summary, 56)}"]:::output

  drain --> a1 --> a2 --> a3 --> a4 --> result

  classDef trigger fill:#FDFDF9,stroke:#83A5D4,stroke-width:2px,color:#18181B;
  classDef ai fill:#83A5D4,stroke:#5D82B8,stroke-width:2px,color:#FFFFFF;
  classDef review fill:#EDF3FB,stroke:#83A5D4,stroke-width:2px,color:#18181B;
  classDef output fill:#FDFDF9,stroke:#83A5D4,stroke-width:2px,color:#18181B;`,
    handoffNote: agentTeam.summary
  }
}
