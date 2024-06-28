const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    }

});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    phone: {
        type: Number,
    },
    address: {
        type: addressSchema,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;