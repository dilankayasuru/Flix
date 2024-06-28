const express = require('express');
const Product = require('../Database/Models/Product');
const router = express.Router();

router.get('/:category', async (req, res) => {
    try {

        const category = req.params.category;

        const products = await Product.find({category: category});

        const count = await Product.countDocuments({category: category});

        res.status(200).json({
            status: 'success',
            message: 'Products retrieved successfully.',
            products: products,
            productsCount: count
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