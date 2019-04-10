import { Action } from "easy-peasy"
import { FretboardMode } from "src/utils/types"

export interface SettingsModel {
  fretboardMode: FretboardMode
  isMuted: boolean
  multipleChoice: boolean
  showHint: boolean
  showIntervals: boolean
  showNotes: boolean
  showSettings: boolean

  setFretboardMode: Action<SettingsModel, FretboardMode>

  toggleHint: Action<SettingsModel, void>
  toggleIntervals: Action<SettingsModel, void>
  toggleMultipleChoice: Action<SettingsModel, void>
  toggleMuted: Action<SettingsModel, void>
  toggleNotes: Action<SettingsModel, void>
  toggleSettings: Action<SettingsModel, void>
}

export const settingsState: SettingsModel = {
  fretboardMode: "naturals",
  isMuted: true,
  multipleChoice: true,
  showHint: false,
  showIntervals: false,
  showNotes: false,
  showSettings: true,

  setFretboardMode: (state, payload) => {
    state.fretboardMode = payload
  },

  toggleHint: state => {
    state.showHint = !state.showHint
  },

  toggleIntervals: state => {
    state.showIntervals = !state.showIntervals
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
