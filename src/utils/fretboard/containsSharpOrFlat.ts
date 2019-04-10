export function containsSharpOrFlat(note: string) {
  if (note.includes("♭") || note.includes("♯")) {
    return true
  }
  return false
}
