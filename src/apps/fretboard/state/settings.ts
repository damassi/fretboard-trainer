import { Action } from "easy-peasy"

export type AccidentalMode = "flats" | "sharps"

export interface Settings {
  accidentalMode: AccidentalMode
  multipleChoice: boolean

  showAccidentals: boolean
  showHint: boolean
  showNotes: boolean
  showSettings: boolean

  // Actions
  toggleAccidentals: Action<Settings, void>
  toggleHint: Action<Settings, void>
  toggleMultipleChoice: Action<Settings, void>
  toggleNotes: Action<Settings, void>
  toggleSettings: Action<Settings, void>

  setAccidentalMode: Action<Settings, AccidentalMode>
}

export const settingsState: Settings = {
  accidentalMode: "flats",
  multipleChoice: true,
  showAccidentals: true,
  showHint: false,
  showNotes: false,
  showSettings: true,

  setAccidentalMode: (state, payload) => {
    state.accidentalMode = payload
  },

  toggleAccidentals: state => {
    state.showAccidentals = !state.showAccidentals
  },

  toggleHint: state => {
    state.showHint = !state.showHint
  },

  toggleMultipleChoice: state => {
    state.multipleChoice = !state.multipleChoice
  },

  toggleNotes: state => {
    state.showNotes = !state.showNotes
  },

  toggleSettings: state => {
    state.showSettings = !state.showSettings
  },
}
