import { Action } from "easy-peasy"

export interface SettingsModel {
  showAccidentals: boolean
  showHint: boolean
  showNotes: boolean
  showSettings: boolean

  // Actions
  toggleAccidentals: Action<SettingsModel, void>
  toggleHint: Action<SettingsModel, void>
  toggleNotes: Action<SettingsModel, void>
  toggleSettings: Action<SettingsModel, void>
}

export const settings: SettingsModel = {
  showAccidentals: true,
  showHint: false,
  showNotes: false,
  showSettings: true,

  toggleAccidentals: state => {
    state.showAccidentals = !state.showAccidentals
  },

  toggleHint: state => {
    state.showHint = !state.showHint
  },

  toggleNotes: state => {
    state.showNotes = !state.showNotes
  },

  toggleSettings: state => {
    state.showSettings = !state.showSettings
  },
}
