import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { useStore, useActions } from "src/utils/hooks"
import { Spacer } from "src/components/ui/Spacer"
import { Toggle } from "src/components/ui/Toggle"

export const Settings = () => {
  const {
    setAccidentalMode,
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
              Multiple choice?
            </Toggle>
          </Box>

          <Spacer my={2} />

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
