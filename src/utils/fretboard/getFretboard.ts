import { FretboardMode } from "../types"
// import { getIntervals } from "./getIntervals"

export function getFretboard(
  fretboardMode: FretboardMode = "flats"
): string[][] {
  // if (fretboardMode === "intervals") {
  //   const intervals = getIntervals()
  //   return intervals
  // }

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
  })

  return fretboard
}
