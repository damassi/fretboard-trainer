import { StringRange, GuitarString } from "../types"

export function getString(stringIndex: StringRange): GuitarString {
  switch (stringIndex) {
    case 0:
      return "E"
    case 1:
      return "b"
    case 2:
      return "g"
    case 3:
      return "d"
    case 4:
      return "a"
    case 5:
      return "e"
    default:
      throw new Error("String not found.")
  }
}
