import { createStore, EasyPeasyConfig } from "easy-peasy"
import { createLogger } from "redux-logger"
import { save, load } from "redux-localstorage-simple"

import { fretboard, FretboardModel } from "src/apps/fretboard/state"
import { intervals, IntervalsModel } from "./apps/intervals/state"

import {
  scoreboard,
  ScoreboardModel,
} from "./components/Scoreboard/scoreboardState"

const STORAGE_SETTINGS = {
  namespace: "fretboard-trainer",
  states: ["fretboard.settings"],
}

export interface StoreModel {
  fretboard: FretboardModel
  intervals: IntervalsModel
  scoreboard: ScoreboardModel
}

export const store = createStore<StoreModel, EasyPeasyConfig>(
  {
    fretboard,
    intervals,
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
