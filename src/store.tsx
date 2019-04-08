import { createStore, EasyPeasyConfig } from "easy-peasy"
import { createLogger } from "redux-logger"
import { save, load } from "redux-localstorage-simple"

import { notes, NotesModel } from "src/apps/notes/state"
import { intervals, IntervalsModel } from "./apps/intervals/state"

import {
  settingsState as settings,
  SettingsModel,
} from "./apps/settings/settingsState"

import {
  scoreboard,
  ScoreboardModel,
} from "./components/Scoreboard/scoreboardState"

const STORAGE_SETTINGS = {
  namespace: "fretboard-trainer",
  states: ["notes.settings", "settings"],
}

// Define modules
export interface StoreModel {
  notes: NotesModel
  intervals: IntervalsModel
  scoreboard: ScoreboardModel
  settings: SettingsModel
}

// Build store
export const store = createStore<StoreModel, EasyPeasyConfig>(
  {
    notes,
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
