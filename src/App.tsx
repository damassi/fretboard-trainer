import React from "react"
import styled from "styled-components"

import { Flex } from "rebass"
import { Fretboard } from "src/components/Fretboard"
import { Settings } from "src/components/Settings"
import { Answers } from "src/components/Answers"
import { Scoreboard } from "src/components/Scoreboard"
import { Posterboard } from "src/components/Posterboard"
import { store } from "./utils/store"

export const App = () => {
  return (
    <AppContainer>
      <Posterboard />
      <Scoreboard />
      <Fretboard />
      <Answers />
      <Settings />
    </AppContainer>
  )
}

// Kick off app
store.dispatch.fretboard.pickRandomNote()

const AppContainer = styled(Flex)`
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
`
