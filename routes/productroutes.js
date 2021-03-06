var express = require('express');
var router = express.Router();
var ProductData = require('../controllers/productsdatacontroller');
var products = new ProductData();
var config = require("../config/config.json");

// for body parser and json data
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {

    var tag = {
        description: "ShanKKriti Welcome You, Shop Indian Ethnic Wear For Women Online, Explore the top line collection by ShanKKriti including designer Silk Sarees, Suits",
        Keywords: "ShanKKriti , Buy Sarees , Salwar Kameez , suits at online , online apparel store , online fashion store , online clothing stores , womens clothing stores , online shopping for women , womens clothing online , fashion clothing , buy fashion clothing online , womens clothing , apparel for women , women's apparel , dresses for women , plus size dresses , Buy Indian Clothes , Indian Dresses , Indian Clothes , Indian Clothing , Indian Clothes Online , Indian Dresses Online , Buy Indian Clothes Online , Buy Indian Dresses , ShanKKriti.com",
        ogurl: "http://shankkriti.com/product",
        ogtitle: "ShanKKriti , Buy Sarees Salwar Kameez Suits",
        ogdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars,  Anarkali Suit,  Designer Sarees, Designer Suits online in India",
        ogimage: "/assets/images/favicon/favicon.png",
        ogsecure_url: "/assets/images/favicon/favicon.png",
        twtitle: "ShanKKriti, Buy Sarees Salwar Kameez Suits ",
        twdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars, , Anarkali Suit, Jewellery, Designer Sarees, Designer Suits online in India,",
    }
    products.showRandomeProducts((cbRandomProducts) => {

        var style = req.path.split('/');
        console.log(req.query);
        if (req.query.Fabric == null) {
            wholeurl = req.protocol + '://' + req.get('host') + req.originalUrl + '?'
        } else {
            wholeurl = req.protocol + '://' + req.get('host') + req.originalUrl + '&'
        }
        if (cbRandomProducts.status == "err") {
            res.status(200).redirect("/error404");
        } else {
            products.showBestSellerProducts((cbBestSeller) => {
                if (cbBestSeller.status == "err") {
                    res.status(200).redirect("/error404");
                } else {
                    products.ShowAllProducts({ Fabric: req.query.Fabric, Color: req.query.Color }, (CbData) => {
                        if (CbData.status == "err") {
                            res.status(200).redirect("/error404");
                        } else {
                            //  console.log(config.product[0].Style)
                            res.status(200).render('../views/product/index', {
                                title: "Products",
                                tagdata: tag,
                                productsData: CbData.data,
                                bestSellerData: cbBestSeller.data,
                                randomData: cbRandomProducts.data,
                                productDescription: config.product,
                                wholeurl: wholeurl
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get(['/Sarees', '/Stitched_Suit', '/Unstitched_Suit'], (req, res) => {
    var tag = {
        description: "ShanKKriti Welcome You, Shop Indian Ethnic Wear For Women Online, Explore the top line collection by ShanKKriti including designer Silk Sarees, Suits",
        Keywords: "ShanKKriti , Buy Sarees , Salwar Kameez , suits at online , online apparel store , online fashion store , online clothing stores , womens clothing stores , online shopping for women , womens clothing online , fashion clothing , buy fashion clothing online , womens clothing , apparel for women , women's apparel , dresses for women , plus size dresses , Buy Indian Clothes , Indian Dresses , Indian Clothes , Indian Clothing , Indian Clothes Online , Indian Dresses Online , Buy Indian Clothes Online , Buy Indian Dresses , ShanKKriti.com",
        ogurl: "http://shankkriti.com/product",
        ogtitle: "ShanKKriti , Buy Sarees Salwar Kameez Suits",
        ogdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars,  Anarkali Suit,  Designer Sarees, Designer Suits online in India",
        ogimage: "/assets/images/favicon/favicon.png",
        ogsecure_url: "/assets/images/favicon/favicon.png",
        twtitle: "ShanKKriti, Buy Sarees Salwar Kameez Suits ",
        twdescription: "ShanKKriti offers Sarees, Salwar Kameez, Suits Kurtis, Churidars, , Anarkali Suit, Jewellery, Designer Sarees, Designer Suits online in India,",
    }
    var style = req.path.split('/');
    console.log(req.query);
    if (req.query.Fabric == null) {
        var url = req.protocol + '://' + req.get('host') + req.originalUrl + '?'
    } else {
        var url = req.protocol + '://' + req.get('host') + req.originalUrl + '&'
    }
    products.showRandomeProducts((cbRandomProducts) => {
        if (cbRandomProducts.status == "err") {
            res.status(200).redirect("/error404");
        } else {
            products.showBestSellerProducts((cbBestSeller) => {
                if (cbBestSeller.status == "err") {
                    res.status(200).redirect("/error404");
                } else {
                    products.showByStyle({ Fabric: req.query.Fabric, Color: req.query.Color, Style: style[1] }, (cbData) => {
                        if (cbData.status == "err") {
                            res.status(200).redirect("/error404");
                        } else {
                            res.status(200).render('../views/product/index', {
                                title: "Sarees",
                                tagdata: tag,
                                productsData: cbData.data,
                                bestSellerData: cbBestSeller.data,
                                randomData: cbRandomProducts.data,
                                productDescription: config.product,
                                wholeurl: url
                            });
                        }
                    });
                }
            });
        }
    });
});

router.get('/detail/:id', (req, res) => {

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
        if (cbSareeData.status == "err") {
            res.status(200).redirect("/error404");
        } else {
            products.ShowByProductName(req.params.id, (cbProductData) => {
                if (cbProductData.status == "err") {
                    res.status(200).redirect("/error404");
                } else {
                    res.status(200).render('../views/product/product_detail', {
                        title: "Products",
                        tagdata: tag,
                        sareeData: cbSareeData.data,
                        productData: cbProductData.data
                    });
                }
            });
        }
    });
});


module.exports = router;