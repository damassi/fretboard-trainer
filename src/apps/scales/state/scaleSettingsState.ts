import { Action } from "easy-peasy"

export interface ScaleSettingsState {
  currentScale: string

  exitRootCycle: Action<ScaleSettingsState, void>
}

export const scaleSettingsState: ScaleSettingsState = {
  currentScale: "foo",

  exitRootCycle: state => {
    console.warn(state)
  },
}
