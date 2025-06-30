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

    cancelFriendRequestRequest: (state, action) => {
      state.requestStatus = 'pending'
    },
    cancelFriendRequestSuccess: (state) => {
      state.requestStatus = 'success'
    },
    cancelFriendRequestFailure: (state, action) => {
      state.requestStatus = 'failed'
      state.error = action.payload
    },

    cancelSentFriendRequestRequest: (state, action) => {
      state.requestStatus = 'pending'
    },
    cancelSentFriendRequestSuccess: (state) => {
      state.requestStatus = 'success'
    },
    cancelSentFriendRequestFailure: (state, action) => {
      state.requestStatus = 'failed'
      state.error = action.payload
    },

    removeFriendRequest: (state, action) => {
      state.requestStatus = 'pending'
    },
    removeFriendSuccess: (state) => {
      state.requestStatus = 'success'
    },
    removeFriendFailure: (state, action) => {
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
  cancelFriendRequestRequest,
  cancelFriendRequestSuccess,
  cancelFriendRequestFailure,
  cancelSentFriendRequestRequest,
  cancelSentFriendRequestSuccess,
  cancelSentFriendRequestFailure,
  removeFriendRequest,
  removeFriendSuccess,
  removeFriendFailure,
} = usersSlice.actions

export default usersSlice.reducer
export type UsersState = ReturnType<typeof usersSlice.reducer>
