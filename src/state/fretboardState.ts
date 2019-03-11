import { Action } from "easy-peasy"
import { Note, getNote } from "src/utils/fretboard"

export type AccidentalMode = "flats" | "sharps"

export interface Fretboard {
  accidentalMode: AccidentalMode
  answer: object
  currentNote: Note
  showAccidentals: boolean
  setRandomNote: Action<Fretboard, void>
  setNote: Action<Fretboard, Note>
  setAccidentalMode: Action<Fretboard, AccidentalMode>
  toggleAccidentals: Action<Fretboard, void>
}

export const fretboard: Fretboard = {
  accidentalMode: "flats",
  showAccidentals: true,
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

  toggleAccidentals: state => {
    state.showAccidentals = !state.showAccidentals
  },
}
