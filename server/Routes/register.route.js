const express = require('express');
const User = require('../Database/Models/User');
const Cart = require('../Database/Models/Cart');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KRY;

const router = express.Router();


router.post('/', async (req, res) => {

    try {

        // Get user data from client side
        const {name, email, password} = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user model
        const user = new User({name, email, password: hashedPassword});

        // Save user in the database
        const savedUser = await user.save();

        await new Cart({userId: savedUser._id}).save()

        const token = await jwt.sign({
            userId: user._id,
            role: user.role,
            name: user.name,
            shipping: {address: user.address, phone: user.phone}
        }, JWT_SECRET_KEY, {expiresIn: '1h'});

        res.status(200).json({
            status: 'success',
            data: savedUser,
            token: token
        })

    } catch (error) {
        let errorMessage;

        if (error.code === 11000) errorMessage = 'Email is already registered.'

        else if (error.name === "Validations") errorMessage = Object.values(error.errors).map(val => val.message).join(', ')

        else errorMessage = error.message

        res.status(500).json({
            status: 'failed',
            message: errorMessage
        })
    }
});

module.exports = router;