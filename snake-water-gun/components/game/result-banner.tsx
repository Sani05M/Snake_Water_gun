"use client"

import type { Choice } from "@/lib/swg-logic"
import { getEmoji } from "@/lib/swg-logic"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type RoundResult = "p1" | "p2" | "draw"
type Props = {
  show: boolean
  isFinal?: boolean
  result: RoundResult | null
  leftLabel: string
  rightLabel: string
  leftChoice?: Choice | null
  rightChoice?: Choice | null
  onNextRound?: () => void
  onPlayAgain?: () => void
  canProceed?: boolean
  nextLabel?: string
}

export function ResultBanner({
  show,
  isFinal,
  result,
  leftLabel,
  rightLabel,
  leftChoice,
  rightChoice,
  onNextRound,
  onPlayAgain,
  canProceed,
  nextLabel,
}: Props) {
  if (!show) return null

  let message = "It’s a draw!"
  if (result === "p1") message = `${leftLabel} wins this round!`
  if (result === "p2") message = `${rightLabel} wins this round!`
  if (isFinal) {
    if (result === "p1") message = `🏆 ${leftLabel} wins the game!`
    else if (result === "p2") message = `🏆 ${rightLabel} wins the game!`
    else message = "🏆 The game ends in a draw!"
  }

  const isDraw = result === "draw"
  const isWinner = result === "p1" || result === "p2"

  return (
    <div
      className={cn(
        "mt-4 rounded-2xl p-4 text-center text-white",
        "bg-slate-900/70 border border-white/20",
        "animate-fade-slide-in",
        isDraw ? "animate-draw-shake" : "",
      )}
      role="status"
      aria-live="polite"
    >
      <p className={cn("text-xl md:text-2xl font-semibold text-balance", isWinner ? "animate-winner-flash" : "")}>
        {message}
      </p>
      {leftChoice && rightChoice ? (
        <div className="mt-2 flex items-center justify-center gap-6">
          <div className="text-lg">
            <span className="mr-2">{getEmoji(leftChoice)}</span>
            <span className="text-white/90">{leftLabel}</span>
          </div>
          <div className="text-lg">
            <span className="mr-2">{getEmoji(rightChoice)}</span>
            <span className="text-white/90">{rightLabel}</span>
          </div>
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-center gap-2">
        {!isFinal && onNextRound ? (
          <Button
            type="button"
            onClick={onNextRound}
            disabled={!canProceed}
            className="rounded-full bg-lime-400 text-slate-900 hover:bg-lime-300 transition-all hover:shadow-glow hover:animate-bounce-soft"
          >
            {nextLabel ?? "Next round"}
          </Button>
        ) : null}
        {isFinal && onPlayAgain ? (
          <Button
            type="button"
            onClick={onPlayAgain}
            className="rounded-full bg-lime-400 text-slate-900 hover:bg-lime-300 transition-all hover:shadow-glow hover:animate-bounce-soft"
          >
            Play again
          </Button>
        ) : null}
      </div>
    </div>
  )
}
