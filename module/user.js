var mongoose = require('mongoose');
var uuid = require('uuid');

var userdetials = mongoose.Schema({
    Fname: {
        type: String,
    },
    Lname: {
        type: String,
    },
    Username: {
        type: String,
    },
    Emailid: {
        type: String,
    },
    PhoneNo: {
        type: Number,
    },
    Emailveridied: {
        type: Boolean,
        default: false,
    },
    Status: {
        type: Boolean,
        default: false,
    },
    Password: {
        type: String,
    },
    UUID: {
        type: String,
        default: uuid.v4(),
    },
    Date: {
        type: Date,
        default: Date.now(),
    },
    expiry_date: {
        type: Date,
        default: () => Date.now() + 1000 * 60 * 60,
    },
});

module.exports = userdet = mongoose.model("userdet", userdetials);