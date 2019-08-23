const mongoose = require('mongoose');

const partySchema = mongoose.Schema({
  groupName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  userEmail: { type: [String], required: true }
});

module.exports = mongoose.model('Party', partySchema);
