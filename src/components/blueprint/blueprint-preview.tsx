"use client"

import { ArrowRight, CheckCircle2, Download, Loader2 } from "lucide-react"
import { useEffect, useId, useMemo, useRef, useState } from "react"
import type {
  AgentTeam,
  AgentTeamMember,
  AutomationBlueprint,
  AutomationOpportunity,
  WorkflowSchematic
} from "@/lib/blueprint/types"

type BlueprintPreviewProps = {
  blueprint: AutomationBlueprint
  onUnlock: () => void
  onDirectSubmit: (email: string) => Promise<void>
}

type TransformationPreview = {
  title: string
  summary: string
  automationLabel: string
  hoursPerWeek?: number
  mermaid: string
  stages: Stage[]
}

type Stage = {
  eyebrow: string
  title: string
  body: string
}

const AGENT_ACCENTS = ["#83A5D4", "#F3C5CB", "#A99CF2", "#C9D9F2"]
const SVG_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"

function getFirstOpportunity(blueprint: AutomationBlueprint) {
  return (
    blueprint.topOpportunities[0] ??
    blueprint.quickWins[0] ??
    blueprint.customToolIdeas[0] ??
    null
  )
}

function buildFallbackSchematic(
  opportunity: AutomationOpportunity | null
): WorkflowSchematic {
  const task = opportunity?.taskName ?? "your first repeatable task"
  const input = opportunity?.requiredInputs[0] ?? "messy notes"
  const output = opportunity?.expectedOutputs[0] ?? "a useful draft"

  return {
    title: `${task} workflow`,
    summary: `Turn ${input.toLowerCase()} into ${output.toLowerCase()}.`,
    steps: [
      {
        id: "input",
        label: input,
        detail: `Use the material that normally kicks off ${task.toLowerCase()}.`
      },
      {
        id: "ai_work",
        label: `Draft ${output}`,
        detail:
          "AI pulls out what matters, organizes it, and drafts the first version."
      },
      {
        id: "review",
        label: "Spot-check the draft",
        detail: "You check the draft and make the final call."
      },
      {
        id: "output",
        label: output,
        detail: `You end with ${output.toLowerCase()} ready to use.`
      }
    ],
    mermaid: "",
    handoffNote: "Final approval happens before anything is sent or saved."
  }
}

function humanizeAutomationType(value?: string) {
  if (!value) return "AI workflow"

  return value
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function getAutomationLabel(opportunity: AutomationOpportunity | null) {
  const tool = opportunity?.requiredInputs.find(input => {
    return !input.toLowerCase().startsWith("definition of")
  })
  const output = opportunity?.expectedOutputs[0]

  if (tool && output)
    return `${shortText(tool, 18)} -> ${shortText(output, 22)}`

  return humanizeAutomationType(opportunity?.automationType)
}

function findStep(
  steps: WorkflowSchematic["steps"],
  patterns: string[],
  fallbackIndex: number
) {
  return (
    steps.find(step => {
      const text = `${step.label} ${step.detail}`.toLowerCase()
      return patterns.some(pattern => text.includes(pattern))
    }) ??
    steps[Math.min(Math.max(fallbackIndex, 0), Math.max(steps.length - 1, 0))]
  )
}

function getStep(
  steps: WorkflowSchematic["steps"],
  id: string,
  patterns: string[],
  fallbackIndex: number
) {
  return (
    steps.find(step => step.id === id) ??
    findStep(steps, patterns, fallbackIndex)
  )
}

function shortText(value: string, maxLength: number) {
  const trimmed = value.trim()
  if (trimmed.length <= maxLength) return trimmed

  return `${trimmed.slice(0, maxLength - 1).trim()}...`
}

function mermaidText(value: string, maxLength = 44) {
  return shortText(value, maxLength)
    .replace(/"/g, "'")
    .replace(/[{}[\]]/g, "")
}

function buildMermaidFromStages(stages: Stage[]) {
  const [input, ai, review, output] = stages

  return `flowchart LR
  trigger["Trigger<br/>${mermaidText(input.title)}"]:::trigger
  ai["AI action<br/>${mermaidText(ai.title)}"]:::ai
  review{"Human check<br/>${mermaidText(review.title)}"}:::review
  output["Destination<br/>${mermaidText(output.title)}"]:::output

  trigger --> ai --> review --> output

  classDef trigger fill:#FDFDF9,stroke:#83A5D4,stroke-width:2px,color:#18181B;
  classDef ai fill:#83A5D4,stroke:#5D82B8,stroke-width:2px,color:#FFFFFF;
  classDef review fill:#EDF3FB,stroke:#83A5D4,stroke-width:2px,color:#18181B;
  classDef output fill:#FDFDF9,stroke:#83A5D4,stroke-width:2px,color:#18181B;`
}

function normalizeMermaid(value?: string) {
  if (!value) return ""

  return value
    .replace(/^```mermaid\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim()
}

function stageFromStep(
  eyebrow: string,
  step: WorkflowSchematic["steps"][number] | undefined,
  fallbackTitle: string,
  fallbackBody: string
): Stage {
  return {
    eyebrow,
    title: step?.label.trim() || fallbackTitle,
    body: step?.detail.trim() || fallbackBody
  }
}

function buildTransformationPreview(
  blueprint: AutomationBlueprint
): TransformationPreview {
  const opportunity = getFirstOpportunity(blueprint)
  const schematic =
    blueprint.workflowSchematic ?? buildFallbackSchematic(opportunity)
  const steps = schematic.steps
  const inputStep = getStep(
    steps,
    "input",
    ["input", "start", "source", "paste"],
    0
  )
  const aiStep = getStep(
    steps,
    "ai_work",
    ["ai", "draft", "sort", "write", "pull"],
    1
  )
  const reviewStep = getStep(
    steps,
    "review",
    ["review", "approve", "check", "spot"],
    2
  )
  const outputStep = getStep(
    steps,
    "output",
    ["output", "publish", "send", "save", "ready"],
    3
  )
  const fallbackSchematic = buildFallbackSchematic(opportunity)
  const fallbackSteps = fallbackSchematic.steps
  const stages = [
    stageFromStep(
      "Input",
      inputStep,
      fallbackSteps[0]?.label ?? "Messy source material",
      fallbackSteps[0]?.detail ?? "Start with the raw work you already collect."
    ),
    stageFromStep(
      "AI does",
      aiStep,
      fallbackSteps[1]?.label ?? "Draft the useful version",
      fallbackSteps[1]?.detail ??
        "AI finds what matters, organizes it, and writes the first pass."
    ),
    stageFromStep(
      "You do",
      reviewStep,
      fallbackSteps[2]?.label ?? "Spot-check the result",
      fallbackSteps[2]?.detail ??
        "You check the important details and approve the final version."
    ),
    stageFromStep(
      "Output",
      outputStep,
      fallbackSteps[3]?.label ?? "Ready to use",
      fallbackSteps[3]?.detail ??
        "You get the finished output in the right format."
    )
  ]

  return {
    title: schematic.title,
    summary: schematic.summary || fallbackSchematic.summary,
    automationLabel: blueprint.agentTeam
      ? `${blueprint.agentTeam.agents.length} agents · ${blueprint.agentTeam.hoursPerWeek} hrs/week`
      : getAutomationLabel(opportunity),
    hoursPerWeek: blueprint.agentTeam?.hoursPerWeek,
    mermaid:
      normalizeMermaid(schematic.mermaid) || buildMermaidFromStages(stages),
    stages
  }
}

function getStages(preview: TransformationPreview): Stage[] {
  return preview.stages
}

function buildFallbackAgentTeam(preview: TransformationPreview): AgentTeam {
  return {
    hoursPerWeek: preview.hoursPerWeek ?? 8,
    summary: preview.summary,
    agents: preview.stages.map((stage, index) => ({
      name: ["Iris", "Theo", "Juno", "Ada"][index] ?? `Agent ${index + 1}`,
      role: stage.title,
      handles: stage.body,
      schedule:
        ["Every 30 min", "Daily 9am", "On demand", "Weekly Mon"][index] ??
        "Weekly Mon"
    }))
  }
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function wrapText(value: string, maxChars: number) {
  const words = value.trim().split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ""

  words.forEach(word => {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
      return
    }
    current = next
  })

  if (current) lines.push(current)
  return lines.length ? lines : [value]
}

function svgText({
  value,
  x,
  y,
  maxChars,
  fontSize,
  lineHeight,
  color,
  weight = 400,
  family = SVG_FONT,
  maxLines
}: {
  value: string
  x: number
  y: number
  maxChars: number
  fontSize: number
  lineHeight: number
  color: string
  weight?: number
  family?: string
  maxLines?: number
}) {
  const wrapped = wrapText(value, maxChars)
  const lines = wrapped.slice(0, maxLines)
  const trimmed =
    maxLines && wrapped.length > maxLines
      ? lines.map((line, index) =>
          index === lines.length - 1 ? `${line.replace(/\.+$/, "")}...` : line
        )
      : lines

  return trimmed
    .map((line, index) => {
      return `<text x="${x}" y="${y + index * lineHeight}" font-family="${family}" font-size="${fontSize}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`
    })
    .join("")
}

function splitDetailParts(value: string) {
  const cleaned = value
    .replace(/\s+/g, " ")
    .replace(/\.$/, "")
    .replace(/^AI\s+/i, "")
    .trim()

  const parts = cleaned
    .split(/,\s+|;\s+|\s+and\s+/)
    .map(part => part.trim())
    .filter(part => part.length > 10)

  return (parts.length > 1 ? parts : [cleaned]).slice(0, 4)
}

async function renderMermaidSvg(chart: string, renderId: string) {
  const mermaid = (await import("mermaid")).default

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
      fontFamily: SVG_FONT,
      primaryColor: "#FDFDF9",
      primaryTextColor: "#18181B",
      primaryBorderColor: "#83A5D4",
      lineColor: "#83A5D4",
      secondaryColor: "#EDF3FB",
      tertiaryColor: "#FDFDF9",
      background: "#FDFDF9"
    },
    flowchart: {
      curve: "basis",
      htmlLabels: true,
      nodeSpacing: 70,
      rankSpacing: 90
    }
  })

  const { svg } = await mermaid.render(renderId, chart)
  return svg
}

function buildWorkflowSvg(preview: TransformationPreview) {
  const width = 1800
  const height = 1200
  const stages = getStages(preview)
  const [input, ai, review, output] = stages
  const aiParts = splitDetailParts(ai.body)
  const aiNodes = aiParts
    .map((part, index) => {
      const y = 530 + index * 76
      return `
        <rect x="612" y="${y}" width="396" height="56" rx="18" fill="#f8fbff" opacity="0.18" />
        <rect x="634" y="${y + 20}" width="16" height="16" rx="5" fill="#f8fbff" />
        ${svgText({
          value: part,
          x: 666,
          y: y + 34,
          maxChars: 35,
          fontSize: 17,
          lineHeight: 21,
          color: "#f8fbff",
          weight: 700,
          maxLines: 1
        })}
      `
    })
    .join("")

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#dbe5f1" stroke-width="1" opacity="0.55"/>
        </pattern>
        <marker id="arrow" markerWidth="18" markerHeight="18" refX="15" refY="9" orient="auto">
          <path d="M 2 2 L 16 9 L 2 16 Z" fill="#83A5D4" />
        </marker>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#0f172a" flood-opacity="0.12"/>
        </filter>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.10"/>
        </filter>
      </defs>
      <rect width="${width}" height="${height}" fill="#FDFDF9"/>
      <rect x="62" y="64" width="1676" height="1072" rx="46" fill="#FDFDF9" stroke="#dce7f3" stroke-width="2" filter="url(#shadow)"/>
      <rect x="96" y="304" width="1608" height="632" rx="34" fill="url(#grid)" opacity="0.78"/>
      <rect x="96" y="304" width="1608" height="632" rx="34" fill="#FDFDF9" opacity="0.72" stroke="#dce7f3"/>

      <text x="116" y="132" font-family="${SVG_FONT}" font-size="22" font-weight="900" letter-spacing="4" fill="#9ca3af">YAVEN WORKFLOW SCHEMATIC</text>
      <rect x="1296" y="96" width="358" height="50" rx="25" fill="#83A5D4"/>
      <text x="1322" y="128" font-family="${SVG_FONT}" font-size="16" font-weight="900" fill="#ffffff">${escapeXml(shortText(preview.automationLabel, 36))}</text>
      ${svgText({
        value: preview.title,
        x: 116,
        y: 220,
        maxChars: 58,
        fontSize: 58,
        lineHeight: 62,
        color: "#18181b",
        weight: 500,
        family: SVG_FONT,
        maxLines: 2
      })}
      ${svgText({
        value: preview.summary,
        x: 116,
        y: 330,
        maxChars: 95,
        fontSize: 25,
        lineHeight: 34,
        color: "#52525b",
        weight: 500,
        maxLines: 2
      })}

      <line x1="430" y1="622" x2="552" y2="622" stroke="#83A5D4" stroke-width="8" stroke-linecap="round" marker-end="url(#arrow)" />
      <line x1="1048" y1="622" x2="1128" y2="622" stroke="#83A5D4" stroke-width="8" stroke-linecap="round" marker-end="url(#arrow)" />
      <line x1="1398" y1="622" x2="1472" y2="622" stroke="#83A5D4" stroke-width="8" stroke-linecap="round" marker-end="url(#arrow)" />

      <rect x="132" y="458" width="298" height="328" rx="30" fill="#ffffff" stroke="#d4dce8" filter="url(#softShadow)"/>
      <rect x="150" y="478" width="44" height="44" rx="14" fill="#edf3fb"/>
      <text x="164" y="508" font-family="${SVG_FONT}" font-size="20" font-weight="900" fill="#83A5D4">1</text>
      <text x="208" y="506" font-family="${SVG_FONT}" font-size="15" font-weight="900" letter-spacing="3" fill="#83A5D4">RAW INPUT</text>
      ${svgText({
        value: input.title,
        x: 162,
        y: 578,
        maxChars: 22,
        fontSize: 31,
        lineHeight: 35,
        color: "#18181b",
        weight: 500,
        family: SVG_FONT,
        maxLines: 2
      })}
      ${svgText({
        value: shortText(input.body, 130),
        x: 162,
        y: 682,
        maxChars: 31,
        fontSize: 18,
        lineHeight: 26,
        color: "#52525b",
        maxLines: 3
      })}

      <rect x="552" y="392" width="496" height="460" rx="38" fill="#83A5D4" filter="url(#softShadow)"/>
      <rect x="578" y="422" width="48" height="48" rx="16" fill="#f8fbff" opacity="0.22"/>
      <text x="593" y="455" font-family="${SVG_FONT}" font-size="20" font-weight="900" fill="#ffffff">2</text>
      <text x="646" y="452" font-family="${SVG_FONT}" font-size="15" font-weight="900" letter-spacing="3" fill="#edf3fb">AI WORKSPACE</text>
      ${svgText({
        value: ai.title,
        x: 604,
        y: 504,
        maxChars: 27,
        fontSize: 35,
        lineHeight: 39,
        color: "#ffffff",
        weight: 500,
        family: SVG_FONT,
        maxLines: 1
      })}
      ${aiNodes}

      <rect x="1128" y="458" width="270" height="328" rx="30" fill="#ffffff" stroke="#d4dce8" filter="url(#softShadow)"/>
      <path d="M 1263 476 L 1374 594 L 1263 712 L 1152 594 Z" fill="#edf3fb" stroke="#b9cdeb" stroke-width="2"/>
      <text x="1254" y="529" font-family="${SVG_FONT}" font-size="20" font-weight="900" fill="#83A5D4">3</text>
      <text x="1192" y="594" font-family="${SVG_FONT}" font-size="15" font-weight="900" letter-spacing="3" fill="#83A5D4">HUMAN CHECK</text>
      ${svgText({
        value: review.title,
        x: 1166,
        y: 674,
        maxChars: 20,
        fontSize: 29,
        lineHeight: 33,
        color: "#18181b",
        weight: 500,
        family: SVG_FONT,
        maxLines: 2
      })}
      ${svgText({
        value: shortText(review.body, 100),
        x: 1166,
        y: 750,
        maxChars: 27,
        fontSize: 16,
        lineHeight: 22,
        color: "#52525b",
        maxLines: 2
      })}

      <rect x="1472" y="458" width="260" height="328" rx="30" fill="#ffffff" stroke="#d4dce8" filter="url(#softShadow)"/>
      <rect x="1492" y="478" width="44" height="44" rx="14" fill="#edf3fb"/>
      <text x="1505" y="508" font-family="${SVG_FONT}" font-size="20" font-weight="900" fill="#83A5D4">4</text>
      <text x="1548" y="506" font-family="${SVG_FONT}" font-size="15" font-weight="900" letter-spacing="3" fill="#83A5D4">OUTPUT</text>
      ${svgText({
        value: output.title,
        x: 1502,
        y: 578,
        maxChars: 19,
        fontSize: 31,
        lineHeight: 35,
        color: "#18181b",
        weight: 500,
        family: SVG_FONT,
        maxLines: 2
      })}
      ${svgText({
        value: shortText(output.body, 110),
        x: 1502,
        y: 682,
        maxChars: 25,
        fontSize: 18,
        lineHeight: 26,
        color: "#52525b",
        maxLines: 3
      })}

      <rect x="132" y="972" width="730" height="96" rx="28" fill="#ffffff" stroke="#dce7f3"/>
      <text x="170" y="1012" font-family="${SVG_FONT}" font-size="15" font-weight="900" letter-spacing="3" fill="#9ca3af">BEFORE</text>
      ${svgText({
        value: input.title,
        x: 170,
        y: 1048,
        maxChars: 50,
        fontSize: 26,
        lineHeight: 30,
        color: "#18181b",
        weight: 500,
        family: SVG_FONT,
        maxLines: 1
      })}
      <line x1="892" y1="1020" x2="938" y2="1020" stroke="#83A5D4" stroke-width="7" stroke-linecap="round" marker-end="url(#arrow)" />
      <rect x="968" y="972" width="730" height="96" rx="28" fill="#edf3fb" stroke="#b9cdeb"/>
      <text x="1006" y="1012" font-family="${SVG_FONT}" font-size="15" font-weight="900" letter-spacing="3" fill="#83A5D4">AFTER</text>
      ${svgText({
        value: output.title,
        x: 1006,
        y: 1048,
        maxChars: 50,
        fontSize: 26,
        lineHeight: 30,
        color: "#18181b",
        weight: 500,
        family: SVG_FONT,
        maxLines: 1
      })}
    </svg>
  `.trim()
}

function buildAgentTeamSvg(
  preview: TransformationPreview,
  agentTeam: AgentTeam
) {
  const width = 1600
  const height = 1500
  const headerHeight = 520
  const cardWidth = width / 2
  const cardHeight = 420
  const agents = agentTeam.agents.slice(0, 4)

  const cards = agents
    .map((agent, index) => {
      const col = index % 2
      const row = Math.floor(index / 2)
      const x = col * cardWidth
      const y = headerHeight + row * cardHeight
      const accent = AGENT_ACCENTS[index % AGENT_ACCENTS.length]

      return `
        <rect x="${x + 18}" y="${y + 18}" width="${cardWidth - 36}" height="${cardHeight - 36}" rx="30" fill="#FDFDF9" stroke="#83A5D4" stroke-opacity="0.32" stroke-width="2"/>
        <rect x="${x + 18}" y="${y + 18}" width="${cardWidth - 36}" height="12" rx="6" fill="${accent}" opacity="0.9"/>
        <rect x="${x + 54}" y="${y + 67}" width="24" height="24" rx="7" fill="${accent}"/>
        <text x="${x + 94}" y="${y + 91}" font-family="${SVG_FONT}" font-size="48" font-weight="800" fill="#1a2744">${escapeXml(agent.name)}</text>
        <text x="${x + 94}" y="${y + 132}" font-family="${SVG_FONT}" font-size="20" font-weight="700" fill="#6b7280">${escapeXml(agent.role)}</text>
        ${svgText({
          value: agent.handles,
          x: x + 46,
          y: y + 210,
          maxChars: 58,
          fontSize: 26,
          lineHeight: 39,
          color: "#18181b",
          weight: 500,
          maxLines: 4
        })}
        <rect x="${x + 46}" y="${y + cardHeight - 92}" width="${Math.max(166, agent.schedule.length * 12)}" height="44" fill="${accent}" rx="22" opacity="0.95"/>
        <text x="${x + 66}" y="${y + cardHeight - 63}" font-family="${SVG_FONT}" font-size="18" font-weight="800" fill="#1a2744">${escapeXml(agent.schedule)}</text>
      `
    })
    .join("")

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#FDFDF9"/>
      <rect x="34" y="34" width="${width - 68}" height="${headerHeight - 34}" rx="42" fill="#EDF3FB"/>
      <rect x="1178" y="82" width="286" height="18" rx="9" fill="#F3C5CB" opacity="0.9"/>
      <rect x="1178" y="118" width="226" height="18" rx="9" fill="#A99CF2" opacity="0.42"/>
      <text x="60" y="86" font-family="${SVG_FONT}" font-size="22" font-weight="800" fill="#1f496c">Your AI team</text>
      <text x="58" y="292" font-family="${SVG_FONT}" font-size="218" font-weight="900" fill="#A99CF2">${agentTeam.hoursPerWeek}</text>
      <text x="338" y="253" font-family="${SVG_FONT}" font-size="52" font-weight="900" fill="#1a2744">HRS / WEEK</text>
      <text x="338" y="312" font-family="${SVG_FONT}" font-size="52" font-weight="900" fill="#1a2744">BACK</text>
      ${svgText({
        value: agentTeam.summary || preview.summary,
        x: 60,
        y: 424,
        maxChars: 86,
        fontSize: 30,
        lineHeight: 44,
        color: "#1f496c",
        weight: 500,
        maxLines: 2
      })}
      ${cards}
      <rect x="34" y="${height - 24}" width="${width - 68}" height="10" rx="5" fill="#83A5D4"/>
    </svg>
  `.trim()
}

async function downloadWorkflowImage(blueprint: AutomationBlueprint) {
  const preview = buildTransformationPreview(blueprint)
  const agentTeam = blueprint.agentTeam ?? buildFallbackAgentTeam(preview)
  let svg = buildAgentTeamSvg(preview, agentTeam)

  if (!blueprint.agentTeam) {
    try {
      svg = await renderMermaidSvg(
        preview.mermaid,
        `workflow-download-${Date.now()}`
      )
    } catch {
      svg = buildWorkflowSvg(preview)
    }
  }

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const image = new Image()

  image.onload = () => {
    const canvas = document.createElement("canvas")
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    const context = canvas.getContext("2d")
    if (!context) {
      downloadWorkflowSvg(url)
      return
    }

    context.fillStyle = "#FDFDF9"
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0)

    canvas.toBlob(blob => {
      if (!blob) {
        downloadWorkflowSvg(url)
        return
      }

      const pngUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = pngUrl
      link.download = "yaven-ai-team.png"
      document.body.append(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      window.setTimeout(() => URL.revokeObjectURL(pngUrl), 500)
    }, "image/png")
  }

  image.onerror = () => downloadWorkflowSvg(url)
  image.src = url
}

function downloadWorkflowSvg(url: string) {
  const link = document.createElement("a")
  link.href = url
  link.download = "yaven-ai-team.svg"
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 500)
}

function MermaidWorkflow({
  preview,
  stages
}: {
  preview: TransformationPreview
  stages: Stage[]
}) {
  const rawId = useId()
  const renderId = `workflow-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`
  const [svg, setSvg] = useState("")
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true

    renderMermaidSvg(preview.mermaid, renderId)
      .then(nextSvg => {
        if (!active) return
        setSvg(nextSvg)
        setFailed(false)
      })
      .catch(() => {
        if (!active) return
        setSvg("")
        setFailed(true)
      })

    return () => {
      active = false
    }
  }, [preview.mermaid, renderId])

  if (failed) {
    return (
      <div className="mt-6 grid gap-3 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {stages.map((stage, index) => (
          <div key={stage.eyebrow} className="contents">
            <TransformationStage stage={stage} index={index} />
            {index < stages.length - 1 && <TransformationArrow />}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-[#83A5D4]/25 bg-[#FDFDF9] p-4 shadow-sm">
      {svg ? (
        <div
          className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex min-h-[18rem] items-center justify-center text-sm text-zinc-500">
          Drawing workflow...
        </div>
      )}
    </div>
  )
}

function TransformationStage({
  stage,
  index
}: {
  stage: Stage
  index: number
}) {
  const isAi = index === 1

  return (
    <div
      className={`min-h-[14rem] rounded-[1.35rem] border p-4 shadow-sm ${
        isAi
          ? "border-[#83A5D4] bg-[#83A5D4] text-white"
          : "border-zinc-200 bg-[#FDFDF9] text-zinc-900"
      }`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
          isAi ? "text-white/70" : "text-[#83A5D4]"
        }`}
      >
        {stage.eyebrow}
      </p>
      <h5 className="mt-2 text-[1.35rem] font-semibold leading-[1.08] font-instrument-serif">
        {stage.title}
      </h5>
      <p
        className={`mt-4 text-sm leading-6 ${
          isAi ? "text-white/90" : "text-zinc-600"
        }`}
      >
        {stage.body}
      </p>
    </div>
  )
}

function TransformationArrow() {
  return (
    <div className="hidden items-center justify-center xl:flex">
      <ArrowRight className="size-5 text-[#83A5D4]" />
    </div>
  )
}

function AgentCard({
  agent,
  accent
}: {
  agent: AgentTeamMember
  accent: string
}) {
  return (
    <article className="min-h-[18rem] rounded-[1.25rem] border border-[#83A5D4]/25 bg-[#FDFDF9] p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="mt-1.5 size-3.5 shrink-0 rounded-[0.35rem]"
            style={{ backgroundColor: accent }}
          />
          <div>
            <h5 className="text-3xl font-semibold leading-tight text-[#1a2744] font-instrument-serif">
              {agent.name}
            </h5>
            <p className="mt-2 text-sm font-semibold leading-5 text-zinc-500">
              {agent.role}
            </p>
          </div>
        </div>
        <span
          className="shrink-0 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold text-[#1a2744]"
          style={{ backgroundColor: accent }}
        >
          {agent.schedule}
        </span>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-700">
        {agent.handles}
      </p>
    </article>
  )
}

function AgentTeamPoster({
  preview,
  agentTeam,
  onDownload
}: {
  preview: TransformationPreview
  agentTeam: AgentTeam
  onDownload: () => void
}) {
  return (
    <div aria-label="AI team preview">
      <div className="px-1 py-4 text-[#1a2744]">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#1f496c]">
            What <span className="font-bold italic text-shimmer-dark">yaven</span>{" "}
            could help you with
          </p>
          <button
            type="button"
            onClick={onDownload}
            aria-label="Download blueprint"
            className="inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 bg-[#FDFDF9] text-zinc-500 transition-colors hover:border-zinc-400"
          >
            <Download className="size-3.5" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-x-7 gap-y-2">
          <span className="text-[6rem] font-black leading-[0.75] tracking-normal text-[#83A5D4] sm:text-[8rem] font-instrument-serif">
            {agentTeam.hoursPerWeek}
          </span>
          <div className="pb-2 text-3xl font-black uppercase leading-[0.95] tracking-normal text-[#1a2744] sm:text-4xl font-instrument-serif">
            <span className="block">hrs / week</span>
            <span className="block">back</span>
          </div>
        </div>
        <p className="mt-4 text-base leading-7 text-[#1f496c]">
          {agentTeam.summary || preview.summary}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {agentTeam.agents.slice(0, 4).map((agent, index) => (
          <AgentCard
            key={`${agent.name}-${agent.role}`}
            agent={agent}
            accent={AGENT_ACCENTS[index % AGENT_ACCENTS.length]}
          />
        ))}
      </div>
    </div>
  )
}

function AutomationSchematic({
  blueprint,
  onDownload
}: {
  blueprint: AutomationBlueprint
  onDownload: () => void
}) {
  const preview = useMemo(
    () => buildTransformationPreview(blueprint),
    [blueprint]
  )
  const stages = getStages(preview)
  const agentTeam = blueprint.agentTeam ?? buildFallbackAgentTeam(preview)

  return (
    <>
      <AgentTeamPoster preview={preview} agentTeam={agentTeam} onDownload={onDownload} />
      {!blueprint.agentTeam && (
        <MermaidWorkflow preview={preview} stages={stages} />
      )}
    </>
  )
}

function PreviewIntro({ blueprint }: { blueprint: AutomationBlueprint }) {
  return (
    <div className="rounded-2xl border border-[#83A5D4]/40 bg-[#FDFDF9] p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
        Your automation preview is ready
      </p>
      <h3 className="mt-2 text-2xl leading-tight text-zinc-900 font-instrument-serif">
        {blueprint.blueprintHeadline}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600">
        {blueprint.userSummary}
      </p>
    </div>
  )
}

export function BlueprintPreview({
  blueprint,
  onUnlock,
  onDirectSubmit
}: BlueprintPreviewProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleInlineSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setSubmitError("")
    try {
      await onDirectSubmit(email.trim())
    } catch {
      setSubmitError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5 pb-28">
      {!blueprint.agentTeam && <PreviewIntro blueprint={blueprint} />}

      <AutomationSchematic blueprint={blueprint} onDownload={() => void downloadWorkflowImage(blueprint)} />

      <div className="sticky bottom-0 bg-gradient-to-t from-[#FDFDF9] via-[#FDFDF9]/95 to-transparent pt-8 pb-1">
        {/* Desktop: inline email form */}
        <form onSubmit={handleInlineSubmit} className="hidden sm:flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1 shadow-sm focus-within:border-[#83A5D4]">
            <input
              ref={inputRef}
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="animate-slow-bounce inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:animate-none hover:bg-zinc-700 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <>Get early access <ArrowRight className="size-4" /></>}
          </button>
          {submitError && <p className="absolute bottom-full mb-2 text-xs text-red-500">{submitError}</p>}
        </form>

        {/* Mobile: CTA button → email phase */}
        <button
          type="button"
          onClick={onUnlock}
          className="animate-slow-bounce sm:hidden w-full inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-md transition-transform hover:animate-none hover:bg-zinc-700"
        >
          Claim my spot <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
