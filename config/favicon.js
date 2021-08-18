//for implementing favicon to site

var favicon = require('serve-favicon');
module.exports = function(app) {
    app.use(favicon('./public/images/favicon/favicon.png'));
}