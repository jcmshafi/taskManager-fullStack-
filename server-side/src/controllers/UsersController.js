const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");

//! Registration
exports.registration = (req, res) => {
    let reqBody = req.body;
    
    UsersModel.create(reqBody)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(200).json({ status: "fail", data: err });
        });
};


//! Login
exports.login = async (req, res) => {
    try {
        let reqBody = req.body;

        const data = await UsersModel.aggregate([
            { $match: reqBody },
            { $project: { _id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1 } }
        ]);

        if (data.length > 0) {
            let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]['email'] };
            let token = jwt.sign(Payload, 'SecretKey123456789');
            res.status(200).json({ status: "success", token: token, data: data[0] });
        } else {
            res.status(401).json({ status: "unauthorized" });
        }
    } 
    catch (err) {
        res.status(400).json({ status: "fail", data: err });
    }
};

//! profileDetails
exports.profileDetails = async (req, res) => {
    try {
        let email = req.headers['email'];
        
        const data = await UsersModel.aggregate([
            { $match: { email: email } },
            { $project: { _id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1 } }
        ]);

        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(400).json({ status: "fail", data: err.message || err });
    }
};

//! Update Profile
exports.profileUpdate = async (req, res) => {
    try {
        let email = req.headers['email'];
        let reqBody = req.body;

        const updatedData = await UsersModel.updateOne({ email: email }, reqBody);

        res.status(200).json({ status: "success", data: updatedData });
    }
    catch (err) {
        res.status(400).json({ status: "fail", data: err });
    }
};

//! RecoverVerifyEmail
exports.RecoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)
    try {
        // Email Account Query
        let UserCount = (await UsersModel.aggregate([{$match: {email: email}}, {$count: "total"}]))
        if(UserCount.length>0){
            // OTP Insert
            let CreateOTP = await OTPModel.create({email: email, otp: OTPCode})
            // Email Send
            let SendEmail = await SendEmailUtility(email,"Your PIN Code is= "+OTPCode,"Task Manager PIN Verification")
            res.status(200).json({status: "success", data: SendEmail})
        }
        else{
            res.status(200).json({status: "fail", data: "No User Found"})
        }

    }catch (e) {
        res.status(200).json({status: "fail", data:e})
    }

}


//! RecoverVerifyOTP
exports.RecoverVerifyOTP=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;
    
    try {
        let OTPCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}, {$count: "total"}])
        if (OTPCount.length>0) {
            let OTPUpdate = await OTPModel.updateOne({email: email, otp: OTPCode, status: status}, {
                email: email,
                otp: OTPCode,
                status: statusUpdate
            })
            res.status(200).json({status: "success", data: OTPUpdate})
        } else {
            res.status(200).json({status: "fail", data: "Invalid OTP Code"})
        }
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
}

//! RecoverResetPass
exports.RecoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    try {
        let OTPUsedCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])
        if (OTPUsedCount.length>0) {
            let PassUpdate = await UsersModel.updateOne({email: email}, {
                password: NewPass
            })
            res.status(200).json({status: "success", data: PassUpdate})
        } else {
            res.status(200).json({status: "fail", data: "Invalid Request"})
        }
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
}