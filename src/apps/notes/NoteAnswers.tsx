import React, { useRef, useCallback } from "react"
import styled from "styled-components"
import { Flex } from "rebass"

import { DisplayAlt } from "src/components/ui/Typography"
import { useStore, useActions } from "src/utils/hooks"
import { font, fontSize } from "src/Theme"
import { Spacer } from "src/components/ui/Spacer"
import { HintButton } from "src/components/ui/HintButton"
import { submitAnswerOnEnter } from "src/utils/submitAnswerOnEnter"
import { useSpring, animated } from "react-spring"

export const NoteAnswers = () => {
  const { pickAnswer } = useActions(actions => actions.notes)
  const { questions } = useStore(state => state.notes)
  const { multipleChoice } = useStore(state => state.settings)
  const answerInputRef = useRef<HTMLInputElement>(null)

  const handleFocusInput = useCallback(() => {
    const node = answerInputRef.current
    if (node) {
      node.focus()
    }
  }, [])

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
  const { multipleChoice } = useStore(state => state.settings)

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
    <animated.div style={multipleChoice ? animateProps : {}}>
      <Flex className={className} p={3} m={1} {...props}>
        <DisplayAlt size="7" weight="black">
          {children}
        </DisplayAlt>
      </Flex>
    </animated.div>
  )
})`
  border: 1px solid #666;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  user-select: none;
  min-width: 110px;
  width: 130px;

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
  font-family: ${font("displayAlt")};

  ${fontSize("8")};
  font-weight: 900;

  outline: none;
  text-align: center;
`
