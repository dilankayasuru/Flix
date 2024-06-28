const express = require('express');
const Variant = require('../Database/Models/Variant');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {

        const variant = await Variant.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Variant retrieved successfully.',
            variant: variant
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