const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Database/Models/User');
const {authenticate} = require("../Middleware/auth");

require('dotenv').config();

const router = express.Router();

router.put('/', authenticate, async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body;

        const user = await User.findById(req.user._id);

        const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid password'
            })
        }

        if (newPassword.length < 8 || newPassword.length > 128) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please choose a password that contains minimum 8 characters'
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatePassword = await User.findByIdAndUpdate(req.user._id, {password: hashedPassword});

        res.status(200).json({
            status: 'success',
            message: 'update success.',
            data: updatePassword
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }

});

module.exports = router;
