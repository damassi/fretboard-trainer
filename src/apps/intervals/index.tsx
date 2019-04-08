import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard2 } from "src/components/Fretboard/Fretboard2"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { Answers } from "src/apps/intervals/Answers"
import { store } from "src/store"
import { useStore } from "src/utils/hooks"
import { Settings } from "src/apps/settings/Settings"
import { NoteRenderer } from "./NoteRenderer"

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
      <Fretboard2
        selectedNotes={currentInterval.notes}
        renderNote={props => <NoteRenderer {...props} />}
      />
      <Answers />
      <Settings />
    </>
  )
}

// Kick off app
store.dispatch.intervals.pickRandomInterval()
