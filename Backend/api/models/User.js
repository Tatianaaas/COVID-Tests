const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: Number, required: true, unique: true, min: 100000000, max: 999999999 },
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