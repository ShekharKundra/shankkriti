var jwt = require('jsonwebtoken');

class token {
    Is_token = (req, res, next) => {
        var is_User = res.locals.is_User;
        if (is_User == true) {
            req.flash("error", "You are Already Logged In!...");
            res.status(200).redirect("/user/reg");
        } else {
            next();
        }
    }
}

module.exports = token;