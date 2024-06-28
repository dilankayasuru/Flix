const express = require('express');
const Cart = require('../Database/Models/Cart');
const {authenticate} = require("../Middleware/auth");
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {

        const cart = await Cart.findOne({userId: req.user._id})
            .populate('userId')
            .populate({
                path: 'products.productId',
                model: 'Product'
            })
            .populate({
                path: 'products.variantId',
                model: 'Variant'
            });

        if (!cart) {
            return res.status(400).json({
                status: 'failed',
                message: 'user doesnt have a cart'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Cart retrieved successfully.',
            cart: cart
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;