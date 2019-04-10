import { containsSharpOrFlat } from "./containsSharpOrFlat"
import { AccidentalMode } from "../types"

/**
 * When selecting "Show Notes" from the settings menu we need to check if
 * "naturals" is selected, and if so, hide all sharps and flats.
 */
export function getNoteVisibiltyForSetting(
  accidentalMode: AccidentalMode,
  note: string
): boolean {
  if (accidentalMode === "naturals") {
    if (containsSharpOrFlat(note)) {
      return false
    }
  }
  return true
}
