import React, { useState } from "react"
import { Box, Flex, Text } from "rebass"
import { RadioGroup, Radio } from "react-radio-group"
import styled from "styled-components"

export const Settings = () => {
  const [accentType, setAccentType] = useState("flats")

  return (
    <Box>
      <Box py={1}>
        <Text>Settings</Text>
      </Box>
      <Box>
        <RadioGroup
          name="fruit"
          selectedValue={accentType}
          onChange={value => setAccentType(value)}
        >
          <Flex width={140} justifyContent="space-between">
            <RadioContainer onClick={() => setAccentType("flats")}>
              <Radio value="flats" />
              Flats
            </RadioContainer>
            <RadioContainer onClick={() => setAccentType("sharps")}>
              <Radio value="sharps" />
              Sharps
            </RadioContainer>
          </Flex>
        </RadioGroup>
      </Box>
    </Box>
  )
}

const RadioContainer = styled(Box)`
  cursor: pointer;
`
