import { Action, thunk, Thunk, listen, Listen } from "easy-peasy"
import { isEqual, shuffle, times, uniqBy } from "lodash"
import { Note, getNote } from "src/utils/fretboardUtils"
import { StoreModel } from "src/store"
import { fretboard } from "."
import { Howl } from "howler"

export interface Fretboard {
  currentNote: Note
  questions: Note[]
  questionCount: number

  // Listeners
  listeners: Listen<Fretboard>

  // Actions
  setQuestions: Action<Fretboard, Note[]>
  pickAnswer: Thunk<Fretboard, string, any, StoreModel>
  pickRandomNote: Thunk<Fretboard, void>
  setNote: Action<Fretboard, Note>
}

export const fretboardState: Fretboard = {
  currentNote: {
    note: "c",
    position: [5, 3],
  },
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

  pickAnswer: thunk((actions, selectedNote, { getState, dispatch }) => {
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
      dispatch.scoreboard.showFlash("correct!")
      setTimeout(() => dispatch.scoreboard.correctAnswer(), 10)

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
      dispatch.scoreboard.showFlash("incorrect!")
      setTimeout(() => dispatch.scoreboard.incorrectAnswer(), 10)
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

  setNote: (state, currentNote) => {
    state.currentNote = currentNote
  },

  setQuestions: (state, questions) => {
    state.questions = questions
  },
}
