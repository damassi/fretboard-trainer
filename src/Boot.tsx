import React from "react"
import { StoreContext } from "redux-react-hook"
import { Theme } from "./Theme"
import { makeStore } from "./state/store"

const store = makeStore()

export const Boot = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      <Theme>{children}</Theme>
    </StoreContext.Provider>
  )
}
