const mongooes = require('mongoose');

const vender = new mongooes.Schema({
    Vname: { type: String },
    Cname: { type: String },
    VCode: { type: String },
    email: { type: String, index: true, unique: true },
    Vphone: { type: String },
    VBname: { type: String },
    VBAcno: { type: String },
    VBIFSC: { type: String },
    VSAdd: { type: array },
    added_date: {
        type: Date,
        default: Date.now
    },
    Satus: {
        type: String,
        "default": "Avilable"
    }
});

module.exports = Vender = mongooes.model('vender', vender);