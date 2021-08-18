var nodemailer = require('nodemailer');
var config = require('./config.json');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.emailid1,
        pass: config.emailpass1
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

module.exports = transporter;