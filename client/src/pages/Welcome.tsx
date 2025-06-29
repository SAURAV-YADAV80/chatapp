import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { logoutRequest } from '../redux/slices/authSlice'
import { fetchUsersRequest } from '../redux/slices/usersSlice'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../redux/store'
import UserList from '../components/UserList'

export default function Welcome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    dispatch(fetchUsersRequest())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutRequest())
    localStorage.removeItem('authUser')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Welcome, {user?.name}!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">All Users</h2>
        <UserList />
      </div>
    </div>
  )
}
