import React from "react"
import styled from "styled-components"
import { Box, Flex } from "rebass"
import fretboardGraphic from "src/assets/fretboard.jpg"
import { useStore } from "src/utils/hooks"
import { notes, Note as NoteProps } from "src/utils/fretboardUtils"
import { Display } from "../ui/Typography"
import { isEqual } from "lodash"

interface FretboardProps {
  selectedNotes: NoteProps[]
}

export const Fretboard2 = ({ selectedNotes }) => {
  const {
    settings: { accidentalMode },
  } = useStore(state => state.fretboard)

  const fretboard = notes[accidentalMode]

  return (
    <FretboardContainer>
      {fretboard.map((string, stringIndex) => {
        let lastPos = 0
        return (
          <Flex key={stringIndex}>
            {string.map((note, noteIndex) => {
              const base = 135
              let space = base + lastPos - (base / 12) * (noteIndex * 0.5)
              lastPos = space
              space -= 167

              const foundMatch = selectedNotes.some(n => {
                const match = isEqual([stringIndex, noteIndex], n.position)
                return match
              })

              return (
                <NoteContainer
                  key={noteIndex}
                  style={{
                    left: space,
                    top: 15 + stringIndex * 40,
                  }}
                >
                  <Note
                    style={{
                      backgroundColor: foundMatch ? "green" : "",
                    }}
                  >
                    <Display>1</Display>
                  </Note>
                </NoteContainer>
              )
            })}
          </Flex>
        )
      })}
    </FretboardContainer>
  )
}

const FretboardContainer = styled(Box)`
  background: url(${fretboardGraphic}) no-repeat;
  background-size: 100% 100%;
  height: 260px;
  position: relative;
`

const NoteContainer = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Note = styled(Flex)`
  border-radius: 50%;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  justify-content: center;
  align-items: center;
`
