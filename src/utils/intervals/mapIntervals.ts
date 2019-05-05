import { intervalList, Note, FretboardMode, Fretboard } from "../types"
import { getFretboard } from "src/utils/fretboard/getFretboard"

interface IntervalsProps {
  note: Note
  fretboard?: Fretboard
  fretboardMode?: FretboardMode
}

export function mapIntervals({
  note,
  fretboard,
  fretboardMode = "flats",
}: IntervalsProps) {
  const fretboardNotes = fretboard || getFretboard(fretboardMode)

  const intervalMap = fretboardNotes.map((string, stringIndex) => {
    const fretboardLength = fretboardNotes[stringIndex].length
    const intervals = new Array(fretboardLength)
    const noteIndex = string.findIndex(stringNote => stringNote === note.note)

    let intervalIndex = 0
    let forwardFret = noteIndex

    // Starting at the selected note index, fill array forward with intervals
    while (forwardFret < fretboardLength) {
      const intervalLabel = intervalList[intervalIndex]
      intervals[forwardFret] = intervalLabel
      intervalIndex++
      forwardFret++
    }

    intervalIndex = fretboardLength
    let backwardFret = noteIndex + 1

    // Starting at selected note index, backfill array with reverse intervals
    while (backwardFret > 0) {
      intervalIndex--
      backwardFret--
      const intervalLabel = intervalList[intervalIndex]
      intervals[backwardFret] = intervalLabel
    }

    return intervals
  })

  return intervalMap
}
