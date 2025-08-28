"use client"

import { useState } from "react"
import type { Choice, Mode } from "@/lib/swg-logic"
import { decideWinner, randomChoice } from "@/lib/swg-logic"
import { ModeSelector } from "./mode-selector"
import { RoundSelector } from "./round-selector"
import { Controls } from "./controls"
import { Scoreboard } from "./scoreboard"
import { ResultBanner } from "./result-banner"
import { Button } from "@/components/ui/button"

type RoundOutcome = "p1" | "p2" | "draw"

export function Game() {
  const [mode, setMode] = useState<Mode>("cpu")
  const [roundsToPlay, setRoundsToPlay] = useState<number>(3)

  const [roundsPlayed, setRoundsPlayed] = useState<number>(0)
  const [scoreLeft, setScoreLeft] = useState<number>(0)
  const [scoreRight, setScoreRight] = useState<number>(0)
  const [lastUpdated, setLastUpdated] = useState<"left" | "right" | null>(null)

  const [p1Choice, setP1Choice] = useState<Choice | null>(null)
  const [p2Choice, setP2Choice] = useState<Choice | null>(null)

  const [awaitingSecond, setAwaitingSecond] = useState<boolean>(false)
  const [awaitingNextRound, setAwaitingNextRound] = useState<boolean>(false)
  const [lastRoundResult, setLastRoundResult] = useState<RoundOutcome | null>(null)
  const [finished, setFinished] = useState<boolean>(false)
  const [finalWinner, setFinalWinner] = useState<RoundOutcome | null>(null)

  const labels = mode === "cpu" ? { left: "You", right: "Computer" } : { left: "Player 1", right: "Player 2" }

  function resetAll() {
    setRoundsPlayed(0)
    setScoreLeft(0)
    setScoreRight(0)
    setLastUpdated(null)
    setP1Choice(null)
    setP2Choice(null)
    setAwaitingSecond(false)
    setAwaitingNextRound(false)
    setLastRoundResult(null)
    setFinished(false)
    setFinalWinner(null)
  }

  function onChangeMode(m: Mode) {
    setMode(m)
    resetAll()
  }

  function onChangeRounds(n: number) {
    setRoundsToPlay(n)
    resetAll()
  }

  function concludeRound(p1: Choice, p2: Choice) {
    const outcome = decideWinner(p1, p2)
    setLastRoundResult(outcome)
    setP1Choice(p1)
    setP2Choice(p2)
    if (outcome === "p1") {
      setScoreLeft((s) => s + 1)
      setLastUpdated("left")
    } else if (outcome === "p2") {
      setScoreRight((s) => s + 1)
      setLastUpdated("right")
    } else {
      setLastUpdated(null)
    }
    setRoundsPlayed((r) => r + 1)
    setAwaitingNextRound(true)
  }

  function computeFinal() {
    if (scoreLeft > scoreRight) setFinalWinner("p1")
    else if (scoreRight > scoreLeft) setFinalWinner("p2")
    else setFinalWinner("draw")
    setFinished(true)
  }

  function nextRound() {
    setAwaitingNextRound(false)
    setLastRoundResult(null)
    setP1Choice(null)
    setP2Choice(null)
    setLastUpdated(null)

    if (roundsPlayed >= roundsToPlay) {
      computeFinal()
    } else {
      setAwaitingSecond(false)
    }
  }

  function onPick(choice: Choice) {
    if (finished || awaitingNextRound) return

    if (mode === "cpu") {
      const cpu = randomChoice()
      concludeRound(choice, cpu)
      return
    }

    if (!awaitingSecond) {
      setP1Choice(choice)
      setAwaitingSecond(true)
    } else {
      concludeRound(p1Choice ?? choice, choice)
    }
  }

  const canProceed = awaitingNextRound
  const showRoundBanner = !!lastRoundResult
  const showFinalBanner = finished

  const prompt =
    mode === "cpu"
      ? "Choose your move!"
      : awaitingSecond
        ? "Player 2, choose your move!"
        : "Player 1, choose your move!"

  // when the just-finished round equals total rounds (e.g., 3/3, 5/5),
  // show "Result" instead of "Next round".
  const nextCtaLabel = roundsPlayed >= roundsToPlay ? "Result" : "Next round"

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3">
        <ModeSelector mode={mode} onChange={onChangeMode} disabled={finished || awaitingNextRound} />
        <RoundSelector
          roundsToPlay={roundsToPlay}
          onChange={onChangeRounds}
          disabled={finished || awaitingNextRound || roundsPlayed > 0}
        />
        <div className="flex items-center gap-2">
          <Button type="button" onClick={resetAll} className="rounded-full bg-white/90 text-slate-900 hover:bg-white">
            Reset
          </Button>
        </div>
      </div>

      <Scoreboard
        titleLeft={labels.left}
        titleRight={labels.right}
        scoreLeft={scoreLeft}
        scoreRight={scoreRight}
        roundsPlayed={roundsPlayed}
        roundsToPlay={roundsToPlay}
        lastUpdated={lastUpdated}
      />

      <Controls onPick={onPick} disabled={finished || awaitingNextRound} prompt={prompt} />

      <ResultBanner
        show={showRoundBanner}
        isFinal={false}
        result={lastRoundResult}
        leftLabel={labels.left}
        rightLabel={labels.right}
        leftChoice={p1Choice}
        rightChoice={p2Choice}
        onNextRound={nextRound}
        canProceed={canProceed}
        nextLabel={nextCtaLabel}
      />

      <ResultBanner
        show={showFinalBanner}
        isFinal
        result={finalWinner}
        leftLabel={labels.left}
        rightLabel={labels.right}
        onPlayAgain={() => resetAll()}
      />
    </div>
  )
}
