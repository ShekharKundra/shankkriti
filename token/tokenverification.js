var jwt = require('jsonwebtoken');

class token {
    Is_token = (req, res, next) => {
        var is_User = res.locals.is_User;
        console.log(is_User)
        if (is_User == false) {
            req.flash("error", "You r not registered");
            res.status(200).redirect("/user/reg");
        } else {
            next();
        }
    }
}

module.exports = token;