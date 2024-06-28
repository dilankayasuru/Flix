const express = require('express');
const User = require('../Database/Models/User');
const {authenticate} = require('../Middleware/auth');

const router = express.Router();

router.put('/', authenticate, async (req, res) => {
    try {

        const updateUser = await User.findByIdAndUpdate(req.user._id, req.body.user);

        res.status(200).json({
            status: 'success',
            data: updateUser
        })

    } catch (error) {
        let errorMessage;

        if (error.name === "Validations") errorMessage = Object.values(error.errors).map(val => val.message).join(', ')
        else errorMessage = error.message

        res.status(500).json({
            status: 'failed',
            message: errorMessage
        })
    }
})

module.exports = router;