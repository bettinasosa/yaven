import { track } from "@vercel/analytics"
import type { AutomationBlueprint, BlueprintInput } from "@/lib/blueprint/types"
import { OTHER_OPTION, type QuestionConfig } from "./blueprint-config"

export type PanelPhase =
  | "idle"
  | "intro"
  | "chat"
  | "generating"
  | "preview"
  | "email"
  | "success"

export const STORAGE_KEY = "yaven-ai-blueprint-session-v5"
export const ARRAY_KEYS = new Set<keyof BlueprintInput>([
  "repeatedTasks",
  "painfulTasks",
  "toolsUsed",
  "copyPasteFlows",
  "recurringDecisions",
  "regularOutputs"
])

type StoredSession = {
  phase?: PanelPhase
  currentIndex?: number
  answers?: BlueprintInput
  blueprint?: AutomationBlueprint
  blueprintId?: string
}

export function splitList(value: string) {
  return value
    .split(/,|\n/)
    .map(item => item.trim())
    .filter(Boolean)
}

export function readStoredSession(): StoredSession | null {
  if (typeof window === "undefined") return null

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as StoredSession | null
  } catch {
    return null
  }
}

export function selectedForQuestion(
  question: QuestionConfig,
  answers: BlueprintInput,
  availableChips?: string[]
) {
  const value = answers[question.primaryKey]
  const chips = availableChips ?? question.chips ?? []

  if (Array.isArray(value)) {
    const selected = value.filter(item => chips.includes(item))
    const hasCustomValue = value.some(item => !chips.includes(item))

    return hasCustomValue && chips.includes(OTHER_OPTION)
      ? [...selected, OTHER_OPTION]
      : selected
  }

  if (!value) return []
  if (question.mode === "textarea" || chips.includes(value)) return [value]
  return chips.includes(OTHER_OPTION) ? [OTHER_OPTION] : [value]
}

export function freeTextForQuestion(
  question: QuestionConfig,
  answers: BlueprintInput,
  availableChips?: string[]
) {
  const value = answers[question.primaryKey]
  const chips = new Set(availableChips ?? question.chips ?? [])

  if (!Array.isArray(value)) {
    return question.mode !== "textarea" && chips.has(value) ? "" : value
  }

  return value.filter(item => !chips.has(item)).join(", ")
}

export function secondaryTextForQuestion(
  question: QuestionConfig,
  answers: BlueprintInput
) {
  if (!question.secondaryKey) return ""
  const value = answers[question.secondaryKey]
  return Array.isArray(value) ? value.join(", ") : value
}

export function trackBlueprintEvent(
  name: string,
  properties?: Record<string, string | number | boolean | null>
) {
  try {
    track(name, properties)
  } catch {
    return
  }
}
