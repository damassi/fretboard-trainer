import React from "react"
import styled, { css } from "styled-components"
import { Box, Flex } from "rebass"
import { isEqual } from "lodash"

import fretboardGraphic from "src/assets/fretboard.jpg"
import { notes, Note as NoteProps } from "src/utils/fretboardUtils"
import { Display } from "src/components/ui/Typography"
import { useStore } from "src/utils/hooks"
import { getNote } from "src/utils/fretboardUtils"

interface FretboardProps {
  selectedNotes?: NoteProps[]
  isVisible?: (props?) => boolean
  renderNote?: (props?) => React.ReactNode
}

export const Fretboard2: React.FC<FretboardProps> = props => {
  const { selectedNotes, isVisible = () => true } = props
  const { accidentalMode } = useStore(state => state.settings)
  const fretboard = notes[accidentalMode]

  return (
    <FretboardContainer>
      {fretboard.map((string, stringIndex) => {
        const updatePosition = computeNotePosition()

        return (
          <Flex key={stringIndex}>
            {string.map((note, noteIndex) => {
              const notePosition = updatePosition(stringIndex, noteIndex)

              let currentNote
              if (selectedNotes) {
                currentNote = selectedNotes.find(n => {
                  const match = isEqual([stringIndex, noteIndex], n.position)
                  return match
                })
              }

              const visible = isVisible({
                ...props,
                currentNote,
              })

              return (
                <NoteContainer
                  key={noteIndex}
                  style={notePosition}
                  onClick={() =>
                    logNote({ stringIndex, noteIndex, accidentalMode })
                  }
                >
                  {props.renderNote ? (
                    props.renderNote({
                      ...props,
                      Note,
                      currentNote,
                      note,
                      stringIndex,
                      noteIndex,
                      visible,
                    })
                  ) : (
                    <Note selected={Boolean(currentNote)} visible={visible}>
                      <Display>{note}</Display>
                    </Note>
                  )}
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

const noteSize = css`
  width: 30px;
  height: 30px;
`

const NoteContainer = styled(Box)`
  position: absolute;
  ${noteSize};
`

export interface FretboardNoteProps {
  isRoot?: boolean
  selected: boolean
  visible?: boolean
  children: React.ReactNode
}

const Note = styled(Flex)<FretboardNoteProps>`
  border-radius: 50%;

  ${props => {
    switch (true) {
      case props.isRoot:
        return css`
          background-color: red;
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

  ${noteSize};

  align-items: center;
  justify-content: center;
  position: absolute;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);

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

/**
 * TODO: Make this dynamic based upon the width of the fretboard
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

function logNote({ stringIndex, noteIndex, accidentalMode }) {
  const noteLookup: any = [stringIndex + 1, noteIndex]
  const found = getNote({
    accidentalMode,
    position: noteLookup,
  })

  console.warn(`[${noteLookup}]`, found)
}
