import React from "react"
import { useStore, useActions } from "src/utils/hooks"
import { Box } from "rebass"
import { OpenEyeIcon } from "./OpenEyeIcon"

export const HintButton = props => {
  const { showHint } = useStore(state => state.settings)
  const { toggleHint } = useActions(actions => actions.settings)

  return (
    <Box pt={2}>
      <OpenEyeIcon
        onClick={() => {
          toggleHint()
          props.onClick(!showHint)
        }}
        fill={showHint ? "white" : "black60"}
        style={{
          transform: `scale(${showHint ? 1.3 : 1})`,
        }}
      />
    </Box>
  )
}
