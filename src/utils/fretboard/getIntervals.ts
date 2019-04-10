import { getNote } from "./getNote"
import { fretboardNoteMap, intervalList } from "../types"

export function getIntervals() {
  const fretboardNotes = fretboardNoteMap.flats

  const note = getNote({
    accidentalMode: "flats",
    position: [1, 1],
  })

  const intervalMap = fretboardNotes.map((string, stringIndex) => {
    const fretboardLength = fretboardNotes[stringIndex].length
    const intervals: string[] = new Array(fretboardLength)
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
