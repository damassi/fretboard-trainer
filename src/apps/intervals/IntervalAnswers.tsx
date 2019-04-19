import React, { useRef, useMemo } from "react"
import styled from "styled-components"
import { Flex } from "rebass"
import { sample } from "lodash"

import { Display } from "src/components/ui/Typography"
import { useStore, useActions } from "src/utils/hooks"
import { font, fontSize } from "src/Theme"
import { Spacer } from "src/components/ui/Spacer"
import { HintButton } from "src/components/ui/HintButton"
import { submitAnswerOnEnter } from "src/utils/submitAnswerOnEnter"

export const IntervalAnswers = _props => {
  const { pickAnswer } = useActions(actions => actions.intervals)
  const answerInputRef = useRef<HTMLInputElement>(null)

  const { multipleChoice } = useStore(state => state.settings)
  const { questions } = useStore(state => state.intervals)

  // List is a displayable array of items. We memoize it so that a random sample
  // isn't taken each time state is updated.
  const questionsList = useMemo(() => {
    return questions.map(answer => sample(answer))
  }, [questions])

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
      >
        {/*
          Create list of selectable, multiple choice answers
        */}
        {multipleChoice ? (
          <>
            {questionsList.map((answer, index) => {
              return (
                <Answer
                  onClick={() => {
                    // When picking an answer, send back the unsampled item to
                    // compare against.
                    pickAnswer(questions[index])
                  }}
                  key={index}
                >
                  {answer}
                </Answer>
              )
            })}
          </>
        ) : (
          <Answer onClick={handleFocusInput}>
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
          if (!multipleChoice && !showHint) {
            handleFocusInput()
          }
        }}
      />
    </Flex>
  )
}

const Answer = styled(({ children, className, ...props }) => {
  return (
    <Flex className={className} p={3} m={1} {...props}>
      <Display size="6">{children}</Display>
    </Flex>
  )
})`
  border: 1px solid #666;
  cursor: pointer;
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
