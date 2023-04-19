//require model
const AccountModel = require("../models/account.model");
//const Role = require("../Ulti")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const postLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let response
    try {
        const user = await AccountModel.findOne({
            email: email,
        })
        if (!user) {
            response = { 'status': 'account not found', 'code': 102 }
            return res.status(401).json(response)
        }
        const match = await bcrypt.compareSync(password, user.password)
        if (!match) {
            response = {'status': 'Password incorrect','code': 101}
            return res.status(401).json(response)
        }
        // create JWTs
        const accesToken = jwt.sign(
            { "id": user._id, "role": user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { "id": user._id, "role": user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        await AccountModel.findByIdAndUpdate(
            user.id,{ refreshToken: refreshToken })
        response = {
            'status': `user ${user.email} login success!`,
            'data': {accesToken,user}
        }
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: 'false' })
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getRefreshToken = async (req, res) => {
    const cookies = req?.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const token = req?.headers?.cookies || req?.headers?.Cookies
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
                        "id": foundAccount._id,
                        "role": foundAccount.role
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                );
                return res.status(201).json({ accesToken, foundAccount });
            }
        )

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(404);
    const refreshToken = cookies.jwt;
    try {
        const foundAccount = await AccountModel.findOne({ refreshToken: refreshToken })
        if (!foundAccount) {
            res.clearCookie('jwt', { httpOnly: true })
            return res.sendStatus(403);
        }
        await AccountModel.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: '' })
        res.clearCookie('jwt', { httpOnly: true })
        return res.status(200).json("logout success");
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
