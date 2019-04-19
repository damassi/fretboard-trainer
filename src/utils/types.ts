export type Fretboard = ScaleNote[][]

export interface Note {
  note: string
  string?: GuitarString
  position: NotePosition
  interval?: IntervalLabels
}

export type NotePosition = [number, number]

export type ScaleNote =
  | "C"
  | "C#"
  | "D♭"
  | "D"
  | "D#"
  | "E♭"
  | "E"
  | "F"
  | "F#"
  | "G♭"
  | "G"
  | "G#"
  | "A♭"
  | "A"
  | "A#"
  | "B♭"
  | "B"

export type FretboardMode = "naturals" | "flats" | "sharps"

export type IntervalLabels =
  | "1"
  | "unison"
  | "minor 2nd"
  | "♭2"
  | "major 2nd"
  | "2"
  | "minor 3rd"
  | "♭3"
  | "major 3rd"
  | "3"
  | "perfect 4th"
  | "4"
  | "#4/♭5"
  | "♭5"
  | "dim 5th"
  | "aug 4th"
  | "♭4"
  | "#5"
  | "perfect 5th"
  | "5"
  | "#5/♭6"
  | "minor 6th"
  | "♭6"
  | "aug 5th"
  | "major 6th"
  | "6"
  | "minor 7th"
  | "♭7"
  | "major 7th"
  | "7"
  | "octave"

export type GuitarString = "E" | "b" | "g" | "d" | "a" | "e"

export type StringRange = 0 | 1 | 2 | 3 | 4 | 5

export type NoteRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 // prettier-ignore

/**
 * NOTE: The last index of each interval is for display on the fretboard. In
 * the future we'll want to support more than just flats, but they fit best.
 */
export const intervalList: Partial<IntervalLabels>[][] = [
  ["1"],
  ["minor 2nd", "♭2"],
  ["major 2nd", "2"],
  ["minor 3rd", "♭3"],
  ["major 3rd", "3"],
  ["perfect 4th", "4"],
  ["#4/♭5", "dim 5th", "aug 4th", "♭5"],
  ["perfect 5th", "5"],
  ["#5/♭6", "minor 6th", "aug 5th", "♭6"],
  ["major 6th", "6"],
  ["minor 7th", "♭7"],
  ["major 7th", "7"],
  ["1"],
]
