var express = require('express');
var router = express.Router();
var mongooe = require('mongoose');
var Sender = require('../module/ContactUsUser');
var bodyParser = require('body-parser');

class EmailData {
    async SaveContactUsemail(data, cb) {
        let sender = {};
        sender.FName = data.uname;
        sender.Email = data.uemail;
        sender.Phone = data.uphon;
        sender.Msg = data.umsg;

        let senderModel = new Sender(sender);
        await senderModel.save((err, data) => {
            if (err) {
                return cb({ Status: "err", Msg: "Error while Saving Data" });
            } else {
                return cb({ Status: "suc", Msg: "Vender Detail Saved" });
            }
        });
    }
}

module.exports = EmailData