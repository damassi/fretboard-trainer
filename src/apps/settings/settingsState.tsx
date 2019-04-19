import { Action, Listen, listen, thunk } from "easy-peasy"
import { FretboardMode, Fretboard, HINT_VISIBILITY_TIME } from "src/utils/types"
import { getFretboard } from "src/utils/fretboard/getFretboard"
import { scoreboard } from "src/components/Scoreboard/scoreboardState"

export interface SettingsModel {
  fretboard: Fretboard
  fretboardMode: FretboardMode
  isMuted: boolean
  multipleChoice: boolean
  showHint: boolean
  showIntervals: boolean
  showNotes: boolean
  showSettings: boolean

  listeners: Listen<SettingsModel>

  setFretboardMode: Action<SettingsModel, FretboardMode>
  setMultipleChoice: Action<SettingsModel, string>
  setShowNotes: Action<SettingsModel, string>
  setHintVisibility: Action<SettingsModel, boolean>

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

  // When the flash message fires, show the answer for a brief period of time
  listeners: listen(on => {
    on(
      scoreboard.showFlash,
      thunk(actions => {
        actions.setHintVisibility(true)

        setTimeout(() => {
          actions.setHintVisibility(false)
        }, HINT_VISIBILITY_TIME)
      })
    )
  }),

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

  setHintVisibility: (state, showHint) => {
    state.showHint = showHint
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
