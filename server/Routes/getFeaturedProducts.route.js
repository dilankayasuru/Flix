const express = require('express');
const Product = require('../Database/Models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({dateAdded : -1}).limit(10);

        res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully.',
            products: products,
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