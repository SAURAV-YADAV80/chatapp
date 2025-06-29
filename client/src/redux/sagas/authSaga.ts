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
} from '../slices/authSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loginAPI, signUpAPI } from '../../services/authService'
import type { LoginPayload, SignUpPayload } from '../../types/auth.types'
import { toast } from 'react-toastify'

function* handleSignUp(action: PayloadAction<SignUpPayload>): Generator {
  try {
    console.log('SignUp Action:', action.payload)
    const res = yield call(signUpAPI, action.payload)
    yield put(signUpSuccess(res.user))
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    toast.success('Signup successful 🎉')
  } catch (err: any) {
    yield put(signUpFailure(err.message))
    toast.error(`Signup failed ❌: ${err.message}`)
  }
}

function* handleLogin(action: PayloadAction<LoginPayload>): Generator {
  try {
    console.log('Login Action:', action.payload)
    const res = yield call(loginAPI, action.payload)
    yield put(loginSuccess(res.user))
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    toast.success('Login successful 👏')
  } catch (err: any) {
    yield put(loginFailure(err.message))
    toast.error(`Login failed 😓: ${err.message}`)
  }
}

function* handleLogout() {
  try {
    // API call if needed or just clear session
    yield put(logoutSuccess())
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success("Logged out successfully")
  } catch (err: any) {
    yield put(logoutFailure(err.message))
    toast.error("Logout failed")
  }
}

export default function* authSaga() {
  yield takeLatest(signUpRequest.type, handleSignUp)
  yield takeLatest(loginRequest.type, handleLogin)
  yield takeLatest(logoutRequest.type, handleLogout)
}
