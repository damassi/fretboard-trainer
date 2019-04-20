import React from "react"
import { useActions, useStore } from "src/utils/hooks"
import { Settings } from "../settings/Settings"
import { Select } from "src/components/ui/Select"

export const IntervalsSettings = () => {
  const { intervalMode } = useStore(state => state.intervals.settings)
  const { setIntervalMode } = useActions(actions => actions.intervals.settings)

  return (
    <Settings>
      <Select
        size="sm"
        placeholder="Small"
        defaultValue={intervalMode}
        onChange={mode => setIntervalMode(mode)}
      >
        <optgroup label="Interval Difficulty">
          <option value="basic">Basic</option>
          <option value="intermediate" disabled>
            Intermediate
          </option>
          <option value="advanced" disabled>
            Advanced
          </option>
        </optgroup>
      </Select>
    </Settings>
  )
}
