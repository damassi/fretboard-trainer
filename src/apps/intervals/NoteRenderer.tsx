/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from "react"
import { Display } from "src/components/ui/Typography"
import { Note, getNoteVisibiltyForSetting } from "src/utils/fretboardUtils"
import { FretboardNoteProps } from "src/components/Fretboard/Fretboard"
import { isEqual } from "lodash"
import { get } from "src/utils/get"
import { useStore } from "src/utils/hooks"
import { Note as NoteProps } from "src/utils/fretboardUtils"

interface NoteRendererProps {
  Note: (props: FretboardNoteProps) => JSX.Element
  currentNote: Note
  noteLabel: string
  stringIndex: number
  noteIndex: number
  visible: boolean
  note: NoteProps
}

export const NoteRenderer: React.FC<NoteRendererProps> = ({
  Note,
  stringIndex,
  noteIndex,
  noteLabel,
  // note,
}) => {
  // console.log(noteLabel)
  const { currentInterval } = useStore(state => state.intervals)

  // FIXME: Initialze interval before first render
  const currentNote = get(currentInterval, p => {
    return p.notes.find(n => {
      const match = isEqual([stringIndex, noteIndex], n.position)
      return match
    })
  })

  const { accidentalMode, showHint, showNotes } = useStore(
    state => state.settings
  )

  const getVisibility = () => {
    switch (true) {
      case showNotes: {
        return (
          getNoteVisibiltyForSetting(accidentalMode, noteLabel) &&
          Boolean(noteLabel)
        )
      }
      case currentInterval &&
        currentInterval.notes.some(note => isEqual(note, currentNote)):
        return true
    }
  }

  const label = get(
    currentNote,
    p => {
      switch (true) {
        case showNotes:
          return noteLabel
        case showHint:
          return p!.interval
        case p!.interval === "1":
          return p!.interval
        default:
          return ""
      }
    },
    ""
  )

  const isInterval = get(currentNote, p => p!.interval !== "1")

  const isRoot = get(
    currentNote,
    p => {
      switch (true) {
        case showNotes: {
          return noteLabel === currentInterval.notes[0].note
        }
        case p!.interval === "1":
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
    <Note
      width={size}
      height={size}
      selected={Boolean(currentNote)}
      visible={isVisible}
      isRoot={isRoot}
      isInterval={isInterval}
    >
      <Display>{label}</Display>
    </Note>
  )
}
