"use client"

import { ChevronLeft } from "lucide-react"
import { OTHER_OPTION } from "./blueprint-config"
import type { QuestionConfig } from "./blueprint-config"

type ChatQuestionProps = {
  question: QuestionConfig
  questionNumber: number
  totalQuestions: number
  chips: string[]
  selectedChips: string[]
  textValue: string
  secondaryValue: string
  canGoBack: boolean
  canContinue: boolean
  loading?: boolean
  onToggleChip: (value: string) => void
  onTextChange: (value: string) => void
  onSecondaryChange: (value: string) => void
  onBack: () => void
  onContinue: () => void
}

export function ChatQuestion({
  question,
  questionNumber,
  totalQuestions,
  chips,
  selectedChips,
  textValue,
  secondaryValue,
  canGoBack,
  canContinue,
  loading,
  onToggleChip,
  onTextChange,
  onSecondaryChange,
  onBack,
  onContinue
}: ChatQuestionProps) {
  const inputId = `blueprint-${question.id}-input`
  const isTextarea = question.mode === "textarea"
  const showCustomInput = !isTextarea && selectedChips.includes(OTHER_OPTION)
  const showInput = isTextarea || showCustomInput

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 pb-6 text-center">

        {/* Progress */}
        <p
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink)",
            opacity: 0.5,
          }}
        >
          {questionNumber} / {totalQuestions}
        </p>

        <div className="space-y-2">
          <h3
            className="font-bold leading-tight"
            style={{ fontSize: "clamp(26px, 4vw, 42px)", color: "var(--ink)" }}
          >
            {question.title}
          </h3>
          {question.helper && (
            <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed" style={{ color: "#1A1A1A", opacity: 0.6 }}>
              {question.helper}
            </p>
          )}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {chips.map(chip => {
              const selected = selectedChips.includes(chip)
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => onToggleChip(chip)}
                  className="text-sm font-semibold transition-all"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: selected ? "1px solid #267FE5" : "1px solid rgba(0,0,0,0.12)",
                    background: selected ? "#267FE5" : "#fff",
                    color: selected ? "#fff" : "var(--ink)",
                    boxShadow: selected
                      ? "0 2px 10px rgba(38,127,229,0.28)"
                      : "0 1px 4px rgba(0,0,0,0.06)",
                    cursor: "pointer",
                  }}
                >
                  {chip}
                </button>
              )
            })}
          </div>
        )}

        {showInput && (
          <div className="mx-auto w-full max-w-xl space-y-3 text-left">
            <label htmlFor={inputId} className="sr-only">
              {question.title}
            </label>
            {isTextarea ? (
              <textarea
                id={inputId}
                value={textValue}
                onChange={event => onTextChange(event.target.value)}
                placeholder={question.placeholder}
                rows={7}
                className="w-full resize-none font-medium text-sm leading-relaxed"
                style={{
                  border: "var(--bd)",
                  borderRadius: "14px",
                  background: "#fff",
                  padding: "12px 16px",
                  color: "var(--ink)",
                  boxShadow: "var(--shadow-sm)",
                  outline: "none",
                }}
              />
            ) : (
              <input
                id={inputId}
                value={textValue}
                onChange={event => onTextChange(event.target.value)}
                placeholder={question.placeholder}
                className="block w-full max-w-sm mx-auto text-sm font-medium"
                style={{
                  border: "var(--bd)",
                  borderRadius: "40px",
                  background: "#fff",
                  padding: "10px 20px",
                  color: "var(--ink)",
                  boxShadow: "var(--shadow-sm)",
                  outline: "none",
                }}
              />
            )}

            {question.secondaryKey && (
              <div className="space-y-2">
                <label
                  className="block text-xs font-bold"
                  style={{
                    fontFamily: "var(--font-space-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--ink)",
                    opacity: 0.6,
                  }}
                >
                  {question.secondaryLabel}
                </label>
                <textarea
                  value={secondaryValue}
                  onChange={event => onSecondaryChange(event.target.value)}
                  placeholder={question.secondaryPlaceholder}
                  rows={3}
                  className="w-full resize-none text-sm font-medium leading-relaxed"
                  style={{
                    border: "var(--bd)",
                    borderRadius: "14px",
                    background: "#fff",
                    padding: "12px 16px",
                    color: "var(--ink)",
                    boxShadow: "var(--shadow-sm)",
                    outline: "none",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div
        className="sticky bottom-0 flex items-center justify-between pt-6 pb-2"
        style={{ background: "linear-gradient(to top, #fff 70%, transparent)" }}
      >
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack || loading}
          aria-label="Back"
          className="inline-flex items-center gap-1 text-sm font-bold disabled:opacity-0"
          style={{
            fontFamily: "var(--font-space-mono)",
            color: "var(--ink)",
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontSize: "11px",
          }}
        >
          <ChevronLeft className="size-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue || loading}
          className="btn-press-dark disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontSize: "15px", padding: "0.6em 1.8em" }}
        >
          {questionNumber === totalQuestions ? "Build preview" : "Continue"} →
        </button>
      </div>
    </div>
  )
}
