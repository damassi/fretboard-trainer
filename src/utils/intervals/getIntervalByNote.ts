import { mapIntervals } from "./mapIntervals"
import { Note } from "src/utils/types"

export function getIntervalByNote(rootNote: Note, intervalNote: Note) {
  const intervals = mapIntervals({ note: rootNote })
  const [stringIndex, noteIndex] = intervalNote.position
  const interval = intervals[stringIndex][noteIndex]
  return interval
}
