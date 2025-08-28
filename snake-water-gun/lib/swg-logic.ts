export type Choice = "snake" | "water" | "gun"
export type Mode = "cpu" | "friend"

export function getEmoji(choice: Choice): string {
  switch (choice) {
    case "snake":
      return "🐍"
    case "water":
      return "💧"
    case "gun":
      return "🔫"
  }
}

export function randomChoice(): Choice {
  const choices: Choice[] = ["snake", "water", "gun"]
  return choices[Math.floor(Math.random() * choices.length)]
}

// Snake > Water, Water > Gun, Gun > Snake
export function decideWinner(p1: Choice, p2: Choice): "p1" | "p2" | "draw" {
  if (p1 === p2) return "draw"
  if ((p1 === "snake" && p2 === "water") || (p1 === "water" && p2 === "gun") || (p1 === "gun" && p2 === "snake")) {
    return "p1"
  }
  return "p2"
}
