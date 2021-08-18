const express = require('express');
const http = require('http');
var flash = require("connect-flash");
var cookieParser = require('cookie-parser');
var session = require('express-session');

var connectDB = require('./config/connection');

//Config start 
var favicon = require("./config/favicon.js");

//some variable
var port = 3000;
var app = express();

//conected to flash message
app.use(flash());
app.use(cookieParser("this is cokkie for shankkriti"));
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'My web site',
    resave: false,
    saveUninitialized: false
}));

//using public folder with the name of /assets
app.use("/assets", express.static(__dirname + "/public"));
app.use("/emailpath", express.static(__dirname + "/view/emailtemplates/"));

//favicon implimentation
favicon(app);

//view engine
app.set('view engine', 'ejs');

//for http data
app.use(express.json());



//some session variables i have created for me
app.use(function(req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


//routes
app.use('/email', require('./routes/emailroutes'));
app.use('/products', require('./routes/productroutes'));
app.use('/', require('./routes/mainpageroutes'));

http.createServer(app).listen(port, function() {
    console.log("Don't wory Shekhar is here", port);
});
