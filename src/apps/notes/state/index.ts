import { notesState, Fretboard } from "./notesState"
import { notesSettingsState, NotesSettings } from "./notesSettingsState"

export interface NotesModel extends Fretboard {
  settings: NotesSettings
}

export const notes: NotesModel = {
  ...notesState,
  settings: notesSettingsState,
}
