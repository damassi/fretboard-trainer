import React from "react"
import ReactDOM from "react-dom"

import { Boot } from "src/Boot"
import { AppContainer } from "src/components/ui/AppContainer"
import { FretboardApp } from "src/apps/fretboard"

ReactDOM.render(
  <Boot>
    <AppContainer>
      <FretboardApp />
    </AppContainer>
  </Boot>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
