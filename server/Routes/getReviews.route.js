const express = require('express');
const Review = require('../Database/Models/Review');
const router = express.Router();

router.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        const reviews = await Review.find({productId: productId});

        res.status(200).json({
            status: 'success',
            message: 'Reviews retrieved successfully.',
            reviews: reviews
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