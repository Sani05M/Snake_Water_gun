"use client"

import { Button } from "@/components/ui/button"
import type { Mode } from "@/lib/swg-logic"

type Props = {
  mode: Mode
  onChange: (m: Mode) => void
  disabled?: boolean
}

export function ModeSelector({ mode, onChange, disabled }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 animate-fade-slide-in">
      <Button
        type="button"
        variant={mode === "cpu" ? "default" : "secondary"}
        onClick={() => onChange("cpu")}
        disabled={disabled}
        className="rounded-full px-4 transition-all hover:shadow-glow hover:animate-bounce-soft"
        aria-pressed={mode === "cpu"}
        aria-label="Play versus Computer"
      >
        🤖 Vs Computer
      </Button>
      <Button
        type="button"
        variant={mode === "friend" ? "default" : "secondary"}
        onClick={() => onChange("friend")}
        disabled={disabled}
        className="rounded-full px-4 transition-all hover:shadow-glow hover:animate-bounce-soft"
        aria-pressed={mode === "friend"}
        aria-label="Play versus Friend"
      >
        👥 Vs Friend
      </Button>
    </div>
  )
}
