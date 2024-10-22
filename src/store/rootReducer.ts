import { postsApi } from '@/services/api'
import { combineReducers } from 'redux'
import counterReducer from '@/store/counterSlice'
import postsReducer from 'store/postsSlice'

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
  counter: counterReducer,
  posts: postsReducer,
})

export default rootReducer
