import {
  AccidentalMode,
  StringFocus,
} from "src/apps/fretboard/state/fretboardSettingsState"

import { isEmpty, random } from "lodash"
import { IntervalLabels } from "src/apps/intervals/state/intervalsState"

// TODO:
// Surely this map can be done dynamically based upon empty slots in the
// `naturals` array below.

export const notes = {
  flats: [
    ["E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E"],
    ["B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
    ["G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G"],
    ["D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D"],
    ["A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A"],
    ["E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E"],
  ],
  sharps: [
    ["E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E"],
    ["B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
    ["G", "G♯", "A", "B♯", "B", "C", "C♯", "D", "D♯", "E", "F", "G♯", "G"],
    ["D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D"],
    ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A"],
    ["E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E"],
  ],
  naturals: [
    ["E", "F", "", "G", "", "A", "", "B", "C", "", "D", "", "E"],
    ["B", "C", "", "D", "", "E", "F", "", "G", "", "A", "", "B"],
    ["G", "", "A", "", "B", "C", "", "D", "", "E", "F", "", "G"],
    ["D", "", "E", "F", "", "G", "", "A", "", "B", "C", "", "D"],
    ["A", "", "B", "C", "", "D", "", "E", "F", "", "G", "", "A"],
    ["E", "F", "", "G", "", "A", "", "B", "C", "", "D", "", "E"],
  ],
}

export type StringRange = 1 | 2 | 3 | 4 | 5 | 6
export type NoteRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
export type GuitarString = "E" | "b" | "g" | "d" | "a" | "e"
export type NotePosition = [StringRange, NoteRange]

export interface Note {
  note: string
  string?: GuitarString
  position: NotePosition
  interval?: IntervalLabels
}

/**
 * Returns a note from the notes array.
 *
 * const note = getNote({
 *   mode: 'flats',
 *   position: [1, 3] // first string, third fret
 * })
 */
export function getNote(
  props: {
    accidentalMode?: AccidentalMode
    position?: NotePosition
    startingFret?: number
    stringFocus?: StringFocus
  } = {}
): Note {
  const {
    accidentalMode = "flats",
    position,
    startingFret = 1,
    stringFocus = 0,
  } = props

  let string
  let note

  if (!position) {
    string = stringFocus || random(1, 6)
    note = random(startingFret, 12)
  } else {
    string = position[0]
    note = position[1]
  }

  // Use a 1-based index to follow guitar idioms. We don't subtract from `noteId`
  // because 0 (as in [6, 0]) refers to an open string -- in this case the low `E`.
  const stringName = getString(string)
  string--

  const noteName = notes[accidentalMode][string][note]

  // Re-run function if we return an invalid result
  const showAccidentals = accidentalMode !== "naturals"
  if (
    (!showAccidentals && containsSharpOrFlat(noteName)) ||
    isEmpty(noteName)
  ) {
    return getNote(props)
  }

  const foundNote: Note = {
    note: noteName,
    string: stringName,
    position: [string, note],
  }

  return foundNote
}

export function containsSharpOrFlat(note: string) {
  if (note.includes("♭") || note.includes("♯")) {
    return true
  }
  return false
}

export function getString(stringIndex: StringRange): GuitarString {
  switch (stringIndex) {
    case 1:
      return "E"
    case 2:
      return "b"
    case 3:
      return "g"
    case 4:
      return "d"
    case 5:
      return "a"
    case 6:
      return "e"
    default:
      throw new Error("String not found.")
  }
}
