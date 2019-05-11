import { intervalState, IntervalsState } from "./intervalState"
import {
  intervalsSettingsState,
  IntervalsSettingsState,
} from "./intervalSettingsState"

export interface IntervalsModel extends IntervalsState {
  settings: IntervalsSettingsState
}

export const intervals: IntervalsModel = {
  ...intervalState,
  settings: intervalsSettingsState,
}
