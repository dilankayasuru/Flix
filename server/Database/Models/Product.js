const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['men', 'women', 'kids'],
        required: true
    },
    price: {
        type: Number,
        min: 0.5,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;