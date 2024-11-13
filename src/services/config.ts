import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'

export const configApi = createApi({
  reducerPath: 'configDetail',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getSpecialties: builder.query<string[], void>({
      query: () => `specialty`,
    }),
  }),
})

export const { useGetSpecialtiesQuery } = configApi
