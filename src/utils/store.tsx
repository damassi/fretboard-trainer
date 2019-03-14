import { createStore, EasyPeasyConfig } from "easy-peasy"
import { createLogger } from "redux-logger"
import { settings, SettingsModel } from "src/state/settingsState"
import { fretboard, Fretboard } from "src/state/fretboardState"

import { save, load } from "redux-localstorage-simple"

export interface StoreModel {
  settings: SettingsModel
  fretboard: Fretboard
}

export const store = createStore<StoreModel, EasyPeasyConfig>(
  {
    settings,
    fretboard,
  },
  {
    middleware: [
      createLogger({
        collapsed: true,
      }),
      save(),
    ],
    initialState: load(),
  }
)
