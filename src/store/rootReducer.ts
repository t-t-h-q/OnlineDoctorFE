import { combineReducers } from 'redux'

//  services
// import { postsApi } from '@/services/api'
import { authApi } from '@/services/auth'
import { doctorApi } from '@/services/doctor'

//  reducers
import authReducer from '@/store/auth'
import counterReducer from '@/store/counterSlice'
// import postsReducer from 'store/postsSlice'

/**
 * Combines multiple reducers into a single reducer function.
 * Includes reducers for API services and other application state.
 *
 * @returns The combined root reducer for the application.
 */

const rootReducer = combineReducers({
  // services
  // [postsApi.reducerPath]: postsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,

  // reducers
  auth: authReducer,
  counter: counterReducer,
  // posts: postsReducer,
})
export default rootReducer
