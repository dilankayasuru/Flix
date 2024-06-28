const express = require('express');
const Product = require('../Database/Models/Product');
const Variant = require('../Database/Models/Variant');
const router = express.Router();

router.get('/:id/:variant?', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);

        const variantId = req.params.variant;

        if (variantId == null) {
            return res.status(200).json({
                status: 'success',
                message: 'Product retrieved successfully.',
                product: product,
            });
        }

        const variantImg = await Variant.findById(variantId);

        res.status(200).json({
            status: 'success',
            message: 'Product retrieved successfully.',
            product: product,
            variantImg: variantImg.images[0]
        });


    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        })
    }
});

module.exports = router;