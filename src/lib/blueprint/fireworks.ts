import {
  buildAgentTeamPrompt,
  buildAgentTeamSchematic,
  normalizeAgentTeam
} from "./agent-team"
import { generateLocalBlueprint } from "./local-generator"
import { agentTeamJsonSchema } from "./schema"
import type {
  AgentTeam,
  AutomationBlueprint,
  BlueprintInput
} from "./types"
import { parseJsonObject } from "./validation"

const FIREWORKS_CHAT_URL = "https://api.fireworks.ai/inference/v1/chat/completions"
const DEFAULT_MODEL = "accounts/fireworks/models/kimi-k2p6"

type FireworksChatPayload = {
  choices?: Array<{
    message?: {
      content?: string | null
    }
  }>
  error?: {
    message?: string
  }
}

function extractContent(payload: FireworksChatPayload) {
  return payload.choices?.[0]?.message?.content ?? ""
}

function getBlueprintTimeoutMs() {
  const parsed = Number(process.env.FIREWORKS_BLUEPRINT_TIMEOUT_MS)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 12000
}

function getBlueprintModel() {
  return process.env.FIREWORKS_BLUEPRINT_MODEL || DEFAULT_MODEL
}

function getBestOpportunity(blueprint: AutomationBlueprint) {
  return (
    blueprint.topOpportunities[0] ??
    blueprint.quickWins[0] ??
    blueprint.customToolIdeas[0] ??
    null
  )
}

async function requestAgentTeam(
  apiKey: string,
  answers: BlueprintInput,
  baseBlueprint: AutomationBlueprint
) {
  const opportunity = getBestOpportunity(baseBlueprint)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), getBlueprintTimeoutMs())
  const systemContent = buildAgentTeamPrompt(answers, opportunity)

  try {
    const response = await fetch(FIREWORKS_CHAT_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: getBlueprintModel(),
        temperature: 0.3,
        max_tokens: 2000,
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: "Return the JSON now." }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "agent_team",
            schema: agentTeamJsonSchema
          }
        }
      })
    })

    const payload = (await response.json()) as FireworksChatPayload

    if (!response.ok) {
      throw new Error(
        payload.error?.message ?? "Fireworks workflow request failed"
      )
    }

    return extractContent(payload)
  } finally {
    clearTimeout(timeout)
  }
}

type FireworksOpportunity = {
  taskName?: string
  description?: string
}

type FireworksResponse = AgentTeam & {
  opportunities?: FireworksOpportunity[]
}

function parseFireworksResponse(value: string): FireworksResponse | null {
  const parsed = parseJsonObject(value)
  if (!parsed) return null
  return parsed as FireworksResponse
}

function applyAiOpportunities(
  baseBlueprint: ReturnType<typeof generateLocalBlueprint>,
  aiOpportunities: FireworksOpportunity[]
) {
  const valid = aiOpportunities.filter(
    o => o.taskName?.trim() && o.description?.trim()
  )
  if (valid.length === 0) return baseBlueprint

  const patched = baseBlueprint.topOpportunities.map((opp, i) => {
    const ai = valid[i]
    if (!ai) return opp
    return {
      ...opp,
      taskName: ai.taskName!.trim(),
      whyAutomatable: ai.description!.trim()
    }
  })

  return {
    ...baseBlueprint,
    topOpportunities: patched,
    quickWins: baseBlueprint.quickWins.map(opp => {
      const match = patched.find(p => p.id === opp.id)
      return match ?? opp
    })
  }
}

export async function generateFireworksBlueprint(answers: BlueprintInput) {
  const apiKey = process.env.FIREWORKS_API_KEY
  if (!apiKey) return null

  const baseBlueprint = generateLocalBlueprint(answers)
  const parsed = parseFireworksResponse(
    await requestAgentTeam(apiKey, answers, baseBlueprint)
  )
  const opportunity = getBestOpportunity(baseBlueprint)
  const agentTeam = parsed
    ? normalizeAgentTeam(parsed, answers, opportunity)
    : null

  if (!agentTeam) throw new Error("Fireworks returned invalid agent team JSON")

  const patchedBlueprint =
    parsed?.opportunities && parsed.opportunities.length > 0
      ? applyAiOpportunities(baseBlueprint, parsed.opportunities)
      : baseBlueprint

  return {
    ...patchedBlueprint,
    agentTeam,
    workflowSchematic: buildAgentTeamSchematic(agentTeam)
  }
}
