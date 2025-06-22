import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3333/api'

export const signUpAPI = async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post(`${API_BASE}/auth/signup`, data)
  return res.data
}

export const loginAPI = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_BASE}/auth/login`, data)
  return res.data
}
