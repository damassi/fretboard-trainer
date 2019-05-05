import { Note, RelativeInterval } from "../types"

export function computeRelativeInterval(
  note1: Note,
  note2: Note
): RelativeInterval {
  const subtract = ([string2, note2], [string1, note1]) => {
    return [string2 - string1, note2 - note1]
  }

  const relativeInterval = subtract(
    note2.position,
    note1.position
  ) as RelativeInterval

  return relativeInterval
}
