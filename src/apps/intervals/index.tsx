import React from "react"
import { RouteComponentProps, Link } from "@reach/router"

import { Fretboard } from "src/components/Fretboard/Fretboard"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"

import { IntervalAnswers } from "src/apps/intervals/IntervalAnswers"
import { NoteRenderer } from "./IntervalNoteRenderer"
import { IntervalsSettings } from "./IntervalSettings"
import { bootLessonModule } from "src/utils/bootLessonModule"
import { useActions } from "src/utils/hooks"
import styled from "styled-components"

export const IntervalsApp: React.FC<RouteComponentProps> = () => {
  // TODO: Keeping this out of useEffect forces syncronous behavior, which is
  // needed while hooks + prevent updates are worked out.
  bootLessonModule("intervals")

  const { pickRandomInterval } = useActions(actions => actions.intervals)

  return (
    <>
      <Link to="/scales">
        <Posterboard next="Scales">Interval Trainer</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard renderNote={props => <NoteRenderer {...props} />} />
      <IntervalsSettings />
      <IntervalAnswers />

      <SecretButton onClick={() => pickRandomInterval()}>
        New interval
      </SecretButton>
    </>
  )
}

const SecretButton = styled.div`
  cursor: pointer;
  opacity: 0;
`
