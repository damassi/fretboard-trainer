import { createStore, EasyPeasyConfig } from "easy-peasy"
import { createLogger } from "redux-logger"
import { save, load } from "redux-localstorage-simple"

import { fretboard, FretboardModel } from "src/apps/fretboard/state"
import { intervals, IntervalsModel } from "./apps/intervals/state"
import { settingsState as settings, SettingsModel } from "./apps/settings/state"

import {
  scoreboard,
  ScoreboardModel,
} from "./components/Scoreboard/scoreboardState"

const STORAGE_SETTINGS = {
  namespace: "fretboard-trainer",
  states: ["fretboard.settings"],
}

// Define modules
export interface StoreModel {
  fretboard: FretboardModel
  intervals: IntervalsModel
  scoreboard: ScoreboardModel
  settings: SettingsModel
}

// Build store
export const store = createStore<StoreModel, EasyPeasyConfig>(
  {
    fretboard,
    intervals,
    scoreboard,
    settings,
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
