import { Box } from "rebass"
import styled from "styled-components"

export const Divider = styled(Box)`
  border-bottom: 1px solid ${props => props.theme.colors.black10};
`
