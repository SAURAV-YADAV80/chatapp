import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: null | { name: string; email: string }
  loading: boolean
  error: string | null
  friends: string[]
  friend_requests: string[]
}
const storedUser = localStorage.getItem('user')

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
  friend_requests:[],
  friends: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpRequest(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
      state.loading = true
      state.error = null
    },
    signUpSuccess(state, action: PayloadAction<{ name: string; email: string }>) {
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
    loginSuccess(state, action: PayloadAction<{ name: string; email: string }>) {
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
} = authSlice.actions

export default authSlice.reducer
