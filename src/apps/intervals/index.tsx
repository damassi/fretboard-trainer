import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard } from "src/components/Fretboard"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Answers } from "src/apps/fretboard/components/Answers"
import { store } from "src/store"

export const IntervalsApp: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Link to="/">
        <Posterboard>Interval Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard />
      <Answers />
    </>
  )
}

// Kick off app
store.dispatch.fretboard.pickRandomNote()
