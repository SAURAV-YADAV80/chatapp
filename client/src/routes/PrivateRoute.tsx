// src/routes/PrivateRoute.tsx
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import React from 'react';

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user)

  return isAuthenticated ? children : <Navigate to="/login" replace />
}
