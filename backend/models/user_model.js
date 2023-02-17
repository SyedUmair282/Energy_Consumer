const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,                 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);