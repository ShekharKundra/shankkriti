var Product = require('../module/product');

let product = {};
class ProductsData {

    //show all product
    ShowAllProducts(style, cb) {
        Product.find({}, (err, products) => {
            if (err) {
                return cb({ Status: "err", Msg: "No Data Found", data: null });
            } else {
                if (style.Fabric == null && style.Color == null) {
                    console.log(2);
                    return cb({ Status: "suc", Msg: " All Data Found", data: products });
                } else {
                    var realproduct = [];
                    if (!Array.isArray(style.Fabric)) {
                        products.forEach(function (product) {
                            product.Febric.forEach(function (febric) {
                                if (febric.toLowerCase() == style.Fabric.toLowerCase()) {
                                    if (!realproduct.includes(product)) {
                                        realproduct.push(product);
                                    }
                                }
                            });
                        });
                    } else {
                        style.Fabric.forEach(function (reqfabric) {
                            products.forEach(function (product) {
                                product.Febric.forEach(function (febric) {
                                    if (febric.toLowerCase() == reqfabric.toLowerCase()) {
                                        if (!realproduct.includes(product)) {
                                            realproduct.push(product);
                                        }
                                    }
                                });
                            });
                        });
                    }
                    if (style.Color == null) {
                        return cb({ Status: "suc", Msg: " All Data Found", data: realproduct });
                    } else {
                        this.productofreqcolor({ products: realproduct, color: style.Color }, (cbData) => {
                            return cb({ status: "suc", Msg: "All Data Found", data: cbData.data });
                        });
                    }
                }
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
        var sty = style.Style.toLowerCase();
        if (sty == "sarees") {
            var styles = 'saree'
        } else if (sty == 'stitched_suit') {
            var styles = 'stitched'
        } else if (sty == 'unstitched_suit') {
            var styles = 'unstitched'
        }
        console.log(styles);
        console.log(style.Fabric);
        Product.find({ "Style": { $regex: new RegExp("^" + styles.toLowerCase(), "i") } }, (err, products) => {
            if (err) {
                return cb({ Status: "err", Msg: "No Data Found", data: null });
            } else {
                console.log(style.Fabric)
                if (style.Fabric == null && style.Color == null) {
                    console.log(2);
                    return cb({ Status: "suc", Msg: " All Data Found", data: products });
                } else {
                    var realproduct = [];
                    if (!Array.isArray(style.Fabric)) {
                        products.forEach(function (product) {
                            product.Febric.forEach(function (febric) {
                                if (febric.toLowerCase() == style.Fabric.toLowerCase()) {
                                    if (!realproduct.includes(product)) {
                                        realproduct.push(product);
                                    }
                                }
                            });
                        });
                    } else {
                        style.Fabric.forEach(function (reqfabric) {
                            products.forEach(function (product) {
                                product.Febric.forEach(function (febric) {
                                    if (febric.toLowerCase() == reqfabric.toLowerCase()) {
                                        if (!realproduct.includes(product)) {
                                            realproduct.push(product);
                                        }
                                    }
                                });
                            });
                        });
                    }
                    if (style.Color == null) {
                        return cb({ Status: "suc", Msg: " All Data Found", data: realproduct });
                    } else {
                        this.productofreqcolor({ products: realproduct, color: style.Color }, (cbData) => {
                            return cb({ status: "suc", Msg: "All Data Found", data: cbData.data });
                        });
                    }
                }
            }
        });
    }

    productofreqcolor(data, cb) {
        console.log(data.products);
        console.log(data.color);
        var productwithcolor = [];
        if (!Array.isArray(data.color)) {
            data.products.forEach(function (product) {
                product.Color.forEach(function (pcolor) {
                    if (data.color.toLowerCase() == pcolor.toLowerCase()) {
                        if (!productwithcolor.includes(product)) {
                            productwithcolor.push(product);
                        }
                    }
                })
            })
        } else {
            data.color.forEach(function (color) {
                data.products.forEach(function (product) {
                    product.color.forEach(function (pcolor) {
                        if (color.toLowerCase() == pcolor.toLowerCase()) {
                            productwithcolor.push(product);
                        }
                    })
                })
            });
        }

        return cb({ status: 'scc', msg: "Product With Color Found", data: productwithcolor });
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