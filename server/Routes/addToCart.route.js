const express = require('express');
const Cart = require('../Database/Models/Cart');
const {authenticate} = require("../Middleware/auth");
const router = express.Router();

router.put('/', authenticate, async (req, res) => {
    try {

        const cart = await Cart.findOne({userId: req.user._id});

        if (!cart) {
            return res.status(400).json({
                status: "failed",
                message: "Couldn't not find a cart"
            })
        }

        const {productId, variantId, size, qty} = req.body;

        // Check if the item already exists in the cart
        const existingProductIndex = cart.products.findIndex(product => (
            product.variantId.equals(variantId) && product.size === size
        ))

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].qty = qty;
        } else {
            cart.products.push({productId, variantId, size, qty})
        }

        await cart.save()
            .then(response => {
                res.status(200).json({
                    status: "success",
                    data: response
                })
            })
            .catch(error => {
                res.status(500).json({
                    status: "failed",
                    message: error.message
                })
            })

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;