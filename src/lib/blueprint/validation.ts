import type { BlueprintInput } from "./types"

const MAX_TEXT_LENGTH = 4000
const MAX_ARRAY_ITEMS = 24
const MAX_ITEM_LENGTH = 180

const INPUT_FIELDS: (keyof BlueprintInput)[] = [
  "role",
  "responsibilitySummary",
  "typicalDay",
  "repeatedTasks",
  "painfulTasks",
  "toolsUsed",
  "copyPasteFlows",
  "recurringDecisions",
  "regularOutputs",
  "desiredFirstAutomation"
]

const ARRAY_FIELDS: (keyof BlueprintInput)[] = [
  "repeatedTasks",
  "painfulTasks",
  "toolsUsed",
  "copyPasteFlows",
  "recurringDecisions",
  "regularOutputs"
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function normalizeText(value: unknown, maxLength = MAX_TEXT_LENGTH) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

function normalizeTextArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map(item => item.trim().slice(0, MAX_ITEM_LENGTH))
      .filter(Boolean)
      .slice(0, MAX_ARRAY_ITEMS)
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim().slice(0, MAX_ITEM_LENGTH)]
  }

  return []
}

export function parseBlueprintInput(value: unknown): BlueprintInput | null {
  if (!isRecord(value)) return null

  const answers = INPUT_FIELDS.reduce<Record<string, string | string[]>>(
    (acc, field) => {
      acc[field] = ARRAY_FIELDS.includes(field)
        ? normalizeTextArray(value[field])
        : normalizeText(value[field])
      return acc
    },
    {}
  )

  return answers as BlueprintInput
}

export function getAnsweredQuestionCount(answers: BlueprintInput) {
  return INPUT_FIELDS.reduce((count, field) => {
    const value = answers[field]
    if (Array.isArray(value)) return count + (value.length > 0 ? 1 : 0)
    return count + (value ? 1 : 0)
  }, 0)
}

export function isValidEmail(value: unknown) {
  if (typeof value !== "string") return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function parseJsonObject(value: string) {
  try {
    const parsed: unknown = JSON.parse(value)
    return isRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}
