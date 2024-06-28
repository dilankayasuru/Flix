const express = require('express');
const Order = require('../Database/Models/Order');
const {authenticate, authorize} = require("../Middleware/auth");
const router = express.Router();

router.put('/', authenticate, authorize('admin'), async (req, res) => {
    try {

        const {status, orderId} = req.body;

        const currentOrder = await Order.findById(orderId);

        if (currentOrder.status === "completed") {
            return res.status(400).json({
                status: "failed",
                message: "Can't change completed orders"
            })
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {status: status});

        res.status(200).json({
            status: 'success',
            message: 'Order updated successfully.',
            order: updatedOrder
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;