import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { Display } from "src/components/ui/Typography"
import { useStore, useActions, State, Actions } from "easy-peasy"
import { StoreModel } from "src/state/store"

export const Settings = () => {
  const state = useStore((state: State<StoreModel>) => state.settings)
  const actions = useActions((actions: Actions<StoreModel>) => actions.settings)

  return (
    <SettingsContainer>
      <SettingsIcon
        selected={state.showSettings}
        onClick={() => actions.toggleSettings()}
      />
      {state.showSettings && (
        <Box>
          <Box mt={2} ml={1}>
            <Button
              selected={state.showNotes}
              onClick={() => actions.toggleNotes()}
            >
              <Display size="4">Display notes?</Display>
            </Button>
          </Box>
          <Box mt={1} ml={1}>
            <Button
              selected={state.accidentalMode === "flats"}
              onClick={() => actions.setAccidentalMode("flats")}
            >
              <Display size="4">Flats</Display>
            </Button>
            <Button
              selected={state.accidentalMode === "sharps"}
              onClick={() => actions.setAccidentalMode("sharps")}
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
