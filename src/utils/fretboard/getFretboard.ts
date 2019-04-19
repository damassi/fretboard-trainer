import { FretboardMode, Fretboard } from "../types"

export function getFretboard(
  fretboardMode: FretboardMode = "flats"
): Fretboard {
  const fretboard = [
    ["E", "F", "", "G", "", "A", "", "B", "C", "", "D", "", "E"],
    ["B", "C", "", "D", "", "E", "F", "", "G", "", "A", "", "B"],
    ["G", "", "A", "", "B", "C", "", "D", "", "E", "F", "", "G"],
    ["D", "", "E", "F", "", "G", "", "A", "", "B", "C", "", "D"],
    ["A", "", "B", "C", "", "D", "", "E", "F", "", "G", "", "A"],
    ["E", "F", "", "G", "", "A", "", "B", "C", "", "D", "", "E"],
  ].map(string => {
    return string.map((note, noteIndex) => {
      if (note) {
        return note
      } else {
        switch (fretboardMode) {
          case "flats":
            return string[noteIndex + 1] + "♭"
          case "sharps":
            return string[noteIndex - 1] + "♯"
          case "naturals":
            return ""
          default:
            return ""
        }
      }
    })
  }) as Fretboard

  return fretboard
}
