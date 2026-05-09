"use client"

import { ArrowRight, ChevronLeft } from "lucide-react"
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
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-5 pb-24 text-center">
        <div className="space-y-2">
          <h3 className="text-4xl leading-tight text-zinc-900 font-instrument-serif">
            {question.title}
          </h3>
          {question.helper && (
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-500">
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
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    selected
                      ? "border-[#83A5D4] bg-[#83A5D4] text-white shadow-sm ring-2 ring-[#83A5D4]/25 scale-[1.02]"
                      : "border-zinc-200 bg-[#FDFDF9] text-zinc-600 hover:border-zinc-400"
                  }`}
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
                className="w-full resize-none rounded-2xl border border-zinc-200 bg-[#FDFDF9] px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
              />
            ) : (
              <input
                id={inputId}
                value={textValue}
                onChange={event => onTextChange(event.target.value)}
                placeholder={question.placeholder}
                className="mx-auto block w-full max-w-sm rounded-full border border-zinc-200 bg-[#FDFDF9] px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
              />
            )}

            {question.secondaryKey && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500">
                  {question.secondaryLabel}
                </label>
                <textarea
                  value={secondaryValue}
                  onChange={event => onSecondaryChange(event.target.value)}
                  placeholder={question.secondaryPlaceholder}
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-zinc-200 bg-[#FDFDF9] px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack || loading}
          aria-label="Back"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-[#FDFDF9] text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-0 sm:h-10 sm:w-auto sm:px-4"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue || loading}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-transparent bg-zinc-900 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 sm:h-10 sm:px-5"
        >
          {questionNumber === totalQuestions ? "Build preview" : "Continue"}
          <ArrowRight className="size-4 shrink-0" />
        </button>
      </div>
    </div>
  )
}
