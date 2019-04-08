import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

// import { Fretboard } from "src/components/Fretboard"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Settings } from "src/apps/settings/Settings"
import { Answers } from "src/apps/notes/Answers"
import { store } from "src/store"
import { Fretboard2 } from "src/components/Fretboard/Fretboard2"
import { NoteRenderer } from "./NoteRenderer"

export const NotesApp: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Link to="/intervals">
        <Posterboard>Fretboard Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard2 renderNote={props => <NoteRenderer {...props} />} />
      <Answers />
      <Settings />
    </>
  )
}

// Kick off app
store.dispatch.notes.pickRandomNote()
