//require model
const AccountModel = require("../models/account.model");
//const Role = require("../Ulti")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const postLogin = async (req, res) => {
    //create an array of documents
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let response
    console.log(email, password, role)

    try {
        const user = await AccountModel.findOne({
            email: email,
        })
        if (user) {
            const match = await bcrypt.compareSync(password, user.password)
            if (match) {
                // create JWTs
                const accesToken = jwt.sign(
                    { 
                        "id": user._id,
                        "role": user.role 
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                const refreshToken = jwt.sign(
                    { 
                        "id": user._id,
                        "role": user.role 
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                await AccountModel.findByIdAndUpdate(
                    user.id,
                    { refreshToken: refreshToken })
                response = {
                    'status': `user ${user.email} login success!`,
                    'data': {
                        accesToken,
                        user
                    }
                }
                console.log(response)
                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
                return res.status(201).json(response);
            }
            else {
                response = {
                    'status': 'Password incorrect',
                    'code': 101
                }
                return res.status(401).json(response)
            }
        } else {
            let response = {
                'status': 'account not found',
                'code': 102
            }
            return res.status(401).json(response)
        }
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};

const getRefreshToken = async (req, res) => {
    const cookies = req?.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    const token = req?.headers?.cookies||req?.headers?.Cookies
    console.log("alo" +token)
    const refreshToken = cookies.jwt;
    try {
        const foundAccount = await AccountModel.findOne({ refreshToken: refreshToken })
        if (!foundAccount) return res.sendStatus(403);
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403)
                const accesToken = jwt.sign(
                    { 
                        "id": user._id,
                        "role": user.role 
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                return res.status(201).json({accesToken,foundAccount});
            }
        )

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    try {
        const foundAccount = await AccountModel.findOne({ refreshToken: refreshToken })
        if (!foundAccount) {
            res.clearCookie('jwt', { httpOnly: true })
            return res.sendStatus(403);
        }
        await AccountModel.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: '' })
        res.clearCookie('jwt', { httpOnly: true })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = [
    {
        method: "post", //define method http
        controller: postLogin, //this is method handle when have request on server
        route: "/login", //define API
    },
    {
        method: "get", //define method http
        controller: getRefreshToken, //this is method handle when have request on server
        route: "/refresh", //define API
    },
    {
        method: "get", //define method http
        controller: getLogout, //this is method handle when have request on server
        route: "/logout", //define API
    }

]
