import { Action } from "easy-peasy"

export interface SettingsModel {
  showHint: boolean
  showNotes: boolean
  showSettings: boolean
  toggleHint: Action<SettingsModel, void>
  toggleNotes: Action<SettingsModel, void>
  toggleSettings: Action<SettingsModel, void>
}

export const settings: SettingsModel = {
  showHint: false,
  showNotes: false,
  showSettings: true,

  toggleHint: state => {
    state.showHint = !state.showHint
  },

  toggleSettings: state => {
    state.showSettings = !state.showSettings
  },

  toggleNotes: state => {
    state.showNotes = !state.showNotes
  },
}
