// import React from "react"
import { Box } from "rebass"
import styled from "styled-components"

export const BorderBox = styled(Box).attrs({ p: 2 })`
  border: 1px solid ${p => p.theme.colors["white"]};
  height: fit-content;
`
