const express = require('express');
const Order = require('../Database//Models/Order');
const {authenticate} = require("../Middleware/auth");
const router = express.Router();

router.put('/:id', authenticate, async (req, res) => {

    try {
        console.log(req.params.id)
        await Order.findByIdAndUpdate(req.params.id, {status: "canceled"})
            .then(response => {
                console.log(response)
                res.status(200).json({
                    status: "success",
                    message: "Order Canceled",
                    order: response
                })
            })
            .catch(err => {
                console.log(err)
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