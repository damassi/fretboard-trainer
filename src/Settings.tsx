import React, { useReducer } from "react"
import { Box } from "rebass"
import styled from "styled-components"
import { SettingsIcon } from "./SettingsIcon"
import { Display, Sans } from "./Typography"

const settingsReducer = (state, action) => {
  switch (action.type) {
    case "toggleSettings":
      return {
        ...state,
        showSettings: !state.showSettings,
      }
    case "toggleNotes":
      return {
        ...state,
        showNotes: !state.showNotes,
      }
    case "setAccidentalMode":
      return {
        ...state,
        accidentalMode: action.payload,
      }

    default:
      return state
  }
}

export const Settings = () => {
  const [state, dispatch] = useReducer(settingsReducer, {
    showSettings: true,
    showNotes: true,
    accidentalMode: "flats",
  })

  return (
    <SettingsContainer>
      <SettingsIcon
        selected={state.showSettings}
        onClick={() =>
          dispatch({
            type: "toggleSettings",
          })
        }
      />
      {state.showSettings && (
        <Box>
          <Box mt={2} ml={1}>
            <Button
              selected={state.showNotes}
              onClick={() =>
                dispatch({
                  type: "toggleNotes",
                })
              }
            >
              <Display size="4">Display notes?</Display>
            </Button>
          </Box>
          <Box mt={1} ml={1}>
            <Button
              selected={state.accidentalMode === "flats"}
              onClick={() =>
                dispatch({
                  type: "setAccidentalMode",
                  payload: "flats",
                })
              }
            >
              <Display size="4">Flats</Display>
            </Button>
            <Button
              selected={state.accidentalMode === "sharps"}
              onClick={() =>
                dispatch({
                  type: "setAccidentalMode",
                  payload: "sharps",
                })
              }
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
