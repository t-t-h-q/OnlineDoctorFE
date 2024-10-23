import { ILoginRequest, ILoginResponse, IRegisterRequest } from '@/interfaces/auth'
import { customBaseQuery } from '@/services/base'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IUser } from '@/interfaces/user'

export const authApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'authApi',
  tagTypes: ['Auth'],

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
        method: 'DELETE',
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
