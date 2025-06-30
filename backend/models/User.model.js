const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Requests you received from others
  friend_requests_received: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Requests you sent to others
  friend_requests_sent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', UserSchema);
