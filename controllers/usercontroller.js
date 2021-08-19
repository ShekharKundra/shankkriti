var userdet = require('../module/user');
var ejs = require('ejs');
var transporter = require('../config/mailler.js');
var uuid = require('uuid');

class user {

    User_Registration = (data, cb) => {
        userdet.findOne({ Emailid: data.email }, (err, found) => {
            if (err) return cb({ status: "err", msg: "Internal Error While Finding Data" })
            else if (found) return cb({ status: "err", msg: "User With email Already Exists" });
            else {
                userdet.findOne({ PhoneNo: data.pno }, (err, found) => {
                    if (err) return cb({ status: "err", msg: "Internal Error While Finding Data" })
                    else if (found) return cb({ status: "err", msg: "User With email Already Exists" });
                    else {
                        var userdtl = {
                            Fname: data.fname,
                            Lname: data.lname,
                            Username: data.fname + data.lname,
                            Emailid: data.email,
                            PhoneNo: data.pno,
                            Password: data.password,
                            UUID: uuid.v4()
                        }

                        var userdata = userdet(userdtl);

                        userdata.save((err, saved) => {
                            if (err) return cb({ status: "err", msg: "Error While Saving The Data" })
                            else {
                                ejs.renderFile("views/emailtemplates/EmailVerify.ejs", {
                                    name: saved.Fname + " " + saved.Lname, id: saved.UUID, usname: saved.Fname + saved.Lname
                                }, (err, send) => {
                                    if (err) return cb({ status: "err", msg: " Error While Rendering File" });
                                    else {
                                        var mail = {
                                            from: '"PEEK-A-BOO" <foo@example.com>',
                                            to: saved.Emailid,
                                            subject: "hello",
                                            text: "Hello World?",
                                            html: send,
                                        }
                                        transporter.sendMail(mail, (err, scc) => {
                                            if (err) return cb({ Status: "err", msg: err });
                                            return cb({ status: "scc", msg: "Data Send And verificstion Email Sent" });
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            }
        });
    }

    Email_Verify = (id, cb) => {
        userdet.findOne({ UUID: id }, (err, found) => {
            console.log("1");
            if (err) {
                console.log("2");
                return cb({ status: "err", msg: "Internal Error While Data Search" });
            }
            else if (!found) {
                console.log("3");

                cb({ status: "err", msg: "User Not Found" });
            }
            else {
                console.log("4");

                // if (found.expiry_date >= found.Date_Of_Joining) {
                if (found.Emailveridied == false || found.Status == false) {
                    console.log("5");

                    userdet.findOneAndUpdate({ UUID: id }, {
                        $set: { Emailveridied: true, Status: true }
                    }, (err, updated) => {
                        if (err) {
                            console.log("6");
                            return cb({ status: "err", msg: "Unable to Verify Email" });
                        }
                        else {
                            console.log("7");

                            return cb({ status: "scc", msg: "Email Verfied Successfully" });
                        }
                    });
                } else {
                    console.log("8");

                    cb({ status: "scc", msg: "Email Already Verified" });
                }
                // } else {
                //     cb({ status: "err", msg: "Session Expired" });
                // }
            }
        });
    }

    Login_User(data, cb) {
        userdet.findOne({ Emailid: data.email }, (err, found) => {
            if (err) return cb({ status: "err", msg: "Error while finding data" });
            if (found) {
                if (found.Emailveridied === true && found.Status === true) {
                    if (found.Password === data.password) {
                        return cb({ status: "scc", msg: "User Loged in Succesfully", userdata: found });
                    } else {
                        return cb({ status: "err", msg: "Wrong Password" });
                    }
                } else {
                    return cb({ status: "err", msg: "Please Register yourself OR Verify your Email ID" });
                }
            } else {
                return cb({ status: "err", msg: "Email ID is not Registered" });
            }
        }); // findOne
    }

    profiledetails = (data, cb) => {
        userdet.findOne({ Emailid: data.data.Emailid }, (err, found) => {
            if (err) return cb({ status: "err", msg: "Error While Finding Data" });
            else if (!found) cb({ status: "err", msg: "Unable To Find Records" });
            else cb({ status: "scc", msg: "Records Found Successfully", data: found });
        })
    }

    edit_profile = (data, cb) => {
        userdet.findOneAndUpdate({ Emailid: data.email }, {
            $set: {
                Fname: data.fname,
                Lname: data.lname,
                Address: {
                    address: {
                        HouseNo: data.address,
                        State: data.state,
                        City: data.city,
                        PostalCode: data.pcode,
                        Country: data.country
                    }
                },
                Username: data.username,
            }
        }, (err, found) => {
            if (err) return cb({ status: "err", msg: "Error While Finding Data" });
            else if (!found) return cb({ status: "err", msg: "Cant Find The Data" });
            else return cb({ status: "scc", msg: "Data Found And Updated Successfully", data: found });
        });
    }
};

module.exports = user;