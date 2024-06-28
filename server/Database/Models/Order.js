const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    }

});

const orderSchema = new mongoose.Schema({

    date: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'canceled'],
        default: 'active'
    },
    total: {
        type: Number,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        qty: {
            type: Number,
            min: 1,
            default: 1,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variants',
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }]

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;