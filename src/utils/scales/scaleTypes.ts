/**
 * Thank you https://www.fachords.com; I pinched this list from "view source".
 */

interface ScaleTypes {
  [index: number]: {
    name: string
    description?: string
    tones: string[] | "disabled"
  }
}

export const scaleTypes: ScaleTypes = [
  {
    name: "Common Scales",
    tones: "disabled",
  },
  {
    name: "Major Scale",
    description: "",
    tones: ["1", "2", "3", "4", "5", "6", "7"],
  },
  {
    name: "Minor Scale",
    description: "",
    tones: ["1", "2", "b3", "4", "5", "b6", "b7"],
  },
  {
    name: "Major Pentatonic Scale",
    description: "1 2 3 5 6",
    tones: ["1", "2", "3", "5", "6"],
  },
  {
    name: "Minor Pentatonic Scale",
    description: "1 b3 4 5 b7",
    tones: ["1", "b3", "4", "5", "b7"],
  },
  {
    name: "Major Blues Scale",
    description: "1 2 b3 3 5 6",
    tones: ["1", "2", "b3", "3", "5", "6"],
  },
  {
    name: "Minor Blues Scale",
    description: "1 b3 4 b5 5 b7",
    tones: ["1", "b3", "4", "b5", "5", "b7"],
  },
  {
    name: "Triads Arpeggios",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Major Triad",
    description: "1 3 5",
    tones: ["1", "3", "5"],
  },
  {
    name: "Minor Triad",
    description: "1 b3 5",
    tones: ["1", "b3", "5"],
  },
  {
    name: "Diminished Triad",
    description: "1 b3 b5",
    tones: ["1", "b3", "b5"],
  },
  {
    name: "Augmented Triad",
    description: "1 3 #5",
    tones: ["1", "3", "#5"],
  },
  {
    name: "Modes from Major Scale",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Ionian Scale",
    description: "1 2 3 4 5 6 7",
    tones: ["1", "2", "3", "4", "5", "6", "7"],
  },
  {
    name: "Dorian Scale",
    description: "1 2 b3 4 5 6 b7 ",
    tones: ["1", "2", "b3", "4", "5", "6", "b7"],
  },
  {
    name: "Phrygian Scale",
    description: "1  b2  b3  4  5  b6  b7 ",
    tones: ["1", "b2", "b3", "4", "5", "b6", "b7"],
  },
  {
    name: "Lydian Scale",
    description: "1  2  3  #4  5  6  7 ",
    tones: ["1", "2", "3", "#4", "5", "6", "7"],
  },
  {
    name: "Mixolydian Scale",
    description: "1  2  3  4  5  6  b7 ",
    tones: ["1", "2", "3", "4", "5", "6", "b7"],
  },
  {
    name: "Aeolian Scale",
    description: "1  2  b3  4  5  b6  b7 ",
    tones: ["1", "2", "b3", "4", "5", "b6", "b7"],
  },
  {
    name: "Locrian Scale",
    description: "1  b2  b3  4  b5  b6  b7 ",
    tones: ["1", "b2", "b3", "4", "b5", "b6", "b7"],
  },
  {
    name: "Modes from Harmonic Minor Scale",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Aeolian Maj 7",
    description: "1  2  b3  4  5  b6  7 ",
    tones: ["1", "2", "b3", "4", "5", "b6", "7"],
  },
  {
    name: "Locrian #6 Scale",
    description: "1  b2  b3  4  b5  6  b7 ",
    tones: ["1", "b2", "b3", "4", "b5", "6", "b7"],
  },
  {
    name: "Ionian #5 Scale| 1  2  3  4  #5  6  7 ",
    tones: ["1", "2", "3", "4", "#5", "6", "7"],
  },
  {
    name: "Dorian #4 Scale",
    description: "1  2  b3  #4  5  6  b7 ",
    tones: ["1", "2", "b3", "#4", "5", "6", "b7"],
  },
  {
    name: "Phrygian Dominant Scale",
    description: "1  b2  3  4  5  b6  b7 ",
    tones: ["1", "b2", "3", "4", "5", "b6", "b7"],
  },
  {
    name: "Lydian #2 Scale",
    description: "1  #2  3  #4  5  6  7 ",
    tones: ["1", "#2", "3", "#4", "5", "6", "7"],
  },
  {
    name: "Super Locrian bb7 Scale",
    description: "1  b2  b3  b4  b5  b6  bb7 ",
    tones: ["1", "b2", "b3", "b4", "b5", "b6", "bb7"],
  },
  {
    name: "Modes from Melodic  Minor Scales",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Melodic Minor Scale",
    description: "1  2  b3  4  5  6  7 ",
    tones: ["1", "2", "b3", "4", "5", "6", "7"],
  },
  {
    name: "Dorian b2 Scale",
    description: "1  b2  b3  4  5  6  b7 ",
    tones: ["1", "b2", "b3", "4", "5", "6", "b7"],
  },
  {
    name: "Lydian Augmented Scale",
    description: "1  2  3  #4  #5  6  7 ",
    tones: ["1", "2", "3", "#4", "#5", "6", "7"],
  },
  {
    name: "Lydian Dominant Scale",
    description: "1  2  3  #4  5  6  b7 ",
    tones: ["1", "2", "3", "#4", "5", "6", "b7"],
  },
  {
    name: "Mixolydian b6 Scale",
    description: "1  2  3  4  5  b6  b7 ",
    tones: ["1", "2", "3", "4", "5", "b6", "b7"],
  },
  {
    name: "Aeolian b5 Scale",
    description: "1  2  b3  4  b5  b6  b7 ",
    tones: ["1", "2", "b3", "4", "b5", "b6", "b7"],
  },
  {
    name: "Super Locrian Scale",
    description: "1  b2  b3  b4  b5  b6  b7 ",
    tones: ["1", "b2", "b3", "b4", "b5", "b6", "b7"],
  },
  {
    name: "7th Arpeggios",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Major 7th Arpeggio",
    description: "1 3 5 7",
    tones: ["1", "3", "5", "7"],
  },
  {
    name: "Dominant 7 Arpeggio",
    description: "1 3 5 b7",
    tones: ["1", "3", "5", "b7"],
  },
  {
    name: "Minor 7th Arpeggio",
    description: "1 b3 5 b7",
    tones: ["1", "b3", "5", "b7"],
  },
  {
    name: "Half Diminished Arpeggio",
    description: "1 b3 b5 b7",
    tones: ["1", "b3", "b5", "b7"],
  },
  {
    name: "Diminished 7th Arpeggio",
    description: "1 b3 b5 bb7",
    tones: ["1", "b3", "b5", "bb7"],
  },
  {
    name: "9th Arpeggios",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Major Add 9 arpeggio",
    description: "1 2 3 5",
    tones: ["1", "3", "5", "9"],
  },
  {
    name: "Minor Add 9 arpeggio",
    description: "1 2 b3 5",
    tones: ["1", "b3", "5", "9"],
  },
  {
    name: "Diminished Add 9 arpeggio",
    description: "1 2 b3 b5",
    tones: ["1", "b3", "b5", "9"],
  },
  {
    name: "Minor Add b9 arpeggio",
    description: "",
    tones: ["1", "b3", "5", "b9"],
  },
  {
    name: "Diminished Add b9 arpeggio",
    description: "1 b3 b5 b9",
    tones: ["1", "b3", "b5", "b9"],
  },
  {
    name: "Major Add #9 arpeggio",
    description: "1 3 5 #9",
    tones: ["1", "3", "5", "#9"],
  },
  {
    name: "11th Arpeggios ",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Major Add 11 arpeggio",
    description: "1 4 3 5",
    tones: ["1", "3", "5", "11"],
  },
  {
    name: "Minor Add 11 arpeggio",
    description: "1 4 b3 5",
    tones: ["1", "b3", "5", "11"],
  },
  {
    name: "Diminished Add 11 arpeggio",
    description: "1 4 b3 b5",
    tones: ["1", "b3", "b5", "11"],
  },
  {
    name: "Major Add #11 arpeggio",
    description: "1 b5 3 5",
    tones: ["1", "3", "5", "#11"],
  },
  {
    name: "Minor Add #11 arpeggio",
    description: "1 b5 b3 5",
    tones: ["1", "b3", "5", "#11"],
  },
  {
    name: "Minor Add b11 arpeggio",
    description: "1 b3 5 b11",
    tones: ["1", "b3", "5", "b11"],
  },
  {
    name: "Diminished Add b11 arpeggio",
    description: "1 b3 b5 b11",
    tones: ["1", "b3", "b5", "b11"],
  },
  {
    name: "Suspended Arpeggios",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "sus 2 arpeggio",
    description: "1 2 5",
    tones: ["1", "2", "5"],
  },
  {
    name: "Sus 4 maj7 arpeggio",
    description: "1 4 5 7",
    tones: ["1", "4", "5", "7"],
  },
  {
    name: "Sus 4 b7 arpeggio",
    description: "1 4 5 7",
    tones: ["1", "4", "5", "7"],
  },
  {
    name: "Sus 4 Add 9 arpeggio",
    description: "1 2 4 5",
    tones: ["1", "2", "4", "5"],
  },
  {
    name: "Sus 2 Add b9 arpeggio",
    description: "1 2 5",
    tones: ["1", "2", "5", "b9"],
  },
  {
    name: "Sus b2 arpeggio",
    description: "1 b2 5",
    tones: ["1", "b2", "5"],
  },
  {
    name: "Sus #4 arpeggio",
    description: "1 b5 5",
    tones: ["1", "#4", "5"],
  },
  {
    name: "Sus b2 maj7 arpeggio",
    description: "1 b2 5 7",
    tones: ["1", "b2", "5", "7"],
  },
  {
    name: "Sus #4 maj7 arpeggio",
    description: "1 b5 5 7",
    tones: ["1", "#4", "5", "7"],
  },
  {
    name: "Sus #4 b7 arpeggio",
    description: "1 b5 5 b7",
    tones: ["1", "#4", "5", "b7"],
  },
  {
    name: "Sus b2 Add #11 arpeggio",
    description: "1 b2 b5 5",
    tones: ["1", "b2", "b5", "#11"],
  },
  {
    name: "Sus b2 Add b13 arpeggio",
    description: "1 b2 5 b6",
    tones: ["1", "b2", "5", "b13"],
  },
  {
    name: "Sus #4 b13 arpeggio",
    description: "1 b5 5 b6",
    tones: ["1", "b5", "5", "b13"],
  },
  {
    name: "Sus b2 Add 13 arpeggio",
    description: "1 b2 5 6",
    tones: ["1", "b2", "5", "13"],
  },
  {
    name: "Sus #4 13 arpeggio",
    description: "1 b5 5 6",
    tones: ["1", "#4", "5", "6"],
  },
  {
    name: "Pentatonic/Blues Scales",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Pentatonic Scale",
    description: "1 2 3 5 6",
    tones: ["1", "2", "3", "5", "6"],
  },
  {
    name: "Dorian Pentatonic Scale",
    description: "1 2 4 5 b7",
    tones: ["1", "2", "4", "5", "b7"],
  },
  {
    name: "Phrygian Pentatonic Scale",
    description: "1 b3 4 b6 b7",
    tones: ["1", "b3", "4", "b6", "b7"],
  },
  {
    name: "Mixolydian Pentatonic Scale",
    description: "1 2 4 5 6",
    tones: ["1", "2", "4", "5", "6"],
  },
  {
    name: "Minor Pentatonic Scale",
    description: "1 b3 4 5 b7",
    tones: ["1", "b3", "4", "5", "b7"],
  },
  {
    name: "First Blues Scale Mode I Scale",
    description: "1 b3 4 b5 5 b7",
    tones: ["1", "b3", "4", "b5", "5", "b7"],
  },
  {
    name: "First Blues Scale Mode II Scale",
    description: "1 2 #2 3 5 6",
    tones: ["1", "2", "#2", "3", "5", "6"],
  },
  {
    name: "First Blues Scale Mode III Scale",
    description: "1 b2 2 4 5 b7",
    tones: ["1", "b2", "2", "4", "5", "b7"],
  },
  {
    name: "First Blues Scale Mode IV Scale",
    description: "1 b2 3 b5 6 7",
    tones: ["1", "b2", "3", "b5", "6", "7"],
  },
  {
    name: "First Blues Scale Mode V Scale",
    description: "1 b3 4 b6 b7 7 ",
    tones: ["1", "b3", "4", "b6", "b7", "7"],
  },
  {
    name: "Second Blues Scale Mode I Scale",
    description: "1 b3 3 4 5 b7",
    tones: ["1", "b3", "3", "4", "5", "b7"],
  },
  {
    name: "Second Blues Scale Mode II Scale",
    description: "1 b2 2 3 5 6",
    tones: ["1", "b2", "2", "3", "5", "6"],
  },
  {
    name: "Second Blues Scale Mode III Scale",
    description: "1 b2 b3 b5 b6 7",
    tones: ["1", "b2", "b3", "b5", "b6", "7"],
  },
  {
    name: "Second Blues Scale Mode IV Scale",
    description: "1 2 4 5 b7 7",
    tones: ["1", "2", "4", "5", "b7", "7"],
  },
  {
    name: "Second Blues Scale Mode V Scale",
    description: "1 b3 4 b6 6 b7",
    tones: ["1", "b3", "4", "b6", "6", "b7"],
  },
  {
    name: "Third Blues Scale Mode I Scale",
    description: "1 b3 4 5 b7 7",
    tones: ["1", "b3", "4", "5", "b7", "7"],
  },
  {
    name: "Third Blues Scale Mode II Scale",
    description: "1 2 3 5 b6 6",
    tones: ["1", "2", "3", "5", "b6", "6"],
  },
  {
    name: "Third Blues ale Mode III Scale",
    description: "1 2 4 #4 5 b7",
    tones: ["1", "2", "4", "#4", "5", "b7"],
  },
  {
    name: "Third Blues Scale Mode IV Scale",
    description: "1 #2 3 4 #5 b7 ",
    tones: ["1", "#2", "3", "4", "#5", "b7"],
  },
  {
    name: "Third Blues Scale Mode V Scale",
    description: "1 b2 2 4 5 6",
    tones: ["1", "b2", "2", "4", "5", "6"],
  },
  {
    name: "Simmetrical scales",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Whole-Tone Scale",
    description: "1 2 3 #4 #5 b7",
    tones: ["1", "2", "3", "#4", "#5", "b7"],
  },
  {
    name: "Whole-Half Scale",
    description: "1 2 b3 4 b5 b6 6 7",
    tones: ["1", "2", "b3", "4", "b5", "b6", "6", "7"],
  },
  {
    name: "Half-Whole Scale",
    description: "1 b2 #2 3 #4 5 6 b7",
    tones: ["1", "b2", "#2", "3", "#4", "5", "6", "b7"],
  },
  {
    name: "4min + 7min Scale",
    description: "1 2 4 b5 b6 7",
    tones: ["1", "2", "4", "b5", "b6", "7"],
  },
  {
    name: "b3min + 6min Scale",
    description: "1 #2 3 b5 6 b7",
    tones: ["1", "#2", "3", "b5", "6", "b7"],
  },
  {
    name: "1min + b5min Scale",
    description: "1 b2 b3 #4 5 6",
    tones: ["1", "b2", "b3", "#4", "5", "6"],
  },
  {
    name: "2maj + #5maj Scale",
    description: "1 2 b3 #4 #5 6",
    tones: ["1", "2", "b3", "#4", "#5", "6"],
  },
  {
    name: "1maj + b5maj Scale",
    description: "1 b2 3 #4 5 b7",
    tones: ["1", "b2", "3", "#4", "5", "b7"],
  },
  {
    name: "4maj + 7maj Scale",
    description: "1 b3 4 b5 6 7",
    tones: ["1", "b3", "4", "b5", "6", "7"],
  },
  {
    name: "1 dom + b6maj Scale",
    description: "1 #2 3 5 b6 7",
    tones: ["1", "#2", "3", "5", "b6", "7"],
  },
  {
    name: "1 aug + b2 aug Scale",
    description: "1 b2 3 4 #5 6",
    tones: ["1", "b2", "3", "4", "#5", "6"],
  },
  {
    name: "Tritone Chromatic I Scale",
    description: "1 b2 2 b5 5 b6",
    tones: ["1", "b2", "2", "b5", "5", "b6"],
  },
  {
    name: "Double Chromatic I Scale",
    description: "1 #2 3 4 b5 6 b7 7",
    tones: ["1", "#2", "3", "4", "b5", "6", "b7", "7"],
  },
  {
    name: "Exotic scales",
    description: "disabled",
    tones: "disabled",
  },
  {
    name: "Indian Scale",
    description: "1 b2 4 5 b6",
    tones: ["1", "b2", "4", "5", "b6"],
  },
  {
    name: "Japanese Scale",
    description: "1 2 4 5 b6",
    tones: ["1", "2", "4", "5", "b6"],
  },
  {
    name: "Gipsy Hungarian Scale",
    description: "1 2 b3 #4 5 b6 7",
    tones: ["1", "2", "b3", "#4", "5", "b6", "7"],
  },
  {
    name: "Neapolitan Scale",
    description: "1 b2 b3 4 5 6 7",
    tones: ["1", "b2", "b3", "4", "5", "6", "7"],
  },
  {
    name: "Persian Scale",
    description: "1 b2 3 4 b5 b6 7",
    tones: ["1", "b2", "3", "4", "b5", "b6", "7"],
  },
  {
    name: "Jewish Scale",
    description: "1 b2 3 4 5 b6 b7",
    tones: ["1", "b2", "3", "4", "5", "b6", "b7"],
  },
  {
    name: "Bizantine Scale",
    description: "1 b2 3 4 5 b6 7",
    tones: ["1", "b2", "3", "4", "5", "b6", "7"],
  },
  {
    name: "Arabic Scale",
    description: "1 2 b3 4 #4 #5 6 7",
    tones: ["1", "2", "b3", "4", "#4", "#5", "6", "7"],
  },
]
