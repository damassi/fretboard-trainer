import React from "react"
import { Box } from "rebass"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { useStore, useActions } from "src/utils/hooks"
import { CycleButton } from "src/components/ui/CycleButton"
import { SettingsContainer } from "src/components/ui/SettingsContainer"

interface SettingsProps {
  children?: React.ReactNode
}

export const Settings: React.FC<SettingsProps> = ({ children }) => {
  const {
    setFretboardMode,
    toggleMultipleChoice,
    toggleNotes,
    toggleSettings,
  } = useActions(actions => actions.settings)

  const { fretboardMode, multipleChoice, showNotes, showSettings } = useStore(
    state => state.settings
  )

  return (
    <SettingsContainer>
      <Box onClick={() => toggleSettings()}>
        <SettingsIcon selected={showSettings} />
      </Box>

      {showSettings && (
        <Box mt={2}>
          <Box>
            <CycleButton
              selectedIndex={multipleChoice ? 0 : 1}
              items={["Multiple choice", "Input mode"]}
              onClick={toggleMultipleChoice}
            />
          </Box>

          <Box mt={0}>
            <CycleButton
              selectedIndex={showNotes ? 1 : 0}
              items={["Show notes", "Hide notes"]}
              onClick={toggleNotes}
            />
            <CycleButton
              selectedIndex={() => {
                switch (fretboardMode) {
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
                  onSelect: () => setFretboardMode("naturals"),
                },
                {
                  label: "Flats",
                  onSelect: () => setFretboardMode("flats"),
                },
                {
                  label: "Sharps",
                  onSelect: () => setFretboardMode("sharps"),
                },
              ]}
            />
          </Box>

          {/* NOTE:
             Additional settings can be passed in as children */}

          {children && <Box mt={1}>{children}</Box>}
        </Box>
      )}
    </SettingsContainer>
  )
}
