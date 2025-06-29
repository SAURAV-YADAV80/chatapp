// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const auth = require('../middleware/auth');

// Get all users (except self)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select('name email _id friends friend_requests');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Send a friend request
router.post('/send-request/:id', auth, async (req, res) => {
  const toUserId = req.params.id;
  const fromUserId = req.user.id;

  if (toUserId === fromUserId) {
    return res.status(400).json({ msg: "You can't send request to yourself." });
  }

  try {
    const toUser = await User.findById(toUserId);
    if (!toUser) return res.status(404).json({ msg: 'User not found' });

    if (toUser.friend_requests.includes(fromUserId)) {
      return res.status(400).json({ msg: 'Friend request already sent' });
    }

    toUser.friend_requests.push(fromUserId);
    await toUser.save();

    res.json({ msg: 'Friend request sent successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// Accept a friend request
router.post('/accept-request/:id', auth, async (req, res) => {
  const { fromUserId } = req.params.id;
  const toUserId = req.user.id;

  try {
    const toUser = await User.findById(toUserId);
    const fromUser = await User.findById(fromUserId);

    if (!toUser || !fromUser) return res.status(404).json({ msg: 'User not found' });

    // Add each other to friends
    if (!toUser.friends.includes(fromUserId)) toUser.friends.push(fromUserId);
    if (!fromUser.friends.includes(toUserId)) fromUser.friends.push(toUserId);

    // Remove the friend request
    toUser.friend_requests = toUser.friend_requests.filter(id => id.toString() !== fromUserId);
    
    await toUser.save();
    await fromUser.save();

    res.json({ msg: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Optional: Get incoming friend requests
router.get('/friend-requests', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friend_requests', 'name email _id');
    res.json(user.friend_requests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
