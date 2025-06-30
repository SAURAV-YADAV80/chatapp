import API from './apiService'

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const getAllUsersAPI = async () => {
  const res = await API.get(`/users`, authHeader())
  return res.data
}

export const sendFriendRequestAPI = async (id: string) => {
  const res = await API.post(`/users/send-request/${id}`, {}, authHeader())
  return res.data
}

export const acceptFriendRequestAPI = async (id: string) => {
  const res = await API.post(`/users/accept-request/${id}`, {}, authHeader())
  return res.data
}

export const cancelFriendRequestAPI = async (id: string) => {
  const res = await API.delete(`/users/cancel-request/${id}`, authHeader())
  return res.data
}

export const cancelSentFriendRequestAPI = async (id: string) => {
  const res = await API.delete(`/users/cancel-sent-request/${id}`, authHeader())
  return res.data
}

export const removeFriendAPI = async (id: string) => {
  const res = await API.delete(`/users/remove-friend/${id}`, authHeader())
  return res.data
}

export const fetchCurrentUserAPI = async () => {
  const res = await API.get('/users/me', authHeader())
  return res.data
}
