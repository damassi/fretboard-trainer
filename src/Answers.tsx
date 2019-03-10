import React from "react"
import { Flex } from "rebass"
import { shuffle } from "lodash"
import { Display } from "./Typography"
import styled from "styled-components"

const answers = ["A", "B", "Cb", "Bb", "D", "E", "Eb", "F", "G", "Gb"]

export const Answers = () => {
  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {shuffle(answers).map((answer, index) => {
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
  border: 1px solid white;
  cursor: pointer;
  width: 20%;
  align-items: center;
  justify-content: center;

  &:hover {
    background: white;
    color: black;
  }
`
