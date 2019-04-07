import React from "react"
import { Box } from "rebass"

import { SettingsIcon } from "src/components/ui/SettingsIcon"
import { useStore, useActions } from "src/utils/hooks"
import { CycleButton } from "src/components/ui/CycleButton"
import { SettingsContainer } from "src/components/ui/SettingsContainer"

export const Settings = () => {
  const { toggleSettings } = useActions(actions => actions.intervals.settings)
  const { showSettings } = useStore(state => state.intervals.settings)

  return (
    <SettingsContainer>
      <Box onClick={() => toggleSettings()}>
        <SettingsIcon selected={showSettings} />
      </Box>

      {showSettings && (
        <Box mt={2}>
          <Box>
            <CycleButton
              // index={multipleChoice ? 0 : 1}
              items={["Multiple choice", "Input mode"]}
              onClick={toggleSettings}
            />
          </Box>
        </Box>
      )}
    </SettingsContainer>
  )
}
