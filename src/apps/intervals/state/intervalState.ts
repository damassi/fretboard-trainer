import { isEqual, isString, sampleSize, shuffle, uniq, uniqBy } from "lodash"
import { Action, Thunk, thunk, listen, Listen } from "easy-peasy"

import { StoreModel } from "src/store"
import { getNote } from "src/utils/fretboard/getNote"
import { IntervalMode, intervalsSettingsState } from "./intervalSettingsState"
import { settingsState } from "src/apps/settings/settingsState"
import { getIntervalByNote } from "src/utils/fretboard/getIntervals"

import {
  Note,
  intervalList,
  Fretboard,
  ANSWER_COUNT,
  Interval,
  RelativeInterval,
  HINT_VISIBILITY_TIME,
  IntervalLabels,
} from "src/utils/types"

export interface Intervals {
  currentInterval: Interval
  intervals: string[][]
  questions: Interval[]

  // Listeners
  listeners: Listen<Intervals>

  // Actions
  pickAnswer: Thunk<Intervals, any, any, StoreModel>
  pickRandomInterval: Thunk<Intervals, void, any, StoreModel>
  setInterval: Action<Intervals, Interval>
  setQuestions: Action<Intervals, Interval[]>
}

export const intervalState: Intervals = {
  // @ts-ignore
  currentInterval: null,
  intervals: [],
  questions: [],

  listeners: listen(on => {
    const newIntervalsActions = [
      intervalsSettingsState.setIntervalMode,
      settingsState.setFretboardMode,
    ]

    // When these actions fire pick a new note, effectively resetting the
    // fretboard state
    newIntervalsActions.forEach(action => {
      on(
        action,
        thunk(actions => {
          actions.pickRandomInterval()
        })
      )
    })
  }),

  pickAnswer: thunk((actions, selectedInterval, { dispatch, getState }) => {
    const {
      intervals: { currentInterval },
    } = getState() as StoreModel

    let isCorrect
    if (isString(selectedInterval)) {
      isCorrect = currentInterval.label.includes(
        selectedInterval as IntervalLabels
      )
    } else {
      isCorrect = isEqual(selectedInterval, currentInterval.label)
    }

    if (isCorrect) {
      dispatch.scoreboard.correctAnswer("correct!")
    } else {
      dispatch.scoreboard.incorrectAnswer("incorrect!")
    }

    setTimeout(() => {
      actions.pickRandomInterval()
    }, HINT_VISIBILITY_TIME)
  }),

  pickRandomInterval: thunk((actions, _, { getState }) => {
    const {
      settings: { fretboard },
      intervals: {
        settings: { intervalMode },
      },
    } = getState()

    const interval = pickRandomInterval({
      fretboard,
      intervalMode,
    })

    // Pick 3 random questions while adding the answer into the mix, and then
    // from the answers take a random option from the array of possibilities.
    // E.g., [flat 5, sharp 4] -> "sharp 4"
    const getQuestions = () => {
      const takeThree = sampleSize(intervalList, ANSWER_COUNT - 1)
      const questions = shuffle(uniq([...takeThree, interval.label]))

      if (questions.length < ANSWER_COUNT) {
        return getQuestions()
      } else {
        return questions
      }
    }

    const questions = getQuestions()

    actions.setInterval(interval)
    actions.setQuestions(questions)
  }),

  setInterval: (state, interval) => {
    state.currentInterval = interval
  },

  setQuestions: (state, questions) => {
    state.questions = questions
  },
}

// Helpers

function pickRandomInterval(props: {
  fretboard: Fretboard
  intervalMode?: IntervalMode
}): Interval {
  const { fretboard, intervalMode = "basic" } = props
  const rootNote = getNote({ fretboard })
  const intervalNote = getNote()

  // Rerun function if we've landed on same note
  if (uniqBy([rootNote, intervalNote], "note").length !== 2) {
    return pickRandomInterval(props)
  }

  const relativeInterval = computeRelativeInterval(rootNote, intervalNote)
  const [stringDist, noteDist] = relativeInterval

  switch (intervalMode) {
    /**
     * In `basic`, these are the rules:
     *
     * 1) Start from the root and only permit accention, as if going up a scale.
     * 2) Don't travel more than three strings in distance
     * 3) Can only move three frets to the left of the root
     * 4) Can only move four frets to the right of the root
     */
    case "basic": {
      if (stringDist > 0 || stringDist < -2) {
        return pickRandomInterval(props)
      }
      if (noteDist > 4 || noteDist < -3) {
        return pickRandomInterval(props)
      }
      break
    }

    /**
     * In intermediate mode, permit decention, where an interval can fall *below*
     * the root note. Other basic rules apply
     */
    case "intermediate": {
      if (stringDist > 2 || stringDist < -2) {
        return pickRandomInterval(props)
      }
      if (noteDist > 4 || noteDist < -3) {
        return pickRandomInterval(props)
      }
    }
  }

  const intervalLabel = getIntervalByNote(rootNote, intervalNote)

  // TODO: Find a less imperative way to set this
  rootNote.interval = "1"
  intervalNote.interval = intervalLabel

  return {
    notes: [rootNote, intervalNote],
    relativeInterval,
    label: intervalLabel,
  }
}

export function computeRelativeInterval(
  note1: Note,
  note2: Note
): RelativeInterval {
  const subtract = ([string2, note2], [string1, note1]) => {
    return [string2 - string1, note2 - note1]
  }

  const relativeInterval = subtract(
    note2.position,
    note1.position
  ) as RelativeInterval

  return relativeInterval
}
