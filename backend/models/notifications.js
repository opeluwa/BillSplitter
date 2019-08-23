const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  BillId: { type: mongoose.Schema.Types.ObjectId, ref: 'mainBill'},
  PartyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Party'},
  show: { type: Boolean, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('notificationSchema', notificationSchema);
