import React from "react"
import { Flex, Box } from "rebass"
import { shuffle, take } from "lodash"
import { Display } from "src/components/ui/Typography"
import styled from "styled-components"

const notes = {
  flats: ["A", "Ab", "B", "Bb", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"],
  sharps: ["A", "A#", "B", "B#", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"] // prettier-ignore
}

export const Answers = props => {
  const mode = notes[props.accidentalMode || "flats"]

  return (
    <Flex
      flexWrap="wrap"
      justifyContent="center"
      mt={7}
      width="100%"
      alignItems="center"
    >
      {take(shuffle(mode), 4).map((answer, index) => {
        return (
          <Answer p={3} m={1} key={index}>
            <Display size="8">{answer}</Display>
          </Answer>
        )
      })}
    </Flex>
  )
}

const Answer = styled(Flex)`
  /* border-radius: 3px; */
  border: 1px solid #666;
  cursor: pointer;
  width: 10%;
  align-items: center;
  justify-content: center;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);

  &:hover {
    background: white;
    color: #333;
    text-shadow: none;
  }
`
