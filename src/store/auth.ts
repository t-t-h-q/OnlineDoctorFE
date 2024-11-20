import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { get } from 'lodash'

import { IUser } from '@/interfaces/user'
import type { RootState } from '@/store'
import { authApi } from '@/services/auth'

interface IAuthState {
  currentUser: IUser | null
  isProfileLoading: boolean
}

const initialState: IAuthState = {
  currentUser: null,
  isProfileLoading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => ({
      ...state,
      ...action.payload,
    }),
    resetCredentials: () => initialState,
  },
  extraReducers: (builder) => {
    // login
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      const data = get(action, 'payload.user', null)
      state.currentUser = data
    })

    // get profile
    builder.addMatcher(authApi.endpoints.getProfile.matchPending, (state) => {
      state.isProfileLoading = true
    })
    builder.addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, action) => {
      const data = get(action, 'payload', null)
      state.currentUser = data
      state.isProfileLoading = false
    })
    builder.addMatcher(authApi.endpoints.getProfile.matchRejected, (state) => {
      state.isProfileLoading = false
    })

    // logout
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.currentUser = null
    })
  },
})

export const { setCredentials, resetCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.currentUser
