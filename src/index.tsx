import React from "react"
import ReactDOM from "react-dom"
import { Boot } from "./Boot"
import { App } from "./App"

ReactDOM.render(
  <Boot>
    <App />
  </Boot>,
  document.getElementById("root")
)

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}
