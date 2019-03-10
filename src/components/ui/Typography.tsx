import React from "react"
import styled from "styled-components"
import { Text as TextBase } from "rebass"
import { theme } from "src/Theme"
import { fontSize } from "styled-system"

// Typography types

export const Sans = props => buildType({ ...props, family: "sans" })
export const Serif = props => buildType({ ...props, family: "serif" })
export const Display = props => buildType({ ...props, family: "display" })

// Helpers

function buildType({
  family = "sans",
  size = "4",
  weight = "regular",
  children,
  ...rest
}) {
  const { fontSize, lineHeight } = determineFontSizes(size)
  const fontFamily = theme.typography.fonts[family].fontFamily
  const fontWeight = theme.typography.fonts[family].weights[weight]
  const textProps = {
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    ...rest,
  }

  return <Text {...textProps}>{children}</Text>
}

const Text = styled(TextBase)`
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  line-height: ${props => props.lineHeight};
  ${fontSize};
`

/**
 * Determines which font sizes/line heights to use for typography, and checks to
 * see if the values being passed in are responsive.
 *
 * See: https://jxnblk.com/styled-system/#responsive-styles
 */
function determineFontSizes(size) {
  if (!Array.isArray(size)) {
    const { fontSize, lineHeight } = theme.typography.sizes[size]

    return {
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
    }
  }

  return size
    .map(s => theme.typography.sizes[s])
    .reduce(
      (accumulator, current) => {
        return {
          fontSize: [...accumulator.fontSize, `${current.fontSize}px`],
          lineHeight: [...accumulator.lineHeight, `${current.lineHeight}px`],
        }
      },
      { fontSize: [], lineHeight: [] }
    )
}
