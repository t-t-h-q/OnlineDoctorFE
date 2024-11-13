import { combineReducers } from 'redux'

//  services
// import { postsApi } from '@/services/api'
import { authApi } from '@/services/auth'
import { doctorApi } from '../services/doctor'
import { configApi } from '../services/config'

//  reducers
import authReducer from '@/store/auth'
import patientAppointmentReducer from '@/store/patient/appointment'
import { patientApi } from '../services/patient'

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
  [configApi.reducerPath]: configApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,

  // reducers
  auth: authReducer,
  patientAppointment: patientAppointmentReducer,
})

export default rootReducer
