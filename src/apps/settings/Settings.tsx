import React from "react"
import { Box } from "rebass"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { useStore, useActions } from "src/utils/hooks"
import { Spacer } from "src/components/ui/Spacer"
import { CycleButton } from "src/components/ui/CycleButton"
import { SettingsContainer } from "src/components/ui/SettingsContainer"

export const Settings = () => {
  const { setStartingFret, setStringFocus } = useActions(
    actions => actions.notes.settings
  )

  const {
    setAccidentalMode,
    toggleMultipleChoice,
    toggleNotes,
    toggleSettings,
  } = useActions(actions => actions.settings)

  const { accidentalMode, multipleChoice, showNotes, showSettings } = useStore(
    state => state.settings
  )

  const { startingFret, stringFocus } = useStore(state => state.notes.settings)

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
                  case "intervals":
                    return 3
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
                {
                  label: "Intervals",
                  onSelect: () => setAccidentalMode("intervals"),
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
                setStartingFret(Number(startingFret) + 1)
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
