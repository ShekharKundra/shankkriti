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
    Address: {
        type: Array,
        optional: true,
        address: {
            HouseNo: {
                type: String,
                default: " "
            },
            City: {
                type: String,
                default: " "
            },
            State: {
                type: String,
                default: " "
            },
            PostalCode: {
                type: Number,
                default: " "
            },
            Country: {
                type: String,
                default: " "
            },
            Address_UUID: {
                type: String
            }
        }
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
    },
    EmailErr: {
        type: Boolean,
        default: false,
    },
    EmailErrMsg: {
        type: String,
    },
    Date_Of_Joining: {
        type: Date,
        default: Date.now(),
    },
    expiry_date: {
        type: Date,
        default: () => Date.now() + 1000 * 60 * 60,
    },
});

module.exports = userdet = mongoose.model("userdet", userdetials);