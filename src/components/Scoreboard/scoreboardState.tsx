import { Action, thunk, Thunk } from "easy-peasy"
import { StoreModel } from "src/store"

export interface ScoreboardModel {
  correctAnswers: number
  flashMessage: string
  incorrectAnswers: number

  // Actions
  correctAnswer: Action<ScoreboardModel, void>
  incorrectAnswer: Action<ScoreboardModel, void>

  showFlash: Thunk<ScoreboardModel, string, any, StoreModel>
  setFlashMessage: Action<ScoreboardModel, string>
}

export const scoreboard: ScoreboardModel = {
  correctAnswers: 0,
  incorrectAnswers: 0,
  flashMessage: "",

  correctAnswer: state => {
    state.correctAnswers++
  },

  incorrectAnswer: state => {
    state.incorrectAnswers++
  },

  setFlashMessage: (state, message) => {
    state.flashMessage = message
  },

  showFlash: thunk((actions, flashMessage, { dispatch }: any) => {
    actions.setFlashMessage(flashMessage)

    // TODO: Move hint toggling to a listener inside of fretboardState
    dispatch.settings.toggleHint()
    setTimeout(() => {
      actions.setFlashMessage("")
      dispatch.settings.toggleHint()
    }, 2000)
  }),
}
