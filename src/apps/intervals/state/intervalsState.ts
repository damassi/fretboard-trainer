import { Action } from "easy-peasy"
import { getNote, Note } from "src/utils/fretboardUtils"
import { sample } from "lodash"

export interface Intervals {
  currentInterval: Interval
  getInterval: Action<Intervals, void>
}

export const intervalsState = {
  currentInterval: getRandomInterval(),
  getInterval: state => {
    state.currentInterval = getRandomInterval()
  },
}

// Helpers

type IntervalLabels =
  | "unison"
  | "minor 2nd"
  | "b2"
  | "major 2nd"
  | "2"
  | "minor 3rd"
  | "b3"
  | "major 3rd"
  | "3"
  | "perfect 4th"
  | "4"
  | "dim 5th"
  | "aug 4th"
  | "b4"
  | "#5"
  | "perfect 5th"
  | "5"
  | "minor 6th"
  | "aug 5th"
  | "major 6th"
  | "6"
  | "minor 7th"
  | "b7"
  | "major 7th"
  | "octave"

type IntervalRange = [Note, Note]

interface Interval {
  notes: IntervalRange
  label: IntervalLabels[]
}

export const basicIntervals: Interval[] = [
  {
    notes: getNotes([[6, 1], [6, 2]]),
    label: ["minor 2nd"],
  },
  {
    notes: getNotes([[6, 5], [5, 1]]),
    label: ["minor 2nd", "b2"],
  },
  {
    notes: getNotes([[6, 1], [6, 3]]),
    label: ["major 2nd", "2"],
  },
  {
    notes: getNotes([[6, 5], [5, 2]]),
    label: ["major 2nd", "2"],
  },
  {
    notes: getNotes([[6, 1], [6, 4]]),
    label: ["minor 3rd", "b3"],
  },
  {
    notes: getNotes([[6, 3], [5, 1]]),
    label: ["minor 3rd", "b3"],
  },
  {
    notes: getNotes([[6, 1], [6, 5]]),
    label: ["major 3rd", "3"],
  },
  {
    notes: getNotes([[6, 3], [5, 2]]),
    label: ["major 3rd", "3"],
  },
  {
    notes: getNotes([[6, 1], [5, 1]]),
    label: ["perfect 4th", "4"],
  },
  {
    notes: getNotes([[6, 1], [5, 2]]),
    label: ["dim 5th", "aug 4th"],
  },
  {
    notes: getNotes([[6, 1], [5, 3]]),
    label: ["perfect 5th", "5"],
  },
  {
    notes: getNotes([[6, 5], [5, 2]]),
    label: ["perfect 5th", "5"],
  },
  {
    notes: getNotes([[6, 1], [5, 4]]),
    label: ["minor 6th", "aug 5th"],
  },
  {
    notes: getNotes([[6, 1], [5, 5]]),
    label: ["major 6th"],
  },
  {
    notes: getNotes([[6, 3], [4, 2]]),
    label: ["major 6th"],
  },
  {
    notes: getNotes([[6, 1], [4, 1]]),
    label: ["minor 7th"],
  },
  {
    notes: getNotes([[6, 1], [4, 2]]),
    label: ["major 7th"],
  },
  {
    notes: getNotes([[6, 1], [4, 3]]),
    label: ["octave"],
  },
  {
    notes: getNotes([[6, 5], [3, 2]]),
    label: ["octave"],
  },
]

function getNotes([note1, note2]): IntervalRange {
  return [
    getNote({
      position: note1,
    }),
    getNote({
      position: note2,
    }),
  ]
}

function getRandomInterval(): Interval {
  const interval = sample(basicIntervals) as Interval // FIXME: Fix casting
  return interval
}
