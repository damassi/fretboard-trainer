import { isEqual, isString, sampleSize, shuffle, uniq } from "lodash"
import { Action, Thunk, thunk, listen, Listen } from "easy-peasy"

import { StoreModel } from "src/store"
import { intervalsSettingsState } from "./intervalSettingsState"
import { settingsState } from "src/apps/settings/settingsState"
import { mapIntervals } from "src/utils/intervals/mapIntervals"
import { getInterval } from "src/utils/intervals/getInterval"
import { playInterval } from "src/utils/fretboard/playNote"

import {
  intervalList,
  ANSWER_COUNT,
  Interval,
  HINT_VISIBILITY_TIME,
  IntervalLabels,
  Note,
} from "src/utils/types"

export interface Intervals {
  currentInterval: Interval
  currentRoot: Note
  intervals: string[][]
  questions: Interval[]

  /**
   * As a form of contextual learning, if entering a root cycle only pick
   * intervals around the root note, which helps mimic actual playing.
   */
  rootCycle: {
    currentIndex: number
    enabled: boolean
    intervals: Intervals[]
    numCycles: number
  }

  // Listeners
  listeners: Listen<Intervals>

  // Actions
  maybeEnterRootCycle: Action<Intervals, void>
  pickAnswer: Thunk<Intervals, any, any, StoreModel>
  pickRandomInterval: Thunk<Intervals, void, any, StoreModel>
  setInterval: Action<Intervals, Interval>
  setQuestions: Action<Intervals, Interval[]>
}

export const intervalState: Intervals = {
  // FIXME: Figure out how to handle nulls in the following props
  // @ts-ignore
  currentInterval: null,
  // @ts-ignore
  currentRoot: null,
  // @ts-ignore
  questions: ["1", "2", "3", "4"],
  intervals: [],

  rootCycle: {
    currentIndex: 0,
    enabled: false,
    intervals: [],
    numCycles: 3,
  },

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

  /**
   * Evaluates whether a user-selected answer is correct and updates the board
   * with a new interval and updated score.
   */
  pickAnswer: thunk((actions, selectedInterval, { dispatch, getState }) => {
    const {
      intervals: { currentInterval },
    } = getState() as StoreModel

    let isCorrect

    // TODO: Unify this check so that the branch is unnecessary
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

    // Trigger a new interval
    setTimeout(() => {
      actions.pickRandomInterval()
    }, HINT_VISIBILITY_TIME)
  }),

  /**
   * Picks a new root note and interval. If in a root cycle, use the current
   * root note instead.
   */
  pickRandomInterval: thunk((actions, _, { getState }) => {
    const {
      settings: { fretboard, isMuted, currentLessonModule },
      intervals: {
        currentInterval,
        currentRoot,
        rootCycle,
        settings: { intervalMode },
      },
    } = getState()

    // If in cycle, use previous root
    const rootNote = rootCycle.enabled ? currentRoot : undefined

    // Recursive function that checks whether or not the new interval is the
    // same as the current and if so executes again.
    const pickInterval = (): Interval => {
      const interval = getInterval({
        fretboard,
        intervalMode,
        rootNote,
      })

      // Current and new are the same
      const isInvalid =
        currentInterval && isEqual(interval.label, currentInterval.label)

      if (isInvalid) {
        return pickInterval()
      } else {
        return interval
      }
    }

    const interval = pickInterval()

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

    // Dispatch results
    actions.setInterval(interval)
    actions.maybeEnterRootCycle()
    actions.setQuestions(getQuestions())

    // TODO: Find a better way to section off cross-module state. In this
    // instance changing the fretboardMode in the settings will trigger a new
    // interval (and a new note, in the notes module), simulating a reset.
    if (currentLessonModule === "intervals") {
      if (!isMuted) {
        playInterval(interval.notes)
      }
    }
  }),

  /**
   * Sets the new interval and root note and lays out a new interval map of the
   * fretboard, keyed off of the root.
   */
  setInterval: (state, interval) => {
    state.currentInterval = interval
    state.currentRoot = interval.notes[0]

    // Calculates the intervals for the entire board
    state.intervals = mapIntervals({
      note: interval.notes[0],
    })
  },

  setQuestions: (state, questions) => {
    state.questions = questions
  },

  /**
   * Checks to see if we're currently in a cycle, and if not, enter one. A
   * "Root Cycle" is a fixed rotation around a given root note.
   */
  maybeEnterRootCycle: state => {
    if (!state.rootCycle.enabled) {
      state.rootCycle.enabled = Math.random() * 10 < 5 // 50% of the time we're in a cycle

      if (state.rootCycle.enabled) {
        state.rootCycle.numCycles = Math.floor(Math.random() * 5)
      }
    } else {
      if (state.rootCycle.currentIndex < state.rootCycle.numCycles) {
        state.rootCycle.currentIndex++
      } else {
        state.rootCycle.enabled = false
        state.rootCycle.currentIndex = 0
      }
    }
  },
}
