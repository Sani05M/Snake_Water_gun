"use client"

import { Button } from "@/components/ui/button"

type Props = {
  roundsToPlay: number
  onChange: (n: number) => void
  disabled?: boolean
}

const OPTIONS = [1, 3, 5]

export function RoundSelector({ roundsToPlay, onChange, disabled }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 animate-fade-slide-in">
      {OPTIONS.map((opt) => (
        <Button
          key={opt}
          type="button"
          variant={roundsToPlay === opt ? "default" : "secondary"}
          onClick={() => onChange(opt)}
          disabled={disabled}
          className="rounded-full px-4 transition-all hover:shadow-glow hover:animate-bounce-soft"
          aria-pressed={roundsToPlay === opt}
          aria-label={`Play ${opt} round${opt > 1 ? "s" : ""}`}
        >
          {opt} round{opt > 1 ? "s" : ""}
        </Button>
      ))}
    </div>
  )
}
