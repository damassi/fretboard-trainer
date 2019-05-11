import { Action } from "easy-peasy"
import { StringFocus } from "src/apps/notes/state/noteSettingsState"

/**
 * Basic focuses on most common intervals; intermediate incorporates downward
 * intervals; advanced includes both basic and intermediate, with offsets.
 *
 * TODO:
 * Include mode that takes a random position -- say, a 4th -- and then
 * chooses an interval that's offset from that position, vs the root. A whole
 * step to the right would be a perfect 5th, rather than a 2nd.
 */
export type IntervalMode = "basic" | "intermediate" | "advanced"

export interface IntervalsSettingsState {
  intervalMode: IntervalMode
  showIntervals: boolean

  // FIXME: Consolidate this with the notes app
  stringFocus: StringFocus

  setIntervalMode: Action<IntervalsSettingsState, IntervalMode>
  setStringFocus: Action<IntervalsSettingsState, StringFocus>
  toggleShowIntervals: Action<IntervalsSettingsState, void>
}

export const intervalsSettingsState: IntervalsSettingsState = {
  intervalMode: "basic",
  showIntervals: false,
  stringFocus: -1, // -1 is disabled

  setIntervalMode: (state, intervalMode) => {
    state.intervalMode = intervalMode
  },

  setStringFocus: (state, stringFocus) => {
    state.stringFocus = stringFocus
  },

  toggleShowIntervals: state => {
    state.showIntervals = !state.showIntervals
  },
}
