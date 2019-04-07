import React from "react"
import styled, { css } from "styled-components"
import { Box, Flex } from "rebass"
import { isEqual } from "lodash"

import fretboardGraphic from "src/assets/fretboard.jpg"
import { notes, Note as NoteProps } from "src/utils/fretboardUtils"
import { Display } from "src/components/ui/Typography"
import { AccidentalMode } from "src/apps/fretboard/state/fretboardSettingsState"

interface FretboardProps {
  selectedNotes: NoteProps[]
  accidentalMode?: AccidentalMode
  isVisible?: (props?) => boolean
}

export const Fretboard2: React.FC<FretboardProps> = props => {
  const {
    selectedNotes,
    accidentalMode = "flats",
    isVisible = () => true,
  } = props

  const fretboard = notes[accidentalMode]

  return (
    <FretboardContainer>
      {fretboard.map((string, stringIndex) => {
        const updatePosition = computeNotePosition()

        return (
          <Flex key={stringIndex}>
            {string.map((note, noteIndex) => {
              const notePosition = updatePosition(stringIndex, noteIndex)

              const currentNote = selectedNotes.find(n => {
                const match = isEqual([stringIndex, noteIndex], n.position)
                return match
              })

              const visible = isVisible({
                ...props,
                currentNote,
              })

              return (
                <NoteContainer key={noteIndex} style={notePosition}>
                  <Note selected={Boolean(currentNote)} visible={visible}>
                    <Display>{note}</Display>
                  </Note>
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

const Note = styled(Flex)<{
  selected?: boolean
  visible?: boolean
}>`
  border-radius: 50%;

  background-color: rgba(255, 255, 255, 0.1);
  background-color: ${p => (p.selected ? "green" : "")};
  color: white;

  ${noteSize};

  align-items: center;
  justify-content: center;
  position: absolute;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);

  visibility: ${p => (p.visible ? "visible" : "hidden")};
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
