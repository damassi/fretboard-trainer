import { Action } from "easy-peasy"

// prettier-ignore
export interface SettingsModel {
  showSettings: boolean;
  showNotes: boolean;
  accidentalMode: string;
  toggleSettings: Action<SettingsModel, void>;
  toggleNotes: Action<SettingsModel, void>;
  setAccidentalMode: Action<SettingsModel, string>;
}

export const settings: SettingsModel = {
  showSettings: true,
  showNotes: true,
  accidentalMode: "flats",

  toggleSettings: (state, _payload) => {
    state.showSettings = !state.showSettings
  },
  toggleNotes: (state, _payload) => {
    state.showNotes = !state.showNotes
  },
  setAccidentalMode: (state, payload) => {
    state.accidentalMode = payload
  },
}
