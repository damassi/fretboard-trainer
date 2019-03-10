import React from "react"
import { StoreProvider } from "easy-peasy"
import { Theme } from "./Theme"
import { store } from "./utils/store"

export const Boot = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <Theme>{children}</Theme>
    </StoreProvider>
  )
}
