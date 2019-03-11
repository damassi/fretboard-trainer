import { Action, thunk, Thunk } from "easy-peasy"
import { isEqual, shuffle, times, uniqBy } from "lodash"
import { Note, getNote } from "src/utils/fretboardUtils"

export type AccidentalMode = "flats" | "sharps"

export interface Fretboard {
  accidentalMode: AccidentalMode
  correctAnswers: number
  incorrectAnswers: number
  currentNote: Note
  questions: Note[]
  questionCount: number
  showAccidentals: boolean

  // Actions
  correctAnswer: Action<Fretboard, void>
  incorrectAnswer: Action<Fretboard, void>

  pickAnswer: Thunk<Fretboard, Note>
  pickRandomNote: Action<Fretboard, void>
  setNote: Action<Fretboard, Note>
  setAccidentalMode: Action<Fretboard, AccidentalMode>
  toggleAccidentals: Action<Fretboard, void>
}

export const fretboard: Fretboard = {
  accidentalMode: "flats",
  correctAnswers: 0,
  incorrectAnswers: 0,
  currentNote: { note: "c", position: [5, 3] },
  questions: [],
  questionCount: 4,
  showAccidentals: true,

  correctAnswer: state => {
    state.correctAnswers++
  },
  incorrectAnswer: state => {
    state.incorrectAnswers++
  },

  pickAnswer: thunk((actions, selectedNote, { getState }: any) => {
    const {
      fretboard: { currentNote },
    } = getState()

    const isCorrect = isEqual(currentNote, selectedNote)
    if (isCorrect) {
      actions.correctAnswer()
    } else {
      actions.incorrectAnswer()
    }

    actions.pickRandomNote()
  }),

  pickRandomNote: state => {
    const getNotes = () =>
      uniqBy(
        times(4, () => {
          return getNote({
            mode: state.accidentalMode,
            showAccidentals: state.showAccidentals,
          })
        }),
        "note"
      )

    let notes = getNotes()
    while (notes.length < 4) {
      notes = getNotes()
    }

    state.currentNote = notes[0]
    state.questions = shuffle(notes)
  },

  setAccidentalMode: (state, payload) => {
    state.accidentalMode = payload
  },

  setNote: (state, currentNote) => {
    state.currentNote = currentNote
  },

  toggleAccidentals: state => {
    state.showAccidentals = !state.showAccidentals
  },
}
