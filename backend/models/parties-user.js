const mongoose = require('mongoose');

const partyUserSchema = mongoose.Schema({
  partyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Party', required: true },
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  accepted: { type: Boolean, required: true },
  groupName: { type: String, required: true },
});

module.exports = mongoose.model('partyUser', partyUserSchema);
