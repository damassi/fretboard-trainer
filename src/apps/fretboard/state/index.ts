import { fretboardState, Fretboard } from "./fretboard"
import { settingsState, Settings } from "./settings"

export interface FretboardModel extends Fretboard, Settings {}

export const fretboard: FretboardModel = {
  ...fretboardState,
  ...settingsState,
}
