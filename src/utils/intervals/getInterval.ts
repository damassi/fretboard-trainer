import { uniqBy } from "lodash"
import { getNote } from "src/utils/fretboard/getNote"
import { IntervalMode } from "src/apps/intervals/state/intervalSettingsState"
import { getIntervalByNote } from "src/utils/intervals/getIntervalByNote"
import { Fretboard, Interval, Note } from "src/utils/types"
import { computeRelativeInterval } from "./computeRelativeInterval"

export function getInterval(props: {
  fretboard: Fretboard
  intervalMode?: IntervalMode
  rootNote?: Note
}): Interval {
  const { intervalMode = "basic", rootNote: _rootNote } = props
  const rootNote = _rootNote || getNote()
  const intervalNote = getNote()

  // Rerun function if we've landed on same note
  if (uniqBy([rootNote, intervalNote], "note").length !== 2) {
    return getInterval(props)
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
        return getInterval(props)
      }
      if (noteDist > 3 || noteDist < -3) {
        return getInterval(props)
      }
      break
    }

    /**
     * In intermediate mode, permit descention, where an interval can fall *below*
     * the root note. Other basic rules apply
     */
    case "intermediate": {
      if (stringDist > 2 || stringDist < -2) {
        return getInterval(props)
      }
      if (noteDist > 3 || noteDist < -3) {
        return getInterval(props)
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
