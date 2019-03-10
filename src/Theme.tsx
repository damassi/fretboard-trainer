import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { Box } from "rebass"

export const theme = {
  space: {
    "1": 10,
    "2": 20,
    "3": 30,
    "4": 40,
    "5": 50,
    "6": 60,
    "7": 70,
    "8": 80,
    "9": 90,
    "10": 100,
  },

  colors: {
    black100: "#000",
    black80: "#333",
    black60: "#666",
    black30: "#C2C2C2",
    black10: "#E5E5E5",
    black5: "#F8F8F8",
    white: "#fff",

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
        // fontFamily: "Patua One",
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

export const color = colorKey => theme.colors[colorKey]
export const space = spaceKey => theme.space[spaceKey] + "px"
export const font = fontKey => theme.typography.fonts[fontKey].fontFamily

const GlobalStyle = createGlobalStyle`
  body, html {
    background-color: #333;
    font-family: ${font("sans")}, sans-serif;
    color: ${color("white")};
    font-size: ${theme.typography.sizes[4].fontSize}px;
    line-height: ${theme.typography.sizes[4].lineHeight}px;
    margin: 0 auto;
    width: 1200px;
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
