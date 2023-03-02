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
            const match = bcrypt.compareSync(password, user.password)
            if(match)
            {   
                // create JWTs
                const accesToken = jwt.sign(
                    {"email": email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'30s'}
                    );
                const refreshToken = jwt.sign(
                    {"email": email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'1d'}
                    );
                  await AccountModel.findByIdAndUpdate(
                    user.id,                   
                    {refreshToken: refreshToken })
                response = {
                    'status': `user ${user.email} login success!`,
                    'data': accesToken
                  }    
                  console.log(response)       
                  res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000})
                  return res.status(201).json(response);
            }  
            else{
                response = {
                    'status': 'Password incorrect',
                    'code':101               
                  }    
                return res.status(401).json(response)
            }
        } else {
            let response = {
                'status': 'account not found',    
                'code':102              
              }    
            return res.status(401).json(response)
        }
    } catch (error) {
        res.status(500).json({'message' : error.message});
    }
};

module.exports = [
    {
        method: "post", //define method http
        controller: postLogin, //this is method handle when have request on server
        route: "/login", //define API
    }
]
