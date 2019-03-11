import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { Display } from "src/components/ui/Typography"
import { useStore, useActions } from "src/utils/hooks"
import { Spacer } from "./ui/Spacer"
import { color } from "src/Theme"

export const Settings = () => {
  const { showSettings, showNotes } = useStore(state => state.settings)
  const { toggleNotes, toggleSettings } = useActions(actions => actions.settings) // prettier-ignore
  const { accidentalMode, showAccidentals } = useStore(state => state.fretboard)
  const { setAccidentalMode, toggleAccidentals } = useActions(actions => actions.fretboard) // prettier-ignore

  return (
    <SettingsContainer>
      <SettingsIcon selected={showSettings} onClick={() => toggleSettings()} />
      {showSettings && (
        <Box>
          <Box mt={1} ml={1}>
            <Button selected={showNotes} onClick={() => toggleNotes()}>
              <Display size="3">Show notes</Display>
            </Button>
            <Button
              selected={!showAccidentals}
              onClick={() => toggleAccidentals()}
            >
              <Display size="3">Whole notes only</Display>
            </Button>
          </Box>

          <Spacer my={1} />

          <Box ml={1}>
            <Button
              selected={accidentalMode === "flats"}
              onClick={() => setAccidentalMode("flats")}
            >
              <Display size="3">Flats</Display>
            </Button>
            <Button
              selected={accidentalMode === "sharps"}
              onClick={() => setAccidentalMode("sharps")}
            >
              <Display size="3">Sharps</Display>
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
  color: ${props => (props.selected ? color("green1") : "#fff")};
  user-select: none;

  &:before {
    content: "${props => (props.selected ? "✓" : "")}";
    position: absolute;
    left: -18px;
    top: 0px;
  }
`
