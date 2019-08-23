const mongoose = require('mongoose');

const Billschema = mongoose.Schema({
    billName: {type: String, required: true},
    cost: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    dateDue: {type: String, required: true},
    partyId: {type: String, required: true},
    userId: {type: String, required: true},
  description: {type: String, required: true},
  numOfPayers: {type: String, required: true},
  imagePath: {type: String, required: false},
  billUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'billUser', required: true }]
});

module.exports = mongoose.model('mainBill', Billschema);
