"use client"

import { Button } from "@/components/ui/button"
import type { Choice } from "@/lib/swg-logic"
import { getEmoji } from "@/lib/swg-logic"
import { cn } from "@/lib/utils"

type Props = {
  onPick: (c: Choice) => void
  disabled?: boolean
  prompt: string
}

const CHOICES: Choice[] = ["snake", "water", "gun"]

export function Controls({ onPick, disabled, prompt }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 animate-fade-slide-in">
      <p className="text-balance text-center text-lg md:text-xl font-medium text-white/90">{prompt}</p>
      <div className="flex items-center justify-center gap-3">
        {CHOICES.map((c) => (
          <Button
            key={c}
            type="button"
            onClick={() => onPick(c)}
            disabled={disabled}
            className={cn(
              "rounded-full text-2xl md:text-3xl h-14 w-14 md:h-16 md:w-16 transition-all",
              "bg-white/90 text-slate-900 hover:bg-white active:scale-95",
              "hover:shadow-glow hover:animate-bounce-soft",
            )}
            aria-label={`Choose ${c}`}
            title={c.charAt(0).toUpperCase() + c.slice(1)}
          >
            {getEmoji(c)}
          </Button>
        ))}
      </div>
    </div>
  )
}
