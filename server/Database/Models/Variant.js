const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: [{
        type: String
    }],
    stock: [{
        size: {
            type: Number,
            required: true,
            min: 3,
            max: 17
        },
        qty: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;