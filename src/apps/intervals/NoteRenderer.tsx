import React from "react"
import { Display } from "src/components/ui/Typography"
import { Note } from "src/utils/fretboardUtils"
import { FretboardNoteProps } from "src/components/Fretboard/Fretboard"
import { isEqual } from "lodash"
import { get } from "src/utils/get"
import { useStore } from "src/utils/hooks"

interface NoteRendererProps {
  Note: (props: FretboardNoteProps) => JSX.Element
  currentNote: Note
  note: string
  stringIndex: number
  noteIndex: number
  selectedNotes: Note[]
  visible: boolean
}

export const NoteRenderer: React.FC<NoteRendererProps> = ({
  Note,
  currentNote,
  selectedNotes,
  ...props
}) => {
  const { showHint, showNotes } = useStore(state => state.settings)

  const getVisibility = () => {
    switch (true) {
      case selectedNotes.some(note => isEqual(note, currentNote)):
        return true
    }
  }

  const label = get(
    currentNote,
    p => {
      switch (true) {
        case showNotes:
          return props.note
        case showHint:
          return p.interval
        case p.interval === "1":
          return p.interval
        default:
          props.note
      }
    },
    props.note
  )

  const isVisible = getVisibility()
  const isRoot = get(currentNote, p => p.interval === "1", false)

  return (
    <Note selected={Boolean(currentNote)} visible={isVisible} isRoot={isRoot}>
      <Display>{label}</Display>
    </Note>
  )
}
