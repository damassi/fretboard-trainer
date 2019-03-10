import React from "react"
import { Flex } from "rebass"
import { shuffle, take } from "lodash"
import { Display } from "./Typography"
import styled from "styled-components"

const notes = {
  flats: ["A", "Ab", "B", "Bb", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
  sharps: ["A", "A#", "B", "B#", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"] // prettier-ignore
}

export const Answers = props => {
  const mode = notes[props.accidentalMode || "flats"]

  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {take(shuffle(mode), 4).map((answer, index) => {
        return (
          <Answer p={5} m={1} key={index}>
            <Display size="8">{answer}</Display>
          </Answer>
        )
      })}
    </Flex>
  )
}

const Answer = styled(Flex)`
  border-radius: 3px;
  border: 1px solid #666;
  cursor: pointer;
  width: 20%;
  align-items: center;
  justify-content: center;

  &:hover {
    background: white;
    color: black;
  }
`
