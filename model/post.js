const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, required: true }
});

const Post = mongoose.model('posts', userSchema)
module.exports = Post