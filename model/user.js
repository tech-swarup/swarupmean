const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

const User = mongoose.model('postusers', userSchema)
module.exports = User