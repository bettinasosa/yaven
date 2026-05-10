import type { BlueprintInput } from "@/lib/blueprint/types"

export type QuestionId = "role" | "toolsUsed" | "painfulTasks"

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
    title: "What kind of work do you do?",
    helper: "Pick the one that fits best",
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
    primaryKey: "role"
  },
  {
    id: "toolsUsed",
    title: "Which tools do you use every day?",
    helper: "Select all that apply",
    chips: [
      "Gmail / Outlook",
      "Slack",
      "Notion",
      "Google Docs / Drive",
      "Excel / Sheets",
      "Airtable",
      "HubSpot",
      "Salesforce",
      "Asana / Trello",
      "Zoom",
      "Figma",
      "Jira / Linear",
      "ChatGPT / Claude",
      OTHER_OPTION
    ],
    mode: "multi",
    primaryKey: "toolsUsed"
  },
  {
    id: "painfulTasks",
    title: "What eats the most time in your week?",
    helper: "Pick your biggest drains",
    chips: [
      "Writing emails & messages",
      "Scheduling & coordination",
      "Data entry",
      "Creating reports",
      "Following up with clients",
      "Taking meeting notes",
      "Updating spreadsheets",
      "Reviewing documents",
      "Research & summarizing",
      "Processing invoices",
      "Managing tasks & projects",
      OTHER_OPTION
    ],
    mode: "multi",
    primaryKey: "painfulTasks"
  }
]
