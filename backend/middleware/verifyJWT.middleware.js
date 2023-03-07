const AccountModel = require("../models/account.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    let response
    try {
        if (!authHeader) {
            response = {
                'status': 'require authentication!!',               
              }      
            return res.sendStatus(401).json(response)
        } 
        const token =  authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET, 
            (err, decoded) => {
                if (err) return res.sendStatus(403)
                req.user = decoded
                next()
            }
        )
    } catch (error) {
        return res.sendStatus(500).json(error.message)
    }

}
module.exports = verifyJWT