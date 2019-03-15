import { random } from "lodash"
import { AccidentalMode } from "src/apps/fretboard/state/settings"

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
}

type StringRange = 1 | 2 | 3 | 4 | 5 | 6
type NoteRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

// The position of the note by string and fret
export type NotePosition = [StringRange, NoteRange]

// Note lookup
export interface Note {
  note: string
  position: NotePosition
}

/**
 * Returns a note from the notes array.
 *
 * @example
 *
 * const note = getNote({
 *   mode: 'flats',
 *   position: [1, 3] // first string, third fret
 * })
 */
export function getNote(props: {
  mode: AccidentalMode
  showAccidentals: boolean
  position?: NotePosition
}): Note {
  const { mode, position, showAccidentals } = props

  let string
  let note

  if (!position) {
    string = random(1, 6)
    note = random(1, 12)
  } else {
    string = position[0]
    note = position[1]
  }

  // Use a 1-based index to follow guitar idioms. We don't subtract from `noteId`
  // because 0 (as in [6, 0]) refers to an open string -- in this case the low `E`.
  string--

  const noteName = notes[mode][string][note]

  // Re-run function if we return an invalid result
  if (!showAccidentals && containsSharpOrFlat(noteName)) {
    return getNote(props)
  }

  const foundNote: Note = {
    note: noteName,
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
