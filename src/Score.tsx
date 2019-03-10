import React from "react"
import { Flex, Box } from "rebass"
import styled from "styled-components"
import { Sans, Display } from "./Typography"

export const Score = () => {
  return (
    <Container justifyContent="center" mb={4}>
      <ScoreBox width="30%">
        <Box mr={6}>
          <Sans>Correct</Sans>
          <Display size={7}>10</Display>
        </Box>
        <Box>
          <Sans>Incorrect</Sans>
          <Display size={7}>10</Display>
        </Box>
      </ScoreBox>
    </Container>
  )
}

const Container = styled(Flex)``

const ScoreBox = styled(Flex)`
  justify-content: center;
  text-align: center;
`
