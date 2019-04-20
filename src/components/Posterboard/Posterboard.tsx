import React from "react"
import { Flex } from "rebass"
import { Display } from "src/components/ui/Typography"

export const Posterboard = ({ children, next }) => {
  return (
    <Flex alignItems="center" justifyContent="center" mt={7} mb={4}>
      <Display fontSize={50}>{children}</Display>
      <Display
        size="2"
        color="black80"
        style={{
          position: "relative",
          left: 60,
        }}
      >
        {next} ⇾
      </Display>
    </Flex>
  )
}
