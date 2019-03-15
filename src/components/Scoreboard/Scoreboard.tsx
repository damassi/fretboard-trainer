import React from "react"
import { Flex, Box } from "rebass"
import styled from "styled-components"
import { Sans, Display } from "src/components/ui/Typography"
import { useStore } from "src/utils/hooks"

export const Scoreboard = () => {
  const { correctAnswers, incorrectAnswers, flashMessage } = useStore(
    state => state.fretboard
  )

  return (
    <ScoreboardContainer justifyContent="center" mb={4}>
      <ScoreBox width="100%">
        {flashMessage ? (
          <FlashMessage>
            <Display
              size="6"
              color={flashMessage === "correct!" ? "green1" : "red"}
            >
              {flashMessage}
            </Display>
          </FlashMessage>
        ) : (
          <AnswersContainer>
            <Box mr={6}>
              <Sans>Correct</Sans>
              <Display size={7}>{correctAnswers}</Display>
            </Box>
            <Box>
              <Sans>Incorrect</Sans>
              <Display size={7}>{incorrectAnswers}</Display>
            </Box>
          </AnswersContainer>
        )}
      </ScoreBox>
    </ScoreboardContainer>
  )
}

const FlashMessage = ({ children }) => {
  return (
    <FlashMessageContainer>
      <Display>{children}</Display>
    </FlashMessageContainer>
  )
}

const FlashMessageContainer = styled(Box)`
  position: relative;

  animation-name: bounceIn;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.85);

  top: 10px;
  opacity: 0;
  transform: scale(0.8);

  @keyframes bounceIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: scale(1);
      top: 0;
    }
  }
`

const AnswersContainer = styled(Flex)`
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-fill-mode: both;

  opacity: 0;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`

const ScoreboardContainer = styled(Flex)`
  height: 60px;
`

const ScoreBox = styled(Flex)`
  justify-content: center;
  text-align: center;
`
