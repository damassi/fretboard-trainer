import React from "react"
import { Box, Image } from "rebass"

export const Fretboard = () => {
  return (
    <Box>
      <Image
        width="100%"
        height={220}
        src={require("./assets/fretboard.png")}
      />
    </Box>
  )
}
