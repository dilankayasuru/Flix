const express = require('express');
const Order = require('../Database/Models/Order');
const {authenticate} = require("../Middleware/auth");
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {

        const userId = req.user._id;

        const orders = await Order.find({userId: userId});

        res.status(200).json({
            status: 'success',
            message: 'Orders of user retrieved successfully.',
            orders: orders
        });

    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;