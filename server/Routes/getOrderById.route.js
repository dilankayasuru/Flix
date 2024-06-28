const express = require('express');
const Order = require('../Database/Models/Order');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findById(id);

        res.status(200).json({
            status: 'success',
            message: 'Reviews retrieved successfully.',
            order: order
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