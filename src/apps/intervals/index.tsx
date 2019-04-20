import React, { useEffect } from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard } from "src/components/Fretboard/Fretboard"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { IntervalAnswers } from "src/apps/intervals/IntervalAnswers"
import { store } from "src/store"
import { NoteRenderer } from "./NoteRenderer"
import { IntervalsSettings } from "./IntervalSettings"

export const IntervalsApp: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    store.dispatch.settings.bootLessonModule("intervals")
  }, [])

  return (
    <>
      <Link to="/">
        <Posterboard next="Fretboard">Interval Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard renderNote={props => <NoteRenderer {...props} />} />
      <IntervalsSettings />
      <IntervalAnswers />
    </>
  )
}
