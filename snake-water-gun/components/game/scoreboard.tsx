"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  titleLeft: string
  titleRight: string
  scoreLeft: number
  scoreRight: number
  roundsPlayed: number
  roundsToPlay: number
  lastUpdated?: "left" | "right" | null
}

function ScoreNumber({
  value,
  highlighted,
}: {
  value: number
  highlighted?: boolean
}) {
  const [display, setDisplay] = useState<number>(value)
  const prevRef = useRef<number>(value)

  useEffect(() => {
    const startVal = prevRef.current
    const endVal = value
    if (startVal === endVal) return
    const start = performance.now()
    const duration = 500
    let raf = 0

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      const next = Math.round(startVal + (endVal - startVal) * eased)
      setDisplay(next)
      if (t < 1) {
        raf = requestAnimationFrame(step)
      } else {
        prevRef.current = endVal
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <p
      className={cn(
        "text-3xl md:text-4xl font-bold text-slate-900 transition-transform",
        highlighted ? "scale-110 text-lime-600" : "scale-100",
      )}
      aria-live="polite"
    >
      {display}
    </p>
  )
}

export function Scoreboard({
  titleLeft,
  titleRight,
  scoreLeft,
  scoreRight,
  roundsPlayed,
  roundsToPlay,
  lastUpdated,
}: Props) {
  return (
    <Card className="bg-white/90 backdrop-blur-md animate-fade-slide-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-slate-900 text-pretty">Scoreboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="text-center">
            <p className="text-sm text-slate-600">{titleLeft}</p>
            <ScoreNumber value={scoreLeft} highlighted={lastUpdated === "left"} />
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600">{titleRight}</p>
            <ScoreNumber value={scoreRight} highlighted={lastUpdated === "right"} />
          </div>
        </div>
        <p className="mt-3 text-center text-slate-700">
          Round {roundsPlayed} / {roundsToPlay}
        </p>
      </CardContent>
    </Card>
  )
}
