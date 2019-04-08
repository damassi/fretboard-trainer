import React from "react"
import { Display } from "src/components/ui/Typography"
import { Note } from "src/utils/fretboardUtils"
import { FretboardNoteProps } from "src/components/Fretboard/Fretboard2"

interface NoteRendererProps {
  Note: (props: FretboardNoteProps) => JSX.Element
  currentNote: Note
  visible: boolean
  note: string
}

export const NoteRenderer: React.FC<NoteRendererProps> = ({
  Note,
  ...props
}) => {
  return (
    <Note selected={Boolean(props.currentNote)} visible={props.visible}>
      <Display>{props.note}</Display>
    </Note>
  )
}
