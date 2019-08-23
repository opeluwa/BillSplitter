const mongoose = require('mongoose');

const billUser = mongoose.Schema({
  partyId: {type: String, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  billId: { type: mongoose.Schema.Types.ObjectId, ref: 'mainBill', required: true },
  paid: {type: Boolean, required: true},
  email: {type: String, required: true}
});

module.exports = mongoose.model('billUser', billUser);
