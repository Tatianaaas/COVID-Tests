const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

userSchema.pre('save', function(next) {
    if (this.role !== "admin") {
        next()
    } else {
        throw new Error('Not valid')
    }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)