var Product = require('../module/product');

let product = {};
class ProductsData {

    //show all product
    ShowAllProducts(cb) {
        Product.find({}, (err, products) => {
            if (err) {
                return cb({ Status: "err", Msg: "No Data Found", data: null });
            } else {
                return cb({ Status: "suc", Msg: " All Data Found", data: products });
            }
        });
    }

    //show all product
    ShowProductxxxxxxxxxxxxx(st, cb) {
        var ar = st.split('/');
        var query = {};
        if (ar[0] != "") {
            query.Style = ar[0];
            if (ar[0] == "All") {
                Product.find({}, (err, products) => {
                    if (err) {
                        return cb({ Status: "err", Msg: "No Data Found", data: null });
                    } else {
                        return cb({ Status: "suc", Msg: " All Data Found", data: products });
                    }
                });
            } else {
                Product.find(query, (err, products) => {
                    if (err) {
                        return cb({ Status: "err", Msg: "No Data Found", data: null });
                    } else {
                        return cb({ Status: "suc", Msg: " All Data Found", data: products });
                    }
                });
            }

        }

    }

    showTopTen(style, cb) {
        Product.find({ "Style": { $regex: new RegExp("^" + style.toLowerCase(), "i") } }, null, { limit: 8 }, (err, products) => {
            if (err) {
                return cb({ Status: "err", Msg: "No Data Found", data: null });
            } else {
                return cb({ Status: "suc", Msg: " All Data Found", data: products });
            }
        });
    }

    showByStyle(style, cb) {
        Product.find({ "Style": { $regex: new RegExp("^" + style.toLowerCase(), "i") } }, (err, products) => {
            if (err) {
                return cb({ Status: "err", Msg: "No Data Found", data: null });
            } else {
                return cb({ Status: "suc", Msg: " All Data Found", data: products });
            }
        });
    }

    //show one product by id
    ShowByProductName(ID, cb) {
        Product.findOne({ productName: ID }, (err, product) => {
            if (err) {
                return cb({ Status: "err", Msg: "NO DAta Found on ID", data: null });
            } else {
                return cb({ Status: "suc", Msg: " DAta Found on ID", data: product });
            }
        });
    }

    //show best seller product
    showBestSellerProducts(cb) {
            Product.count().exec((err, count) => {
                var random = Math.floor(Math.random() * count);
                Product.find().skip(random).limit(3).exec((err, products) => {
                    if (err) {
                        return cb({ Status: "err", Msg: "No Data Found", data: null });
                    } else {
                        return cb({ Status: "suc", Msg: " All Data Found", data: products });
                    }
                });
            });
        }
        //show best seller product
    showRandomeProducts(cb) {
        Product.count().exec((err, count) => {
            var random = Math.floor(Math.random() * count);
            Product.find().skip(random).limit(3).exec((err, products) => {
                if (err) {
                    return cb({ Status: "err", Msg: "No Data Found", data: null });
                } else {
                    return cb({ Status: "suc", Msg: " All Data Found", data: products });
                }
            });
        });
    }
}

module.exports = ProductsData;