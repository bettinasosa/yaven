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

export const toolsByRole: Record<string, string[]> = {
  "Founder": [
    "Notion",
    "Linear",
    "HubSpot",
    "Slack",
    "Gmail / Outlook",
    "Zoom / Gmeet",
    "Google Drive",
    "Stripe",
    "QuickBooks",
    "Calendly",
    "Loom",
    "Airtable",
    "Granola",
    "LinkedIn",
    OTHER_OPTION
  ],
  "Freelancer": [
    "Notion",
    "Gmail / Outlook",
    "Slack",
    "Figma",
    "Canva",
    "Google Drive",
    "Calendly",
    "Stripe",
    "Toggl",
    "Harvest",
    "Zoom / Gmeet",
    OTHER_OPTION
  ],
  "Consultant": [
    "Notion",
    "Google Slides",
    "Excel",
    "Gmail / Outlook",
    "Zoom / Gmeet",
    "Slack",
    "HubSpot",
    "Calendly",
    "Loom",
    "Miro",
    OTHER_OPTION
  ],
  "Creator": [
    "Notion",
    "Canva",
    "CapCut",
    "Premiere Pro",
    "ChatGPT",
    "TikTok Studio",
    "YouTube Studio",
    "Beehiiv",
    "ConvertKit",
    "Slack",
    OTHER_OPTION
  ],
  "Operator": [
    "Notion",
    "Airtable",
    "Slack",
    "Gmail / Outlook",
    "Google Sheets",
    "Zapier",
    "Linear",
    "Asana",
    "ClickUp",
    "Loom",
    OTHER_OPTION
  ],
  "Sales / BD": [
    "Apollo",
    "Clay",
    "HubSpot",
    "Salesforce",
    "LinkedIn",
    "Instantly",
    "Granola",
    "Notion",
    "Slack",
    "Gmail / Outlook",
    "Excel / Sheets",
    "Calendly",
    "Zoom / Gmeet",
    OTHER_OPTION
  ],
  "Marketing": [
    "HubSpot",
    "Mailchimp",
    "Klaviyo",
    "Canva",
    "Figma",
    "Google Analytics",
    "Meta Ads",
    "Notion",
    "Slack",
    "Buffer",
    "Loom",
    "Google Sheets",
    OTHER_OPTION
  ],
  "Product": [
    "Notion",
    "Linear",
    "Jira",
    "Figma",
    "Slack",
    "Zoom / Gmeet",
    "Mixpanel",
    "Amplitude",
    "Loom",
    "Confluence",
    "Miro",
    OTHER_OPTION
  ],
  "Engineering": [
    "GitHub",
    "Linear",
    "Jira",
    "Slack",
    "Notion",
    "Figma",
    "VS Code",
    "Datadog",
    "Sentry",
    "Confluence",
    "Zoom / Gmeet",
    OTHER_OPTION
  ],
  "Recruiting": [
    "LinkedIn",
    "Greenhouse",
    "Lever",
    "Ashby",
    "Notion",
    "Slack",
    "Gmail / Outlook",
    "Calendly",
    "Workable",
    "Loom",
    "Google Sheets",
    OTHER_OPTION
  ],
  "Customer Success": [
    "Intercom",
    "Zendesk",
    "HubSpot",
    "Salesforce",
    "Slack",
    "Notion",
    "Zoom / Gmeet",
    "Gainsight",
    "ChurnZero",
    "Calendly",
    OTHER_OPTION
  ],
  "Finance / Ops": [
    "QuickBooks",
    "Xero",
    "Stripe",
    "Notion",
    "Google Sheets",
    "Excel",
    "Slack",
    "Gmail / Outlook",
    "Airtable",
    "Bill.com",
    OTHER_OPTION
  ],
  "Executive Assistant": [
    "Gmail / Outlook",
    "Google Calendar",
    "Notion",
    "Slack",
    "Zoom / Gmeet",
    "Calendly",
    "Asana",
    "Google Drive",
    "Loom",
    "Trello",
    "ClickUp",
    OTHER_OPTION
  ],
  "Research": [
    "Notion",
    "Google Scholar",
    "Zotero",
    "Mendeley",
    "Obsidian",
    "Excel",
    "Google Sheets",
    "Slack",
    "Gmail / Outlook",
    "Zoom / Gmeet",
    "Miro",
    "Loom",
    "Airtable",
    OTHER_OPTION
  ],
  "Student": [
    "Notion",
    "Google Docs",
    "Google Scholar",
    "Zotero",
    "Obsidian",
    "ChatGPT",
    "Gmail / Outlook",
    "Zoom / Gmeet",
    "Slack",
    "Canvas",
    "Anki",
    OTHER_OPTION
  ],
  [OTHER_OPTION]: [
    "Gmail / Outlook",
    "Slack",
    "Notion",
    "Google Drive",
    "Google Sheets",
    "Excel",
    "Zoom / Gmeet",
    "Asana",
    "Trello",
    "ClickUp",
    "Airtable",
    "Loom",
    "ChatGPT",
    OTHER_OPTION
  ]
}

export const painfulTasksByRole: Record<string, string[]> = {
  "Founder": [
    "Chasing invoices",
    "Writing investor updates",
    "Answering intro emails",
    "Writing job descriptions",
    "Tidying meeting notes",
    "Summarising docs for the team",
    "Scheduling introductions",
    "Weekly status updates",
    OTHER_OPTION
  ],
  "Freelancer": [
    "Writing proposals and SOWs",
    "Chasing client feedback",
    "Sending invoices and payment reminders",
    "Updating time trackers",
    "Onboarding new clients",
    "Writing project status updates",
    OTHER_OPTION
  ],
  "Consultant": [
    "Writing meeting recaps",
    "Building slide decks",
    "Chasing client sign-offs",
    "Writing status reports",
    "Preparing agendas",
    "Summarising research",
    OTHER_OPTION
  ],
  "Creator": [
    "Repurposing long content into short clips",
    "Writing email newsletters",
    "Scheduling posts",
    "Responding to comments",
    "Writing video descriptions and tags",
    "Compiling analytics reports",
    OTHER_OPTION
  ],
  "Operator": [
    "Pulling data across tools into one place",
    "Writing weekly team updates",
    "Updating trackers after meetings",
    "Chasing people for status",
    "Building leadership reports",
    "Managing recurring tasks manually",
    OTHER_OPTION
  ],
  "Sales / BD": [
    "Copy-pasting outreach to LinkedIn",
    "Writing personalised follow-up emails",
    "Logging call notes to CRM",
    "Building prospect lists from scratch",
    "Sending connection requests",
    "Updating deal stages",
    "Writing cold email sequences",
    "Compiling the weekly pipeline report",
    "Scheduling follow-up meetings",
    "Enriching contact data manually",
    OTHER_OPTION
  ],
  "Marketing": [
    "Writing weekly performance reports",
    "Scheduling and posting social content",
    "Pulling analytics for decks",
    "Briefing freelancers",
    "Updating spreadsheets with campaign data",
    "Repurposing content across channels",
    "Writing first-draft copy",
    "Chasing approvals",
    OTHER_OPTION
  ],
  "Product": [
    "Writing user story tickets",
    "Summarising customer feedback",
    "Meeting notes and recaps",
    "Weekly product updates",
    "Updating roadmaps across tools",
    "Writing release notes",
    OTHER_OPTION
  ],
  "Engineering": [
    "Writing PR descriptions and release notes",
    "Copying tickets between tools",
    "Writing standup updates",
    "Documenting API endpoints",
    "Responding to repeated Slack questions",
    OTHER_OPTION
  ],
  "Recruiting": [
    "Writing personalised candidate outreach",
    "Updating candidate status in ATS",
    "Scheduling interviews",
    "Summarising interview notes",
    "Writing job descriptions",
    "Sending offer or rejection emails",
    OTHER_OPTION
  ],
  "Customer Success": [
    "Follow-up emails after calls",
    "Updating health scores in CRM",
    "Building QBR decks",
    "Logging support tickets",
    "Summarising call notes and action items",
    "Sending renewal reminders",
    OTHER_OPTION
  ],
  "Finance / Ops": [
    "Reconciling transactions",
    "Chasing approvals",
    "Writing expense reports",
    "Pulling monthly financials",
    "Updating spreadsheets",
    "Sending payment reminders",
    OTHER_OPTION
  ],
  "Executive Assistant": [
    "Scheduling and rescheduling meetings",
    "Managing email triage",
    "Writing meeting recaps",
    "Coordinating travel",
    "Following up on action items",
    "Preparing briefing docs",
    OTHER_OPTION
  ],
  "Research": [
    "Summarising papers and articles",
    "Pulling quotes and citations into notes",
    "Writing literature review sections",
    "Organising references in Zotero / Mendeley",
    "Transcribing interviews",
    "Building data collection trackers",
    "Formatting reports and presentations",
    "Writing meeting recaps from calls",
    "Keeping stakeholders updated",
    OTHER_OPTION
  ],
  "Student": [
    "Taking and tidying lecture notes",
    "Summarising readings and papers",
    "Writing essay drafts",
    "Organising references and citations",
    "Building revision notes from scratch",
    "Tracking deadlines and assignments",
    "Emailing tutors and professors",
    "Preparing for presentations",
    OTHER_OPTION
  ],
  [OTHER_OPTION]: [
    "Copy-pasting information across tools",
    "Drafting reports from research",
    "Writing repetitive emails",
    "Chasing people for updates",
    "Manually updating spreadsheets",
    "Taking and tidying meeting notes",
    "Building decks from scratch",
    "Logging the same thing in multiple places",
    OTHER_OPTION
  ]
}

export const blueprintQuestions: QuestionConfig[] = [
  {
    id: "role",
    title: "What kind of work do you do most days?",
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
      "Finance / Ops",
      "Executive Assistant",
      "Research",
      "Student",
      OTHER_OPTION
    ],
    mode: "single",
    primaryKey: "role"
  },
  {
    id: "toolsUsed",
    title: "Which tools do you use every day?",
    helper: "Select all that apply",
    mode: "multi",
    primaryKey: "toolsUsed"
  },
  {
    id: "painfulTasks",
    title: "What eats your time?",
    helper: "Pick everything that feels repetitive, boring, or generally takes up time.",
    mode: "multi",
    primaryKey: "painfulTasks"
  }
]
