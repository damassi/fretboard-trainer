import { createStore, EasyPeasyConfig } from "easy-peasy"

import { settings, SettingsModel } from "src/state/settingsState"
import { fretboard, Fretboard } from "src/state/fretboardState"

import { createLogger } from "redux-logger"
import { save, load } from "redux-localstorage-simple"

const STORAGE_SETTINGS = {
  namespace: "fretboard-trainer",
  states: ["settings"],
}

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
      save(STORAGE_SETTINGS),
    ],
    initialState: load(STORAGE_SETTINGS),
  }
)
