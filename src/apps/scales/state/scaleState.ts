import { Action } from "easy-peasy"

export interface ScaleState {
  currentScale: string

  exitRootCycle: Action<ScaleState, void>
}

export const scaleState: ScaleState = {
  currentScale: "",

  exitRootCycle: state => {
    console.warn(state)
  },
}
