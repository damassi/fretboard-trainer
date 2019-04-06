import React from "react"
import { StoreProvider } from "easy-peasy"

import { AppContainer } from "./components/ui/AppContainer"
import { Theme } from "src/Theme"
import { store } from "src/store"

export const Boot = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <Theme>
        <AppContainer>{children} </AppContainer>
      </Theme>
    </StoreProvider>
  )
}
