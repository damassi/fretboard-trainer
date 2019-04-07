import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard } from "src/components/Fretboard"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Settings } from "src/apps/fretboard/components/Settings"
import { Answers } from "src/apps/fretboard/components/Answers"
import { store } from "src/store"

export const FretboardApp: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Link to="/intervals">
        <Posterboard>Fretboard Trainer</Posterboard>
      </Link>

      <Scoreboard />

      <Fretboard />
      <Answers />
      <Settings />
    </>
  )
}

// Kick off app
store.dispatch.fretboard.pickRandomNote()
