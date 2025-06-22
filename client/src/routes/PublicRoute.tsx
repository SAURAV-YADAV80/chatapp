// src/routes/PublicRoute.tsx
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function PublicRoute({ children }: { children: React.ReactElement }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user)

  return isAuthenticated ? <Navigate to="/welcome" replace /> : children
}
