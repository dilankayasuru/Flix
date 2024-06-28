const express = require('express');
const Product = require('../Database/Models/Product');
const Variant = require('../Database/Models/Variant');
const {authenticate, authorize} = require("../Middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

router.post('/', authenticate, authorize('admin'), async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const {name, category, price, description, variants, thumbnail} = req.body;

        const product = new Product({name, category, price, description, thumbnail});

        const savedProduct = await product.save({session});

        await Variant.insertMany(variants.map(variant => ({...variant, productId: product._id})));

        if (!savedProduct) {
            return res.status(500).json({
                status: 'failed',
                message: 'error saving product'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Product saved successfully.',
            data: {savedProduct, variants}
        });

        await session.commitTransaction()
        await session.endSession();

    } catch (error) {
        let errorMessage;

        if (error.name === "Validations") errorMessage = Object.values(error.errors).map(val => val.message).join(', ')
        else errorMessage = error.message

        await session.abortTransaction();
        await session.endSession();

        res.status(500).json({
            status: 'failed',
            message: errorMessage
        })
    }
});

module.exports = router;