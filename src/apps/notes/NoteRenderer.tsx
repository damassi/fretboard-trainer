import React from "react"
import { isEqual } from "lodash"

import { DisplayAlt } from "src/components/ui/Typography"
import { NoteRendererProps } from "src/components/Fretboard/Fretboard"
import { useStore } from "src/utils/hooks"
import { getNoteVisibiltyForSetting } from "src/utils/fretboard/getNoteVisibility"

export const NoteRenderer: React.FC<NoteRendererProps> = React.memo(props => {
  const { FretboardNote, noteLabel, stringIndex, noteIndex } = props
  const { currentLessonModule, fretboardMode, showHint, showNotes } = useStore(state => state.settings) // prettier-ignore
  const { currentNote } = useStore(state => state.notes)
  const isCurrentNote = isEqual(currentNote.position, [stringIndex, noteIndex])

  const getVisibility = () => {
    switch (true) {
      case showNotes: {
        return (
          getNoteVisibiltyForSetting(fretboardMode, noteLabel) &&
          Boolean(noteLabel)
        ) // FIXME: remove falsy note value
      }
      case isCurrentNote && showHint:
        return true
      default:
        return false
    }
  }

  const showLabel = getVisibility()
  const isRoot = showLabel && noteLabel === currentNote.note

  return (
    <FretboardNote
      currentLessonModule={currentLessonModule}
      fretboardMode={fretboardMode}
      isRoot={isRoot}
      selected={isCurrentNote}
      visible={showLabel}
    >
      {showLabel && (
        <DisplayAlt size="3" weight="black">
          {noteLabel}
        </DisplayAlt>
      )}
    </FretboardNote>
  )
})
