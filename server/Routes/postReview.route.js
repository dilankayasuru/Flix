const express = require('express');
const Review = require('../Database/Models/Review');
const {authenticate} = require("../Middleware/auth");
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    try {
        const {review, rating, productId} = req.body;

        const reviewDoc = new Review({name: req.user.name, userId: req.user._id, review, rating, productId});

        const savedReview = await reviewDoc.save();

        res.status(200).json({
            status: 'success',
            message: 'Review posted successfully.',
            data: savedReview
        });

    }
    catch (error) {
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