import React from "react"
import { Display } from "src/components/ui/Typography"
import { Note, containsSharpOrFlat } from "src/utils/fretboardUtils"
import { FretboardNoteProps } from "src/components/Fretboard/Fretboard2"
import { useStore } from "src/utils/hooks"
import { isEqual } from "lodash"

interface NoteRendererProps {
  Note: (props: FretboardNoteProps) => JSX.Element
  currentNote: Note
  note: string
  stringIndex: number
  noteIndex: number
  visible: boolean
}

export const NoteRenderer: React.FC<NoteRendererProps> = ({
  Note,
  note,
  stringIndex,
  noteIndex,
}) => {
  const { accidentalMode, showHint, showNotes } = useStore(state => state.settings) // prettier-ignore
  const { currentNote } = useStore(state => state.notes)
  const isCurrentNote = isEqual(currentNote.position, [stringIndex, noteIndex])

  const isLabelVisible = () => {
    switch (true) {
      case showNotes: {
        if (accidentalMode === "naturals") {
          if (containsSharpOrFlat(note)) {
            return false
          }
        }
        return true
      }
      case isCurrentNote && showHint:
        return true
      default:
        return false
    }
  }

  // FIXME: remove falsy note value
  const showLabel = isLabelVisible() && Boolean(note)
  const isRoot = !showHint && showLabel && note === currentNote.note

  return (
    <Note selected={isCurrentNote} visible={showLabel} isRoot={isRoot}>
      {showLabel && <Display>{note}</Display>}
    </Note>
  )
}
