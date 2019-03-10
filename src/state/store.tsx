import { createStore } from "easy-peasy"
// import logger from "redux-logger"
import { settings, SettingsModel } from "./settings"
import { fretboard, Fretboard } from "./fretboard"

// prettier-ignore
export interface StoreModel {
  settings: SettingsModel;
  fretboard: Fretboard;
}

export const store = createStore<StoreModel>({
  settings,
  fretboard,
})
