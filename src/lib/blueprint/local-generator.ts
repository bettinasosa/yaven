import type {
  AutomationCategory,
  AutomationBlueprint,
  AutomationOpportunity,
  AutomationType,
  BlueprintInput
} from "./types"
import { buildAgentTeamSchematic, buildLocalAgentTeam } from "./agent-team"
import {
  CATEGORY_KEYWORDS,
  FALLBACK_TASKS,
  HUMAN_LED_DEFAULTS,
  TOOL_KEYWORDS,
  buildWhyAutomatable,
  firstNonEmpty,
  includesAny,
  titleCase,
  uniq
} from "./local-generator-rules"

function inferCategory(
  task: string,
  answers: BlueprintInput
): AutomationCategory {
  const taskText = task.toLowerCase()
  const directMatch = Object.entries(CATEGORY_KEYWORDS).find(
    ([category, keywords]) => {
      return (
        category !== "other" &&
        keywords.some(keyword => taskText.includes(keyword))
      )
    }
  )

  if (directMatch) return directMatch[0] as AutomationCategory

  const haystack = [answers.role, answers.typicalDay, ...answers.toolsUsed]
    .join(" ")
    .toLowerCase()

  const match = Object.entries(CATEGORY_KEYWORDS).find(
    ([category, keywords]) => {
      return (
        category !== "other" &&
        keywords.some(keyword => haystack.includes(keyword))
      )
    }
  )

  return (match?.[0] as AutomationCategory | undefined) ?? "other"
}

function inferAutomationType(
  task: string,
  category: AutomationCategory,
  answers: BlueprintInput
): AutomationType {
  const normalized = task.toLowerCase()
  const usesTools = answers.toolsUsed.some(tool =>
    includesAny(tool, TOOL_KEYWORDS)
  )
  const copyPaste = answers.copyPasteFlows.length > 0

  if (
    normalized.includes("dashboard") ||
    normalized.includes("portal") ||
    normalized.includes("generator") ||
    normalized.includes("scoring")
  ) {
    return "custom_tool"
  }

  if (
    copyPaste ||
    (usesTools && ["operations", "sales", "engineering"].includes(category))
  ) {
    return "workflow_automation"
  }

  if (category === "strategy" || normalized.includes("priorit")) {
    return "human_led_ai_assisted"
  }

  if (normalized.includes("decision") || normalized.includes("who to")) {
    return "ai_assistant"
  }

  return "prompt_template"
}

function labelFromScore(score: number) {
  if (score >= 26) return "high"
  if (score >= 19) return "medium"
  return "low"
}

function difficultyFromType(type: AutomationType) {
  if (type === "custom_tool") return "high"
  if (type === "workflow_automation" || type === "ai_assistant") return "medium"
  return "low"
}

function buildOpportunity(
  task: string,
  index: number,
  answers: BlueprintInput
): AutomationOpportunity {
  const category = inferCategory(task, answers)
  const automationType = inferAutomationType(task, category, answers)
  const isPainful = answers.painfulTasks.some(pain => {
    return (
      task.toLowerCase().includes(pain.toLowerCase()) ||
      pain.toLowerCase().includes(task.toLowerCase())
    )
  })
  const hasToolFlow =
    answers.copyPasteFlows.length > 0 || answers.toolsUsed.length > 1
  const repetition = answers.repeatedTasks.length ? 4 : 3
  const pain = isPainful ? 5 : answers.painfulTasks.length ? 4 : 3
  const structure =
    automationType === "custom_tool"
      ? 3
      : automationType === "human_led_ai_assisted"
        ? 2
        : 4
  const dataAvailability = hasToolFlow ? 4 : 3
  const riskSuitability = automationType === "human_led_ai_assisted" ? 2 : 4
  const businessValue = ["sales", "customer_work", "operations"].includes(
    category
  )
    ? 5
    : 4
  const total =
    repetition +
    pain +
    structure +
    dataAvailability +
    riskSuitability +
    businessValue

  return {
    id: `opportunity_${index + 1}`,
    taskName: titleCase(task),
    category,
    automationType,
    valueLabel: labelFromScore(total),
    difficultyLabel: difficultyFromType(automationType),
    scores: {
      repetition,
      pain,
      structure,
      dataAvailability,
      riskSuitability,
      businessValue
    },
    whyAutomatable: buildWhyAutomatable(task, answers.toolsUsed),
    firstVersion: buildFirstVersion(task, automationType, answers),
    requiredInputs: buildRequiredInputs(task, answers),
    expectedOutputs: buildExpectedOutputs(task, automationType),
    humanReviewNeeded:
      automationType !== "workflow_automation" || riskSuitability < 5
  }
}

function buildFirstVersion(
  task: string,
  automationType: AutomationType,
  answers: BlueprintInput
) {
  const source = inferSourceMaterial(task, answers)

  if (automationType === "workflow_automation") {
    return `Start with a reviewed workflow that turns ${source} into a clean ${task} output.`
  }

  if (automationType === "custom_tool") {
    return `Prototype a small internal tool that collects inputs for ${task} and produces the repeatable output.`
  }

  if (automationType === "ai_assistant") {
    return `Create an assistant prompt that asks for missing context, ranks options, and drafts the next action for ${task}.`
  }

  if (automationType === "human_led_ai_assisted") {
    return `Use AI to prepare options and tradeoffs for ${task}, then keep the final call with you.`
  }

  return `Create a reusable ChatGPT or Claude prompt for ${task} using your normal examples and tone.`
}

function inferSourceMaterial(task: string, answers: BlueprintInput) {
  if (answers.copyPasteFlows.length > 0) {
    return firstNonEmpty(answers.copyPasteFlows, "source material")
  }

  if (includesAny(task, ["call", "meeting", "transcript", "summary"])) {
    return "call notes or meeting transcript"
  }

  if (
    includesAny(task, ["report", "dashboard", "numbers", "metric", "sheet"])
  ) {
    return "dashboard numbers + notes"
  }

  if (includesAny(task, ["email", "follow", "outreach", "message"])) {
    return "emails, notes, or customer context"
  }

  if (includesAny(task, ["proposal", "brief", "client"])) {
    return "client brief, examples, and notes"
  }

  if (includesAny(task, ["ticket", "jira", "linear", "github"])) {
    return "issue context, notes, and acceptance criteria"
  }

  const context = [answers.typicalDay, ...answers.toolsUsed].join(" ")

  if (
    includesAny(context, ["report", "dashboard", "numbers", "metric", "sheet"])
  ) {
    return "dashboard numbers + notes"
  }

  if (includesAny(context, ["email", "follow", "outreach", "message"])) {
    return "emails, notes, or customer context"
  }

  if (includesAny(context, ["ticket", "jira", "linear", "github"])) {
    return "issue context, notes, and acceptance criteria"
  }

  return "messy notes or source material"
}

function buildRequiredInputs(task: string, answers: BlueprintInput) {
  return uniq([
    inferSourceMaterial(task, answers),
    firstNonEmpty(answers.toolsUsed, "Current tool or workspace"),
    `Definition of a good ${task} output`
  ]).slice(0, 4)
}

function buildExpectedOutputs(task: string, type: AutomationType) {
  if (includesAny(task, ["report", "dashboard", "update", "status"])) {
    return ["Share-ready report", "summary", "key changes", "next steps"]
  }

  if (includesAny(task, ["email", "follow", "outreach", "message"])) {
    return ["Polished message draft", "summary", "action items", "next step"]
  }

  if (includesAny(task, ["call", "meeting", "transcript"])) {
    return [
      "Clean meeting summary",
      "decisions",
      "action items",
      "follow-up draft"
    ]
  }

  if (type === "human_led_ai_assisted") {
    return ["Options", "tradeoffs", "recommended next step", "review checklist"]
  }

  if (type === "workflow_automation") {
    return [`Completed ${task} draft`, "tool update", "review queue item"]
  }

  return [`Draft ${task}`, "summary", "action items", "next step"]
}

function getCandidateTasks(answers: BlueprintInput) {
  return uniq([
    answers.desiredFirstAutomation,
    ...answers.painfulTasks,
    ...answers.repeatedTasks,
    ...answers.regularOutputs.map(output => `create ${output}`),
    ...FALLBACK_TASKS
  ]).slice(0, 7)
}

function sortByOpportunityScore(
  a: AutomationOpportunity,
  b: AutomationOpportunity
) {
  const score = (item: AutomationOpportunity) =>
    Object.values(item.scores).reduce((sum, value) => sum + value, 0)

  return score(b) - score(a)
}

function buildAutomationMap(opportunities: AutomationOpportunity[]) {
  const groups = new Map<string, AutomationOpportunity[]>()

  opportunities.forEach(opportunity => {
    const label = titleCase(opportunity.category)
    groups.set(label, [...(groups.get(label) ?? []), opportunity])
  })

  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items: items.slice(0, 3).map(item => ({
      task: item.taskName,
      recommendation: item.humanReviewNeeded
        ? "AI-assisted with review"
        : "Automatable",
      automationType: titleCase(item.automationType)
    }))
  }))
}

function buildPromptTemplate(answers: BlueprintInput, topTask: string) {
  const workflow =
    answers.typicalDay || answers.responsibilitySummary || "my recurring work"
  const output = firstNonEmpty(answers.regularOutputs, topTask)

  return `You are my workflow automation assistant.

I am a ${answers.role || "knowledge worker"}. I regularly do this work: ${workflow}

Turn the following messy input into:
1. A concise summary.
2. Key decisions or open questions.
3. Action items by owner.
4. A polished ${output}.
5. Risks, blockers, or missing context.
6. The next best step.

Use this tone: clear, practical, and concise.

Input:
[paste notes here]`
}

export function generateLocalBlueprint(
  answers: BlueprintInput
): AutomationBlueprint {
  const opportunities = getCandidateTasks(answers)
    .map((task, index) => buildOpportunity(task, index, answers))
    .sort(sortByOpportunityScore)

  const topOpportunities = opportunities.slice(0, 5)
  const quickWins = topOpportunities
    .filter(item => item.difficultyLabel === "low")
    .concat(topOpportunities)
    .filter(
      (item, index, arr) =>
        arr.findIndex(match => match.id === item.id) === index
    )
    .slice(0, 3)
  const customToolIdeas = topOpportunities.filter(item => {
    return (
      item.automationType === "custom_tool" || item.difficultyLabel === "high"
    )
  })

  const topTask =
    topOpportunities[0]?.taskName ??
    "turn messy notes into a useful work output"
  const topOpportunity = topOpportunities[0]
  const agentTeam = buildLocalAgentTeam(answers, topOpportunity)
  const role = answers.role || "your role"
  const repeated = uniq([
    ...answers.repeatedTasks,
    ...answers.regularOutputs
  ]).slice(0, 3)

  return {
    userSummary: `Your ${role.toLowerCase()} work has repeated input-to-output tasks: ${repeated.join(", ") || "notes, updates, follow-ups, and decisions"}. These are the tasks that we can handle for you, letting you focus on the tasks that only you can do.`,
    blueprintHeadline: `${topTask} is your best first automation candidate.`,
    topOpportunities,
    quickWins,
    customToolIdeas,
    humanLedTasks: HUMAN_LED_DEFAULTS,
    automationMap: buildAutomationMap(topOpportunities),
    agentTeam,
    workflowSchematic: buildAgentTeamSchematic(agentTeam),
    suggestedPromptTemplate: {
      title: `${topTask} template`,
      useCase: `Use this when you need to turn messy input into ${topTask.toLowerCase()}.`,
      prompt: buildPromptTemplate(answers, topTask)
    },
    waitlistHook:
      "We can turn this preview into working prompts, workflows, dashboards, and custom tools around how you already work."
  }
}
