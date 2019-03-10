import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { Theme } from "./Theme"

ReactDOM.render(
  <Theme>
    <App />
  </Theme>,
  document.getElementById("root")
)

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
