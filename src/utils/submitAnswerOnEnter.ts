import { HINT_VISIBILITY_TIME } from "./types"

export function submitAnswerOnEnter(onSubmit) {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    // ENTER
    if (event.keyCode === 13) {
      const input = event.currentTarget
      let [note, accidental = ""] = input.value.split("")

      if (accidental.toLowerCase() === "b") {
        accidental = "♭"
      }
      if (accidental.toLowerCase() === "#") {
        accidental = "♯"
      }

      const answer = (note + accidental).trim()
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
