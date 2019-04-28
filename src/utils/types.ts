/**
 * The lesson module current being interacted with
 */
export type LessonModule = "notes" | "intervals"

export type Fretboard = ScaleNote[][]

export interface Note {
  note: string
  string?: GuitarString
  position: NotePosition
  interval?: IntervalLabels
}

export type RelativeInterval = [number, number]

export interface Interval {
  notes: [Note, Note]
  label: IntervalLabels[]
  relativeInterval: RelativeInterval
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
  | "m2"
  | "major 2nd"
  | "M2"
  | "2"
  | "minor 3rd"
  | "♭3"
  | "m3"
  | "major 3rd"
  | "M3"
  | "3"
  | "perfect 4th"
  | "4"
  | "#4/♭5"
  | "♭5"
  | "dim 5th"
  | "d5"
  | "aug 4th"
  | "a5"
  | "♭4"
  | "#5"
  | "perfect 5th"
  | "5"
  | "#5/♭6"
  | "minor 6th"
  | "♭6"
  | "m6"
  | "aug 5th"
  | "a5"
  | "major 6th"
  | "M6"
  | "6"
  | "minor 7th"
  | "m7"
  | "♭7"
  | "major 7th"
  | "M7"
  | "7"
  | "octave"

export type GuitarString = "E" | "b" | "g" | "d" | "a" | "e"

export type StringRange = -1 | 0 | 1 | 2 | 3 | 4 | 5

export type NoteRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 // prettier-ignore

/**
 * Begin constants
 */

/**
 * NOTE: The last index of each interval is for display on the fretboard. In
 * the future we'll want to support more than just flats, but they fit best.
 */
export const intervalList: Partial<IntervalLabels>[][] = [
  ["1"],
  ["minor 2nd", "m2"],
  ["major 2nd", "M2"],
  ["minor 3rd", "m3"],
  ["major 3rd", "M3"],
  ["perfect 4th", "4"],
  ["#4/♭5", "dim 5th", "aug 4th", "d5"],
  ["perfect 5th", "5"],
  ["#5/♭6", "minor 6th", "aug 5th", "m6"],
  ["major 6th", "M6"],
  ["minor 7th", "m7"],
  ["major 7th", "M7"],
  ["1"],
]

/**
 * When the FlashMessage fires, show the hint for a given moment of time
 */
export const HINT_VISIBILITY_TIME = 2000

/**
 * The number of answers a user can select from
 */
export const ANSWER_COUNT = 4
