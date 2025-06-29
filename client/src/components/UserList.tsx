import { useDispatch, useSelector } from 'react-redux'
import {
  sendFriendRequestRequest,
  acceptFriendRequestRequest,
  fetchUsersRequest,
} from '../redux/slices/usersSlice'
import type { RootState } from '../redux/store'

export default function UserList() {
  const dispatch = useDispatch()
  const { list: users } = useSelector((state: RootState) => state.users)
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const isFriend = (u: any) => currentUser?.friends?.includes(u._id)
  const isRequested = (u: any) => currentUser?.friend_requests?.includes(u._id)

  const handleSend = (id: string) => {
    dispatch(sendFriendRequestRequest(id))
  }

  const handleAccept = (id: string) => {
    dispatch(acceptFriendRequestRequest(id))
  }

  return (
    <ul className="space-y-2">
      {users.map((u: any) => (
        <li key={u._id} className="flex justify-between items-center border-b pb-2">
          <div>
            {u.name} ({u.email})
          </div>
          {isFriend(u) ? (
            <span className="text-green-600">Friends</span>
          ) : isRequested(u) ? (
            <button
              onClick={() => handleAccept(u._id)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Accept
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
