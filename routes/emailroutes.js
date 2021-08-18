const express = require('express');
const router = express.Router();
var SendEmail = require("../controllers/emailsendcontroller");
var EmailData = require("../controllers/emaildatacontroller");
var sendemail = new SendEmail();
var emaildata = new EmailData();
let finalreturnvalue = {};

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//Send Email and save to database
router.post('/send', async(req, res) => {

    await sendemail.SendOnContactUSform(req.body.uname, req.body.uemail, async function(returnvalue) {
        await emaildata.SaveContactUsemail(req.body, function(data) {});
        finalreturnvalue = returnvalue;
        //console.log(finalreturnvalue);
    });

    setTimeout(() => {
        if (finalreturnvalue.Status == "err") {

            req.flash("error", finalreturnvalue.Msg);
            res.status(200).redirect('/contact')
        } else {
            req.flash("success", finalreturnvalue.Msg);
            req.session.save(function() { res.status(200).redirect('/contact') });
        }
    }, 3000); {

    }
});


module.exports = router;