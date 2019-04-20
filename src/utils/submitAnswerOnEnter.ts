import { HINT_VISIBILITY_TIME } from "./types"

export function submitAnswerOnEnter(
  onSubmit,
  moduleType: "notes" | "intervals"
) {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    // User pressed ENTER
    if (event.keyCode === 13) {
      const input = event.currentTarget

      // Note + Accidental, or vice versa
      let [part1 = "", part2 = ""] = input.value.split("")

      // Intervals: flat 2nd
      if (moduleType === "intervals") {
        if (part1.toLowerCase() === "b") {
          part1 = "♭"
        }
        if (part1.toLowerCase() === "#") {
          part1 = "♯"
        }

        // Notes: C flat
      } else if (moduleType === "notes") {
        if (part2.toLowerCase() === "b") {
          part2 = "♭"
        }
        if (part2.toLowerCase() === "#") {
          part2 = "♯"
        }
      }

      const answer = (part1 + part2).trim()
      onSubmit(answer)

      // Disable input while submitting
      input.disabled = true

      // Reset answer after submit
      setTimeout(() => {
        input.disabled = false
        input.focus()
        input.value = ""
      }, HINT_VISIBILITY_TIME)
    }
  }
}
