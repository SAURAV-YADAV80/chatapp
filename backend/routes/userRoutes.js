const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user.controller');
const User = require('../models/User.model');
const authMiddleware = require('../middleware/auth');

// Friend Request Routes
router.get('/', auth, userController.getAllUsers);
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json(user)
})
router.post('/send-request/:id', auth, userController.sendFriendRequest);
router.post('/accept-request/:id', auth, userController.acceptFriendRequest);
router.delete('/cancel-request/:id', auth, userController.cancelReceivedRequest);
router.delete('/cancel-sent-request/:id', auth, userController.cancelSentRequest);
router.delete('/remove-friend/:id', auth, userController.removeFriend);
router.get('/friend-requests', auth, userController.getFriendRequests);

module.exports = router;
