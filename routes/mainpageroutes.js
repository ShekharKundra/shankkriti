var express = require('express');
var router = express.Router();
var ProductData = require('../controllers/productsdatacontroller');
var token = require('../token/tokenverification');

var products = new ProductData();
var tokenverify = new token();

// for body parser and json data
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    var tag = {
        description: "ShanKKriti Welcome You, Shop Indian Ethnic Wear For Women Online, Explore the top line collection by ShanKKriti including designer Silk Sarees, Suits",
        Keywords: "ShanKKriti , Buy Sarees , Salwar Kameez , suits at online , online apparel store , online fashion store , online clothing stores , womens clothing stores , online shopping for women , womens clothing online , fashion clothing , buy fashion clothing online , womens clothing , apparel for women , women's apparel , dresses for women , plus size dresses , Buy Indian Clothes , Indian Dresses , Indian Clothes , Indian Clothing , Indian Clothes Online , Indian Dresses Online , Buy Indian Clothes Online , Buy Indian Dresses , ShanKKriti.com",
        ogurl: "http://shankkriti.com",
        ogtitle: "ShanKKriti , Buy Sarees Salwar Kameez Suits",
        ogdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars,  Anarkali Suit,  Designer Sarees, Designer Suits online in India",
        ogimage: "/assets/images/favicon/favicon.png",
        ogsecure_url: "/assets/images/favicon/favicon.png",
        twtitle: "ShanKKriti, Buy Sarees Salwar Kameez Suits ",
        twdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars, , Anarkali Suit, Jewellery, Designer Sarees, Designer Suits online in India,",
    }
    products.showTopTen('saree', (cbSareeData) => {
        // console.log(cbSareeData.data)
        if (cbSareeData.status == "err") {
            res.status(200).redirect("/error404");
        } else {
            products.showTopTen('Unstitched_Suit', (cbSuitData) => {
                if (cbSuitData.status == "err") {
                    res.status(200).redirect("/error404");
                } else {
                    //  console.log(cbSuitData.data)
                    res.status(200).render('../views/main/index', {
                        title: "ShanKKriti",
                        tagdata: tag,
                        sareeData: cbSareeData.data,
                        suitData: cbSuitData.data,
                    });
                }
            });

        }
    });
});

router.get('/index', (req, res) => {
    res.status(200).redirect('/');
});

router.get(['/about', '/Me'], (req, res) => {
    // console.log(req.route)
    var tag = {
        description: "ShanKKriti Welcome You, Shop Indian Ethnic Wear For Women Online, Explore the top line collection by ShanKKriti including designer Silk Sarees, Suits",
        Keywords: "ShanKKriti , Buy Sarees , Salwar Kameez , suits at online , online apparel store , online fashion store , online clothing stores , womens clothing stores , online shopping for women , womens clothing online , fashion clothing , buy fashion clothing online , womens clothing , apparel for women , women's apparel , dresses for women , plus size dresses , Buy Indian Clothes , Indian Dresses , Indian Clothes , Indian Clothing , Indian Clothes Online , Indian Dresses Online , Buy Indian Clothes Online , Buy Indian Dresses , ShanKKriti.com",
        ogurl: "http://shankkriti.com/about",
        ogtitle: "About US , Buy Sarees Salwar Kameez Suits",
        ogdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars,  Anarkali Suit,  Designer Sarees, Designer Suits online in India",
        ogimage: "/assets/images/favicon/favicon.png",
        ogsecure_url: "/assets/images/favicon/favicon.png",
        twtitle: "ShanKKriti, Buy Sarees Salwar Kameez Suits ",
        twdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars, , Anarkali Suit, Jewellery, Designer Sarees, Designer Suits online in India,",
    }

    res.status(200).render('../views/main/about', {
        title: 'About Us',
        tagdata: tag
    });
});

router.get('/contact', (req, res) => {
    var tag = {
        description: "ShanKKriti provides Online shop for wedding/occasion wear, designer sarees, Blouse, anarkalis , salwar kameez, kurtis,Bridal Wears and gowns worldwide, the largest online ethnic wear store wisth free shipping in India,Express delivery, Worldwide shipping",
        Keywords: "ShanKKriti , Buy Sarees , Salwar Kameez , suits at online , online apparel store , online fashion store , online clothing stores , womens clothing stores , online shopping for women , womens clothing online , fashion clothing , buy fashion clothing online , womens clothing , apparel for women , women's apparel , dresses for women , plus size dresses , Buy Indian Clothes , Indian Dresses , Indian Clothes , Indian Clothing , Indian Clothes Online , Indian Dresses Online , Buy Indian Clothes Online , Buy Indian Dresses , Online Shopping, online shop for saree, Bollywood saree, Designer Sarees,Bridal Sarees,Latest Sarees,Online shopping for sarees,online designer sarees,online latest saree,online ocassion saree,online mehandi saree,online shop for saree, ShanKKriti.com",
        ogurl: "http://shankkriti.com/contact",
        ogtitle: "Contact Us , Contact Us For help with our website or your order",
        ogdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars,  Anarkali Suit,  Designer Sarees, Designer Suits online in India",
        ogimage: "/assets/images/favicon/favicon.png",
        ogsecure_url: "/assets/images/favicon/favicon.png",
        twtitle: "ShanKKriti, Contact Us For help with our website or your order ",
        twdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars, , Anarkali Suit, Jewellery, Designer Sarees, Designer Suits online in India,",
    }

    res.status(200).render('../views/main/contact', {
        title: 'Contact',
        tagdata: tag
    });
});

router.get('/FeedBack', (req, res) => {
    var tag = {
        description: "ShanKKriti provides Online shop for wedding/occasion wear, designer sarees, Blouse, anarkalis , salwar kameez, kurtis,Bridal Wears and gowns worldwide, the largest online ethnic wear store wisth free shipping in India,Express delivery, Worldwide shipping",
        Keywords: "ShanKKriti , Buy Sarees , Salwar Kameez , suits at online , online apparel store , online fashion store , online clothing stores , womens clothing stores , online shopping for women , womens clothing online , fashion clothing , buy fashion clothing online , womens clothing , apparel for women , women's apparel , dresses for women , plus size dresses , Buy Indian Clothes , Indian Dresses , Indian Clothes , Indian Clothing , Indian Clothes Online , Indian Dresses Online , Buy Indian Clothes Online , Buy Indian Dresses , Online Shopping, online shop for saree, Bollywood saree, Designer Sarees,Bridal Sarees,Latest Sarees,Online shopping for sarees,online designer sarees,online latest saree,online ocassion saree,online mehandi saree,online shop for saree, ShanKKriti.com",
        ogurl: "http://shankkriti.com/FeedBack",
        ogtitle: "Feed Back , We are happy because you are",
        ogdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars,  Anarkali Suit,  Designer Sarees, Designer Suits online in India",
        ogimage: "/assets/images/favicon/favicon.png",
        ogsecure_url: "/assets/images/favicon/favicon.png",
        twtitle: "ShanKKriti, We are happy because you are ",
        twdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars, , Anarkali Suit, Jewellery, Designer Sarees, Designer Suits online in India,",
    }

    res.status(200).render('../views/main/FeedBack', {
        title: 'Feed Back',
        tagdata: tag
    });
});

router.get('*', (req, res) => {
    var tag = {
        description: "ShanKKriti Welcome You, Shop Indian Ethnic Wear For Women Online, Explore the top line collection by ShanKKriti including designer Silk Sarees, Suits",
        Keywords: "ShanKKriti , Buy Sarees , Salwar Kameez , suits at online , online apparel store , online fashion store , online clothing stores , womens clothing stores , online shopping for women , womens clothing online , fashion clothing , buy fashion clothing online , womens clothing , apparel for women , women's apparel , dresses for women , plus size dresses , Buy Indian Clothes , Indian Dresses , Indian Clothes , Indian Clothing , Indian Clothes Online , Indian Dresses Online , Buy Indian Clothes Online , Buy Indian Dresses , ShanKKriti.com",
        ogurl: "http://shankkriti.com/error404",
        ogtitle: "ShanKKriti ,  Some Error",
        ogdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars,  Anarkali Suit,  Designer Sarees, Designer Suits online in India",
        ogimage: "/assets/images/favicon/favicon.png",
        ogsecure_url: "/assets/images/favicon/favicon.png",
        twtitle: "ShanKKriti, Some Error ",
        twdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars, , Anarkali Suit, Jewellery, Designer Sarees, Designer Suits online in India,",
    }
    res.status(404).render('../views/main/error404', {
        title: 'Error 404',
        tagdata: tag
    });
});

module.exports = router;