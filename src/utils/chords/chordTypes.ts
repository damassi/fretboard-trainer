/**
 * Thank you https://www.fachords.com; I pinched this list from "view source".
 */

interface ChordTypes {
  [index: number]: {
    name: string
    tones: string[]
  }
}

export const chordTypes: ChordTypes = [
  {
    name: "maj",
    tones: ["1", "3", "5"],
  },
  {
    name: "7",
    tones: ["1", "3", "5", "b7"],
  },
  {
    name: "min",
    tones: ["1", "b3", "5"],
  },
  {
    name: "min7",
    tones: ["1", "b3", "5", "b7"],
  },
  {
    name: "maj7",
    tones: ["1", "3", "5", "7"],
  },
  {
    name: "sus4",
    tones: ["1", "4", "5"],
  },
  {
    name: "7 sus4",
    tones: ["1", "4", "5", "b7"],
  },
  {
    name: "6",
    tones: ["1", "3", "5", "6"],
  },
  {
    name: "m6",
    tones: ["1", "b3", "5", "6"],
  },
  {
    name: "9",
    tones: ["1", "3", "5", "b7", "9"],
  },
  {
    name: "m9",
    tones: ["1", "b3", "5", "b7", "9"],
  },
  {
    name: "maj9",
    tones: ["1", "3", "5", "7", "9"],
  },
  {
    name: "6/9",
    tones: ["1", "3", "5", "6", "9"],
  },
  {
    name: "7#9",
    tones: ["1", "3", "5", "b7", "#9"],
  },
  {
    name: "7b9",
    tones: ["1", "3", "5", "b7", "b9"],
  },
  {
    name: "aug",
    tones: ["1", "3", "#5"],
  },
  {
    name: "7#5",
    tones: ["1", "3", "#5", "b7"],
  },
  {
    name: "dim7",
    tones: ["1", "b3", "b5", "bb7"],
  },
  {
    name: "b5",
    tones: ["1", "b3", "b5"],
  },
  {
    name: "7b5",
    tones: ["1", "3", "b5", "b7"],
  },
  {
    name: "9b5",
    tones: ["1", "3", "b5", "b7", "9"],
  },
  {
    name: "11",
    tones: ["1", "3", "5", "b7", "9", "11"],
  },
  {
    name: "13",
    tones: ["1", "3", "5", "b7", "9", "11", "13"],
  },
  {
    name: "5",
    tones: ["1", "5"],
  },
]
