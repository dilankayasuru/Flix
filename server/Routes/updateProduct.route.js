const express = require('express');
const Product = require('../Database/Models/Product');
const Variant = require('../Database/Models/Variant');
const e = require("express");
const {authenticate, authorize} = require("../Middleware/auth");
const router = express.Router();

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {

        const {name, category, price, description} = req.body.product;

        const variants = req.body.variants;

        const updateResponse = await Product.findByIdAndUpdate(req.params.id,{name, category, price, description});

        if (!updateResponse) {
            return res.status(500).json({
                status: 'failed',
                message: 'error saving product'
            })
        }

        let variantUpdate;

        variants.map(async data => {
            const {updateVariant} = data.variantData;
            variantUpdate = await Variant.findByIdAndUpdate(data.id, updateVariant);

        });

        res.status(200).json({
            status: 'success',
            message: 'Product saved successfully.',
            data: {product: updateResponse, variants: variantUpdate}
        });

    } catch (error) {
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