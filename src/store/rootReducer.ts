import { combineReducers } from 'redux'

//  services
import { authApi } from '@/services/auth'
import { patientApi } from '@/services/patient'

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
  [authApi.reducerPath]: authApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,

  // reducers
  auth: authReducer,
})
export default rootReducer
