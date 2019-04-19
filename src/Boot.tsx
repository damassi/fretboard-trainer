import React from "react"
import { StoreProvider } from "easy-peasy"

import { AppContainer } from "./components/ui/AppContainer"
import { Theme } from "src/Theme"
import { store } from "src/store"

export function bootApp(): Promise<{ Boot: React.FC }> {
  const Boot: React.FC = ({ children }) => {
    return (
      <StoreProvider store={store}>
        <Theme>
          <AppContainer>{children}</AppContainer>
        </Theme>
      </StoreProvider>
    )
  }

  return new Promise(resolve => {
    resolve({
      Boot,
    })
  })
}
