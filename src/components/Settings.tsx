import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { Display } from "src/components/ui/Typography"
import { useStore, useActions } from "src/utils/hooks"

export const Settings = () => {
  const { showSettings, showNotes } = useStore(state => state.settings)
  const { toggleNotes, toggleSettings } = useActions(actions => actions.settings) // prettier-ignore
  const { accidentalMode } = useStore(state => state.fretboard)
  const { setAccidentalMode } = useActions(actions => actions.fretboard)

  return (
    <SettingsContainer>
      <SettingsIcon selected={showSettings} onClick={() => toggleSettings()} />
      {showSettings && (
        <Box>
          <Box mt={2} ml={1}>
            <Button selected={showNotes} onClick={() => toggleNotes()}>
              <Display size="4">Display notes?</Display>
            </Button>
          </Box>
          <Box mt={1} ml={1}>
            <Button
              selected={accidentalMode === "flats"}
              onClick={() => setAccidentalMode("flats")}
            >
              <Display size="4">Flats</Display>
            </Button>
            <Button
              selected={accidentalMode === "sharps"}
              onClick={() => setAccidentalMode("sharps")}
            >
              <Display size="4">Sharps</Display>
            </Button>
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

const Button = styled(Box)`
  position: relative;
  cursor: pointer;
  color: ${props => (props.selected ? "#69f969" : "#fff")};
  user-select: none;

  &:before {
    content: "${props => (props.selected ? "✓" : "")}";
    position: absolute;
    left: -18px;
    top: 2px;
  }
`
