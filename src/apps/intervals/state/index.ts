import { intervalState, Intervals } from "./intervalState"
import {
  intervalsSettingsState,
  IntervalsSettings,
} from "./intervalSettingsState"

export interface IntervalsModel extends Intervals {
  settings: IntervalsSettings
}

export const intervals: IntervalsModel = {
  ...intervalState,
  settings: intervalsSettingsState,
}
