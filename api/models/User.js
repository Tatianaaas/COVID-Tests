const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: Number,
    role: String,
    updated_at: { type: Date, default: Date.now },
})

userSchema.pre('save', function(next) {
    if (this.role !== "admin") {
        next()
    } else {
        throw new Error('Not valid')
    }
})

module.exports = mongoose.model('User', userSchema)