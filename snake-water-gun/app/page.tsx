import { Game } from "@/components/game/game"

export default function Page() {
  return (
    <main className="min-h-screen w-full animated-gradient" role="main">
      <div className="mx-auto max-w-xl px-4 py-8 md:py-12">
        <header className="mb-6 text-center animate-fade-slide-in">
          <h1 className="text-balance text-3xl md:text-5xl font-bold text-white">Snake · Water · Gun</h1>
          <p className="mt-2 text-white/90 text-pretty text-base md:text-lg">
            Simple rules, endless fun! Snake drinks Water, Water drowns Gun, Gun kills Snake. Same choice means a draw.
            Pick a mode, choose rounds, and let the best player win!
          </p>
        </header>

        <section
          aria-label="Game"
          className="rounded-3xl bg-white/10 p-4 md:p-6 backdrop-blur-md border border-white/20 animate-fade-slide-in"
        >
          <Game />
        </section>

        <section aria-label="Instructions" className="mt-6 animate-fade-slide-in">
          <div className="rounded-2xl bg-slate-900/70 text-white p-4 border border-white/20">
            <h2 className="text-xl md:text-2xl font-semibold">How to Play</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-white/90">
              <li>Choose a game mode: Vs Computer or Vs Friend.</li>
              <li>Select how many rounds to play (1, 3, or 5).</li>
              <li>Tap a button to pick Snake 🐍, Water 💧, or Gun 🔫.</li>
              <li>See the round result and watch the scoreboard update.</li>
              <li>After all rounds, check the final winner and play again!</li>
            </ul>
          </div>
        </section>

        <footer className="mt-8 text-center text-white/80 animate-fade-slide-in">
          <p className="text-sm">Have fun and play fair! ✨</p>
        </footer>
      </div>
    </main>
  )
}
