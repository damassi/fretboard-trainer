import { useEffect } from "react"
import { Howl } from "howler"
import { useStore } from "src/utils/hooks"

export const SoundNote = () => {
  const {
    currentNote: {
      position: [string, note],
    },
  } = useStore(state => state.fretboard)

  const soundFile = `/audio/${string + 1}-${note}.mp3`

  useEffect(() => {
    const sound = new Howl({
      src: [soundFile],
    })

    sound.play()
  }, [soundFile])

  return null
}
