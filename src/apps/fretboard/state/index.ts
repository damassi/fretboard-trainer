import { fretboardState, Fretboard } from "./fretboardState"
import {
  fretboardSettingsState,
  FretboardSettings,
} from "./fretboardSettingsState"

export interface FretboardModel extends Fretboard {
  settings: FretboardSettings
}

export const fretboard: FretboardModel = {
  ...fretboardState,
  settings: fretboardSettingsState,
}
