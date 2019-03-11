import React from "react"
import styled from "styled-components"
import { Box, Image, Flex } from "rebass"
import { isEqual } from "lodash"

import fretboardGraphic from "src/assets/fretboard.png"
import { Display } from "src/components/ui/Typography"
import { useStore } from "src/utils/hooks"
import { notes } from "src/utils/fretboardUtils"

export const Fretboard = _props => {
  const settings = useStore(state => state.settings)
  const { accidentalMode, currentNote } = useStore(state => state.fretboard)
  const fretboard = notes[accidentalMode]

  return (
    <Container flexDirection="column" justifyContent="center">
      <Image width="100%" height={260} src={fretboardGraphic} />

      <NotesContainer ml={-40}>
        {fretboard.map((string, stringIndex) => {
          return (
            <Flex key={stringIndex}>
              {string.map((note, noteIndex) => {
                const BASE = 98
                const DISTANCE_RATIO = 0.65
                const SPACE = BASE - (BASE / 12) * (noteIndex * DISTANCE_RATIO)
                const isCurrentNote = isEqual(currentNote.position, [
                  stringIndex,
                  noteIndex,
                ])
                const showNote =
                  isCurrentNote || settings.showHint || settings.showNotes

                return (
                  <NoteContainer mr={SPACE} key={noteIndex} showNote={showNote}>
                    <Note size="5">{note}</Note>
                  </NoteContainer>
                )
              })}
            </Flex>
          )
        })}
      </NotesContainer>
    </Container>
  )
}

const Container = styled(Flex)`
  pointer-events: none;
  user-select: none;
  align-content: center;
  position: relative;
`

const NotesContainer = styled(Box)`
  position: absolute;
`

const Note = styled(Display)`
  position: relative;
  left: 8px;
`

const NoteContainer = styled(Flex)<{ showNote: boolean }>`
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 30px;
  height: 30px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  top: 5px;
  margin-bottom: 10px;
  position: relative;
  visibility: ${p => (p.showNote ? "visible" : "hidden")};
  transform: scale(1.5);

  ${Note} {
    visibility: ${p => (p.showNote ? "visible" : "hidden")};
  }
`
