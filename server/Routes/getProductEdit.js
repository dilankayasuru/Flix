const express = require('express');
const Product = require('../Database/Models/Product');
const Variant = require('../Database/Models/Variant');
const router = express.Router();

router.get('/:id', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);

        await Variant.find({productId: product._id})
            .then(response => {
                res.status(200).json({
                    status: "success",
                    product: product,
                    variants: response
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: "failed",
                    message: err.message
                })
            })
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

module.exports = router;