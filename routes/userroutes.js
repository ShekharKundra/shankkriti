var express = require('express');
var router = express.Router();
var usercontroller = require('../controllers/usercontroller');

var user = new usercontroller();

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

module.exports = router;