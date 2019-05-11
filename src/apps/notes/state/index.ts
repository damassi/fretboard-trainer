import { notesState, NotesState } from "./noteState"
import { notesSettingsState, NotesSettingsState } from "./noteSettingsState"

export interface NotesModel extends NotesState {
  settings: NotesSettingsState
}

export const notes: NotesModel = {
  ...notesState,
  settings: notesSettingsState,
}
