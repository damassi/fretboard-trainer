import { Action } from "easy-peasy"
import { StringRange } from "src/utils/fretboardUtils"

export type AccidentalMode = "naturals" | "flats" | "sharps"
export type StringFocus = 0 | StringRange

export interface FretboardSettings {
  accidentalMode: AccidentalMode
  multipleChoice: boolean
  isMuted: boolean

  showHint: boolean
  showNotes: boolean
  showSettings: boolean
  startingFret: number
  stringFocus: StringFocus

  // Actions
  setAccidentalMode: Action<FretboardSettings, AccidentalMode>
  setStartingFret: Action<FretboardSettings, number>
  setStringFocus: Action<FretboardSettings, StringFocus>

  toggleHint: Action<FretboardSettings, void>
  toggleMultipleChoice: Action<FretboardSettings, void>
  toggleMuted: Action<FretboardSettings, void>
  toggleNotes: Action<FretboardSettings, void>
  toggleSettings: Action<FretboardSettings, void>
}

export const fretboardSettingsState: FretboardSettings = {
  accidentalMode: "naturals",
  multipleChoice: true,
  isMuted: true,
  showHint: false,
  showNotes: false,
  showSettings: true,
  startingFret: 1,
  stringFocus: 0, // 0 is disabled

  setAccidentalMode: (state, payload) => {
    state.accidentalMode = payload
  },

  setStartingFret: (state, startingFret) => {
    // Octive
    if (startingFret === 13) {
      // Open string
      startingFret = 0
    }
    state.startingFret = startingFret
  },

  setStringFocus: (state, stringFocus) => {
    state.stringFocus = stringFocus
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
