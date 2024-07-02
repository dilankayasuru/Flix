const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Database/Models/User');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid email or password'
            })
        }

        const token = await jwt.sign({userId: user._id, role: user.role, name: user.name, shipping: {address: user.address, phone: user.phone}}, JWT_SECRET_KEY, {expiresIn: '1h'});

        res.status(200).json({
            status: 'success',
            message: 'login success.',
            token: token,
            username: user.name
        })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }

});

module.exports = router;
