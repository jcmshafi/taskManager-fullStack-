const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");


//! Registration
exports.registration = (req, res) => {
    let reqBody = req.body;
    
    UsersModel.create(reqBody)
        .then(data => {
            res.status(200).json({ status: "success", data: data });
        })
        .catch(err => {
            res.status(400).json({ status: "fail", data: err });
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

