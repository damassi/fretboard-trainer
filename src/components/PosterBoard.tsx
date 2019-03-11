import React from "react"
import { Flex } from "rebass"
import { Display } from "src/components/ui/Typography"

export const Posterboard = () => {
  return (
    <Flex justifyContent="center" mt={7} mb={4}>
      <Display fontSize={50}>Fretboard Trainer</Display>
    </Flex>
  )
}
