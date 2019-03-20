import React, { useRef } from "react"
import styled from "styled-components"
import { Flex, Box } from "rebass"

import { Display } from "src/components/ui/Typography"
import { useStore, useActions } from "src/utils/hooks"
import { OpenEyeIcon } from "src/components/ui/OpenEyeIcon"
import { font, fontSize } from "src/Theme"

export const Answers = _props => {
  const { pickAnswer } = useActions(actions => actions.fretboard)
  const answerInputRef = useRef(null)

  const {
    questions,
    settings: { multipleChoice },
  } = useStore(state => state.fretboard)

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        mt={7}
        width="100%"
        alignItems="center"
      >
        {/*
          Create list of selectable, multiple choice answers
        */}
        {multipleChoice ? (
          <>
            {questions.map((answer, index) => {
              return (
                <Answer onClick={() => pickAnswer(answer.note)} key={index}>
                  {answer.note}
                </Answer>
              )
            })}
          </>
        ) : (
          // Create input
          <Answer>
            <Input
              onKeyDown={submitAnswerOnEnter(pickAnswer)}
              ref={answerInputRef}
              autoFocus
            />
          </Answer>
        )}
      </Flex>

      <HintButton
        onClick={showHint => {
          // Reenable focus on the input once the user is done peeking
          if (!multipleChoice && !showHint) {
            // @ts-ignore
            answerInputRef.current.focus()
          }
        }}
      />
    </Flex>
  )
}

const HintButton = props => {
  const { showHint } = useStore(state => state.fretboard.settings)
  const { toggleHint } = useActions(actions => actions.fretboard.settings)

  return (
    <Box p={2}>
      <OpenEyeIcon
        onClick={() => {
          toggleHint()
          props.onClick(!showHint)
        }}
        fill={showHint ? "white" : "black60"}
        style={{
          transform: `scale(${showHint ? 1.3 : 1})`,
        }}
      />
    </Box>
  )
}

const Answer = styled(({ children, className }) => {
  return (
    <Flex className={className} p={3} m={1}>
      <Display size="8">{children}</Display>
    </Flex>
  )
})`
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

    input {
      color: #333;
    }
  }
`

const Input = styled.input.attrs({
  type: "text",
  maxLen: 2,
})`
  background: none;
  border-radius: 4px;
  border: 0;
  color: white;
  font-family: ${font("display")};

  ${fontSize("8")};

  outline: none;
  text-align: center;
  text-transform: uppercase;
  width: 40px;
`

// Helpers

function submitAnswerOnEnter(onSubmit) {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    // ENTER
    if (event.keyCode === 13) {
      const input = event.currentTarget
      let [note, accidental = ""] = input.value.split("")

      if (accidental.toLowerCase() === "b") {
        accidental = "♭"
      }
      if (accidental.toLowerCase() === "#") {
        accidental = "♯"
      }

      const answer = (note + accidental).trim()
      onSubmit(answer)

      // Disable input while submitting
      input.disabled = true

      // Reset answer after submit
      setTimeout(() => {
        input.disabled = false
        input.focus()
        input.value = ""
      }, 2200) // FIXME: Consolidate these timings with fretboard
    }
  }
}
