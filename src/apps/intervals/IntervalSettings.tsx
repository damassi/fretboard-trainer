import React from "react"
import { useActions, useStore } from "src/utils/hooks"
import { Settings } from "../settings/Settings"
import { Select } from "src/components/ui/Select"
import { StringRange } from "src/utils/types"

export const IntervalsSettings = () => {
  const { intervalMode, stringFocus } = useStore(
    state => state.intervals.settings
  )
  const { setIntervalMode, setStringFocus } = useActions(
    actions => actions.intervals.settings
  )

  return (
    <Settings>
      <Select
        size="sm"
        placeholder="Basic"
        defaultValue={intervalMode}
        onChange={mode => setIntervalMode(mode)}
      >
        <optgroup label="Interval Difficulty">
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced" disabled>
            Advanced
          </option>
        </optgroup>
      </Select>

      <Select
        size="sm"
        placeholder="All strings"
        defaultValue={stringFocus}
        onChange={index => setStringFocus(Number(index) as StringRange)}
      >
        <optgroup label="String Focus">
          <option value={-1}>All strings</option>
          <option value={0}>String 1</option>
          <option value={1}>String 2</option>
          <option value={2}>String 3</option>
          <option value={3}>String 4</option>
          <option value={4}>String 5</option>
          <option value={5}>String 6</option>
        </optgroup>
      </Select>
    </Settings>
  )
}
