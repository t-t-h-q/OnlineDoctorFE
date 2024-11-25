import { combineReducers } from 'redux'

//  services
import { authApi } from '@/services/auth'
import { doctorApi } from '../services/doctor'
import { appointmentApi } from '@/services/appointments'

//  reducers
import authReducer from '@/store/auth'
import { prescriptionApi } from '@/services/prescription'

/**
 * Combines multiple reducers into a single reducer function.
 * Includes reducers for API services and other application state.
 *
 * @returns The combined root reducer for the application.
 */

const rootReducer = combineReducers({
  // services
  [authApi.reducerPath]: authApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [prescriptionApi.reducerPath]: prescriptionApi.reducer,

  // reducers
  auth: authReducer,
})
export default rootReducer
