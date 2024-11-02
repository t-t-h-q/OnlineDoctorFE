import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { forEach, get } from 'lodash'

import { STORAGE_KEYS } from '@/constants/storageKeys'
import StorageService from '@/services/localStorage'
import { resetCredentials } from 'store/auth'
import { toast } from 'react-toastify'
import { ERROR_MESSAGES } from 'constants/errorMessages'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const authorization = headers.get('Authorization')
    const accessToken = StorageService.get(STORAGE_KEYS.AUTH_PROFILE)?.accessToken

    if (!authorization && accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (get(result, 'error.status') === 401) {
    try {
      const tokens = StorageService.get(STORAGE_KEYS.AUTH_PROFILE) || {}

      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokens.refreshToken}`,
          },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        // get new tokens
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = get(refreshResult, 'data', {})
        const tokens = { accessToken: data.token, refreshToken: data.refreshToken, tokenExpires: data.tokenExpires }
        StorageService.set(STORAGE_KEYS.AUTH_PROFILE, tokens)

        // retry original query
        result = await baseQuery(args, api, extraOptions)
      } else {
        handleNotification(api, result)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Refresh token error:', error)
    }
  }
  // show notification and redirect
  else if (result.error) {
    handleNotification(api, result)
  }

  return result
}

const handleNotification = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  const errorStatus = get(result, 'error.status')
  const errors = get(result, 'error.data.errors')
  let message = ''
  let navigateTo: string | null = null

  // clear profile and token
  if (errorStatus === 401) {
    api.dispatch(resetCredentials())
    StorageService.remove(STORAGE_KEYS.AUTH_PROFILE)
  }

  if (errorStatus) {
    message = get(ERROR_MESSAGES, errorStatus.toString())
  }

  switch (errorStatus) {
    case 401:
      navigateTo = '/login'
      break
    case 403:
      navigateTo = '/403'
      break
    case 500:
      navigateTo = '/500'
      break
  }

  if (!window.navigator.onLine) {
    message = 'No internet connection'
  }

  // show notification
  if (errors) {
    forEach(errors, (value) => {
      const messageVal = get(ERROR_MESSAGES, value as string) || 'Something wrong'
      toast(messageVal, { type: 'error' })
    })
  } else if (message) {
    toast(message, { type: 'error' })
  }

  // redirect
  const pathname = window.location.pathname
  if (pathname !== navigateTo && navigateTo) {
    // TODO: handle redirect outside react component
    window.location.href = `${window.location.origin}${navigateTo}`
  }
}
