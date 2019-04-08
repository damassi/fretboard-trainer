import { Action } from "easy-peasy"
import { StringRange } from "src/utils/fretboardUtils"

export type StringFocus = 0 | StringRange

export interface NotesSettings {
  startingFret: number
  stringFocus: StringFocus

  setStartingFret: Action<NotesSettings, number>
  setStringFocus: Action<NotesSettings, StringFocus>
}

export const notesSettingsState: NotesSettings = {
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
