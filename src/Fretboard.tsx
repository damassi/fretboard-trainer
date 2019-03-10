import React from "react"
import { Box, Image, Flex } from "rebass"
import styled from "styled-components"
import { Sans, Display } from "./Typography"

const notes = {
  flats: [
    ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
    ["B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
    ["D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D"],
    ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A"],
    ["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E"],
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
      <Image
        width="100%"
        height={220}
        src={require("./assets/fretboard.png")}
      />

      <DotsContainer width="100%" ml={-25}>
        {guitar.map((str, strIndex) => {
          return (
            <Flex width="100%" key={strIndex}>
              {str.map((note, noteIndex) => {
                const BASE = 103
                const DISTANCE_RATIO = 0.6
                const SPACE = BASE - (BASE / 12) * (noteIndex * DISTANCE_RATIO)

                return (
                  <Flex
                    key={noteIndex}
                    mr={SPACE}
                    alignItems="top"
                    justifyContent="center"
                    style={{ position: "relative" }}
                  >
                    <Dot />
                    <Note size="2">{note}</Note>
                  </Flex>
                )
              })}
            </Flex>
          )
        })}
      </DotsContainer>
    </Container>
  )
}

const Container = styled(Flex)`
  pointer-events: none;
  user-select: none;
  align-content: center;
  position: relative;
`

const DotsContainer = styled(Box)`
  position: absolute;
  top: 15px;
`

const Dot = styled(Box)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-bottom: 14px;
  background-color: white;
`

const Note = styled(Display)`
  position: absolute;
  color: black;
  top: 2px;
`
