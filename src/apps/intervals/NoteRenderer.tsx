import React from "react"
import { DisplayAlt } from "src/components/ui/Typography"
import { NoteRendererProps } from "src/components/Fretboard/Fretboard"
import { isEqual, last } from "lodash"
import { get } from "src/utils/get"
import { useStore } from "src/utils/hooks"
import { getNoteVisibiltyForSetting } from "src/utils/fretboard/getNoteVisibility"
import { Note } from "src/utils/types"
import { containsSharpOrFlat } from "src/utils/fretboard/containsSharpOrFlat"

export const NoteRenderer: React.FC<NoteRendererProps> = ({
  FretboardNote,
  stringIndex,
  noteIndex,
  noteLabel,
}) => {
  const { currentLessonModule } = useStore(state => state.settings)
  const { currentInterval, intervals } = useStore(state => state.intervals)
  const { flashMessage } = useStore(state => state.scoreboard)

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
        case showNotes || showHint: {
          const intervalLabel = intervals[stringIndex][noteIndex]

          // FIXME: Figure out how to deal with `undefined return type
          return last<any>(intervalLabel)
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
        case (!flashMessage && showHint) || showNotes: {
          return label === "1"
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
      containsSharpOrFlat={containsSharpOrFlat(label)}
      fretboardMode={fretboardMode}
      height={size}
      isInterval={isInterval}
      isRoot={isRoot}
      selected={Boolean(currentNote)}
      showIntervals={showHint}
      visible={isVisible}
      width={size}
      currentLessonModule={currentLessonModule}
    >
      <DisplayAlt size="3" weight="black">
        {label}
      </DisplayAlt>
    </FretboardNote>
  )
}
