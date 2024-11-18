import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'
import { CATCH_TIME_SECONDS } from 'constants/time'
import { IDoctor } from 'interfaces/doctor'
import { ISearchDoctorParams, ISearchDoctorResponse } from '@/interfaces/doctor'

export const doctorApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'doctorApi',
  tagTypes: ['Doctors'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    searchDoctors: builder.query<ISearchDoctorResponse, ISearchDoctorParams>({
      query: (params) => ({
        url: 'doctors',
        method: 'GET',
        params: params,
      }),
      providesTags: ['Doctors'],
    }),
    getDoctorDetail: builder.query<IDoctor, string>({
      query: (id: string) => ({
        url: `doctor/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Doctors', id }, 'Doctors'],
    }),
  }),
})

export const { useGetDoctorDetailQuery, useLazyGetDoctorDetailQuery, useLazySearchDoctorsQuery } = doctorApi
