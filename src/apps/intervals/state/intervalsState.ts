import { Action, Thunk, thunk } from "easy-peasy"
import { getNote, Note } from "src/utils/fretboardUtils"
import { isEqual, sample, shuffle, uniqBy, times } from "lodash"
import { StoreModel } from "src/store"
import { IntervalMode } from "./intervalsSettingsState"

type RelativeInterval = [number, number]

interface Interval {
  notes: IntervalRange
  label: IntervalLabels[]
  relativeInterval: RelativeInterval
}

export interface Intervals {
  currentInterval: Interval
  questions: Interval[]
  questionCount: number

  // Actions
  pickAnswer: Thunk<Intervals, any, any, StoreModel>
  pickRandomInterval: Thunk<Intervals, void, any, StoreModel>
  setInterval: Action<Intervals, Interval>
  setQuestions: Action<Intervals, Interval[]>
}

export const intervalsState: Intervals = {
  currentInterval: pickStaticInterval("intermediate"),
  questions: [],
  questionCount: 4,

  pickAnswer: thunk((actions, selectedInterval, { getState }) => {
    const {
      intervals: { currentInterval },
    } = getState() as StoreModel

    const isCorrect = isEqual(selectedInterval, currentInterval)
    if (isCorrect) {
      console.warn("correct!")
    }
  }),

  pickRandomInterval: thunk(actions => {
    const getIntervals = () => {
      return uniqBy(
        times(4, () => {
          return pickStaticInterval("intermediate")
          // return pickRandomInterval()
        }),
        "label"
      )
    }

    let intervals = getIntervals()
    while (intervals.length < 4) {
      intervals = getIntervals()
    }

    actions.setInterval(intervals[0])
    actions.setQuestions(shuffle(intervals))
  }),

  setInterval: (state, interval) => {
    state.currentInterval = interval
  },
  setQuestions: (state, questions) => {
    state.questions = questions
  },
}

// Helpers

type IntervalLabels =
  | "unison"
  | "minor 2nd"
  | "♭2"
  | "major 2nd"
  | "2"
  | "minor 3rd"
  | "♭3"
  | "major 3rd"
  | "3"
  | "perfect 4th"
  | "4"
  | "dim 5th"
  | "aug 4th"
  | "♭4"
  | "#5"
  | "perfect 5th"
  | "5"
  | "minor 6th"
  | "♭6"
  | "aug 5th"
  | "major 6th"
  | "6"
  | "minor 7th"
  | "♭7"
  | "major 7th"
  | "octave"

type IntervalRange = [Note, Note]

/**
 * Provides a map of common intervals so that dynamic intervals can be computed
 * by comparing relative interval distances.
 *
 * The flow is as such:
 *
 * a) Pick two random notes
 * b) Subtract noteB from noteA to get the relative distance
 * c) Iterate through the basic interval map searching for equal relative distance
 * d) If found, that's the interval. Return it to display on fretboard.
 * e) If not found, recursively call function until a match is found.
 *
 * TODO: Need to account for the `g` string, and intervals _around_ it.
 */
export const basicIntervals: Interval[] = [
  {
    ...getInterval([[6, 1], [6, 2]]),
    label: ["minor 2nd", "♭2"],
  },
  {
    ...getInterval([[6, 5], [5, 1]]),
    label: ["minor 2nd", "♭2"],
  },
  {
    ...getInterval([[6, 1], [6, 3]]),
    label: ["major 2nd", "2"],
  },
  {
    ...getInterval([[6, 5], [5, 2]]),
    label: ["major 2nd", "2"],
  },
  {
    ...getInterval([[6, 1], [6, 4]]),
    label: ["minor 3rd", "♭3"],
  },
  {
    ...getInterval([[6, 3], [5, 1]]),
    label: ["minor 3rd", "♭3"],
  },
  {
    ...getInterval([[6, 1], [6, 5]]),
    label: ["major 3rd", "3"],
  },
  {
    ...getInterval([[6, 3], [5, 2]]),
    label: ["major 3rd", "3"],
  },
  {
    ...getInterval([[6, 1], [5, 1]]),
    label: ["perfect 4th", "4"],
  },
  {
    ...getInterval([[6, 1], [5, 2]]),
    label: ["dim 5th", "aug 4th"],
  },
  {
    ...getInterval([[6, 1], [5, 3]]),
    label: ["perfect 5th", "5"],
  },
  {
    ...getInterval([[6, 5], [5, 2]]),
    label: ["perfect 5th", "5"],
  },
  {
    ...getInterval([[6, 1], [5, 4]]),
    label: ["minor 6th", "aug 5th", "♭6"],
  },
  {
    ...getInterval([[6, 1], [5, 5]]),
    label: ["major 6th"],
  },
  {
    ...getInterval([[6, 3], [4, 2]]),
    label: ["major 6th"],
  },
  {
    ...getInterval([[6, 1], [4, 1]]),
    label: ["minor 7th", "♭7"],
  },
  {
    ...getInterval([[6, 1], [4, 2]]),
    label: ["major 7th"],
  },
  {
    ...getInterval([[6, 1], [4, 3]]),
    label: ["octave"],
  },
  {
    ...getInterval([[6, 5], [3, 2]]),
    label: ["octave"],
  },
]

/**
 * Complex intervals incorporate the G string, which is tuned to a 3rd, vs a 4th
 * as the rest of the strings. This leads to offset behavior interval-wise.
 */
export const complexIntervals: Interval[] = [
  {
    ...getInterval([[4, 3], [2, 1]]),
    label: ["perfect 5th"],
  },
  {
    ...getInterval([[4, 3], [2, 2]]),
    label: ["minor 6th", "aug 5th"],
  },
  {
    ...getInterval([[4, 3], [2, 3]]),
    label: ["major 6th"],
  },
  {
    ...getInterval([[4, 3], [2, 4]]),
    label: ["minor 7th"],
  },
  {
    ...getInterval([[4, 3], [2, 5]]),
    label: ["major 7th"],
  },
  {
    ...getInterval([[4, 2], [2, 5]]),
    label: ["octave"],
  },
  {
    ...getInterval([[4, 3], [1, 1]]),
    label: ["octave"],
  },
  {
    ...getInterval([[3, 5], [2, 1]]),
    label: ["unison"],
  },
  {
    ...getInterval([[3, 4], [2, 1]]),
    label: ["minor 2nd"],
  },
  {
    ...getInterval([[3, 5], [2, 3]]),
    label: ["major 2nd"],
  },
  {
    ...getInterval([[3, 4], [2, 3]]),
    label: ["minor 3rd"],
  },
  {
    ...getInterval([[3, 4], [2, 4]]),
    label: ["major 3rd"],
  },
  {
    ...getInterval([[3, 2], [2, 3]]),
    label: ["perfect 4th"],
  },
  {
    ...getInterval([[3, 2], [2, 4]]),
    label: ["dim 5th", "aug 4th"],
  },
  {
    ...getInterval([[3, 2], [2, 5]]),
    label: ["perfect 5th"],
  },
  {
    ...getInterval([[3, 5], [1, 3]]),
    label: ["perfect 5th"],
  },
  {
    ...getInterval([[3, 2], [1, 1]]),
    label: ["minor 6th", "dim 5th"],
  },
  {
    ...getInterval([[3, 2], [1, 2]]),
    label: ["major 6th"],
  },
  {
    ...getInterval([[3, 2], [1, 3]]),
    label: ["minor 7th"],
  },
  {
    ...getInterval([[3, 2], [1, 4]]),
    label: ["major 7th"],
  },
  {
    ...getInterval([[3, 2], [1, 5]]),
    label: ["octave"],
  },
]

function getInterval([notePosition1, notePosition2]): {
  notes: IntervalRange
  relativeInterval: RelativeInterval
} {
  const note1 = getNote({
    position: notePosition1,
  })
  const note2 = getNote({
    position: notePosition2,
  })
  const relativeInterval = computeRelativeInterval(note1, note2)

  return {
    notes: [note1, note2],
    relativeInterval,
  }
}

/**
 * Static intervals for testing possibilities.
 */
function pickStaticInterval(mode: IntervalMode = "basic"): Interval {
  switch (mode) {
    case "basic":
      return sample(basicIntervals) as Interval
    case "intermediate":
      return sample(complexIntervals) as Interval
    case "advanced":
      return sample(basicIntervals) as Interval // TODO
    default:
      return sample(basicIntervals) as Interval
  }
}

/**
 * Dynamic intervals. Mapped against static intervals by computing the relative
 * difference between two note positions in the array.
 */
export function pickRandomInterval(): Interval {
  const note1 = getNote()
  const note2 = getNote()

  // TODO: Avoid `G` string for now until a proper heuristic is found for
  // offsetting fret distances.
  if (note1.string === "g" || note2.string === "g") {
    return pickRandomInterval()
  }

  const relativeInterval = computeRelativeInterval(note1, note2)

  const interval = basicIntervals.find(interval => {
    if (isEqual(interval.relativeInterval, relativeInterval)) {
      return true
    } else {
      return false
    }
  })

  if (!interval) {
    return pickRandomInterval()
  }

  return {
    ...interval,
    notes: [note1, note2],
  }
}

function computeRelativeInterval(note1, note2): RelativeInterval {
  const subtract = ([string2, note2], [string1, note1]) => {
    return [string2 - string1, note2 - note1]
  }
  const relativeInterval = subtract(
    note2.position,
    note1.position
  ) as RelativeInterval

  return relativeInterval
}
