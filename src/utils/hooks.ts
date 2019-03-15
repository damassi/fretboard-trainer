import { createTypedHooks } from "easy-peasy"
import { StoreModel } from "src/store"

export const { useStore, useActions } = createTypedHooks<StoreModel>()
