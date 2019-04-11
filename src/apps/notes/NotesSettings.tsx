import React from "react"
import { Box } from "rebass"
import { CycleButton } from "src/components/ui/CycleButton"
import { useActions, useStore } from "src/utils/hooks"
import { Settings } from "src/apps/settings/Settings"

export const NotesSettings = () => {
  const { setStartingFret, setStringFocus } = useActions(
    actions => actions.notes.settings
  )

  const { startingFret, stringFocus } = useStore(state => state.notes.settings)

  return (
    <Settings>
      <Box mt={1}>
        <CycleButton
          selectedIndex={stringFocus}
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
          selectedIndex={startingFret}
          items={[...Array(13)].map((_, fret) => String(fret))}
          onClick={() => {
            setStartingFret(Number(startingFret) + 1)
          }}
        >
          Start at fret
        </CycleButton>
      </Box>
    </Settings>
  )
}
