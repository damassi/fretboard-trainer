import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

export const SettingsContainer = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled(Box)`
  position: absolute;
  top: 70px;
`
