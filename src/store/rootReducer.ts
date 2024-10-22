import { postsApi } from '@/services/api'
import { combineReducers } from 'redux'
import exampleReducer from 'store/exampleSlice'

/**
 * Combines multiple reducers into a single reducer function.
 * Includes reducers for API services and other application state.
 *
 * @returns The combined root reducer for the application.
 */

const rootReducer = combineReducers({
  // services
  [postsApi.reducerPath]: postsApi.reducer,

  // reducers
  example: exampleReducer,
})

export default rootReducer
