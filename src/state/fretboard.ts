import { Action } from "easy-peasy"
import { Note, getNote } from "src/utils/fretboardUtils"

export type AccidentalMode = "flats" | "sharps"

export interface Fretboard {
  accidentalMode: AccidentalMode
  answer: object
  currentNote: Note
  setRandomNote: Action<Fretboard, void>
  setNote: Action<Fretboard, Note>
  setAccidentalMode: Action<Fretboard, AccidentalMode>
}

export const fretboard: Fretboard = {
  accidentalMode: "flats",
  answer: {},
  currentNote: {
    note: "c",
    position: [5, 3],
  },

  setAccidentalMode: (state, payload) => {
    state.accidentalMode = payload
  },

  setRandomNote: state => {
    state.currentNote = getNote({
      mode: state.accidentalMode,
    })
  },

  setNote: (state, currentNote) => {
    state.currentNote = currentNote
  },
}
