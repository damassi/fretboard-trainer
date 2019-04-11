import React, { useEffect } from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Answers } from "src/apps/notes/Answers"
import { store } from "src/store"
import { Fretboard } from "src/components/Fretboard/Fretboard"
import { NoteRenderer } from "./NoteRenderer"
import { NotesSettings } from "./NotesSettings"

export const NotesApp: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    store.dispatch.notes.pickRandomNote()
  }, [])

  return (
    <>
      <Link to="/intervals">
        <Posterboard>Fretboard Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard renderNote={props => <NoteRenderer {...props} />} />
      <Answers />
      <NotesSettings />
    </>
  )
}
