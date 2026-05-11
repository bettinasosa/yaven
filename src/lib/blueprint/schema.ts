const scoreSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "repetition",
    "pain",
    "structure",
    "dataAvailability",
    "riskSuitability",
    "businessValue"
  ],
  properties: {
    repetition: { type: "number" },
    pain: { type: "number" },
    structure: { type: "number" },
    dataAvailability: { type: "number" },
    riskSuitability: { type: "number" },
    businessValue: { type: "number" }
  }
} as const

const opportunitySchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "id",
    "taskName",
    "category",
    "automationType",
    "valueLabel",
    "difficultyLabel",
    "scores",
    "whyAutomatable",
    "firstVersion",
    "requiredInputs",
    "expectedOutputs",
    "humanReviewNeeded"
  ],
  properties: {
    id: { type: "string" },
    taskName: { type: "string" },
    category: {
      type: "string",
      enum: [
        "communication",
        "admin",
        "research",
        "sales",
        "marketing",
        "operations",
        "engineering",
        "strategy",
        "customer_work",
        "other"
      ]
    },
    automationType: {
      type: "string",
      enum: [
        "prompt_template",
        "ai_assistant",
        "workflow_automation",
        "custom_tool",
        "human_led_ai_assisted"
      ]
    },
    valueLabel: { type: "string", enum: ["low", "medium", "high"] },
    difficultyLabel: { type: "string", enum: ["low", "medium", "high"] },
    scores: scoreSchema,
    whyAutomatable: { type: "string" },
    firstVersion: { type: "string" },
    requiredInputs: { type: "array", items: { type: "string" } },
    expectedOutputs: { type: "array", items: { type: "string" } },
    humanReviewNeeded: { type: "boolean" }
  }
} as const

const workflowSchematicSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "summary", "steps", "mermaid", "handoffNote"],
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    steps: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "label", "detail"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          detail: { type: "string" }
        }
      }
    },
    mermaid: { type: "string" },
    handoffNote: { type: "string" }
  }
} as const

export const workflowSchematicJsonSchema = workflowSchematicSchema

export const opportunitiesJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["opportunities"],
  properties: {
    opportunities: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["taskName", "description"],
        properties: {
          taskName: { type: "string" },
          description: { type: "string" }
        }
      }
    }
  }
} as const

export const automationBlueprintJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "userSummary",
    "blueprintHeadline",
    "topOpportunities",
    "quickWins",
    "customToolIdeas",
    "humanLedTasks",
    "automationMap",
    "workflowSchematic",
    "suggestedPromptTemplate",
    "waitlistHook"
  ],
  properties: {
    userSummary: { type: "string" },
    blueprintHeadline: { type: "string" },
    topOpportunities: {
      type: "array",
      items: opportunitySchema
    },
    quickWins: {
      type: "array",
      items: opportunitySchema
    },
    customToolIdeas: {
      type: "array",
      items: opportunitySchema
    },
    humanLedTasks: { type: "array", items: { type: "string" } },
    automationMap: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["category", "items"],
        properties: {
          category: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["task", "recommendation", "automationType"],
              properties: {
                task: { type: "string" },
                recommendation: { type: "string" },
                automationType: { type: "string" }
              }
            }
          }
        }
      }
    },
    workflowSchematic: workflowSchematicSchema,
    suggestedPromptTemplate: {
      type: "object",
      additionalProperties: false,
      required: ["title", "useCase", "prompt"],
      properties: {
        title: { type: "string" },
        useCase: { type: "string" },
        prompt: { type: "string" }
      }
    },
    waitlistHook: { type: "string" }
  }
} as const
