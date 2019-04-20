import { Note } from "../types"
import { Howl } from "howler"

export function playNote(note: Note) {
  const [string, fret] = note.position
  const soundFile = `/audio/${string}-${fret}.mp3`
  const sound = new Howl({
    src: [soundFile],
    volume: 0.1,
  })
  sound.play()
}

export function playNotes(notes: Note[]) {
  notes.forEach(note => {
    playNote(note)
  })
}

export function playInterval(intervalNotes: [Note, Note]) {
  const [rootNote, intervalNote] = intervalNotes
  playNote(rootNote)

  setTimeout(() => {
    playNote(intervalNote)
  }, 1000)
}
