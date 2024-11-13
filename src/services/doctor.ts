import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'
import { IDoctor } from '../interfaces/doctor'

export const doctorApi = createApi({
  reducerPath: 'doctorDetail',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getDoctorDetail: builder.query<IDoctor, string>({
      query: (id: string) => `doctor/${id}`,
    }),
    getDoctors: builder.query<
      IDoctor[],
      {
        searchQuery: {
          name?: string
          specialty?: string
        }
        sortOption: 'rating' | 'name'
      }
    >({
      query: ({ searchQuery, sortOption }) => ({
        url: `/doctors`,
        params: { ...(searchQuery || {}), sortOption },
      }),
    }),
  }),
})

export const { useGetDoctorDetailQuery, useGetDoctorsQuery } = doctorApi
