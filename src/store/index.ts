import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

// import { postsApi } from '@/services/api'
import { authApi } from '@/services/auth'
import rootReducer from './rootReducer'

/**
 * Configures the Redux store by combining the root reducer with the API reducer,
 * and adding API middleware to the store.
 * Defines RootState and AppDispatch types based on the rootReducer and store dispatch.
 * @returns The configured Redux store.
 */

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(logger)
  // .concat(postsApi.middleware)
  .concat(authApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
