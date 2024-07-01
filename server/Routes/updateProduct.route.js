const express = require('express');
const Product = require('../Database/Models/Product');
const Variant = require('../Database/Models/Variant');
const e = require("express");
const {authenticate, authorize} = require("../Middleware/auth");
const router = express.Router();

router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
    try {

        const updateResponse = await Product.findByIdAndUpdate(req.params.id, {...req.body});

        if (!updateResponse) {
            return res.status(500).json({
                status: 'failed',
                message: 'error saving product'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Product saved successfully.',
            data: updateResponse
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

router.put('/variant/:id', authenticate, authorize("admin"), async (req, res) => {
    try {

        const update = req.body.variant;

        await Variant.findByIdAndUpdate(req.params.id, {...update})
            .then(response => {
                res.status(200).json({
                    status: "success",
                    data: response
                })
            })
            .catch(err => {
                res.status(401).json({
                    status: "failed",
                    message: err.message
                })
            })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

router.post('/new-variant/:productID', authenticate, authorize("admin"), async (req, res) => {
    try {
        const newVariant = new Variant({...req.body, productId: req.params.productID})

        await newVariant.save()
            .then(response => {
                res.status(200).json({
                    status: "success",
                    data: response
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: "failed",
                    message: err.message
                })
            })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

router.delete('/deleted-variant/:id', authenticate, authorize("admin"), async (req, res) => {
    await Variant.deleteOne({_id: req.params.id})
        .then(response => {
            res.status(200).json({
                status: "success",
                data: response
            })
        })
        .catch(err => {
            res.status(401).json({
                status: "failed",
                message: err.message
            })
        })
})

module.exports = router;