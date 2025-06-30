import { takeLatest, call, put } from 'redux-saga/effects'
import {
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
} from '../slices/authSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loginAPI, signUpAPI } from '../../services/authService'
import type { LoginPayload, SignUpPayload } from '../../types/auth.types'
import { toast } from 'react-toastify'
import { fetchCurrentUserAPI } from '../../services/userService'

function* handleSignUp(action: PayloadAction<SignUpPayload>): Generator {
  try {
    const res = yield call(signUpAPI, action.payload)
    yield put(signUpSuccess(res.user))
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    yield put(fetchCurrentUserRequest())
    toast.success('Signup successful 🎉')
  } catch (err: any) {
    yield put(signUpFailure(err.message))
    toast.error(`Signup failed ❌: ${err.message}`)
  }
}

function* handleLogin(action: PayloadAction<LoginPayload>): Generator {
  try {
    const res = yield call(loginAPI, action.payload)
    yield put(loginSuccess(res.user))
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    yield put(fetchCurrentUserRequest())
    toast.success('Login successful 👏')
  } catch (err: any) {
    yield put(loginFailure(err.message))
    toast.error(`Login failed 😓: ${err.message}`)
  }
}

function* handleLogout() {
  try {
    yield put(logoutSuccess())
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
  } catch (err: any) {
    yield put(logoutFailure(err.message))
    toast.error('Logout failed')
  }
}

function* fetchCurrentUserWorker(): Generator {
  try {
    const user = yield call(fetchCurrentUserAPI)
    yield put(fetchCurrentUserSuccess(user))
  } catch (err: any) {
    yield put(fetchCurrentUserFailure(err.message))
    console.error('Failed to fetch current user', err)
  }
}

export default function* authSaga() {
  yield takeLatest(signUpRequest.type, handleSignUp)
  yield takeLatest(loginRequest.type, handleLogin)
  yield takeLatest(logoutRequest.type, handleLogout)
  yield takeLatest(fetchCurrentUserRequest.type, fetchCurrentUserWorker)
}
