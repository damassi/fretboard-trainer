import { notesState, Fretboard } from "./noteState"
import { notesSettingsState, NotesSettings } from "./noteSettingsState"

export interface NotesModel extends Fretboard {
  settings: NotesSettings
}

export const notes: NotesModel = {
  ...notesState,
  settings: notesSettingsState,
}
