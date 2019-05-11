import React from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"

import { Boot } from "src/Boot"
import { NotesApp } from "src/apps/notes"
import { IntervalsApp } from "./apps/intervals"
import { ScalesApp } from "./apps/scales"

const App = () => (
  <Boot>
    <Router>
      <NotesApp path="/" />
      <IntervalsApp path="/intervals" />
      <ScalesApp path="/scales" />
    </Router>
  </Boot>
)

ReactDOM.render(<App />, document.getElementById("root"))

if (module.hot) {
  module.hot.accept()
}
