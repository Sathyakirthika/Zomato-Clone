const express = require('express');   //important
const UserModel = require('../Models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;
var privateKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpitn3EU29cyWUNRh8s/Zb7EH1czXScF7yuyio1zx0IEURN9OZhP5g5eDN1ORBUassZic0+KnrexqLGCAQ9zCTbue7ENABVnSUzTlxXQQQWJ5h+dHvJkuDD+f1yON8Jg4/EkV8g+0wSY6eP8iTAc/HNpFESqmrG4j/VLQ58Kcz4QIDAQAB"




const router = express.Router();

router.post('/register', async (req, res) => {
    try {

        var reqData = req.body;

        if (Object.keys(reqData).length === 0) {
            throw new Error("poda");
        }

        const ExistingEmail = await UserModel.findOne({ user_email: reqData.user_email }).countDocuments();

        if (ExistingEmail) {
            throw new Error("Email already exist.")
        }

        const enpPassword = bcrypt.hashSync(reqData.user_password, saltRounds);

        delete reqData.user_password;
        var token = jwt.sign(reqData, privateKey)
        var user = 'userid-' + uuidv4();
        console.log(user);

        const userData = new UserModel({
            user_id: user,
            user_first_name: reqData.user_first_name,
            user_last_name: reqData.user_last_name,
            user_email: reqData.user_email,
            user_password: enpPassword,
            user_status: 1,
            user_token: token,
            user_timestamp: new Date().getTime()
        })

        var result = await userData.save();

        res.status(200).json({ "status": 200, data: result, "message": "registered successfully", "error": false })
    } catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

router.post('/login', async (req, res) => {
    try {

        var reqData = req.body;

        if (Object.keys(reqData).length === 0) {
            throw new Error("please provide data.");
        }

        const ExistingEmail = await UserModel.findOne({ user_email: reqData.user_email }).countDocuments();

        if (ExistingEmail) {

            var userData = await UserModel.findOne({ user_email: reqData.user_email });
            const depPassword = bcrypt.compareSync(reqData.user_password, userData.user_password);
            console.log(userData)
            if (depPassword) {
                delete userData.user_password;
                var token = jwt.sign({ userData }, privateKey)
                userData.user_token = token;

                await UserModel.findOneAndUpdate({ user_email: reqData.user_email }, { user_token: token });
                res.status(200).json({ "status": 200, "data": userData, "message": "Login successfully", "error": false })

            } else {
                throw new Error("password not matched..")
            }

        } else {
            throw new Error("Email already exist.")
        }


    } catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

async function encrypt(user_password) {
    bcrypt.hash(user_password, saltRounds, function (err, hash) {
        console.log(hash);
        return hash;
    });
}

module.exports = router;