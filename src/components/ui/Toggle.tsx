import React from "react"
import styled from "styled-components"
import { Display } from "src/components/ui/Typography"
import { Box } from "rebass"
import { color } from "src/Theme"

interface ToggleProps {
  children: React.ReactNode
  onClick?: () => void
  selected?: boolean
}

export const Toggle: React.FC<ToggleProps> = ({
  selected = false,
  onClick,
  children,
}) => {
  return (
    <Button
      my={0.5}
      selected={selected}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
    >
      <Display size="2">{children}</Display>
    </Button>
  )
}

const Button = styled(Box)`
  position: relative;
  cursor: pointer;
  color: ${props => (props.selected ? color("green1") : "#fff")};
  user-select: none;

  &:before {
    content: "${props => (props.selected ? "✓" : "")}";
    position: absolute;
    left: -18px;
    top: -4px;
  }
`
