import React from "react"
import { Box, Image, Flex } from "rebass"
import styled from "styled-components"
import { Display } from "src/components/ui/Typography"
import fretboardGraphic from "src/assets/fretboard.png"
import { useStore } from "src/utils/hooks"

const notes = {
  flats: [
    ["E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E"],
    ["B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
    ["G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G"],
    ["D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D"],
    ["A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A"],
    ["E", "F", "G♭", "G", "A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E"],
  ],
  sharps: [
    ["E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E"],
    ["B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
    ["G", "G♯", "A", "B♯", "B", "C", "C♯", "D", "D♯", "E", "F", "G♯", "G"],
    ["D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D"],
    ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A"],
    ["E", "F", "F♯", "G", "G♯", "A", "A♯", "B", "C", "C♯", "D", "D♯", "E"],
  ],
}

export const Fretboard = _props => {
  const state = useStore(state => state.settings)
  const guitar = notes[state.accidentalMode]

  return (
    <Container flexDirection="column" justifyContent="center">
      <Image width="100%" height={260} src={fretboardGraphic} />

      <NotesContainer ml={-40}>
        {guitar.map((string, stringIndex) => {
          return (
            <Flex key={stringIndex}>
              {string.map((note, noteIndex) => {
                const BASE = 98
                const DISTANCE_RATIO = 0.65
                const SPACE = BASE - (BASE / 12) * (noteIndex * DISTANCE_RATIO)

                return (
                  <NoteContainer
                    mr={SPACE}
                    key={noteIndex}
                    showNotes={state.showNotes}
                  >
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

const NoteContainer = styled(Flex)<{ showNotes: boolean }>`
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 30px;
  height: 30px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  top: 5px;
  margin-bottom: 10px;
  position: relative;

  ${Note} {
    visibility: ${props => (props.showNotes ? "visible" : "hidden")};
  }
`
