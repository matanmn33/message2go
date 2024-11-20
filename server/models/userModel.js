const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, lowercase: true, unique: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name:{type: String, required: true},
    created_at: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema);