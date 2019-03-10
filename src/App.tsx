import React from "react"
import { Flex } from "rebass"
import { Fretboard } from "./Fretboard"
import { Settings } from "./Settings"
import { Answers } from "./Answers"
import { Score } from "./Score"
import { PosterBoard } from "./PosterBoard"
import styled from "styled-components"

export const App = () => {
  return (
    <AppContainer>
      <PosterBoard />
      <Score />
      <Fretboard />
      <Answers />
      <Settings />
    </AppContainer>
  )
}

const AppContainer = styled(Flex)`
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`
