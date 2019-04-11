import { containsSharpOrFlat } from "./containsSharpOrFlat"
import { getString } from "./getString"
import { isEmpty, random } from "lodash"
import { StringFocus } from "src/apps/notes/state/notesSettingsState"
import { NotePosition, FretboardMode, Note } from "../types"
import { getFretboard } from "./getFretboard"

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
    fretboardMode?: FretboardMode
    position?: NotePosition
    startingFret?: number
    stringFocus?: StringFocus
  } = {}
): Note {
  const {
    fretboardMode = "flats",
    position,
    startingFret = 1,
    stringFocus = 0,
  } = props

  let string
  let note

  if (!position) {
    string = stringFocus || random(0, 5)
    note = random(startingFret, 12)
  } else {
    string = position[0]
    note = position[1]
  }

  const stringName = getString(string)
  const noteName = getFretboard(fretboardMode)[string][note]

  // Re-run function if we return an invalid result
  const showAccidentals = fretboardMode !== "naturals"
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
