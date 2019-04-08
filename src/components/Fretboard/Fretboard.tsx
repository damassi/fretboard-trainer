import React from "react"
import styled from "styled-components"
import { Box, Image, Flex } from "rebass"
import { isEqual } from "lodash"

import fretboardGraphic from "src/assets/fretboard.jpg"
import { Display } from "src/components/ui/Typography"
import { useStore } from "src/utils/hooks"
import { notes, containsSharpOrFlat, getNote } from "src/utils/fretboardUtils"
import { color } from "src/Theme"

export const Fretboard = _props => {
  const { accidentalMode, showHint, showNotes } = useStore(state => state.settings) // prettier-ignore
  const { currentNote } = useStore(state => state.notes)

  const fretboard = notes[accidentalMode]

  return (
    <Container flexDirection="column" justifyContent="center">
      <Image width="100%" height={260} src={fretboardGraphic} />

      <NotesContainer ml={-40}>
        {fretboard.map((string, stringIndex) => {
          return (
            <Flex key={stringIndex}>
              {string.map((note, noteIndex) => {
                const BASE = 98
                const DISTANCE_RATIO = 0.65
                const SPACE = BASE - (BASE / 12) * (noteIndex * DISTANCE_RATIO)
                const isCurrentNote = isEqual(currentNote.position, [
                  stringIndex,
                  noteIndex,
                ])

                const getVisibility = () => {
                  switch (true) {
                    case showNotes: {
                      if (accidentalMode === "naturals") {
                        if (containsSharpOrFlat(note)) {
                          return false
                        }
                      }
                      return true
                    }
                    case isCurrentNote && showHint:
                      return true
                    default:
                      return false
                  }
                }

                // Natural notes are falsy
                const showNote = Boolean(note) && getVisibility()

                return (
                  <NoteContainer
                    mr={SPACE}
                    key={noteIndex}
                    isCurrentNote={showNote || isCurrentNote}
                    isRoot={!showHint && showNote && note === currentNote.note}
                    showNote={showNote}
                  >
                    <Note
                      size="5"
                      showNote={showNote}
                      onClick={() => {
                        const noteLookup: any = [stringIndex + 1, noteIndex]
                        const found = getNote({
                          accidentalMode,
                          position: noteLookup,
                        })

                        console.warn(`[${noteLookup}]`, found)
                      }}
                    >
                      {note}
                    </Note>
                  </NoteContainer>
                )
              })}
            </Flex>
          )
        })}
      </NotesContainer>
    </Container>
  )
}

const Container = styled(Flex)`
  user-select: none;
  align-content: center;
  position: relative;
`

const NotesContainer = styled(Box)`
  position: absolute;
`

const Note = styled(Display)<{ showNote: boolean }>`
  position: relative;
  left: 8px;
  color: ${color("white")};
  visibility: ${p => (p.showNote ? "visible" : "hidden")};
`

const NoteContainer = styled(Flex)<{
  isCurrentNote: boolean
  isRoot?: boolean
  showNote: boolean
}>`
  border-radius: 50%;
  background-color: ${p =>
    p.showNote ? "rgba(255, 255, 255, .1)" : "rgba(243, 251, 81, .8)"};

  background-color: ${p => p.isRoot && "red"};

  width: 30px;
  height: 30px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  top: 5px;
  margin-bottom: 10px;
  position: relative;
  visibility: ${p => (p.isCurrentNote ? "visible" : "hidden")};

  animation-name: ${p => (p.isCurrentNote ? "fadeInNote" : "none")};
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.85);

  opacity: 0;
  transform: scale(0.5);

  @keyframes fadeInNote {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: scale(${p => (p.showNote ? "1" : "1")});
    }
  }
`
