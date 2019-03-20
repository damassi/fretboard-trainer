import React from "react"
import { Box, Flex } from "rebass"
import styled from "styled-components"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { useStore, useActions } from "src/utils/hooks"
import { Spacer } from "src/components/ui/Spacer"
import { Toggle } from "src/components/ui/Toggle"
import { Display } from "src/components/ui/Typography"
import { font, fontSize } from "src/Theme"

export const Settings = () => {
  const {
    setAccidentalMode,
    setStartingFret,
    toggleAccidentals,
    toggleMultipleChoice,
    toggleNotes,
    toggleSettings,
  } = useActions(actions => actions.fretboard.settings)

  const {
    accidentalMode,
    multipleChoice,
    showAccidentals,
    showNotes,
    showSettings,
    startingFret,
  } = useStore(state => state.fretboard.settings)

  return (
    <SettingsContainer>
      <Box onClick={() => toggleSettings()}>
        <SettingsIcon selected={showSettings} />
      </Box>
      {showSettings && (
        <Box>
          <Box mt={1} ml={1}>
            <Toggle selected={showNotes} onClick={toggleNotes}>
              Show notes
            </Toggle>
            <Toggle selected={!showAccidentals} onClick={toggleAccidentals}>
              Natural notes only
            </Toggle>
            <Toggle selected={multipleChoice} onClick={toggleMultipleChoice}>
              Multiple choice
            </Toggle>
          </Box>

          <Box>
            <StartAtFret
              value={startingFret}
              onChange={event => setStartingFret(event.currentTarget.value)}
            />
          </Box>

          <Spacer my={0} />

          <Box ml={1}>
            <Toggle
              selected={accidentalMode === "flats"}
              onClick={() => setAccidentalMode("flats")}
            >
              Flats
            </Toggle>
            <Toggle
              selected={accidentalMode === "sharps"}
              onClick={() => setAccidentalMode("sharps")}
            >
              Sharps
            </Toggle>
          </Box>
        </Box>
      )}
    </SettingsContainer>
  )
}

const SettingsContainer = styled(Box)`
  position: absolute;
  top: 70px;
`

const StartAtFret = styled(({ className, onChange, value }) => {
  return (
    <Flex ml={1} my={0.5} className={className}>
      <Display size="2">Start at fret</Display>
      <input
        type="number"
        step="1"
        min="1"
        max="9"
        value={value}
        onChange={onChange}
        onKeyDown={event => event.preventDefault()}
      />
    </Flex>
  )
})`
  user-select: none;
  input {
    border: 0;
    background: none;
    font-family: ${font("display")};
    ${fontSize("2")};
    color: #ccc;
    margin-left: 5px;
    outline: none;
    width: 30px;
    user-select: none;
    color: transparent;
    text-shadow: 0 0 0 white;
    position: relative;
    top: -1px;

    &:focus {
      outline: none;
    }
  }
`
