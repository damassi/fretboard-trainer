import { intervalsState, Intervals } from "./intervalsState"
import {
  intervalsSettingsState,
  IntervalsSettings,
} from "./intervalsSettingsState"

export interface IntervalsModel extends Intervals {
  settings: IntervalsSettings
}

export const fretboard: IntervalsModel = {
  ...intervalsState,
  settings: intervalsSettingsState,
}
