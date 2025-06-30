import { call, put, takeLatest, all } from 'redux-saga/effects'
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
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
} from '../slices/usersSlice'

import {
  getAllUsersAPI,
  sendFriendRequestAPI,
  acceptFriendRequestAPI,
  cancelFriendRequestAPI,
  cancelSentFriendRequestAPI,
  removeFriendAPI,
} from '../../services/userService'

import { fetchCurrentUserRequest } from '../slices/authSlice'
import { toast } from 'react-toastify'

function* fetchUsersSaga(): Generator<any, void, any> {
  try {
    const users = yield call(getAllUsersAPI)
    yield put(fetchUsersSuccess(users))
  } catch (err: any) {
    yield put(fetchUsersFailure(err.response?.data?.msg || 'Something went wrong'))
    toast.error('Failed to fetch users ❌')
  }
}

function* sendFriendRequestSaga(action: any): Generator<any, void, any> {
  try {
    yield call(sendFriendRequestAPI, action.payload)
    yield put(sendFriendRequestSuccess())
    yield put(fetchUsersRequest())
    yield put(fetchCurrentUserRequest())
    toast.success('Friend request sent ✅')
  } catch (err: any) {
    yield put(sendFriendRequestFailure(err.response?.data?.msg || 'Failed to send request'))
    toast.error('Failed to send friend request ❌')
  }
}

function* acceptFriendRequestSaga(action: any): Generator<any, void, any> {
  try {
    yield call(acceptFriendRequestAPI, action.payload)
    yield put(acceptFriendRequestSuccess())
    yield put(fetchUsersRequest())
    yield put(fetchCurrentUserRequest())
    toast.success('Friend request accepted ✅')
  } catch (err: any) {
    yield put(acceptFriendRequestFailure(err.response?.data?.msg || 'Failed to accept request'))
    toast.error('Failed to accept friend request ❌')
  }
}

function* cancelFriendRequestSaga(action: any): Generator<any, void, any> {
  try {
    yield call(cancelFriendRequestAPI, action.payload)
    yield put(cancelFriendRequestSuccess())
    yield put(fetchUsersRequest())
    yield put(fetchCurrentUserRequest())
    toast.success('Cancelled received request 🗑️')
  } catch (err: any) {
    yield put(cancelFriendRequestFailure(err.response?.data?.msg || 'Failed to cancel request'))
    toast.error('Failed to cancel received request ❌')
  }
}

function* cancelSentFriendRequestSaga(action: any): Generator<any, void, any> {
  try {
    yield call(cancelSentFriendRequestAPI, action.payload)
    yield put(cancelSentFriendRequestSuccess())
    yield put(fetchUsersRequest())
    yield put(fetchCurrentUserRequest())
    toast.success('Cancelled sent request 🗑️')
  } catch (err: any) {
    yield put(cancelSentFriendRequestFailure(err.response?.data?.msg || 'Failed to cancel sent request'))
    toast.error('Failed to cancel sent request ❌')
  }
}

function* removeFriendSaga(action: any): Generator<any, void, any> {
  try {
    yield call(removeFriendAPI, action.payload)
    yield put(removeFriendSuccess())
    yield put(fetchUsersRequest())
    yield put(fetchCurrentUserRequest())
    toast.success('Friend removed 🧹')
  } catch (err: any) {
    yield put(removeFriendFailure(err.response?.data?.msg || 'Failed to remove friend'))
    toast.error('Failed to remove friend ❌')
  }
}

export default function* usersWatcherSaga() {
  yield all([
    takeLatest(fetchUsersRequest.type, fetchUsersSaga),
    takeLatest(sendFriendRequestRequest.type, sendFriendRequestSaga),
    takeLatest(acceptFriendRequestRequest.type, acceptFriendRequestSaga),
    takeLatest(cancelFriendRequestRequest.type, cancelFriendRequestSaga),
    takeLatest(cancelSentFriendRequestRequest.type, cancelSentFriendRequestSaga),
    takeLatest(removeFriendRequest.type, removeFriendSaga),
  ])
}
