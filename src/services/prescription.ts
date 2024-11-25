import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'
import { CATCH_TIME_SECONDS } from 'constants/time'
import { IPrescription } from '@/pages/patients/PrescriptionDetail'

// TODO: change when real api is available
export const prescriptionApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'prescriptionApi',
  tagTypes: ['Prescriptions'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    getPrescriptionsDetail: builder.query<IPrescription[], string>({
      query: (id: string) => ({
        url: `prescriptions/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Prescriptions', id }, 'Prescriptions'],
    }),
  }),
})

export const { useLazyGetPrescriptionsDetailQuery } = prescriptionApi
