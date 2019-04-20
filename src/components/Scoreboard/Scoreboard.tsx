import React, { useState, useEffect } from "react"
import { Flex, Box } from "rebass"
import styled from "styled-components"
import { Sans, Display } from "src/components/ui/Typography"
import { useStore } from "src/utils/hooks"
import { useSpring, animated } from "react-spring"

export const Scoreboard = () => {
  const { correctAnswers, incorrectAnswers, flashMessage } = useStore(
    state => state.scoreboard
  )

  // Only fade leaderboard in and out post-mount
  const [isMounted, toggleMounted] = useState(false)
  useEffect(() => {
    toggleMounted(true)
  }, [])

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
          <Answers isMounted={isMounted}>
            <Box mr={6}>
              <Sans>Correct</Sans>
              <Display size={7}>{correctAnswers}</Display>
            </Box>
            <Box>
              <Sans>Incorrect</Sans>
              <Display size={7}>{incorrectAnswers}</Display>
            </Box>
          </Answers>
        )}
      </ScoreBox>
    </ScoreboardContainer>
  )
}

const FlashMessage = ({ children }) => {
  const animateProps = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.7)",
    },
    to: {
      opacity: 1,
      transform: "scale(1.2)",
    },
    config: {
      mass: 1,
      tension: 388,
      friction: 26,
    },
  })
  return (
    <animated.div style={animateProps}>
      <Box>
        <Display>{children}</Display>
      </Box>
    </animated.div>
  )
}

const Answers = ({ children, isMounted }) => {
  const animateProps = useSpring({
    from: {
      opacity: isMounted ? 0 : 1,
    },
    to: {
      opacity: 1,
    },
    config: {
      mass: 1,
      tension: 100,
      friction: 50,
    },
  })
  return (
    <animated.div style={animateProps}>
      <Flex>{children}</Flex>
    </animated.div>
  )
}

const ScoreboardContainer = styled(Flex)`
  height: 60px;
`

const ScoreBox = styled(Flex)`
  justify-content: center;
  text-align: center;
`
