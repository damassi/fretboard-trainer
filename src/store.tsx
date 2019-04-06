import { createStore, EasyPeasyConfig } from "easy-peasy"
import { createLogger } from "redux-logger"
import { save, load } from "redux-localstorage-simple"

import {
  scoreboard,
  ScoreboardModel,
} from "./components/Scoreboard/scoreboardState"
import { fretboard, FretboardModel } from "src/apps/fretboard/state"

const STORAGE_SETTINGS = {
  namespace: "fretboard-trainer",
  states: ["fretboard.settings"],
}

export interface StoreModel {
  fretboard: FretboardModel
  scoreboard: ScoreboardModel
}

export const store = createStore<StoreModel, EasyPeasyConfig>(
  {
    fretboard,
    scoreboard,
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
