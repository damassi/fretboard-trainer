import React from "react"
import { isEqual } from "lodash"

import { Display } from "src/components/ui/Typography"
import { Note, getNoteVisibiltyForSetting } from "src/utils/fretboardUtils"
import { FretboardNoteProps } from "src/components/Fretboard/Fretboard"
import { useStore } from "src/utils/hooks"

export interface NoteRendererProps {
  Note: (props: FretboardNoteProps) => JSX.Element
  currentNote: Note
  noteLabel: string
  stringIndex: number
  noteIndex: number
  visible: boolean
}

export const NoteRenderer: React.FC<NoteRendererProps> = props => {
  const { Note, noteLabel, stringIndex, noteIndex } = props
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
    <Note selected={isCurrentNote} visible={showLabel} isRoot={isRoot}>
      {showLabel && <Display>{noteLabel}</Display>}
    </Note>
  )
}
