const express = require('express');
const Order = require('../Database/Models/Order');
const {authenticate, authorize} = require("../Middleware/auth");
const router = express.Router();

router.get('/', authenticate, authorize('admin'), async (req, res) => {
    try {

        const orders = await Order.find({});

        res.status(200).json({
            status: 'success',
            message: 'Orders retrieved successfully.',
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