import { Action } from "easy-peasy"

/**
 * Basic focuses on most common intervals; intermediate incorporates the g
 * string; advanced includes both basic and intermediate.
 *
 * TODO:
 * Include mode that takes a random position -- say, a 4th -- and then
 * chooses an interval that's offset from that position, vs the root. A whole
 * step to the right would be a perfect 5th, rather than a 2nd.
 */
type IntervalMode = "basic" | "intermediate" | "advanced"

export interface IntervalsSettings {
  intervalMode: IntervalMode
  isMuted: boolean
  multipleChoice: boolean

  setIntervalMode: Action<IntervalsSettings, IntervalMode>
  toggleMultipleChoice: Action<IntervalsSettings, void>
  toggleMuted: Action<IntervalsSettings, void>
}

export const intervalsSettingsState: IntervalsSettings = {
  intervalMode: "basic",
  isMuted: true,
  multipleChoice: true,

  setIntervalMode: (state, intervalMode) => {
    state.intervalMode = intervalMode
  },

  toggleMultipleChoice: state => {
    state.multipleChoice = !state.multipleChoice
  },

  toggleMuted: state => {
    state.isMuted = !state.isMuted
  },
}
