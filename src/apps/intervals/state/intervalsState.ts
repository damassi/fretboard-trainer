import { Action, Thunk, thunk } from "easy-peasy"
import { getNote, Note } from "src/utils/fretboardUtils"
import { isEqual, sample, shuffle, uniqBy, times } from "lodash"
import { StoreModel } from "src/store"

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
  currentInterval: pickRandomInterval(),
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
          return pickRandomInterval()
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
    // console.log(intervals[0])
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

function pickRandomInterval(): Interval {
  const interval = sample(basicIntervals) as Interval
  return interval
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
