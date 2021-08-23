var userdet = require('../module/user');
var ejs = require('ejs');
var transporter = require('../config/mailler.js');
var uuid = require('uuid');

class user {

    User_Registration = (data, cb) => {
        this.find_One_user_for_not_found({ parameter: "Emailid", data: data.email }, cbData => {
            if (cbData.status == "err") return cb({ status: "err", msg: cbData.msg });
            else {
                this.find_One_user_for_not_found({ parameter: "PhoneNo", data: data.pno }, cbData => {
                    if (cbData.status == "err") return cb({ status: "err", msg: cbData.msg });
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
                                    if (err) {
                                        this.find_One_user_for_found({ parameter: "Emailid", data: saved.emailid }, cbData => {
                                            if (cbData.status == "err") return cb({ status: "err", msg: "Something Wrong Happened" });
                                            else {
                                                userdet.findOneAndUpdate({ Emailid: saved.Emailid }, {
                                                    $set: {
                                                        EmailErr: true,
                                                        EmailErrMsg: "Error While File Render",
                                                    }
                                                }, (err, done) => {
                                                    if (err) return cb({ status: "err", msg: "Couldn't Update the Error" });
                                                    else return cb({ status: "scc", msg: "Mail While Be send Timely" });
                                                });
                                            }
                                        })
                                    }
                                    else {
                                        var mail = {
                                            from: '"PEEK-A-BOO" <foo@example.com>',
                                            to: saved.Emailid,
                                            subject: "hello",
                                            text: "Hello World?",
                                            html: send,
                                        }
                                        transporter.sendMail(mail, (err, scc) => {
                                            if (err) {
                                                this.find_One_user_for_found({ parameter: "Emailid", data: saved.emailid }, cbData => {
                                                    if (cbData.status == "err") return cb({ status: "err", msg: "Something Wrong Happened" });
                                                    else {
                                                        userdet.findOneAndUpdate({ Emailid: saved.Emailid }, {
                                                            $set: {
                                                                EmailErr: true,
                                                                EmailErrMsg: "Error While Sending File",
                                                            }
                                                        }, (err, done) => {
                                                            if (err) return cb({ status: "err", msg: "Couldn't Update the Error" });
                                                            else return cb({ status: "scc", msg: "Mail While Be send Timely" });
                                                        });
                                                    }
                                                })
                                            }
                                            return cb({ status: "scc", msg: "Data Saved And Verification link has been Sent" });
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
        this.find_One_user_for_found({ parameter: 'UUID', data: id }, cbData => {
            if (cbData.status == "err") return cb({ status: "err", msg: cbData.msg });
            else {
                if (cbData.data.Emailveridied == false || cbData.data.Status == false) {
                    userdet.findOneAndUpdate({ UUID: id }, {
                        $set: { Emailveridied: true, Status: true }
                    }, (err, updated) => {
                        if (err) {
                            return cb({ status: "err", msg: "Unable to Verify Email" });
                        }
                        else {
                            return cb({ status: "scc", msg: "Email Verfied Successfully" });
                        }
                    });
                } else {
                    cb({ status: "scc", msg: "Email Already Verified" });
                }
            }
        });
    }

    Login_User(data, cb) {
        this.find_One_user_for_found({ parameter: "Emailid", data: data.email }, cbData => {
            if (cbData.status == "err") return cb({ status: "err", msg: cbData.msg });
            else {
                if (cbData.data.Emailveridied === true && cbData.data.Status === true) {
                    if (cbData.data.Password === data.password) {
                        return cb({ status: "scc", msg: "User Loged in Succesfully", userdata: cbData.data });
                    } else {
                        return cb({ status: "err", msg: "Wrong Password" });
                    }
                } else {
                    return cb({ status: "err", msg: "Email ID not verified" });
                }
            }
        });
    }

    profiledetails = (data, cb) => {
        this.find_One_user_for_found({ parameter: "UUID", data: data.data }, cbData => {
            if (cbData.status == "err") return cb({ status: "err", msg: cbData.msg });
            else return cb({ status: "scc", msg: "Records Found Successfully", data: cbData.data });
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

    find_One_user_for_found = (data, cb) => {
        var par = data.parameter;
        userdet.findOne({ [par]: data.data }, (err, found) => {
            if (err) return cb({ status: "err", msg: "error While Finding Data" });
            else if (!found) return cb({ status: "err", msg: "Unable To Find User" });
            else return cb({ status: "scc", msg: "Data Found Successfully", data: found });
        });
    }

    find_One_user_for_not_found = (data, cb) => {
        // console.log(parameter);
        var par = data.parameter;
        userdet.findOne({ [par]: data.data }, (err, found) => {
            if (err) return cb({ status: "err", msg: "error While Finding Data" });
            else if (found) return cb({ status: "err", msg: "User already exists" });
            else return cb({ status: "scc", msg: "Data Not found" });
        });
    }
};

module.exports = user;