import { generateFireworksBlueprint } from "@/lib/blueprint/fireworks"
import { generateLocalBlueprint } from "@/lib/blueprint/local-generator"
import { getAnsweredQuestionCount, parseBlueprintInput } from "@/lib/blueprint/validation"

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 })
  }

  const answers = parseBlueprintInput(
    typeof payload === "object" && payload !== null && "answers" in payload
      ? (payload as { answers: unknown }).answers
      : null
  )

  if (!answers || getAnsweredQuestionCount(answers) < 2) {
    return Response.json(
      { error: "More workflow context is required to generate a blueprint" },
      { status: 400 }
    )
  }

  const blueprintId = `blueprint_${crypto.randomUUID()}`

  try {
    const fireworksBlueprint = await generateFireworksBlueprint(answers)
    if (fireworksBlueprint) {
      return Response.json({
        blueprint: fireworksBlueprint,
        blueprintId,
        generatedBy: "fireworks"
      })
    }
  } catch (error) {
    console.error("Fireworks blueprint generation failed", error)
  }

  return Response.json({
    blueprint: generateLocalBlueprint(answers),
    blueprintId,
    generatedBy: "local"
  })
}
