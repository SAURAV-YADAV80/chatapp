// redux/slices/usersSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
    requestStatus: null as null | 'pending' | 'success' | 'failed',
  },
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true
    },
    fetchUsersSuccess: (state, action) => {
      state.list = action.payload
      state.loading = false
    },
    fetchUsersFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    sendFriendRequestRequest: (state, action) => {
      state.requestStatus = 'pending'
    },
    sendFriendRequestSuccess: (state) => {
      state.requestStatus = 'success'
    },
    sendFriendRequestFailure: (state, action) => {
      state.requestStatus = 'failed'
      state.error = action.payload
    },
    acceptFriendRequestRequest: (state, action) => {
      state.requestStatus = 'pending'
    },
    acceptFriendRequestSuccess: (state) => {
      state.requestStatus = 'success'
    },
    acceptFriendRequestFailure: (state, action) => {
      state.requestStatus = 'failed'
      state.error = action.payload
    },
  },
})

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  sendFriendRequestRequest,
  sendFriendRequestSuccess,
  sendFriendRequestFailure,
  acceptFriendRequestRequest,
  acceptFriendRequestSuccess,
  acceptFriendRequestFailure,
} = usersSlice.actions

export default usersSlice.reducer
export type UsersState = ReturnType<typeof usersSlice.reducer>