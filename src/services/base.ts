import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  // add logic to set headers here
  // exp: add token authentication
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth.token
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`)
  //   }
  //   return headers
  // },
})
