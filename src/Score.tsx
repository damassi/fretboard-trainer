import React from "react"
import { Flex, Box } from "rebass"
import styled from "styled-components"
import { Sans, Display } from "./Typography"

export const Score = () => {
  return (
    <Container justifyContent="center">
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

const Container = styled(Flex)`
  position: relative;
  height: 34px;
  border-bottom: 1px solid #666;
`

const ScoreBox = styled(Box)`
  background: #333;
  display: flex;
  justify-content: center;
  text-align: center;
  top: 1px;
  position: relative;
`
