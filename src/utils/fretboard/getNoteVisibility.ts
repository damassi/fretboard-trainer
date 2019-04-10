import { containsSharpOrFlat } from "./containsSharpOrFlat"
import { FretboardMode } from "../types"

/**
 * When selecting "Show Notes" from the settings menu we need to check if
 * "naturals" is selected, and if so, hide all sharps and flats.
 */
export function getNoteVisibiltyForSetting(
  fretboardMode: FretboardMode,
  note: string
): boolean {
  if (fretboardMode === "naturals") {
    if (containsSharpOrFlat(note)) {
      return false
    }
  }
  return true
}
