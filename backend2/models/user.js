const mongoose = require('mongoose');
const  uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);  // will give us an error if we attempt to add a user that already exists.

module.exports = mongoose.model("user", userSchema);
