import React from "react"
import styled from "styled-components"
import { color, font } from "src/Theme"

import { Select as BaseSelect } from "@smooth-ui/core-sc"

export const Select: React.FC<any> = ({ children, onChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }
  return (
    <SelectElement {...props} onChange={handleChange}>
      {children}
    </SelectElement>
  )
}

export const SelectElement = styled(BaseSelect)`
  select {
    background: ${color("black80")};
    border: none;
    color: ${color("purpleLight")};

    font-family: ${font("display")};
  }
`
