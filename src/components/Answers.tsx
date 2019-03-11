import React from "react"
import styled from "styled-components"
import { Flex, Box } from "rebass"

import { Display } from "src/components/ui/Typography"
import { useStore, useActions } from "src/utils/hooks"
import { OpenEyeIcon } from "./ui/OpenEyeIcon"

export const Answers = _props => {
  const { pickAnswer } = useActions(actions => actions.fretboard)
  const { questions } = useStore(state => state.fretboard)

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        mt={7}
        width="100%"
        alignItems="center"
      >
        {questions.map((answer, index) => {
          return (
            <Answer onClick={() => pickAnswer(answer)} p={3} m={1} key={index}>
              <Display size="8">{answer.note}</Display>
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
