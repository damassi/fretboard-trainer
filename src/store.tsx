import { createStore, EasyPeasyConfig } from "easy-peasy"
import { fretboard, FretboardModel } from "src/apps/fretboard/state"

import { createLogger } from "redux-logger"
// import { save, load } from "redux-localstorage-simple"

// const STORAGE_SETTINGS = {
//   namespace: "fretboard-trainer",
//   states: ["settings"],
// }

export interface StoreModel {
  fretboard: FretboardModel
}

export const store = createStore<StoreModel, EasyPeasyConfig>(
  {
    fretboard,
  },
  {
    middleware: [
      createLogger({
        collapsed: true,
      }),
      // save(STORAGE_SETTINGS),
    ],
    // initialState: load(STORAGE_SETTINGS),
  }
)
