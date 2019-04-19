import { Action, thunk, Thunk } from "easy-peasy"
import { StoreModel } from "src/store"
import { HINT_VISIBILITY_TIME } from "src/utils/types"

export interface ScoreboardModel {
  correctAnswers: number
  flashMessage: string
  incorrectAnswers: number

  // Actions
  correctAnswer: Thunk<ScoreboardModel, string | void, any, StoreModel>
  incorrectAnswer: Thunk<ScoreboardModel, string | void>

  incrementScore: Action<ScoreboardModel, void>
  decrementScore: Action<ScoreboardModel, void>

  showFlash: Thunk<ScoreboardModel, string, any, StoreModel>
  setFlashMessage: Action<ScoreboardModel, string>
}

export const scoreboard: ScoreboardModel = {
  correctAnswers: 0,
  incorrectAnswers: 0,
  flashMessage: "",

  correctAnswer: thunk((actions, flashMessage) => {
    if (flashMessage) {
      actions.showFlash(flashMessage)
    }

    setTimeout(() => {
      actions.incrementScore()
    }, 10)
  }),

  incorrectAnswer: thunk((actions, flashMessage) => {
    if (flashMessage) {
      actions.showFlash(flashMessage)
    }

    actions.decrementScore()
  }),

  incrementScore: state => {
    state.correctAnswers++
  },

  decrementScore: state => {
    state.incorrectAnswers++
  },

  setFlashMessage: (state, message) => {
    state.flashMessage = message
  },

  showFlash: thunk((actions, flashMessage) => {
    actions.setFlashMessage(flashMessage)

    setTimeout(() => {
      actions.setFlashMessage("")
    }, HINT_VISIBILITY_TIME)
  }),
}
