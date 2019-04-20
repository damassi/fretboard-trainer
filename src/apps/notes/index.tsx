import React, { useEffect } from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { NoteAnswers } from "src/apps/notes/NoteAnswers"
import { store } from "src/store"
import { Fretboard } from "src/components/Fretboard/Fretboard"
import { NoteRenderer } from "./NoteRenderer"
import { NoteSettings } from "./NoteSettings"

export const NotesApp: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    store.dispatch.settings.bootLessonModule("notes")
  }, [])

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
