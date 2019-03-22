import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { useStore, useActions } from "src/utils/hooks"
import { Spacer } from "src/components/ui/Spacer"
import { CycleButton } from "src/components/ui/CycleButton"

export const Settings = () => {
  const {
    setAccidentalMode,
    setStartingFret,
    setStringFocus,
    toggleMultipleChoice,
    toggleNotes,
    toggleSettings,
  } = useActions(actions => actions.fretboard.settings)

  const {
    accidentalMode,
    multipleChoice,
    showNotes,
    showSettings,
    startingFret,
    stringFocus,
  } = useStore(state => state.fretboard.settings)

  return (
    <SettingsContainer>
      <Box onClick={() => toggleSettings()}>
        <SettingsIcon selected={showSettings} />
      </Box>

      {showSettings && (
        <Box mt={2}>
          <Box>
            <CycleButton
              index={multipleChoice ? 0 : 1}
              items={["Multiple choice", "Input mode"]}
              onClick={toggleMultipleChoice}
            />
          </Box>

          <Box mt={1}>
            <CycleButton
              index={showNotes ? 1 : 0}
              items={["Show notes", "Hide notes"]}
              onClick={toggleNotes}
            />
            <CycleButton
              index={() => {
                switch (accidentalMode) {
                  case "naturals":
                    return 0
                  case "flats":
                    return 1
                  case "sharps":
                    return 2
                }
              }}
              items={[
                {
                  label: "Natural notes only",
                  onSelect: () => setAccidentalMode("naturals"),
                },
                {
                  label: "Flats",
                  onSelect: () => setAccidentalMode("flats"),
                },
                {
                  label: "Sharps",
                  onSelect: () => setAccidentalMode("sharps"),
                },
              ]}
            />
          </Box>

          <Box mt={1}>
            <CycleButton
              index={stringFocus}
              onClick={({ index }) => setStringFocus(index)}
              items={[
                "All strings",
                "string 1",
                "string 2",
                "string 3",
                "string 4",
                "string 5",
                "string 6",
              ]}
            >
              Focus on
            </CycleButton>
            <CycleButton
              index={startingFret}
              items={[...Array(13)].map((_, fret) => String(fret))}
              onClick={() => {
                setStartingFret(startingFret + 1)
              }}
            >
              Start at fret
            </CycleButton>
          </Box>

          <Spacer my={0} />
        </Box>
      )}
    </SettingsContainer>
  )
}

const SettingsContainer = styled(Box)`
  position: absolute;
  top: 70px;
`
