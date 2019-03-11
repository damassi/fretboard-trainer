import React from "react"
import { Flex, Box } from "rebass"
import { shuffle, take } from "lodash"
import { Display } from "src/components/ui/Typography"
import styled from "styled-components"
import { useStore, useActions } from "src/utils/hooks"
import { OpenEyeIcon } from "./ui/OpenEyeIcon"

const notes = {
  flats: ["A", "A♭", "B", "B♭", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G"],
  sharps: ["A", "A♯", "B", "B♯", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯"] // prettier-ignore
}

export const Answers = _props => {
  const { setRandomNote } = useActions(actions => actions.fretboard)
  const { accidentalMode } = useStore(state => state.fretboard)
  const possibleAnswers = take(shuffle(notes[accidentalMode]), 4)
  // const currentNote = useStore(state => state.fretboard.currentNote)

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        mt={7}
        width="100%"
        alignItems="center"
      >
        {possibleAnswers.map((answer, index) => {
          return (
            <Answer onClick={() => setRandomNote()} p={3} m={1} key={index}>
              <Display size="8">{answer}</Display>
            </Answer>
          )
        })}
      </Flex>

      <HintButton />
    </Flex>
  )
}

const HintButton = _props => {
  const { showHint } = useStore(state => state.settings)
  const { toggleHint } = useActions(actions => actions.settings)

  return (
    <Box p={2}>
      <OpenEyeIcon
        onClick={() => toggleHint()}
        fill={showHint ? "white" : "black60"}
        style={{
          transform: `scale(${showHint ? 1.3 : 1})`,
        }}
      />
    </Box>
  )
}

const Answer = styled(Flex)`
  border: 1px solid #666;
  cursor: pointer;
  width: 10%;
  align-items: center;
  justify-content: center;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  user-select: none;

  &:hover {
    background: white;
    color: #333;
    text-shadow: none;
  }
`
