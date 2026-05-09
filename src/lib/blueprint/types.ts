export type BlueprintInput = {
  role: string
  responsibilitySummary: string
  typicalDay: string
  repeatedTasks: string[]
  painfulTasks: string[]
  toolsUsed: string[]
  copyPasteFlows: string[]
  recurringDecisions: string[]
  regularOutputs: string[]
  desiredFirstAutomation: string
}

export type AutomationCategory =
  | "communication"
  | "admin"
  | "research"
  | "sales"
  | "marketing"
  | "operations"
  | "engineering"
  | "strategy"
  | "customer_work"
  | "other"

export type AutomationType =
  | "prompt_template"
  | "ai_assistant"
  | "workflow_automation"
  | "custom_tool"
  | "human_led_ai_assisted"

export type ScoreLabel = "low" | "medium" | "high"

export type AutomationOpportunity = {
  id: string
  taskName: string
  category: AutomationCategory
  automationType: AutomationType
  valueLabel: ScoreLabel
  difficultyLabel: ScoreLabel
  scores: {
    repetition: number
    pain: number
    structure: number
    dataAvailability: number
    riskSuitability: number
    businessValue: number
  }
  whyAutomatable: string
  firstVersion: string
  requiredInputs: string[]
  expectedOutputs: string[]
  humanReviewNeeded: boolean
}

export type AutomationMapGroup = {
  category: string
  items: {
    task: string
    recommendation: string
    automationType: string
  }[]
}

export type WorkflowSchematicStep = {
  id: string
  label: string
  detail: string
}

export type WorkflowSchematic = {
  title: string
  summary: string
  steps: WorkflowSchematicStep[]
  mermaid: string
  handoffNote: string
}

export type AgentTeamMember = {
  name: string
  role: string
  handles: string
  schedule: string
}

export type AgentTeam = {
  hoursPerWeek: number
  summary: string
  agents: AgentTeamMember[]
}

export type AutomationBlueprint = {
  userSummary: string
  blueprintHeadline: string
  topOpportunities: AutomationOpportunity[]
  quickWins: AutomationOpportunity[]
  customToolIdeas: AutomationOpportunity[]
  humanLedTasks: string[]
  automationMap: AutomationMapGroup[]
  agentTeam?: AgentTeam
  workflowSchematic?: WorkflowSchematic
  suggestedPromptTemplate: {
    title: string
    useCase: string
    prompt: string
  }
  waitlistHook: string
}

export type BlueprintGenerateResponse = {
  blueprint: AutomationBlueprint
  blueprintId: string
  generatedBy: "fireworks" | "local"
}
