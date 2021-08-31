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
                                            return cb({ status: "scc", msg: "Data Saved And Verification link has been Senton your Email ID" });
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
                Username: data.username,
            },
            $push: {
                Address: {
                    address: {
                        HouseNo: data.address,
                        State: data.state,
                        City: data.city,
                        PostalCode: data.pcode,
                        Country: data.country
                    }
                }
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

    emailError = (cb) => {
        userdet.find({ EmailErr: true }, (err, found) => {
            if (err) return cb({ status: "err", msg: "error while finding data." });
            else if (!found) return cb({ status: "abc", msg: "No Data Found" });
            else return cb({ status: "scc", msg: "Data Found Successfully", data: found });
        });
    }

    user_Address_profile = (data, cb) => {
        // console.log(data.Address_UUID);
        userdet.findOne({ UUID: data.UUID.data }, (err, found) => {
            if (err) return cb({ status: "err", msg: "error While Finding Data" });
            else if (!found) return cb({ status: "err", msg: "Data Not Found" });
            else {
                console.log(data.Address_UUID)
                console.log(found)
                found.Address.forEach(function (Add) {
                    if (Add.address.Address_UUID == data.Address_UUID) {
                        return cb({ status: "scc", msg: "Data Found", data: found, address_data: Add })
                    }
                });
            }
        })
    }

    Add_address = (data, cb) => {
        this.find_One_user_for_found({ parameter: "Emailid", data: data.email }, cbData => {
            if (cbData.status == "err") return cb({ status: "err", msg: cbData.msg });
            else {
                userdet.findOneAndUpdate({ Emailid: cbData.data.Emailid }, {
                    $push: {
                        Address: {
                            address: {
                                HouseNo: data.address,
                                State: data.state,
                                City: data.city,
                                PostalCode: data.pcode,
                                Country: data.country,
                                Address_UUID: uuid.v4()
                            }
                        }
                    }
                }, (err, found) => {
                    if (err) return cb({ status: "err", msg: "Error While Finding Data" });
                    else if (!found) return cb({ status: "err", msg: "Data Not Found" });
                    else return cb({ status: "scc", msg: "Data Updated Successfully" });
                });
            }
        })
    }

    edit_profile = (data, cb) => {
        this.find_One_user_for_found({ parameter: "Emailid", data: data.body_data.email }, cbData => {
            if (cbData.status == "err") return cb({ status: "err", msg: "Error While Finding Data" });
            else {
                userdet.findOneAndUpdate({ Emailid: data.body_data.email, "Address.address.Address_UUID": data.data }, {
                    $set: {
                        "Address.$.address.HouseNo": data.body_data.address,
                        "Address.$.address.City": data.body_data.city,
                        "Address.$.address.State": data.body_data.state,
                        "Address.$.address.PostalCode": data.body_data.pcode,
                        "Address.$.address.Country": data.body_data.country
                    }
                }, (err, done) => {
                    if (err) return cb({ status: "err", msg: "Error While Finding Data" });
                    else if (!done) return cb({ status: "err", msg: "Error While Finding or Updating Data" });
                    else return cb({ status: "scc", msg: "Data Updated Successfully" });
                })
            }
        })
    }

    remove_address = (data, cb) => {
        this.find_One_user_for_found({ parameter: "UUID", data: data.data.data }, cbData => {
            if (cbData.status == "err") return cb({ status: "err", msg: cbData.msg });
            else {
                userdet.findOneAndUpdate({ UUID: data.data.data }, {
                    $pull: {
                        "address.Address_UUID": data.Address_UUID
                    }
                }, { getAutoValues: false }, (err, scc) => {
                    if (err) return cb({ status: "err", msg: "Error While Data Finding" });
                    else if (!scc) return cb({ sattus: "err", msg: "Couldn't Find Or Remove Data" });
                    else {
                        console.log(scc.Address);
                        return cb({ status: "scc", msg: "Data Removed Successfully" });
                    }
                })
            }
        })
    }
};

module.exports = user;