import React, { useRef } from "react"
import styled from "styled-components"
import { Flex } from "rebass"

import { Display } from "src/components/ui/Typography"
import { useStore, useActions } from "src/utils/hooks"
import { font, fontSize } from "src/Theme"
import { Spacer } from "src/components/ui/Spacer"
import { HintButton } from "src/components/ui/HintButton"
import { submitAnswerOnEnter } from "src/utils/submitAnswerOnEnter"
import { useSpring, animated } from "react-spring"

export const NoteAnswers = _props => {
  const { pickAnswer } = useActions(actions => actions.notes)
  const { questions } = useStore(state => state.notes)
  const { multipleChoice } = useStore(state => state.settings)
  const answerInputRef = useRef<HTMLInputElement>(null)

  const handleFocusInput = () => {
    const node = answerInputRef.current
    if (node) {
      node.focus()
    }
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      <Spacer mt={1} />
      <Flex
        flexWrap="wrap"
        justifyContent="center"
        width="100%"
        alignItems="center"
        style={{ minHeight: 130 }}
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
          <Answer onClick={handleFocusInput}>
            <Input
              onKeyDown={submitAnswerOnEnter(pickAnswer, "notes")}
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
            handleFocusInput()
          }
        }}
      />
    </Flex>
  )
}

const Answer = styled(({ children, className, ...props }) => {
  const animateProps = useSpring({
    from: {
      position: "relative",
      visibility: "hidden",
      opacity: 0,
      transform: "translateY(-10px)",
    },
    to: {
      visibility: "visible",
      opacity: 1,
      transform: "translateY(0px)",
    },
    delay: 200,
    config: {
      mass: 1,
      tension: 388,
      friction: 26,
    },
  })

  return (
    <animated.div style={animateProps}>
      <Flex className={className} p={3} m={1} {...props}>
        <Display size="8">{children}</Display>
      </Flex>
    </animated.div>
  )
})`
  border: 1px solid #666;
  cursor: pointer;
  width: 80%;
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
