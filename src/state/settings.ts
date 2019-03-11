import { Action } from "easy-peasy"

export interface SettingsModel {
  showSettings: boolean
  showNotes: boolean
  showHint: boolean
  toggleSettings: Action<SettingsModel, void>
  toggleNotes: Action<SettingsModel, void>
}

export const settings: SettingsModel = {
  showSettings: true,
  showNotes: false,
  showHint: false,

  toggleSettings: (state, _payload) => {
    state.showSettings = !state.showSettings
  },

  toggleNotes: (state, _payload) => {
    state.showNotes = !state.showNotes
  },
}
