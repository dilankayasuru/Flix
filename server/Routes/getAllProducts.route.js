const express = require('express');
const Product = require('../Database/Models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});

        if (!products) {
            return res.status(500).json({
                status: 'failed',
                message: 'failed to load products'
            })
        }

        const count = await Product.countDocuments();

        res.status(200).json({
            status: 'success',
            products: products,
            productsCount: count
        })
    }
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: `failed to load products: ${error.message}`,
        })
    }
});

module.exports = router;