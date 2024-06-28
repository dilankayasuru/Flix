const express = require('express');
const Product = require('../Database/Models/Product');
const Variant = require('../Database/Models/Variant');
const {authenticate, authorize} = require("../Middleware/auth");
const router = express.Router();

router.put('/', authenticate, authorize('admin'), async (req, res) => {
    try {
        const {name, category, price, thumbnail, description, _id} = req.body.product;
        const updateProduct = await Product.findByIdAndUpdate(_id, {name, category, price, thumbnail, description})
        const variants = [{
            name: "",
            images: [],
            stock: [{size: 0, qty: 0}],
            productId: ""
        }]
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})