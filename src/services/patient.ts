import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'
import { IUser } from '../interfaces/user'

export const patientApi = createApi({
  reducerPath: 'patientDetail',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getPatientDetail: builder.query<IUser, string>({
      query: (id: string) => `patient/${id}`,
    }),
    createAppointment: builder.mutation<IUser, unknown>({
      query: (data: unknown) => ({
        url: '/appointment',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useGetPatientDetailQuery, useCreateAppointmentMutation } = patientApi
