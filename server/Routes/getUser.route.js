const express = require('express');
const User = require('../Database/Models/User');
const {authenticate} = require('../Middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try{
        const user = await User.findById(req.user._id);

        res.status(200).json({
            status: 'success',
            user: user
        })
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;