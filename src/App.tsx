import React from "react"
import { Box, Flex } from "rebass"
import { Fretboard } from "./Fretboard"
import { Settings } from "./Settings"
import { Answers } from "./Answers"

export const App = () => {
  return (
    <Flex flexDirection="column" p={2}>
      <Box>
        <Fretboard />
      </Box>
      <Flex>
        <Flex width="100%" justifyContent="center" mt={3}>
          <Answers />
        </Flex>
      </Flex>
      <Box mt={3}>
        <Settings />
      </Box>
    </Flex>
  )
}
