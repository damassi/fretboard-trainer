import React from "react"

import { Fretboard } from "src/components/Fretboard"
import { Scoreboard } from "src/components/Scoreboard"
import { Posterboard } from "src/components/Posterboard"

import { Settings } from "src/apps/fretboard/components/Settings"
import { Answers } from "src/apps/fretboard/components/Answers"
import { store } from "src/store"
import { Spacer } from "src/components/ui/Spacer"

export const FretboardApp = () => {
  return (
    <>
      <Posterboard />
      <Scoreboard />
      <Spacer mt={3} />
      <Fretboard />
      <Answers />
      <Settings />
    </>
  )
}

// Kick off app
store.dispatch.fretboard.pickRandomNote()
