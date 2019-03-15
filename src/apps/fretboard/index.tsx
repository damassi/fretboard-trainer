import React from "react"

import { Fretboard } from "src/components/Fretboard"
import { Scoreboard } from "src/components/Scoreboard"
import { Posterboard } from "src/components/Posterboard"

import { Settings } from "src/apps/fretboard/components/Settings"
import { Answers } from "src/apps/fretboard/components/Answers"
import { store } from "src/store"

export const FretboardApp = () => {
  return (
    <>
      <Posterboard />
      <Scoreboard />
      <Fretboard />
      <Answers />
      <Settings />
    </>
  )
}

// Kick off app
store.dispatch.fretboard.pickRandomNote()
