var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var token = require('../token/tokenverification');
var usercontroller = require('../controllers/usercontroller');

var user = new usercontroller();
var tokenverify = new token();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/cart', (req, res) => {
    res.status(200).render('../views/user/cart', {
        title: "Your Cart",
    });
});

router.get('/checkout', (req, res) => {
    res.status(200).render('../views/user/checkout', {
        title: "Checkout",
    });
});

router.get('/reg', (req, res) => {
    res.status(200).render('../views/user/register', {
        title: "Sarees",
        tagdata: "",
        productsData: "cbData.data",
        bestSellerData: "cbBestSeller.data",
        randomData: "",
        productDescription: ""
    });
});

router.post('/register', (req, res) => {
    console.log(req.body);
    user.User_Registration(req.body, cbData => {
        if (cbData.status == "err") {
            req.flash("error", cbData.msg);
            return res.status(200).redirect('/user/reg');
        }
        else {
            // alert(1);
            console.log(cbData.msg);
            req.flash("success", cbData.msg);
            return res.status(200).redirect('/user/reg');
        }
    });
});

router.post('/activate/:id', (req, res) => {
    user.Email_Verify(req.params.id, cbData => {
        if (cbData.status == "err") {
            req.flash("error", cbData.msg);
            return res.status(200).redirect("/user/reg");
        }
        else {
            req.flash("success", cbData.msg);
            return res.status(200).redirect('/user/reg');
        }
    })
});

router.get('/login', (req, res) => {
    res.status(200).render('../views/user/register', {
        title: "Login"
    });
});

router.post('/login', tokenverify.Is_token, (req, res) => {
    user.Login_User(req.body, (cbData) => {
        if (cbData.status == "err") {
            req.flash("error", cbData.msg);
            return res.status(200).redirect("/user/reg");
        }
        else {
            req.flash("success", cbData.msg);
            var token = jwt.sign({ data: cbData.userdata }, "Hello");
            res.cookie("token", token);
            return res.status(200).redirect("/index");
        }
    })
})

router.get('/profile', (req, res) => {
    res.status(200).render('../views/user/profile', {
        title: "My Profile",
        tagdata: "",
        productsData: "cbData.data",
        bestSellerData: "cbBestSeller.data",
        randomData: "",
        productDescription: ""
    });
});

module.exports = router;