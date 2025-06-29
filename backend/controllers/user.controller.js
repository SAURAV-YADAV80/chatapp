const User = require('../models/User.model');

// Send friend request
exports.sendFriendRequest = async (req, res) => {
  const { toUserId } = req.body;
  const fromUserId = req.user.id;

  if (toUserId === fromUserId) return res.status(400).json({ msg: "Can't add yourself" });

  try {
    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).json({ msg: 'User not found' });

    if (toUser.friend_requests.includes(fromUserId)) {
      return res.status(400).json({ msg: 'Already requested' });
    }

    toUser.friend_requests.push(fromUserId);
    await toUser.save();

    res.status(200).json({ msg: 'Request sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  const { fromUserId } = req.body;
  const toUserId = req.user.id;

  try {
    const toUser = await User.findById(toUserId);
    const fromUser = await User.findById(fromUserId);

    if (!toUser || !fromUser) return res.status(404).json({ msg: 'User not found' });

    toUser.friends.push(fromUserId);
    fromUser.friends.push(toUserId);

    toUser.friend_requests = toUser.friend_requests.filter(id => id.toString() !== fromUserId);
    await toUser.save();
    await fromUser.save();

    res.status(200).json({ msg: 'Friend added' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
