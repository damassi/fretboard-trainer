import { Action, thunk, Thunk, listen, Listen } from "easy-peasy"
import { isEqual, shuffle, times, uniqBy } from "lodash"
import { Note, getNote } from "src/utils/fretboardUtils"
import { StoreModel } from "src/store"
import { fretboard } from "."
import { Howl } from "howler"

export interface Fretboard {
  correctAnswers: number
  currentNote: Note
  flashMessage: string
  incorrectAnswers: number
  questions: Note[]
  questionCount: number

  // Listeners
  listeners: Listen<Fretboard>

  // Actions
  correctAnswer: Action<Fretboard, void>
  incorrectAnswer: Action<Fretboard, void>

  setQuestions: Action<Fretboard, Note[]>
  pickAnswer: Thunk<Fretboard, string>

  pickRandomNote: Thunk<Fretboard, void>
  setNote: Action<Fretboard, Note>

  showFlash: Thunk<Fretboard, string>
  setFlashMessage: Action<Fretboard, string>
}

export const fretboardState: Fretboard = {
  currentNote: {
    note: "c",
    position: [5, 3],
  },
  correctAnswers: 0,
  incorrectAnswers: 0,
  flashMessage: "",
  questions: [],
  questionCount: 4,

  listeners: listen(on => {
    // Whenever a new starting fret has been selected reset the board
    on(
      fretboard.settings.setStartingFret,
      thunk(actions => {
        actions.pickRandomNote()
      })
    )

    on(
      fretboard.settings.setStringFocus,
      thunk(actions => {
        actions.pickRandomNote()
      })
    )
  }),

  correctAnswer: state => {
    state.correctAnswers++
  },
  incorrectAnswer: state => {
    state.incorrectAnswers++
  },

  showFlash: thunk((actions, flashMessage, { dispatch }: any) => {
    actions.setFlashMessage(flashMessage)
    dispatch.fretboard.settings.toggleHint()
    setTimeout(() => {
      actions.setFlashMessage("")
      dispatch.fretboard.settings.toggleHint()
    }, 2000)
  }),

  pickAnswer: thunk((actions, selectedNote, { getState }) => {
    const {
      fretboard: {
        currentNote,
        settings: { isMuted },
      },
    } = getState() as StoreModel

    const isCorrect = isEqual(
      currentNote.note.toLowerCase(),
      selectedNote.toLowerCase()
    )

    if (isCorrect) {
      actions.showFlash("correct!")
      setTimeout(() => actions.correctAnswer(), 10)

      // Play sound
      if (!isMuted) {
        const [string, note] = currentNote.position
        const soundFile = `/audio/${string + 1}-${note}.mp3`
        const sound = new Howl({
          src: [soundFile],
          volume: 0.3,
        })
        sound.play()
      }
    } else {
      actions.showFlash("incorrect!")
      setTimeout(() => actions.incorrectAnswer(), 10)
    }

    setTimeout(() => {
      actions.pickRandomNote()
    }, 2000)
  }),

  pickRandomNote: thunk((actions, _, { getState }) => {
    const state = getState() as StoreModel

    const getNotes = () => {
      const {
        accidentalMode,
        startingFret,
        stringFocus,
      } = state.fretboard.settings

      return uniqBy(
        times(4, () => {
          return getNote({
            accidentalMode,
            startingFret,
            stringFocus,
          })
        }),
        "note"
      )
    }

    let notes = getNotes()
    while (notes.length < 4) {
      notes = getNotes()
    }

    actions.setNote(notes[0])
    actions.setQuestions(shuffle(notes))
  }),

  setFlashMessage: (state, message) => {
    state.flashMessage = message
  },

  setNote: (state, currentNote) => {
    state.currentNote = currentNote
  },

  setQuestions: (state, questions) => {
    state.questions = questions
  },
}
