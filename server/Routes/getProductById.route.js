const express = require('express');
const Product = require('../Database/Models/Product');
const Variant = require('../Database/Models/Variant');
const Reviews = require('../Database/Models/Review');
const router = express.Router();

router.get('/:id', async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        const variants = await Variant.find({productId: req.params.id});

        const reviews = await Reviews.find({productId: req.params.id});

        res.status(200).json({
            status: 'success',
            message: 'Product and Variants retrieved successfully.',
            product: product,
            variants: variants,
            reviews: reviews
        });


    } catch (error) {

        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;