const express = require('express');
const Order = require('../Database/Models/Order');
const Variant = require('../Database/Models/Variant');
const Cart = require('../Database/Models/Cart');
const {authenticate} = require("../Middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    try {
        const {products, address, phone, total} = req.body;

        const order = new Order({products, address, phone, total, userId: req.user._id});

        const savedOrder = await order.save();

        const bulkOperations = products.map(product => ({
                updateOne: {
                    filter: {_id: product.variantId, 'stock.size': product.size},
                    update: {$inc: {'stock.$[elem].qty': -product.qty}},
                    arrayFilters: [{'elem.size': product.size}]
                }
            })
        );

        await Variant.bulkWrite(bulkOperations);

        if (products.length > 1) {
            await Cart.findOneAndUpdate(
                {userId: req.user._id},
                {products: []}
            )
        }

        res.status(200).json({
            status: 'success',
            message: 'Order placed successfully',
            orderId: savedOrder._id,
        })

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
});

module.exports = router;