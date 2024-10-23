import { combineReducers } from 'redux'
// import exampleReducer from 'store/exampleSlice'

//  services
// import { postsApi } from '@/services/api'
import { authApi } from '@/services/auth'

//  reducers
import authReducer from '@/store/auth'

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
  
  // reducers
  // example: exampleReducer,
  auth: authReducer,
})

export default rootReducer
