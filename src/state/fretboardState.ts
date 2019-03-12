import { Action, thunk, Thunk } from "easy-peasy"
import { isEqual, shuffle, times, uniqBy } from "lodash"
import { Note, getNote } from "src/utils/fretboardUtils"

export type AccidentalMode = "flats" | "sharps"

export interface Fretboard {
  accidentalMode: AccidentalMode
  correctAnswers: number
  currentNote: Note
  flashMessage: string
  incorrectAnswers: number
  questions: Note[]
  questionCount: number
  showAccidentals: boolean

  // Actions
  correctAnswer: Action<Fretboard, void>
  incorrectAnswer: Action<Fretboard, void>

  pickAnswer: Thunk<Fretboard, Note>
  pickRandomNote: Action<Fretboard, void>

  setFlashMessage: Action<Fretboard, string>
  showFlash: Thunk<Fretboard, string>

  setNote: Action<Fretboard, Note>
  setAccidentalMode: Action<Fretboard, AccidentalMode>
  toggleAccidentals: Action<Fretboard, void>
}

export const fretboard: Fretboard = {
  accidentalMode: "flats",
  currentNote: { note: "c", position: [5, 3] },
  correctAnswers: 0,
  incorrectAnswers: 0,
  flashMessage: "",
  questions: [],
  questionCount: 4,
  showAccidentals: true,

  correctAnswer: state => {
    state.correctAnswers++
  },
  incorrectAnswer: state => {
    state.incorrectAnswers++
  },

  showFlash: thunk((actions, flashMessage, { dispatch }: any) => {
    actions.setFlashMessage(flashMessage)
    dispatch.settings.toggleHint()
    setTimeout(() => {
      actions.setFlashMessage("")
      dispatch.settings.toggleHint()
    }, 2000)
  }),

  pickAnswer: thunk((actions, selectedNote, { getState }: any) => {
    const {
      fretboard: { currentNote },
    } = getState()

    const isCorrect = isEqual(currentNote, selectedNote)
    if (isCorrect) {
      actions.showFlash("correct!")
      setTimeout(() => actions.correctAnswer(), 10)
    } else {
      actions.showFlash("incorrect!")
      setTimeout(() => actions.incorrectAnswer(), 10)
    }

    setTimeout(() => {
      actions.pickRandomNote()
    }, 2000)
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

  setFlashMessage: (state, message) => {
    state.flashMessage = message
  },

  setNote: (state, currentNote) => {
    state.currentNote = currentNote
  },

  toggleAccidentals: state => {
    state.showAccidentals = !state.showAccidentals
  },
}
