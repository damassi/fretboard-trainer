import { LessonModule } from "./types"
import { store } from "src/store"

/**
 * FIXME: There's an issue where `thunk`, in the settingsStore, leads to a slight
 * visual jump in the settings bar due to next-tick behavior. Figure out how to
 * properly prevent render of settings until the module changes post-dispatch.
 */
export function bootLessonModule(lessonModule: LessonModule) {
  store.dispatch.settings.setLessonModule(lessonModule)
  store.dispatch.settings.bootLessonModule(lessonModule)
}
