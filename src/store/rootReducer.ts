import { combineReducers } from 'redux'

//  services
// import { postsApi } from '@/services/api'
import { authApi } from '@/services/auth'
import { doctorApi } from '../services/doctor'
import { appointmentsApi } from '@/services/appointmentsApi'

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
  [appointmentsApi.reducerPath]: appointmentsApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,

  // reducers
  auth: authReducer,
})

export default rootReducer
