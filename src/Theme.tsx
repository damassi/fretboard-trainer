import React from "react"
import { createGlobalStyle, ThemeProvider, css } from "styled-components"
import { Box } from "rebass"

export const theme = {
  space: {
    0.5: 5,
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    5: 50,
    6: 60,
    7: 70,
    8: 80,
    9: 90,
    10: 100,
  },

  colors: {
    black100: "#000",
    black80: "#333",
    black60: "#666",
    black30: "#C2C2C2",
    black10: "#E5E5E5",
    black5: "#F8F8F8",
    white: "#fff",
    green1: "#69f969",
    purpleLight: "#deb6da",
    purpleDark: "#ce6fc4",
    teal: "#6faece",
  },

  typography: {
    fonts: {
      sans: {
        fontFamily: "Gothic A1",
        weights: {
          light: 300,
          regular: 400,
          semibold: 600,
          bold: 700,
          black: 900,
        },
      },
      serif: {
        fontFamily: "Playfair Display",
        weights: {
          regular: 400,
          bold: 700,
          black: 900,
        },
      },
      display: {
        fontFamily: "Bungee Inline",
        weights: {
          regular: 400,
        },
      },
    },
    sizes: {
      "0": {
        fontSize: 8,
        lineHeight: 8,
      },
      "1": {
        fontSize: 10,
        lineHeight: 14,
      },
      "2": {
        fontSize: 12,
        lineHeight: 16,
      },
      "3": {
        fontSize: 14,
        lineHeight: 24,
      },
      "4": {
        fontSize: 16,
        lineHeight: 26,
      },
      "5": {
        fontSize: 18,
        lineHeight: 30,
      },
      "6": {
        fontSize: 22,
        lineHeight: 35,
      },
      "7": {
        fontSize: 30,
        lineHeight: 35,
      },
      "8": {
        fontSize: 40,
        lineHeight: 45,
      },
    },
  },
}

// Utils

export type Color = keyof typeof theme.colors
export const color = (colorKey: Color) => theme.colors[colorKey]

export type Space = keyof typeof theme.space
export const space = (spaceKey: Space) => theme.space[spaceKey] + "px"

export type Font = keyof typeof theme.typography.fonts
export const font = (fontKey: Font) => theme.typography.fonts[fontKey].fontFamily // prettier-ignore

export type FontSize = keyof typeof theme.typography.sizes
export const fontSize = (fontSizeKey: FontSize) => {
  const { fontSize: _fontSize, lineHeight } = theme.typography.sizes[
    fontSizeKey
  ]
  return css`
    font-size: ${_fontSize}px;
    line-height: ${lineHeight}px;
  `
}

const GlobalStyle = createGlobalStyle`
  body, html {
    background-color: #333;
    background-image: linear-gradient(to right top, #434343, #333333, #252424, #161616, #010100);
    width: 100%;
    height: 100vh;
    font-family: ${font("sans")}, sans-serif;
    color: ${color("white")};

    ${fontSize("4")}

    margin: 0 auto;
    user-select: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <GlobalStyle />
        {children}
      </Box>
    </ThemeProvider>
  )
}
