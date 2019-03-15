import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { Flex } from "rebass"

import { Boot } from "src/Boot"
import { FretboardApp } from "src/apps/fretboard"

const App = () => {
  return (
    <Boot>
      <AppContainer>
        <FretboardApp />
      </AppContainer>
    </Boot>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

const AppContainer = styled(Flex)`
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
`

if (module.hot) {
  module.hot.accept()
}
