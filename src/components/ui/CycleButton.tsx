import React, { useState } from "react"
import styled from "styled-components"
import { Display } from "src/components/ui/Typography"
import { Box } from "rebass"
import { isFunction, isString, isNumber } from "lodash"

type CycleItem = string | number | { label: string; onSelect: () => void }

interface CycleButtonProps {
  children?: React.ReactNode
  items: CycleItem[]
  selectedIndex?: (() => number) | number
  onClick?: ({ item: any, index: number }) => void
}

export const CycleButton: React.FC<CycleButtonProps> = ({
  children,
  items,
  selectedIndex = 0,
  onClick,
}) => {
  const startingIndex = isFunction(selectedIndex)
    ? selectedIndex()
    : selectedIndex
  const [currIndex, setIndex] = useState(startingIndex)

  const getItem = () => {
    const item = items[currIndex]
    if (isString(item) || isNumber(item)) {
      return {
        label: String(item),
        onSelect: () => null,
      }
    } else {
      return item
    }
  }

  const item = getItem()

  if (isFunction(item.onSelect)) {
    item.onSelect()
  }

  return (
    <Button
      my={0.5}
      ml={1}
      selected={false}
      onClick={() => {
        let newIndex
        if (currIndex < items.length - 1) {
          newIndex = currIndex + 1
        } else {
          newIndex = 0
        }

        setIndex(newIndex)

        if (onClick) {
          onClick({ item, index: newIndex })
        }
      }}
    >
      <Display size="2">
        {children} {item.label}
      </Display>
    </Button>
  )
}

const Button = styled(Box)`
  cursor: pointer;
  user-select: none;
`
