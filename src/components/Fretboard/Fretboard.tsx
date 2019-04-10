import React from "react"
import styled, { css } from "styled-components"
import fretboardGraphic from "src/assets/fretboard.jpg"
import { useStore } from "src/utils/hooks"
import { Note as NoteProps, getNote, Note } from "src/utils/fretboard/getNote"
import { fretboardNoteMap } from "src/utils/types"
import { Box, Flex } from "rebass"
import { AccidentalMode } from "src/apps/settings/settingsState"

import {
  width,
  height,
  WidthProps,
  HeightProps,
  background,
  BackgroundProps,
} from "styled-system"

export interface NoteRendererProps {
  FretboardNote: typeof FretboardNote
  note: Note
  noteLabel: string
  stringIndex: number
  noteIndex: number
}

interface FretboardProps {
  selectedNotes?: NoteProps[]
  isVisible?: (props?) => boolean
  renderNote: (props: NoteRendererProps) => React.ReactNode
}

export const Fretboard: React.FC<FretboardProps> = props => {
  const { accidentalMode } = useStore(state => state.settings)
  const fretboard = fretboardNoteMap[accidentalMode]

  return (
    <FretboardContainer>
      {fretboard.map((string, stringIndex) => {
        const updatePosition = computeNotePosition()

        return (
          <Flex key={stringIndex}>
            {string.map((noteLabel, noteIndex) => {
              const notePosition = updatePosition(stringIndex, noteIndex)

              const note = lookupNote({
                stringIndex,
                noteIndex: 0,
                accidentalMode,
              })

              return (
                <NoteContainer
                  key={noteIndex}
                  style={notePosition}
                  onClick={() =>
                    logNote({ stringIndex, noteIndex, accidentalMode })
                  }
                >
                  {props.renderNote({
                    ...props,
                    FretboardNote,
                    note,
                    noteLabel,
                    noteIndex,
                    stringIndex,
                  })}
                </NoteContainer>
              )
            })}
          </Flex>
        )
      })}
    </FretboardContainer>
  )
}

const FretboardContainer = styled(Box)`
  background: url(${fretboardGraphic}) no-repeat;
  background-size: 100% 100%;
  height: 260px;
  position: relative;
`

const NoteContainer = styled(Flex)`
  position: absolute;
  width: 30px;
  height: 30px;
  justify-content: flex-start;
  align-items: center;
`

export interface FretboardNoteProps
  extends WidthProps,
    HeightProps,
    BackgroundProps {
  isRoot?: boolean
  isInterval?: boolean
  selected: boolean
  visible?: boolean
  children: React.ReactNode
}

const FretboardNote = styled(Flex)<FretboardNoteProps>`
  border-radius: 50%;

  ${props => {
    switch (true) {
      case props.isRoot:
        return css`
          background-color: red;
        `
      case props.isInterval:
        return css`
          background-color: rgba(243, 251, 81, 0.8);
        `
      case props.visible:
        return css`
          background-color: rgba(255, 255, 255, 0.1);
        `
      default:
        return css`
          background-color: rgba(243, 251, 81, 0.8);
        `
    }
  }};

  ${props => {
    switch (true) {
      case props.visible || props.selected:
        return css`
          visibility: visible;
        `
      default:
        return css`
          visibility: hidden;
        `
    }
  }}

  color: white;

  align-items: center;
  justify-content: center;
  position: absolute;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);

  /* Default size which can be overridden via props */
  width: 30px;
  height: 30px;
  ${width};
  ${height};

  ${background};

  /* Align inner text content, ignoring accidental */
  justify-content: flex-start;
  > div {
    margin-left: 9px;
  }

  /* TODO: Move this animation out of CSS */
  animation-name: ${p => (p.visible || p.selected ? "fadeInNote" : "none")};
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.85);

  /* Start animation */
  opacity: 0;
  transform: scale(0.5);

  /* Transition to */
  @keyframes fadeInNote {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: scale(${p => (p.visible ? "1" : "1")});
    }
  }
`

// Helpers

interface NoteLookupProps {
  stringIndex: number
  noteIndex: number
  accidentalMode: AccidentalMode
}

function lookupNote(props: NoteLookupProps): NoteProps {
  const { stringIndex, noteIndex, accidentalMode } = props
  const noteLookup: any = [stringIndex + 1, noteIndex]
  const note = getNote({
    accidentalMode,
    position: noteLookup,
  })
  return note
}

function logNote(props) {
  const note = lookupNote(props)
  console.warn(note)
}

/**
 * TODO: Make this dynamic based upon the width of the fretboard, or find some
 * proper fretboard fret spacing math...
 */
function computeNotePosition(lastPos: number = 0) {
  return (stringIndex: number, noteIndex: number) => {
    const base = 135
    let left = base + lastPos - (base / 12) * (noteIndex * 0.5)
    lastPos = left
    left -= 167
    const top = 15 + stringIndex * 40
    return {
      left,
      top,
    }
  }
}
