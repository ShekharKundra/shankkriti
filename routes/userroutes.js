var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var uuid = require('uuid');
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

router.get('/reg', tokenverify.Is_token_Login, (req, res) => {
    res.status(200).render('../views/user/register', {
        title: "Login / Register",
        tagdata: "",
        productsData: "cbData.data",
        bestSellerData: "cbBestSeller.data",
        randomData: "",
        productDescription: ""
    });
});

router.post('/register', tokenverify.Is_token_Login, (req, res) => {
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

router.post('/activate/:id', tokenverify.Is_token_Login, (req, res) => {
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

router.get('/login', tokenverify.Is_token_Login, (req, res) => {
    res.status(200).redirect('/reg');
});

router.post('/login', tokenverify.Is_token_Login, (req, res) => {
    user.Login_User(req.body, (cbData) => {
        if (cbData.status == "err") {
            req.flash("error", cbData.msg);
            return res.status(200).redirect("/user/reg");
        }
        else {
            req.flash("success", cbData.msg);
            var token = jwt.sign({ data: cbData.userdata.UUID }, "Hello");   // creating token // 
            res.cookie("token", token); // create cookie //
            return res.status(200).redirect("/index");
        }
    })
})

router.get('/profile', tokenverify.Is_token, (req, res) => {
    var token = res.locals.user;
    // var is_User = res.locals.is_User;
    var userdetails = jwt.verify(token, "Hello", (err, scc) => {
        if (err) {
            console.log(err)
            req.flash("error", 'Some Error Occured');
            return res.status(200).redirect('/');
        } else {
            user.profiledetails(scc, cbData => {
                if (cbData.status == "err") {
                    console.log(cbData.msg);
                    req.flash("error", cbData.msg);
                    return res.status(200).redirect('/');
                } else {
                    // console.log(cbData.data);
                    res.status(200).render('../views/user/profile', {
                        title: "My Profile",
                        tagdata: "",
                        productsData: "cbData.data",
                        bestSellerData: "cbBestSeller.data",
                        randomData: "",
                        productDescription: "",
                        // is_User: is_User,
                        userdetails: {
                            Fname: cbData.data.Fname,
                            Lname: cbData.data.Lname,
                            Username: cbData.data.Username,
                            Emailid: cbData.data.Emailid,
                            PhoneNo: cbData.data.PhoneNo,
                            Address: cbData.data.Address,
                            UUID: cbData.data.UUID
                        }
                    });
                }
            })
        }
    })
});

router.get('/edit_Profile/:id', tokenverify.Is_token, (req, res) => {
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
                    console.log(cbData.data);
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

router.post('/edit', tokenverify.Is_token, (req, res) => {
    user.edit_profile(req.body, cbData => {
        if (cbData.status == "err") {
            req.flash("error", cbData.msg);
            res.status(200).redirect('/user/profile');
        } else {
            res.clearCookie("token");
            var token = jwt.sign({ data: cbData.data.UUID }, "Hello");
            res.cookie("token", token);
            req.flash("success", cbData.msg);
            res.status(200).redirect('/user/profile');
        }
    });
});

router.get('/logout', tokenverify.Is_token, (req, res) => {
    res.clearCookie('token');
    res.status(200).redirect('/');
});

router.get('/new_profile', (req, res) => {
    res.status(200).render('../views/user/newprofile.ejs', {
        title: "My Profile",
        tagdata: "",
        productsData: "cbData.data",
        bestSellerData: "cbBestSeller.data",
        randomData: "",
        productDescription: "",
    });
});

module.exports = router;