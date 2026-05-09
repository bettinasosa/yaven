"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import type {
  AutomationBlueprint,
  BlueprintGenerateResponse,
  BlueprintInput
} from "@/lib/blueprint/types"
import { getAnsweredQuestionCount } from "@/lib/blueprint/validation"
import {
  OTHER_OPTION,
  blueprintQuestions,
  emptyBlueprintInput
} from "./blueprint-config"
import { BlueprintModalShell } from "./blueprint-modal-shell"
import { BlueprintPreview } from "./blueprint-preview"
import { ChatQuestion } from "./chat-question"
import {
  GeneratingBlueprintState,
  IdleBlueprintState,
  IntroBlueprintState
} from "./blueprint-panel-states"
import {
  ARRAY_KEYS,
  STORAGE_KEY,
  freeTextForQuestion,
  readStoredSession,
  secondaryTextForQuestion,
  selectedForQuestion,
  splitList,
  trackBlueprintEvent,
  type PanelPhase
} from "./blueprint-panel-utils"
import { SuccessState } from "./success-state"
import { WaitlistForm } from "./waitlist-form"

export function BlueprintPanel() {
  const [phase, setPhase] = useState<PanelPhase>("idle")
  const [answers, setAnswers] = useState<BlueprintInput>(emptyBlueprintInput)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [draftText, setDraftText] = useState("")
  const [secondaryDraft, setSecondaryDraft] = useState("")
  const [blueprint, setBlueprint] = useState<AutomationBlueprint | null>(null)
  const [blueprintId, setBlueprintId] = useState("")
  const [error, setError] = useState("")
  const [emailStarted, setEmailStarted] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const question = blueprintQuestions[currentIndex]
  const dynamicChips = useMemo(() => question.chips ?? [], [question])

  const loadQuestionDraft = useCallback(
    (index: number, sourceAnswers: BlueprintInput) => {
      const nextQuestion = blueprintQuestions[index]
      setSelectedChips(selectedForQuestion(nextQuestion, sourceAnswers))
      setDraftText(freeTextForQuestion(nextQuestion, sourceAnswers))
      setSecondaryDraft(secondaryTextForQuestion(nextQuestion, sourceAnswers))
    },
    []
  )

  useEffect(() => {
    trackBlueprintEvent("blueprint_cta_viewed")
    const stored = readStoredSession()

    window.setTimeout(() => {
      if (!stored) {
        setHydrated(true)
        return
      }

      const storedAnswers = stored.answers ?? emptyBlueprintInput
      const storedIndex = Math.min(
        stored.currentIndex ?? 0,
        blueprintQuestions.length - 1
      )

      setAnswers(storedAnswers)
      setCurrentIndex(storedIndex)
      setBlueprint(stored.blueprint ?? null)
      setBlueprintId(stored.blueprintId ?? "")
      setPhase(stored.phase === "generating" ? "chat" : stored.phase ?? "idle")
      loadQuestionDraft(storedIndex, storedAnswers)
      setHydrated(true)
    }, 0)
  }, [loadQuestionDraft])

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return

    if (phase === "idle") {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ phase, currentIndex, answers, blueprint, blueprintId })
    )
  }, [answers, blueprint, blueprintId, currentIndex, hydrated, phase])

  useEffect(() => {
    if (phase === "idle" || typeof document === "undefined") return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [phase])

  function commitCurrentAnswer() {
    const nextAnswers = { ...answers }
    const selectedValues = selectedChips.filter(chip => chip !== OTHER_OPTION)
    const customValues = splitList(draftText)
    const primaryValue = ARRAY_KEYS.has(question.primaryKey)
      ? Array.from(new Set([...selectedValues, ...customValues]))
      : selectedChips.includes(OTHER_OPTION)
        ? draftText.trim() || OTHER_OPTION
        : draftText.trim() || selectedValues[0] || ""

    Object.assign(nextAnswers, { [question.primaryKey]: primaryValue })

    if (question.secondaryKey) {
      Object.assign(nextAnswers, {
        [question.secondaryKey]: ARRAY_KEYS.has(question.secondaryKey)
          ? splitList(secondaryDraft)
          : secondaryDraft.trim()
      })
    }

    setAnswers(nextAnswers)
    return nextAnswers
  }

  async function generateBlueprint(nextAnswers: BlueprintInput) {
    setPhase("generating")
    setError("")
    trackBlueprintEvent("blueprint_generation_started", {
      role: nextAnswers.role || null,
      questionsAnswered: getAnsweredQuestionCount(nextAnswers)
    })

    try {
      const response = await fetch("/api/blueprint/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: nextAnswers })
      })

      if (!response.ok) throw new Error("Blueprint generation failed")

      const data = (await response.json()) as BlueprintGenerateResponse
      setBlueprint(data.blueprint)
      setBlueprintId(data.blueprintId)
      setPhase("preview")
      trackBlueprintEvent("blueprint_generation_completed", {
        role: nextAnswers.role || null,
        generatedBy: data.generatedBy,
        topCategory: data.blueprint.topOpportunities[0]?.category ?? null
      })
      trackBlueprintEvent("blueprint_preview_viewed")
    } catch {
      setError("Blueprint generation failed. Please try again.")
      setPhase("chat")
    }
  }

  function handleStart() {
    setPhase("intro")
    trackBlueprintEvent("blueprint_cta_clicked")
  }

  function handleChatStart() {
    setPhase("chat")
    trackBlueprintEvent("blueprint_chat_started")
  }

  function handleToggleChip(chip: string) {
    if (question.mode === "single") {
      const isSelected = selectedChips.includes(chip)
      setSelectedChips(isSelected ? [] : [chip])
      setDraftText(isSelected || chip === OTHER_OPTION ? "" : chip)
      return
    }

    const isSelected = selectedChips.includes(chip)
    setSelectedChips(
      isSelected
        ? selectedChips.filter(item => item !== chip)
        : [...selectedChips, chip]
    )
    if (isSelected && chip === OTHER_OPTION) setDraftText("")
  }

  function handleBack() {
    const nextAnswers = commitCurrentAnswer()
    const nextIndex = Math.max(0, currentIndex - 1)
    setCurrentIndex(nextIndex)
    loadQuestionDraft(nextIndex, nextAnswers)
  }

  function handleContinue() {
    const nextAnswers = commitCurrentAnswer()
    const answered =
      selectedChips.length > 0 || draftText.trim() || secondaryDraft.trim()

    trackBlueprintEvent(
      answered ? "blueprint_question_answered" : "blueprint_question_skipped",
      {
        question: question.id,
        questionNumber: currentIndex + 1,
        role: nextAnswers.role || null
      }
    )

    if (currentIndex === blueprintQuestions.length - 1) {
      void generateBlueprint(nextAnswers)
      return
    }

    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex)
    loadQuestionDraft(nextIndex, nextAnswers)
  }

  function handleEmailStarted() {
    if (emailStarted) return
    setEmailStarted(true)
    trackBlueprintEvent("waitlist_email_started", {
      blueprintId: blueprintId || null
    })
  }

  function handleWaitlistSubmitted(email: string, desiredAutomation: string) {
    setPhase("success")
    trackBlueprintEvent("waitlist_email_submitted", {
      blueprintId: blueprintId || null,
      role: answers.role || null,
      desiredAutomation
    })
    trackBlueprintEvent("waitlist_signup_completed", {
      blueprintId: blueprintId || null,
      role: answers.role || null,
      emailDomain: email.split("@")[1] ?? null
    })
    window.setTimeout(() => {
      setIsClosing(true)
      window.setTimeout(() => {
        handleRestart()
      }, 500)
    }, 2200)
  }

  function handleClose() {
    setIsClosing(true)
    window.setTimeout(() => {
      handleRestart()
    }, 500)
  }

  function handleRestart() {
    setPhase("idle")
    setAnswers(emptyBlueprintInput)
    setCurrentIndex(0)
    setSelectedChips([])
    setDraftText("")
    setSecondaryDraft("")
    setBlueprint(null)
    setBlueprintId("")
    setError("")
    setEmailStarted(false)
    setIsClosing(false)
    window.localStorage.removeItem(STORAGE_KEY)
    trackBlueprintEvent("blueprint_chat_restarted")
  }

  const activeContent = (
    <>
      {phase === "intro" && <IntroBlueprintState onClick={handleChatStart} />}

      {phase === "chat" && (
        <div className="flex min-h-full flex-col gap-4">
          <ChatQuestion
            question={question}
            questionNumber={currentIndex + 1}
            totalQuestions={blueprintQuestions.length}
            chips={dynamicChips}
            selectedChips={selectedChips}
            textValue={draftText}
            secondaryValue={secondaryDraft}
            canGoBack={currentIndex > 0}
            canContinue={currentIndex > 0 || selectedChips.length > 0 || draftText.trim().split(/\s+/).filter(Boolean).length >= 3}
            onToggleChip={handleToggleChip}
            onTextChange={setDraftText}
            onSecondaryChange={setSecondaryDraft}
            onBack={handleBack}
            onContinue={handleContinue}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )}

      {phase === "generating" && <GeneratingBlueprintState />}

      {phase === "preview" && blueprint && (
        <BlueprintPreview
          blueprint={blueprint}
          onUnlock={() => setPhase("email")}
          onDirectSubmit={async (email: string) => {
            const desiredAutomation = [
              ...blueprint.topOpportunities,
              ...blueprint.quickWins,
              ...blueprint.customToolIdeas
            ][0]?.taskName ?? answers.desiredFirstAutomation ?? ""
            const response = await fetch("/api/waitlist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                role: answers.role,
                topOpportunity: blueprint.topOpportunities[0]?.taskName ?? desiredAutomation,
                source: "automation_preview_waitlist"
              })
            })
            if (!response.ok) throw new Error("Failed")
            handleWaitlistSubmitted(email, desiredAutomation)
          }}
        />
      )}

      {phase === "email" && blueprint && (
        <WaitlistForm
          blueprint={blueprint}
          blueprintId={blueprintId}
          answers={answers}
          onStarted={handleEmailStarted}
          onSubmitted={handleWaitlistSubmitted}
        />
      )}

      {phase === "success" && <SuccessState />}
    </>
  )

  if (phase !== "idle") {
    const modal = (
      <BlueprintModalShell
        onRestart={handleRestart}
        onClose={handleClose}
        isClosing={isClosing}
        expanded={phase === "preview"}
      >
        {activeContent}
      </BlueprintModalShell>
    )

    return typeof document === "undefined"
      ? null
      : createPortal(modal, document.body)
  }

  return (
    <aside className="w-full max-w-[440px] text-zinc-900">
      <IdleBlueprintState onClick={handleStart} />
    </aside>
  )
}
