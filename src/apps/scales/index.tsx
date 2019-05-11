import React from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { Posterboard } from "src/components/Posterboard"
import { Scoreboard } from "src/components/Scoreboard"
import { NoteRenderer } from "../intervals/IntervalNoteRenderer"
import { Fretboard } from "src/components/Fretboard"
import { bootLessonModule } from "src/utils/bootLessonModule"

export const ScalesApp: React.FC<RouteComponentProps> = () => {
  // TODO: Keeping this out of useEffect forces syncronous behavior, which is
  // needed while hooks + prevent updates are worked out.
  bootLessonModule("scales")

  return (
    <>
      <Link to="/">
        <Posterboard next="Fretboard">WIP</Posterboard>
      </Link>

      <Scoreboard />
      <Fretboard renderNote={props => <NoteRenderer {...props} />} />
    </>
  )
}
