import React from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"

import { Boot } from "src/Boot"
import { FretboardApp } from "src/apps/fretboard"
import { IntervalsApp } from "./apps/intervals"

ReactDOM.render(
  <Boot>
    <Router>
      <FretboardApp path="/" />
      <IntervalsApp path="/intervals" />
    </Router>
  </Boot>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
