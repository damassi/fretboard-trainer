import { Action } from "easy-peasy"
import { StringRange } from "src/utils/fretboardUtils"

export type AccidentalMode = "naturals" | "flats" | "sharps"
export type StringFocus = 0 | StringRange

export interface Settings {
  accidentalMode: AccidentalMode
  multipleChoice: boolean
  isMuted: boolean

  showHint: boolean
  showNotes: boolean
  showSettings: boolean
  startingFret: number
  stringFocus: StringFocus

  // Actions
  setAccidentalMode: Action<Settings, AccidentalMode>
  setStartingFret: Action<Settings, number>
  setStringFocus: Action<Settings, StringFocus>

  toggleHint: Action<Settings, void>
  toggleMultipleChoice: Action<Settings, void>
  toggleMuted: Action<Settings, void>
  toggleNotes: Action<Settings, void>
  toggleSettings: Action<Settings, void>
}

export const settingsState: Settings = {
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
