import { isEmpty, random } from "lodash"

import {
  AccidentalMode,
  StringFocus,
} from "src/apps/fretboard/state/fretboardSettingsState"

// TODO: Refactor all of this

// Number of strings on guitar
export type StringRange = 1 | 2 | 3 | 4 | 5 | 6

// The lookup range along the neck
type NoteRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

// Strings
type GuitarString = "e" | "a" | "d" | "g" | "b" | "E"

// The position of the note by string and fret
export type NotePosition = [StringRange, NoteRange]

export interface Note {
  note: string
  string?: GuitarString
  position: NotePosition
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
    string: getString(string),
    position: [string, note],
  }

  return foundNote
}

export function getString(stringIndex: number): GuitarString {
  switch (stringIndex) {
    case 0:
      return "e"
    case 1:
      return "a"
    case 2:
      return "d"
    case 3:
      return "g"
    case 4:
      return "b"
    case 5:
      return "E"
    default:
      throw new Error("String not found.")
  }
}

export function containsSharpOrFlat(note: string) {
  if (note.includes("♭") || note.includes("♯")) {
    return true
  }
  return false
}

export function getRandomInterval() {
  const note1 = getNote()
  const note2 = getNote()
  const interval = computeInterval(note1, note2)

  if (!interval) {
    return getRandomInterval()
  }

  return {
    notes: [note1, note2],
    interval,
  }
}

export function computeInterval(note1: Note, note2: Note) {
  const stringDist = note2.position[0] - note1.position[0]
  const noteDist = note2.position[1] - note1.position[1]

  const interval = relativeIntervals.find(i => {
    if (i[0] === stringDist && i[1] === noteDist) {
      return true
    } else {
      return false
    }
  })

  return interval
}

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

// TODO: Account for G string, map A/B strings
export const relativeIntervals = [
  [-2, -11, "7"],
  [-2, -10, "1"],
  [-2, -9, "b2"],
  [-2, -8, "2"],
  [-2, -7, "b3"],
  [-2, -6, "3"],
  [-2, -5, "4"],
  [-2, -4, "b5"],
  [-2, -3, "5"],
  [-2, -2, "b6"],
  [-2, -1, "6"],
  [-2, 0, "b7"],
  [-2, 1, "7"],
  [-2, 2, "1"], // root
  [-2, 3, "b2"],
  [-2, 4, "2"],
  [-2, 5, "b3"],
  [-2, 6, "3"],
  [-2, 7, "4"],
  [-2, 8, "b5"],
  [-2, 9, "5"],
  [-2, 10, "b6"],
  [-2, 11, "6"],

  [-1, -11, "4"],
  [-1, -10, "5"],
  [-1, -9, "b6"],
  [-1, -8, "6"],
  [-1, -7, "b7"],
  [-1, -6, "7"],
  [-1, -5, "1"],
  [-1, -4, "b2"],
  [-1, -3, "2"],
  [-1, -2, "b3"],
  [-1, -1, "3"],
  [-1, 0, "4"],
  [-1, 1, "b5"],
  [-1, 2, "5"],
  [-1, 3, "b6"],
  [-1, 4, "6"],
  [-1, 5, "b7"],
  [-1, 6, "7"],
  [-1, 7, "1"],
  [-1, 8, "b2"],
  [-1, 9, "2"],
  [-1, 10, "b3"],
  [-1, 11, "3"],

  [0, -11, "b2"],
  [0, -10, "2"],
  [0, -9, "b3"],
  [0, -8, "3"],
  [0, -7, "4"],
  [0, -6, "b5"],
  [0, -5, "5"],
  [0, -4, "b6"],
  [0, -3, "6"],
  [0, -2, "b7"],
  [0, -1, "7"],
  [0, 0, "1"], // root
  [0, 1, "b2"],
  [0, 2, "2"],
  [0, 3, "b3"],
  [0, 4, "3"],
  [0, 5, "4"],
  [0, 6, "b5"],
  [0, 7, "5"],
  [0, 8, "b6"],
  [0, 9, "6"],
  [0, 10, "b7"],
  [0, 11, "7"],

  [1, -11, "5"],
  [1, -10, "6"],
  [1, -9, "b7"],
  [1, -8, "7"],
  [1, -7, "1"],
  [1, -6, "b2"],
  [1, -5, "2"],
  [1, -4, "b3"],
  [1, -3, "3"],
  [1, -2, "4"],
  [1, -1, "b5"],
  [1, 0, "5"],
  [1, 1, "b6"],
  [1, 2, "6"],
  [1, 3, "b7"],
  [1, 4, "7"],
  [1, 5, "1"],
  [1, 6, "b2"],
  [1, 7, "2"],
  [1, 8, "b3"],
  [1, 9, "3"],
  [1, 10, "4"],
  [1, 11, "b5"],

  [2, -11, "b3"],
  [2, -10, "3"],
  [2, -9, "4"],
  [2, -8, "b5"],
  [2, -7, "5"],
  [2, -6, "b6"],
  [2, -5, "6"],
  [2, -4, "b7"],
  [2, -3, "7"],
  [2, -2, "1"],
  [2, -1, "b2"],
  [2, 0, "2"],
  [2, 1, "b3"],
  [2, 2, "3"],
  [2, 3, "4"],
  [2, 4, "b5"],
  [2, 5, "5"],
  [2, 6, "b6"],
  [2, 7, "6"],
  [2, 8, "b7"],
  [2, 9, "7"],
  [2, 10, "1"],
  [2, 11, "b2"],
]
