import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard2 } from "src/components/Fretboard/Fretboard2"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Answers } from "src/apps/intervals/components/Answers"
import { store } from "src/store"
import { useStore } from "src/utils/hooks"
import { Settings } from "./components/Settings"

export const IntervalsApp: React.FC<RouteComponentProps> = () => {
  const { currentInterval } = useStore(state => state.intervals)

  // FIXME: Init with current interval
  if (!currentInterval) {
    return null
  }

  return (
    <>
      <Link to="/">
        <Posterboard>Interval Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard2 selectedNotes={currentInterval.notes} />
      <Answers />
      <Settings />
    </>
  )
}

// Kick off app
store.dispatch.intervals.pickRandomInterval()
