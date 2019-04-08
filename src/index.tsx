import React from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"

import { Boot } from "src/Boot"
import { NotesApp } from "src/apps/notes"
import { IntervalsApp } from "./apps/intervals"

ReactDOM.render(
  <Boot>
    <Router>
      <NotesApp path="/" />
      <IntervalsApp path="/intervals" />
    </Router>
  </Boot>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
