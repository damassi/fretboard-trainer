import { Action } from "easy-peasy"

export type AccidentalMode = "naturals" | "flats" | "sharps"

export interface SettingsModel {
  accidentalMode: AccidentalMode
  isMuted: boolean
  multipleChoice: boolean
  showHint: boolean
  showNotes: boolean
  showSettings: boolean

  setAccidentalMode: Action<SettingsModel, AccidentalMode>

  toggleHint: Action<SettingsModel, void>
  toggleMultipleChoice: Action<SettingsModel, void>
  toggleMuted: Action<SettingsModel, void>
  toggleNotes: Action<SettingsModel, void>
  toggleSettings: Action<SettingsModel, void>
}

export const settingsState: SettingsModel = {
  accidentalMode: "naturals",
  isMuted: true,
  multipleChoice: true,
  showHint: false,
  showNotes: false,
  showSettings: true,

  setAccidentalMode: (state, payload) => {
    state.accidentalMode = payload
  },

  toggleHint: state => {
    state.showHint = !state.showHint
  },

  toggleMultipleChoice: state => {
    state.multipleChoice = !state.multipleChoice
  },

  toggleMuted: state => {
    state.isMuted = !state.isMuted
  },

  toggleNotes: state => {
    state.showNotes = !state.showNotes
  },

  toggleSettings: state => {
    state.showSettings = !state.showSettings
  },
}
