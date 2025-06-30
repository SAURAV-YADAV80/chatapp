import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
  _id: string
  name: string
  email: string
  friends: string[]
  friend_requests_sent: string[]
  friend_requests_received: string[]
}

interface AuthState {
  user: null | User
  loading: boolean
  error: string | null
}
const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpRequest(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
      state.loading = true
      state.error = null
    },
    signUpSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.loading = false
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },

    loginRequest(state, action: PayloadAction<{ email: string; password: string }>) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.loading = false
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    logoutRequest: (state) => {
      state.loading = true
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.user = null
    },
    logoutFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchCurrentUserRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchCurrentUserSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.loading = false
    },
    fetchCurrentUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },



  },
})

export const {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
} = authSlice.actions

export default authSlice.reducer
