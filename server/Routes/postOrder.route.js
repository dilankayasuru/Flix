const express = require("express");
const Order = require('../Database/Models/Order');
const {authenticate, authorize} = require("../Middleware/auth");
const router = express.Router();

router.post('/', authenticate, async (req, res) => {

    try {

        const {total, address, userId, products} = req.body;

        const order = new Order({total, address, userId, products});

        const savedOrder = await order.save();

        res.status(200).json({
            status: 'success',
            message: 'Order added successfully.',
            data: savedOrder
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

});

module.exports = router;