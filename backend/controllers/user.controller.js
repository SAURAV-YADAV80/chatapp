const User = require('../models/User.model');

// Get all users (except self)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } })
      .select('name email _id friends friend_requests');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  const fromUserId = req.user.id;
  const toUserId = req.params.id;

  if (fromUserId === toUserId)
    return res.status(400).json({ msg: "You can't send request to yourself." });

  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) return res.status(404).json({ msg: 'User not found' });

    if (
      toUser.friend_requests_received.includes(fromUserId) ||
      fromUser.friend_requests_sent.includes(toUserId)
    ) {
      return res.status(400).json({ msg: 'Friend request already sent' });
    }

    if (fromUser.friends.includes(toUserId)) {
      return res.status(400).json({ msg: 'Already friends' });
    }

    fromUser.friend_requests_sent.push(toUserId);
    toUser.friend_requests_received.push(fromUserId);

    await fromUser.save();
    await toUser.save();

    res.json({ msg: 'Friend request sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  const toUserId = req.user.id;
  const fromUserId = req.params.id;

  try {
    const toUser = await User.findById(toUserId);
    const fromUser = await User.findById(fromUserId);

    if (!toUser || !fromUser) return res.status(404).json({ msg: 'User not found' });

    if (!toUser.friend_requests_received.includes(fromUserId)) {
      return res.status(400).json({ msg: 'No friend request from this user' });
    }

    toUser.friends.push(fromUserId);
    fromUser.friends.push(toUserId);

    toUser.friend_requests_received = toUser.friend_requests_received.filter(
      id => id.toString() !== fromUserId
    );
    fromUser.friend_requests_sent = fromUser.friend_requests_sent.filter(
      id => id.toString() !== toUserId
    );

    await toUser.save();
    await fromUser.save();

    res.json({ msg: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Cancel a Received Friend Request
exports.cancelReceivedRequest = async (req, res) => {
  const userId = req.user.id;
  const fromUserId = req.params.id;

  try {
    const user = await User.findById(userId);
    const fromUser = await User.findById(fromUserId);

    if (!user || !fromUser) return res.status(404).json({ msg: 'User not found' });

    user.friend_requests_received = user.friend_requests_received.filter(
      id => id.toString() !== fromUserId
    );
    fromUser.friend_requests_sent = fromUser.friend_requests_sent.filter(
      id => id.toString() !== userId
    );

    await user.save();
    await fromUser.save();

    res.json({ msg: 'Friend request canceled' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Cancel a Sent Friend Request
exports.cancelSentRequest = async (req, res) => {
  const userId = req.user.id;
  const toUserId = req.params.id;

  try {
    const user = await User.findById(userId);
    const toUser = await User.findById(toUserId);

    if (!user || !toUser) return res.status(404).json({ msg: 'User not found' });

    user.friend_requests_sent = user.friend_requests_sent.filter(
      id => id.toString() !== toUserId
    );
    toUser.friend_requests_received = toUser.friend_requests_received.filter(
      id => id.toString() !== userId
    );

    await user.save();
    await toUser.save();

    res.json({ msg: 'Sent friend request canceled' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Remove Friend (Mutual)
exports.removeFriend = async (req, res) => {
  const userId = req.user.id;
  const friendId = req.params.id;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ msg: 'User not found' });

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.json({ msg: 'Friend removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get Friend Requests (received & sent)
exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('friend_requests_received', 'name email _id')
      .populate('friend_requests_sent', 'name email _id');

    res.json({
      received: user.friend_requests_received,
      sent: user.friend_requests_sent,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
