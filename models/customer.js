const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productPurchased: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer', customerSchema)