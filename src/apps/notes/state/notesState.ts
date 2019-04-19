import { Action, thunk, Thunk, listen, Listen } from "easy-peasy"
import { isEqual, shuffle, times, uniqBy } from "lodash"
import { StoreModel } from "src/store"
import { notes as notesModel } from "src/apps/notes/state"
import { settingsState } from "src/apps/settings/settingsState"
import { Howl } from "howler"
import { getNote } from "src/utils/fretboard/getNote"
import { Note, HINT_VISIBILITY_TIME, ANSWER_COUNT } from "src/utils/types"

export interface Fretboard {
  currentNote: Note
  questions: Note[]
  questionCount: number

  listeners: Listen<Fretboard>

  // Actions
  setQuestions: Action<Fretboard, Note[]>
  pickAnswer: Thunk<Fretboard, string, any, StoreModel>
  pickRandomNote: Thunk<Fretboard, void>
  setNote: Action<Fretboard, Note>
}

export const notesState: Fretboard = {
  currentNote: {
    note: "c",
    position: [5, 3],
  },
  questions: [],
  questionCount: 4,

  // When these actions fire pick a new note, effectively resetting the
  // fretboard state
  listeners: listen(on => {
    const newNoteActions = [
      notesModel.settings.setStartingFret,
      notesModel.settings.setStringFocus,
      settingsState.setFretboardMode,
    ]

    newNoteActions.forEach(action => {
      on(
        action,
        thunk(actions => {
          actions.pickRandomNote()
        })
      )
    })
  }),

  pickAnswer: thunk((actions, selectedNote, { getState, dispatch }) => {
    const {
      notes: { currentNote },
      settings: { isMuted },
    } = getState()

    const isCorrect = isEqual(
      currentNote.note.toLowerCase(),
      selectedNote.toLowerCase()
    )

    if (isCorrect) {
      dispatch.scoreboard.correctAnswer("correct!")

      // TODO: Move sound playback to <Fretboard />
      if (!isMuted) {
        const [string, note] = currentNote.position
        const soundFile = `/audio/${string}-${note}.mp3`
        const sound = new Howl({
          src: [soundFile],
          volume: 0.3,
        })
        sound.play()
      }
    } else {
      dispatch.scoreboard.incorrectAnswer("incorrect!")
    }

    setTimeout(() => {
      actions.pickRandomNote()
    }, HINT_VISIBILITY_TIME)
  }),

  pickRandomNote: thunk((actions, _, { getState }) => {
    const state = getState() as StoreModel

    const getNotes = () => {
      const { fretboard } = state.settings
      const { startingFret, stringFocus } = state.notes.settings

      const notes = uniqBy(
        times(ANSWER_COUNT, () => {
          return getNote({
            fretboard,
            startingFret,
            stringFocus,
          })
        }),
        "note"
      )

      if (notes.length < ANSWER_COUNT) {
        return getNotes()
      }

      return notes
    }

    const notes = shuffle(getNotes())

    actions.setNote(notes[0])
    actions.setQuestions(notes)
  }),

  setNote: (state, currentNote) => {
    state.currentNote = currentNote
  },

  setQuestions: (state, questions) => {
    state.questions = questions
  },
}
