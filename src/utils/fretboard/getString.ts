import { StringRange, GuitarString } from "../types"

export function getString(stringIndex: StringRange): GuitarString {
  switch (stringIndex) {
    case 1:
      return "E"
    case 2:
      return "b"
    case 3:
      return "g"
    case 4:
      return "d"
    case 5:
      return "a"
    case 6:
      return "e"
    default:
      throw new Error("String not found.")
  }
}
