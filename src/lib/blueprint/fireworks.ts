import { buildBlueprintPrompt } from "./agent-team"
import { generateLocalBlueprint } from "./local-generator"
import { opportunitiesJsonSchema } from "./schema"
import type { BlueprintInput } from "./types"
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

async function requestOpportunities(apiKey: string, answers: BlueprintInput) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), getBlueprintTimeoutMs())
  const systemContent = buildBlueprintPrompt(answers)

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
            name: "opportunities",
            schema: opportunitiesJsonSchema
          }
        }
      })
    })

    const payload = (await response.json()) as FireworksChatPayload

    if (!response.ok) {
      throw new Error(
        payload.error?.message ?? "Fireworks opportunities request failed"
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

type FireworksResponse = {
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
    await requestOpportunities(apiKey, answers)
  )

  if (!parsed?.opportunities || parsed.opportunities.length === 0) {
    throw new Error("Fireworks returned invalid opportunities JSON")
  }

  return applyAiOpportunities(baseBlueprint, parsed.opportunities)
}
