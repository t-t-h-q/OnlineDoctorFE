import { appointments } from '@/fakeData/appointment'
import { Appointment } from '@/pages/patients/AppointmentManagement'
import { createApi } from '@reduxjs/toolkit/query/react'
// import { customBaseQuery } from './base'
import { CATCH_TIME_SECONDS } from 'constants/time'

/**
 * Asynchronous function that simulates a delay of 500 milliseconds before resolving with a null data object.
 */
export const fakeBaseQuery = () => async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { data: null }
}

// TODO: change when real api is available
export const patientApi = createApi({
  // baseQuery: customBaseQuery,
  baseQuery: fakeBaseQuery(),
  reducerPath: 'patientApi',
  tagTypes: ['patients'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    getAppointmentsList: builder.query<Appointment[], void>({
      query: () => ({
        url: 'patients/manage-appointments',
        method: 'GET',
      }),
      providesTags: ['patients'],
      transformResponse: () => {
        return appointments
      },
    }),
  }),
})

export const { useLazyGetAppointmentsListQuery } = patientApi
