import React from "react"
import { CycleButton } from "src/components/ui/CycleButton"
import { useActions, useStore } from "src/utils/hooks"
import { Settings } from "src/apps/settings/Settings"

export const IntervalsSettings = () => {
  const { showIntervals } = useStore(state => state.intervals.settings)
  const { toggleShowIntervals } = useActions(
    actions => actions.intervals.settings
  )

  return (
    <Settings>
      <CycleButton
        selectedIndex={showIntervals ? 1 : 0}
        items={["Show intervals", "Hide intervals"]}
        onClick={() => toggleShowIntervals()}
      />
    </Settings>
  )
}
