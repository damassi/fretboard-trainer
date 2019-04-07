import { Action } from "easy-peasy"

export interface IntervalsSettings {
  multipleChoice: boolean
  isMuted: boolean
  toggleMultipleChoice: Action<IntervalsSettings, void>
  toggleMuted: Action<IntervalsSettings, void>
}

export const intervalsSettingsState: IntervalsSettings = {
  multipleChoice: true,
  isMuted: true,

  toggleMultipleChoice: state => {
    state.multipleChoice = !state.multipleChoice
  },

  toggleMuted: state => {
    state.isMuted = !state.isMuted
  },
}
