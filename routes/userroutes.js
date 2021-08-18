var router = require('express').Router();

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
        title: "Registration",
    });
});

router.get('/login', (req, res) => {
    res.status(200).render('../views/user/register', {
        title: "Login"
    });
});

module.exports = router;