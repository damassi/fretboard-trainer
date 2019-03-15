import React from "react"
import { StoreProvider } from "easy-peasy"
import { Theme } from "src/Theme"
import { store } from "src/store"

export const Boot = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <Theme>{children}</Theme>
    </StoreProvider>
  )
}
