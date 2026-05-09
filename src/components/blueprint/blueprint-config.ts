import type { BlueprintInput } from "@/lib/blueprint/types"

export type QuestionId = "role" | "typicalDay" | "repeatedTasks" | "toolsUsed"

export const OTHER_OPTION = "Other"

export type QuestionConfig = {
  id: QuestionId
  title: string
  helper?: string
  placeholder?: string
  chips?: string[]
  mode: "single" | "multi" | "textarea"
  primaryKey: keyof BlueprintInput
  secondaryKey?: keyof BlueprintInput
  secondaryLabel?: string
  secondaryPlaceholder?: string
  voiceInput?: boolean
}

export const emptyBlueprintInput: BlueprintInput = {
  role: "",
  responsibilitySummary: "",
  typicalDay: "",
  repeatedTasks: [],
  painfulTasks: [],
  toolsUsed: [],
  copyPasteFlows: [],
  recurringDecisions: [],
  regularOutputs: [],
  desiredFirstAutomation: ""
}

export const blueprintQuestions: QuestionConfig[] = [
  {
    id: "role",
    title: "What kind of work do you do most days?",
    helper: "your role / title",
    chips: [
      "Founder",
      "Freelancer",
      "Consultant",
      "Creator",
      "Operator",
      "Sales / BD",
      "Marketing",
      "Product",
      "Engineering",
      "Recruiting",
      "Customer Success",
      OTHER_OPTION
    ],
    mode: "single",
    primaryKey: "role",
    placeholder: "Describe your role."
  },
  {
    id: "typicalDay",
    title: "Tell us what your week actually looks like.",
    helper:
      "Messy notes are fine: emails, calls, docs, Slack, reporting, follow-ups, dashboards.",
    placeholder:
      "e.g. I'm a solo founder. Mornings are customer calls (love these), afternoons are 4hrs of inbox + Salesforce updates (kill me), evenings I try to code with claude",
    mode: "textarea",
    primaryKey: "typicalDay",
    voiceInput: true
  }
]
