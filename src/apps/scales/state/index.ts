import { scaleState, ScaleState } from "./scaleState"
import { scaleSettingsState, ScaleSettingsState } from "./scaleSettingsState"

export interface ScalesModel extends ScaleState {
  settings: ScaleSettingsState
}

export const scales: ScalesModel = {
  ...scaleState,
  settings: scaleSettingsState,
}
