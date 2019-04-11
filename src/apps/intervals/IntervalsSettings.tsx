import React from "react"
import { CycleButton } from "src/components/ui/CycleButton"
import { useActions, useStore } from "src/utils/hooks"
import { Settings } from "src/apps/settings/Settings"

export const IntervalsSettings = () => {
  const { showIntervals, intervalMode } = useStore(
    state => state.intervals.settings
  )
  const { setIntervalMode, toggleShowIntervals } = useActions(
    actions => actions.intervals.settings
  )

  return (
    <Settings>
      <CycleButton
        selectedIndex={showIntervals ? 1 : 0}
        items={["Show intervals", "Hide intervals"]}
        onClick={() => toggleShowIntervals()}
      />
      <CycleButton
        selectedIndex={() => {
          switch (intervalMode) {
            case "basic":
              return 0
            case "intermediate":
              return 1
            case "advanced":
              return 2
          }
        }}
        onClick={({ item }) => setIntervalMode(item.label)}
        items={["basic", "intermediate", "advanced"]}
      />
    </Settings>
  )
}
