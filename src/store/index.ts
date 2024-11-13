import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

import { authApi } from '@/services/auth'
import { doctorApi } from '@/services/doctor'
import { configApi } from '../services/config'
import { patientApi } from '../services/patient'

/**
 * Configures the Redux store by combining the root reducer with the API reducer,
 * and adding API middleware to the store.
 * Defines RootState and AppDispatch types based on the rootReducer and store dispatch.
 * @returns The configured Redux store.
 */

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(doctorApi.middleware)
      .concat(configApi.middleware)
      .concat(patientApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
