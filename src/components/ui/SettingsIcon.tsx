import React from "react"
import styled from "styled-components"
import { Box, Flex } from "rebass"

export const SettingsIcon = ({ fill = "#fff", ...props }) => {
  return (
    <Container {...props}>
      {props.selected ? (
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#fff"
            fillRule="nonzero"
            d="M5.03 5.9L.19 1 1.16 0 6 4.92 10.84 0l.97.99L6.97 5.9 12 11.01l-.97.99L6 6.89.97 12 0 11.01l5.03-5.1z"
            {...props}
          />
        </svg>
      ) : (
        <svg width="17px" height="14px" viewBox="0 0 17 14" version="1.1">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-43.000000, -785.000000)" fill={fill}>
              <g transform="translate(29.000000, 780.000000)">
                <g id="Group-3" transform="translate(14.500000, 5.000000)">
                  <g>
                    <g>
                      <g>
                        <rect x="0" y="10.2" width="10.4" height="1.6" />
                        <rect x="12.8" y="10.2" width="3.2" height="1.6" />
                        <rect x="9.6" y="8.2" width="1.6" height="5.6" />
                        <rect
                          transform="translate(11.200000, 3.000000) scale(-1, 1) translate(-11.200000, -3.000000) "
                          x="6.4"
                          y="2.2"
                          width="9.6"
                          height="1.6"
                        />
                        <rect
                          transform="translate(2.000000, 3.000000) scale(-1, 1) translate(-2.000000, -3.000000) "
                          x="0"
                          y="2.2"
                          width="4"
                          height="1.6"
                        />
                        <rect
                          transform="translate(6.400000, 3.000000) scale(-1, 1) translate(-6.400000, -3.000000) "
                          x="5.6"
                          y="0.2"
                          width="1.6"
                          height="5.6"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      )}
    </Container>
  )
}

const Container = styled(Flex)`
  opacity: ${props => (props.selected ? 1 : 0.2)};
  user-select: none;
  justify-content: center;
  /* box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3); */
  border-radius: 3px;
  align-items: center;
  /* background: white; */
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: relative;
  left: 2px;
`
