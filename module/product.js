const mongooes = require('mongoose');

const product = new mongooes.Schema({
    Style: {
        type: String
    },
    productName: {
        type: String
    },
    Febric: {
        type: Array,
        "default": []
    },
    Type: {
        type: Array,
        "default": []
    },
    Color: {
        type: Array,
        "default": []
    },
    PP: {
        type: String
    },
    SP: {
        type: String
    },
    Vender: {
        type: String
    },
    Quantity: {
        type: Number
    },
    Description: {
        type: String
    },
    ImagesUrl: {
        type: Array,
        "default": []
    },
    Satus: {
        type: String,
        "default": "Avilable"
    },
    added_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongooes.model('product', product);