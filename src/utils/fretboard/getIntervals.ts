import { intervalList, IntervalLabels, Note, FretboardMode } from "../types"
import { getFretboard } from "./getFretboard"
import { last } from "lodash"

export function getIntervals(
  note: Note,
  fretboardMode: FretboardMode = "flats"
) {
  const fretboardNotes = getFretboard(fretboardMode)

  const intervalMap = fretboardNotes.map((string, stringIndex) => {
    const fretboardLength = fretboardNotes[stringIndex].length
    const intervals = new Array(fretboardLength)
    const noteIndex = string.findIndex(stringNote => stringNote === note.note)

    let intervalIndex = 0
    let forwardFret = noteIndex

    // Starting at the selected note index, fill array forward with intervals
    while (forwardFret < fretboardLength) {
      const intervalLabel = intervalList[intervalIndex]
      intervals[forwardFret] = last<IntervalLabels>(intervalLabel)
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
      intervals[backwardFret] = last<IntervalLabels>(intervalLabel)
    }

    return intervals
  })

  return intervalMap
}

export function getIntervalByNote(rootNote: Note, intervalNote: Note) {
  const intervals = getIntervals(rootNote)
  const [stringIndex, noteIndex] = intervalNote.position
  const interval = intervals[stringIndex][noteIndex]
  return interval
}
