var jwt = require('jsonwebtoken');

class token {
    Is_token = (req, res, next) => {
        var is_User = res.locals.is_User;
        // console.log(is_User)
        if (is_User == false) {
            req.flash("error", "You are not Logged in!....");
            res.status(200).redirect("/user/reg");
        } else {
            next();
        }
    }
    Is_token_Login = (req, res, next) => {
        var is_User = res.locals.is_User;
        if (is_User == true) {
            req.flash("error", "You are already Logged In!...");
            res.status(200).redirect("/");
        } else {
            next();
        }
    }
}

module.exports = token;