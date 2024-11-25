import { IAppointmentDetail } from '@/pages/patients/AppointmentDetail'
import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'
import { CATCH_TIME_SECONDS } from 'constants/time'

// TODO: change when real api is available
export const appointmentApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'appointmentApi',
  tagTypes: ['Appointments'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    getAppointmentsDetail: builder.query<IAppointmentDetail, string>({
      query: (id: string) => ({
        url: `appointments/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Appointments', id }, 'Appointments'],
    }),
  }),
})

export const { useLazyGetAppointmentsDetailQuery } = appointmentApi
