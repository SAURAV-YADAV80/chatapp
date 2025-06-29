import { all } from 'redux-saga/effects'
import authSaga from './sagas/authSaga'
import usersWatcherSaga from './sagas/usersSaga'

export default function* rootSaga() {
  yield all([
    authSaga(),
    usersWatcherSaga(),
  ])
}


