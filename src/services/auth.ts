import { ILoginRequest, ILoginResponse, IRegisterRequest } from 'interfaces/auth'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IUser } from '@/interfaces/user'
import { CATCH_TIME_SECONDS } from '@/constants/time'
import { customBaseQuery } from 'services/base'

export const authApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: '/auth/email/login',
        method: 'POST',
        body: credentials,
        invalidatesTags: ['Auth'],
      }),
    }),

    getProfile: builder.query<IUser, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        providesTags: ['Auth', { type: 'Auth', id: 'PROFILE' }],
      }),
    }),

    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        invalidatesTags: ['Auth'],
      }),
    }),

    refreshToken: builder.mutation<unknown, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
        invalidatesTags: ['Auth'],
      }),
    }),

    register: builder.mutation<unknown, IRegisterRequest>({
      query: (credentials) => ({
        url: 'auth/email/register',
        method: 'POST',
        body: credentials,
        invalidatesTags: ['Auth'],
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLazyGetProfileQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
} = authApi
