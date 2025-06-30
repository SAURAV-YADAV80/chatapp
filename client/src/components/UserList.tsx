import { useDispatch, useSelector } from 'react-redux'
import {
  sendFriendRequestRequest,
  acceptFriendRequestRequest,
  cancelFriendRequestRequest,
  cancelSentFriendRequestRequest,
  removeFriendRequest,
} from '../redux/slices/usersSlice'
import type { RootState } from '../redux/store'
import { useEffect } from 'react'
import { fetchCurrentUserRequest } from '../redux/slices/authSlice'

export default function UserList() {
  const dispatch = useDispatch()
  const { list: users } = useSelector((state: RootState) => state.users)
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const isFriend = (u: any) => currentUser?.friends?.includes(u._id)
  const hasSentRequest = (u: any) => currentUser?.friend_requests_sent?.includes(u._id)
  const hasReceivedRequest = (u: any) => currentUser?.friend_requests_received?.includes(u._id)

  const handleSend = (id: string) => dispatch(sendFriendRequestRequest(id))
  const handleAccept = (id: string) => dispatch(acceptFriendRequestRequest(id))
  const handleCancelReceived = (id: string) => dispatch(cancelFriendRequestRequest(id))
  const handleCancelSent = (id: string) => dispatch(cancelSentFriendRequestRequest(id))
  const handleRemoveFriend = (id: string) => dispatch(removeFriendRequest(id))

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchCurrentUserRequest())
    }
  }, [])

  return (
    <ul className="space-y-2">
      {users
        .filter((u: any) => u._id !== currentUser?._id)
        .map((u: any) => (
          <li key={u._id} className="flex justify-between items-center border-b pb-2">
            <div>
              {u.name} ({u.email})
            </div>

            {isFriend(u) ? (
              <button
                onClick={() => handleRemoveFriend(u._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove Friend
              </button>
            ) : hasReceivedRequest(u) ? (
              <div className="space-x-2">
                <button
                  onClick={() => handleAccept(u._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleCancelReceived(u._id)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : hasSentRequest(u) ? (
              <button
                onClick={() => handleCancelSent(u._id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Cancel Sent
              </button>
            ) : (
              <button
                onClick={() => handleSend(u._id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Send Request
              </button>
            )}
          </li>
        ))}
    </ul>
  )
}
