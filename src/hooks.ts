import { createTypedHooks } from "easy-peasy"
import { StoreModel } from "./state/store"

export const { useStore, useActions } = createTypedHooks<StoreModel>()
