// redux/sagas/usersSaga.ts
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
} from '../slices/usersSlice'
import {
  getAllUsersAPI,
  sendFriendRequestAPI,
  acceptFriendRequestAPI,
} from '../../services/userService'

function* fetchUsersSaga(): Generator<any, void, any> {
  try {
    const users = yield call(getAllUsersAPI)
    yield put(fetchUsersSuccess(users))
  } catch (err: any) {
    yield put(fetchUsersFailure(err.response?.data?.msg || 'Something went wrong'))
  }
}

function* sendFriendRequestSaga(action: any): Generator<any, void, any> {
  try {
    yield call(sendFriendRequestAPI, action.payload)
    yield put(sendFriendRequestSuccess())
    yield put(fetchUsersRequest()) // refresh
  } catch (err: any) {
    yield put(sendFriendRequestFailure(err.response?.data?.msg || 'Failed to send request'))
  }
}

function* acceptFriendRequestSaga(action: any): Generator<any, void, any> {
  try {
    yield call(acceptFriendRequestAPI, action.payload)
    yield put(acceptFriendRequestSuccess())
    yield put(fetchUsersRequest()) // refresh
  } catch (err: any) {
    yield put(acceptFriendRequestFailure(err.response?.data?.msg || 'Failed to accept request'))
  }
}

export default function* usersWatcherSaga() {
  yield all([
    takeLatest(fetchUsersRequest.type, fetchUsersSaga),
    takeLatest(sendFriendRequestRequest.type, sendFriendRequestSaga),
    takeLatest(acceptFriendRequestRequest.type, acceptFriendRequestSaga),
  ])
}
