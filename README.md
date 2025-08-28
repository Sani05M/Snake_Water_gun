# Snake · Water · Gun

A playful, mobile‑first take on the classic game. Pick your mode, choose the number of rounds, and battle it out with satisfying animations, crisp UI, and accessible design.

<p align="center">
  <a href="#features">Features</a> •
  <a href="#gameplay">Gameplay</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#development--deployment">Development & Deployment</a> •
  <a href="#customization">Customization</a> •
  <a href="#faq">FAQ</a>
</p>

---

## Features

- Two game modes
  - Play vs Computer (smart random)
  - Play vs Friend (local pass‑and‑play)
- Round selection: 1, 3, or 5
- Polished animations
  - Button hover: glow + bounce/pulse
  - Scoreboard: smooth count‑up tween on change
  - Winner text: flashing neon glow
  - Draw: subtle shake effect
  - Background: slow, soothing gradient motion
  - UI sections: fade‑in / slide‑in on first mount
- Clear result flow
  - During earlier rounds: “Next round”
  - On the final round (e.g., 3/3 or 5/5): “Result”
- Accessible, responsive UI with strong contrast
- Clean, modular React components

## Gameplay

- Rules:
  - Snake drinks Water
  - Water drowns Gun
  - Gun kills Snake
  - Same choice = Draw
- How to play:
  1) Select a mode (vs Computer or vs Friend)
  2) Choose total rounds (1 / 3 / 5)
  3) Make your move each round
  4) Watch the scoreboard animate and the banner reveal who won
  5) Advance with “Next round” or view “Result” at the end


## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4 
- Lightweight client‑side state

## Project Structure

\`\`\`
app/
  page.tsx
  layout.tsx
  globals.css
components/
  game/
    controls.tsx
    game.tsx
    mode-selector.tsx
    result-banner.tsx
    round-selector.tsx
    scoreboard.tsx
lib/
  swg-logic.ts
\`\`\`

- `lib/swg-logic.ts` contains the core game logic
- `components/game/*` are small, focused UI pieces assembled by `game.tsx`
- Animations are defined via Tailwind utilities and custom keyframes in `app/globals.css`


## Customization

- Colors: The UI uses a 5‑color palette for clarity and contrast
  - Primary: Cyan
  - Accent: Teal
  - Neutrals: White, Slate‑900
  - CTA Accent: Lime
- Animations can be tuned in `app/globals.css` (keyframes and utility classes)
- Copy and headings can be edited in `app/page.tsx` and `components/game/*`

