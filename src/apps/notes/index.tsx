import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { NoteAnswers } from "src/apps/notes/NoteAnswers"
import { Fretboard } from "src/components/Fretboard/Fretboard"
import { NoteRenderer } from "./NoteRenderer"
import { NoteSettings } from "./NoteSettings"
import { bootLessonModule } from "src/utils/bootLessonModule"

export const NotesApp: React.FC<RouteComponentProps> = () => {
  // TODO: Keeping this out of useEffect forces syncronous behavior, which is
  // needed while hooks + prevent updates are worked out.
  bootLessonModule("notes")

  return (
    <>
      <Link to="/intervals">
        <Posterboard next="Intervals">Fretboard Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard renderNote={props => <NoteRenderer {...props} />} />
      <NoteSettings />
      <NoteAnswers />
    </>
  )
}
