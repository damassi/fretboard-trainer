export interface Note {
  note: string
  string?: GuitarString
  position: NotePosition
  interval?: IntervalLabels
}

export type NotePosition = [StringRange, NoteRange]

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

export type AccidentalMode = "naturals" | "flats" | "sharps" | "intervals"

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

export type StringRange = 1 | 2 | 3 | 4 | 5 | 6

export type NoteRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 // prettier-ignore

export const intervalList: Partial<IntervalLabels>[] = [
  "1",
  "♭2",
  "2",
  "♭3",
  "3",
  "4",
  "♭5",
  "5",
  "♭6",
  "6",
  "♭7",
  "7",
  "1",
]

// TODO: Handle sharps and flats in design
// export const intervalList: Partial<IntervalLabels>[] = [
//   "1",
//   "♭2",
//   "2",
//   "♭3",
//   "3",
//   "4",
//   "#4/♭5",
//   "5",
//   "#5/♭6",
//   "6",
//   "♭7",
//   "7",
//   "1",
// ]
