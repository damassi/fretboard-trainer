import React from "react"
import { Box, Image, Flex } from "rebass"
import styled from "styled-components"
import { Display } from "./Typography"
import fretboardGraphic from "./assets/fretboard.png"

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
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
    ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    ["G", "G#", "A", "B#", "B", "C", "C#", "D", "D#", "E", "F", "G#", "G"],
    ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
    ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
  ],
}

export const Fretboard = props => {
  const guitar = notes[props.accidentalMode || "flats"]

  return (
    <Container flexDirection="column" justifyContent="center">
      <Image width="100%" height={220} src={fretboardGraphic} />

      <NotesContainer ml={-30}>
        {guitar.map((string, stringIndex) => {
          return (
            <Flex key={stringIndex}>
              {string.map((note, noteIndex) => {
                const BASE = 95
                const DISTANCE_RATIO = 0.68
                const SPACE = BASE - (BASE / 12) * (noteIndex * DISTANCE_RATIO)

                return (
                  // <NoteContainer key={noteIndex} mr={SPACE} mb="4px">
                  <Note mr={SPACE}>
                    <Display size="5">{note}</Display>
                  </Note>
                  // </NoteContainer>
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

const NoteContainer = styled(Flex)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50%;
  align-items: center;
  justify-content: flex-start;
  width: 30px;
  height: 30px;
`

const Note = styled(Flex)`
  color: white;
  width: 30px;
  height: 30px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  top: 3px;
  margin-bottom: 4px;
  position: relative;
`
