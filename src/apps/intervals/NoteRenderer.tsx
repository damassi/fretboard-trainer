import React from "react"
import { Display } from "src/components/ui/Typography"
import { NoteRendererProps } from "src/components/Fretboard/Fretboard"
import { isEqual } from "lodash"
import { get } from "src/utils/get"
import { useStore } from "src/utils/hooks"
import { getNoteVisibiltyForSetting } from "src/utils/fretboard/getNoteVisibility"
import { Note } from "src/utils/types"
import { getIntervals } from "src/utils/fretboard/getIntervals"
import { containsSharpOrFlat } from "src/utils/fretboard/containsSharpOrFlat"

export const NoteRenderer: React.FC<NoteRendererProps> = ({
  FretboardNote,
  stringIndex,
  noteIndex,
  noteLabel,
}) => {
  const { currentInterval } = useStore(state => state.intervals)
  const { showIntervals } = useStore(state => state.intervals.settings)

  // TODO: Figure out how to deal with value | undefined from `find`
  // @ts-ignore
  const currentNote: Note = get(currentInterval, p => {
    return p.notes.find(n => {
      const match = isEqual([stringIndex, noteIndex], n.position)
      return match
    })
  })

  const { fretboardMode, showHint, showNotes } = useStore(
    state => state.settings
  )

  const getVisibility = () => {
    switch (true) {
      case showNotes: {
        return (
          getNoteVisibiltyForSetting(fretboardMode, noteLabel) &&
          Boolean(noteLabel)
        )
      }
      case currentInterval &&
        currentInterval.notes.some(note => isEqual(note, currentNote)):
        return true
    }
  }

  const isInterval = get(currentNote, note => note.interval !== "1")

  const label = get(
    currentNote,
    note => {
      switch (true) {
        case showHint: {
          const intervalLabel = getIntervals({
            note: currentInterval.notes[0],
          })[stringIndex][noteIndex]
          return intervalLabel
        }
        case showNotes:
          return noteLabel
        case note.interval === "1":
          return note.interval
        default:
          return ""
      }
    },
    ""
  )

  const isRoot = get(
    currentNote,
    note => {
      switch (true) {
        case showNotes: {
          if (showIntervals) {
            return label === "1"
          }
          return label === currentInterval.notes[0].note
        }
        case note.interval === "1":
          return true
        default:
          return false
      }
    },
    false
  )

  const isVisible = getVisibility()
  const size = showNotes ? 30 : 30

  return (
    <FretboardNote
      fretboardMode={fretboardMode}
      width={size}
      height={size}
      selected={Boolean(currentNote)}
      visible={isVisible}
      isRoot={isRoot}
      isInterval={isInterval}
      containsSharpOrFlat={containsSharpOrFlat(label)}
      showIntervals={showHint}
    >
      <Display>{label}</Display>
    </FretboardNote>
  )
}
