import { createTypedHooks } from "easy-peasy"
import { StoreModel } from "./store"

export const { useStore, useActions } = createTypedHooks<StoreModel>()
