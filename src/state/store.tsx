import { applyMiddleware, createStore, combineReducers } from "redux"
import logger from "redux-logger"
import { settings } from "./settings"
import { fretboard } from "./fretboard"

export const initialState = {
  settings: {
    showSettings: true,
    showNotes: true,
    accidentalMode: "flats",
  },
  fretboard: {},
}

const reducers = combineReducers({
  settings,
  fretboard,
})

export function makeStore(state = initialState) {
  return createStore(reducers, state, applyMiddleware(logger))
}
