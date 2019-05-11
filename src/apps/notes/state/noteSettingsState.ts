import { Action } from "easy-peasy"
import { StringRange } from "src/utils/types"

export type StringFocus = 0 | StringRange

export interface NotesSettingsState {
  startingFret: number

  // TODO: Consolidate this with intervals app
  stringFocus: StringFocus

  setStartingFret: Action<NotesSettingsState, number>
  setStringFocus: Action<NotesSettingsState, StringFocus>
}

export const notesSettingsState: NotesSettingsState = {
  startingFret: 1,
  stringFocus: -1, // -1 is disabled

  setStartingFret: (state, startingFret) => {
    if (startingFret === 13) {
      startingFret = 0
    }

    state.startingFret = startingFret
  },

  setStringFocus: (state, stringFocus) => {
    state.stringFocus = stringFocus
  },
}
