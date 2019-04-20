import React from "react"
import { Flex } from "rebass"

import { useStore, useActions } from "src/utils/hooks"
import { Select } from "src/components/ui/Select"
import { Spacer } from "src/components/ui/Spacer"
import { Join } from "src/components/ui/Join"
import { VolumeToggle } from "src/components/ui/VolumeToggle"
import { SettingsIcon } from "src/components/ui/SettingsIcon"

import { useSpring, animated } from "react-spring"

export const Settings = props => {
  const {
    setFretboardMode,
    setMultipleChoice,
    setShowNotes,
    toggleSettings,
  } = useActions(actions => actions.settings)

  const { fretboardMode, multipleChoice, showNotes, showSettings } = useStore(
    state => state.settings
  )

  const animateProps = useSpring({
    from: {
      opacity: 1,
    },
    to: {
      marginTop: showSettings ? 0 : -70,
      opacity: showSettings ? 1 : 0,
    },
    config: {
      mass: 1,
      tension: 388,
      friction: 36,
    },
  })

  return (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={2}
      mb={1}
    >
      <animated.div style={animateProps}>
        <Flex my={1}>
          <Join separator={<Spacer mx={1} />}>
            {/*
              Additional settings can be passed as children
            */}
            {props.children}

            <Select
              size="sm"
              placeholder="Small"
              defaultValue={multipleChoice}
              onChange={bool => setMultipleChoice(bool)}
            >
              <optgroup label="Answer Mode">
                <option value="true">Multiple Choice</option>
                <option value="false">Input</option>
              </optgroup>
            </Select>
            <Select
              size="sm"
              placeholder="Small"
              defaultValue={showNotes}
              onChange={bool => setShowNotes(bool)}
            >
              <optgroup label="Note Visibility">
                <option value="false">Hide notes</option>
                <option value="true">Show notes</option>
              </optgroup>
            </Select>
            <Select
              size="sm"
              placeholder="Small"
              defaultValue={fretboardMode}
              onChange={mode => setFretboardMode(mode)}
            >
              <optgroup label="Fretboard Mode">
                <option value="naturals">Natural notes only</option>
                <option value="flats">Flats</option>
                <option value="sharps">Sharps</option>
              </optgroup>
            </Select>
          </Join>
        </Flex>
      </animated.div>

      <Flex width="5%" justifyContent="space-between" mt={3} mb={0}>
        <VolumeToggle />
        <SettingsIcon
          onClick={() => toggleSettings()}
          selected={showSettings}
        />
      </Flex>
    </Flex>
  )
}
