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

router.post('/login', (req, res) => {
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

router.get('/profile', tokenverify.Is_token, (req, res) => {
    var token = res.locals.user;
    // console.log(token);
    var userdetails = jwt.verify(token, "Hello", (err, scc) => {
        if (err) {
            console.log(err)
            req.flash("error", 'Some Error Occured');
            return res.status(200).redirect('/');
        } else {
            console.log(scc);
            user.profiledetails(scc, cbData => {
                if (cbData.status == "err") {
                    console.log(cbData.msg);
                    req.flash("error", cbData.msg);
                    return res.status(200).redirect('/');
                } else {
                    res.status(200).render('../views/user/profile', {
                        title: "My Profile",
                        tagdata: "",
                        productsData: "cbData.data",
                        bestSellerData: "cbBestSeller.data",
                        randomData: "",
                        productDescription: "",
                        userdetails: {
                            Fname: cbData.data.Fname,
                            Lname: cbData.data.Lname,
                            Username: cbData.data.Username,
                            Emailid: cbData.data.Emailid,
                            PhoneNo: cbData.data.PhoneNo,
                            Address: cbData.data.Address
                        }
                    });
                }
            })
        }
    })
});

router.get('/edit_Profile', tokenverify.Is_token, (req, res) => {
    var token = res.locals.user;
    // console.log(token);
    var userdetails = jwt.verify(token, "Hello", (err, scc) => {
        if (err) {
            console.log(err)
            req.flash("error", 'Some Error Occured');
            return res.status(200).redirect('/');
        } else {
            console.log(scc);
            user.profiledetails(scc, cbData => {
                if (cbData.status == "err") {
                    console.log(cbData.msg);
                    req.flash("error", cbData.msg);
                    return res.status(200).redirect('/');
                } else {
                    res.status(200).render('../views/user/editprofile', {
                        title: "My Profile",
                        tagdata: "",
                        productsData: "cbData.data",
                        bestSellerData: "cbBestSeller.data",
                        randomData: "",
                        productDescription: "",
                        userdetails: {
                            Fname: cbData.data.Fname,
                            Lname: cbData.data.Lname,
                            Username: cbData.data.Username,
                            Emailid: cbData.data.Emailid,
                            PhoneNo: cbData.data.PhoneNo,
                            Address: cbData.data.Address[0]
                        }
                    });
                }
            })
        }
    })
});

router.post('/edit', (req, res) => {
    user.edit_profile(req.body, cbData => {
        if (cbData.status == "err") {
            req.flash("error", cbData.msg);
            res.status(200).redirect('/user/profile');
        } else {
            res.clearCookie(token);
            var token = jwt.sign({ data: cbData.data }, "Hello");
            res.cookie("token", token);
            req.flash("success", cbData.msg);
            res.status(200).redirect('/user/profile');
        }
    });
});

module.exports = router;