import { Action } from "easy-peasy"
import { FretboardMode, Fretboard } from "src/utils/types"
import { getFretboard } from "src/utils/fretboard/getFretboard"

export interface SettingsModel {
  fretboard: Fretboard
  fretboardMode: FretboardMode
  isMuted: boolean
  multipleChoice: boolean
  showHint: boolean
  showIntervals: boolean
  showNotes: boolean
  showSettings: boolean

  setFretboardMode: Action<SettingsModel, FretboardMode>
  setMultipleChoice: Action<SettingsModel, string>
  setShowNotes: Action<SettingsModel, string>

  toggleHint: Action<SettingsModel, void>
  toggleIntervals: Action<SettingsModel, void>
  toggleMuted: Action<SettingsModel, void>
  toggleSettings: Action<SettingsModel, void>
}

export const settingsState: SettingsModel = {
  fretboard: getFretboard("naturals"),

  fretboardMode: "naturals",
  isMuted: true,
  multipleChoice: true,
  showHint: false,
  showIntervals: false,
  showNotes: false,
  showSettings: true,

  setFretboardMode: (state, fretboardMode) => {
    state.fretboardMode = fretboardMode
    state.fretboard = getFretboard(state.fretboardMode)
  },

  setMultipleChoice: (state, multipleChoice) => {
    state.multipleChoice = multipleChoice === "true"
  },

  setShowNotes: (state, showNotes) => {
    state.showNotes = showNotes === "true"
  },

  toggleHint: state => {
    state.showHint = !state.showHint
  },

  toggleIntervals: state => {
    state.showIntervals = !state.showIntervals
  },

  toggleMuted: state => {
    state.isMuted = !state.isMuted
  },

  toggleSettings: state => {
    state.showSettings = !state.showSettings
  },
}
