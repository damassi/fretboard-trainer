import React from "react"
import ReactDOM from "react-dom"
import { Router } from "@reach/router"

import { bootApp } from "src/Boot"
import { NotesApp } from "src/apps/notes"
import { IntervalsApp } from "./apps/intervals"

bootApp().then(({ Boot }) => {
  const App = () => (
    <Boot>
      <Router>
        <NotesApp path="/" />
        <IntervalsApp path="/intervals" />
      </Router>
    </Boot>
  )

  ReactDOM.render(<App />, document.getElementById("root"))
})

if (module.hot) {
  module.hot.accept()
}
