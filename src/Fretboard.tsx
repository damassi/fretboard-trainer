import React from "react"
import { Box, Image, Flex } from "rebass"
import styled from "styled-components"
import { fill } from "lodash"

const Dots = () => {
  return (
    <DotsContainer width="100%" pl={90}>
      {fill(Array(6), "").map((y, yIndex) => {
        return (
          <Flex width="100%" key={yIndex}>
            {fill(Array(12), "").map((x, xIndex) => {
              const BASE_DIST = 100
              const RATIO = 0.64
              const mr = BASE_DIST - (BASE_DIST / 12) * (xIndex * RATIO)

              return (
                <Box key={xIndex} mr={mr} mb={14}>
                  <Dot />
                </Box>
              )
            })}
          </Flex>
        )
      })}
    </DotsContainer>
  )
}

export const Fretboard = () => {
  return (
    <Container flexDirection="column" justifyContent="center">
      <Image
        width="100%"
        height={220}
        src={require("./assets/fretboard.png")}
      />
      <Dots />
    </Container>
  )
}

const Container = styled(Flex)`
  pointer-events: none;
  user-select: none;
  align-content: center;
  position: relative;
`

const DotsContainer = styled(Box)`
  position: absolute;
  top: 15px;
`

const Dot = styled(Box)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: white;
`
