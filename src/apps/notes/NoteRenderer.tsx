import React from "react"
import { isEqual } from "lodash"

import { Display } from "src/components/ui/Typography"
import { NoteRendererProps } from "src/components/Fretboard/Fretboard"
import { useStore } from "src/utils/hooks"
import { getNoteVisibiltyForSetting } from "src/utils/fretboard/getNoteVisibility"

export const NoteRenderer: React.FC<NoteRendererProps> = props => {
  const { FretboardNote, noteLabel, stringIndex, noteIndex } = props
  const { accidentalMode, showHint, showNotes } = useStore(state => state.settings) // prettier-ignore
  const { currentNote } = useStore(state => state.notes)
  const isCurrentNote = isEqual(currentNote.position, [stringIndex, noteIndex])

  const getVisibility = () => {
    switch (true) {
      case showNotes: {
        return (
          getNoteVisibiltyForSetting(accidentalMode, noteLabel) &&
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
  const isRoot = !showHint && showLabel && noteLabel === currentNote.note

  return (
    <FretboardNote
      selected={isCurrentNote}
      visible={showLabel}
      isRoot={isRoot}
      accidentalMode={accidentalMode}
    >
      {showLabel && <Display>{noteLabel}</Display>}
    </FretboardNote>
  )
}
