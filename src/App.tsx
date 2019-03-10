import React from "react"
import { Box, Flex, Text } from "rebass"
import { Fretboard } from "./Fretboard"
import { Settings } from "./Settings"
import { Answers } from "./Answers"
import { Score } from "./Score"
import { Spacer } from "./Spacer"

export const App = () => {
  return (
    <Flex flexDirection="column" p={2}>
      <Flex justifyContent="center" mt={2}>
        <Text fontFamily="Bungee Inline" fontSize={46}>
          Fretboard Trainer
        </Text>
      </Flex>
      <Box mt={3}>
        <Score />
      </Box>

      <Spacer my={4} />

      <Box>
        <Fretboard />
      </Box>

      <Spacer my={1} />

      <Flex width="100%" justifyContent="center" mt={3}>
        <Answers />
      </Flex>
      <Box mt={3}>
        <Settings />
      </Box>
    </Flex>
  )
}
