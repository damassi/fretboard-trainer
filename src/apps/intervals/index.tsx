import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard2 } from "src/components/Fretboard/Fretboard2"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Answers } from "src/apps/fretboard/components/Answers"
import { store } from "src/store"
import { getNote } from "src/utils/fretboardUtils"

export const IntervalsApp: React.FC<RouteComponentProps> = () => {
  const notes = [getNote(), getNote()]

  return (
    <>
      <Link to="/">
        <Posterboard>Interval Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard2 selectedNotes={notes} />
      <Answers />
    </>
  )
}

// Kick off app
store.dispatch.fretboard.pickRandomNote()
