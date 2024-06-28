const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variant',
            required: true
        },
        size: {
            type: Number,
            required: true,
            minLength: 4,
            maxLength: 17
        },
        qty: {
            type: Number,
            required: true,
            minLength: 1
        }
    }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;