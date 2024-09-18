import { configureStore } from '@reduxjs/toolkit'
import branchReducer from './features/branch/branchSlice.js'
export const store = configureStore({
  reducer: {
    branch: branchReducer,
  },
})