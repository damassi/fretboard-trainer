import React from "react"
import { useActions, useStore } from "src/utils/hooks"
import { Select } from "src/components/ui/Select"
import { Settings } from "../settings/Settings"
import { StringRange } from "src/utils/types"

export const ScaleSettings: React.FC = () => {
  const { setStringFocus, setStartingFret } = useActions(
    actions => actions.notes.settings
  )
  const { stringFocus, startingFret } = useStore(state => state.notes.settings)

  return (
    <Settings>
      <Select
        size="sm"
        placeholder="Small"
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

      <Select
        size="sm"
        placeholder="Small"
        defaultValue={startingFret}
        onChange={fret => setStartingFret(Number(fret))}
      >
        <optgroup label="Fret Range">
          <option value={0}>All frets</option>
          <option value={3}>Start at fret 3</option>
          <option value={5}>Fret 5</option>
          <option value={7}>Fret 7</option>
        </optgroup>
      </Select>
    </Settings>
  )
}
