// services/userService.ts
import API from './apiService'

export const getAllUsersAPI = async () => {
  const token = localStorage.getItem('token')
  const res = await API.get(`/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const sendFriendRequestAPI = async (id: string) => {
  const token = localStorage.getItem('token')
  const res = await API.post(`/users/send-request/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

export const acceptFriendRequestAPI = async (id: string) => {
  const token = localStorage.getItem('token')
  const res = await API.post(`/users/accept-request/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

