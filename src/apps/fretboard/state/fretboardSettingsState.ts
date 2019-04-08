import { Action } from "easy-peasy"
import { StringRange } from "src/utils/fretboardUtils"

export type StringFocus = 0 | StringRange

export interface FretboardSettings {
  startingFret: number
  stringFocus: StringFocus

  setStartingFret: Action<FretboardSettings, number>
  setStringFocus: Action<FretboardSettings, StringFocus>
}

export const fretboardSettingsState: FretboardSettings = {
  startingFret: 1,
  stringFocus: 0, // 0 is disabled

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
}
