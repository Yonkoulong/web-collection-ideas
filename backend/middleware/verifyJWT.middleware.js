const AccountModel = require("../models/account.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    try {
        if (!authHeader) return res.sendStatus(401)
        const token =  authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET, 
            (err, decoded) => {
                if (err) return res.sendStatus(403)
                AccountModel.findOne({
                    email: decoded.email,
                }).then(data =>{
                    if(data){
                    req.data = data;
                    console.log(data)
                    }
                })
                next()
            }
        )
    } catch (error) {

    }

}
module.exports = verifyJWT