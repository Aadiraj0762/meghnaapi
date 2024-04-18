const mongoose = require('mongoose');

// Define the schema for cart items
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

// Create a model for Cart items
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem; // Optionally export the model if required in other files
