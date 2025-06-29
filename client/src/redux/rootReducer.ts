import { combineReducers } from 'redux'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
})

export default rootReducer
