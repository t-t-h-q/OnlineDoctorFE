import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'
import { CATCH_TIME_SECONDS } from 'constants/time'
import { Appointment } from '@/interfaces/appointment'

// TODO: change when real api is available
export const appointmentsApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'appointmentsApi',
  tagTypes: ['Appointments'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    getAppointmentsList: builder.query<Appointment[], void>({
      query: () => ({
        url: 'appointments',
        method: 'GET',
      }),
      providesTags: ['Appointments'],
    }),
  }),
})

export const { useLazyGetAppointmentsListQuery } = appointmentsApi
