import React, { useEffect } from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard } from "src/components/Fretboard/Fretboard"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Answers } from "src/apps/intervals/Answers"
import { store } from "src/store"
import { Settings } from "src/apps/settings/Settings"
import { NoteRenderer } from "./NoteRenderer"
import { useStore } from "src/utils/hooks"

export const IntervalsApp: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    store.dispatch.intervals.pickRandomInterval()
    // store.dispatch.intervals.buildIntervals()
  }, [])

  const { currentInterval } = useStore(state => state.intervals)
  if (!currentInterval) {
    return null
  }

  return (
    <>
      <Link to="/">
        <Posterboard>Interval Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard renderNote={props => <NoteRenderer {...props} />} />
      <Answers />
      <Settings />
    </>
  )
}
