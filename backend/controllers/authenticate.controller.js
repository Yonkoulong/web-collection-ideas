//require model
const User = require("../models/account.model");
//const Role = require("../Ulti")
const bcrypt = require("bcrypt");

const postLogin = async (req, res) => {
    //create an array of documents
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let response
    console.log(email, password, role)
    const user = await User.findOne({
        email: email,     
    }).then(data => {
        if (data) {
            const match = bcrypt.compareSync(password, data.password)
            if(match)
            {
                response = {
                    'status': `user ${data.email} login success!`,
                    'data': data
                  }    
                  console.log(response)       
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
    }).catch(err => {
        res.status(500).json({'message' : err.message});
    }
    )
};

module.exports = [
    {
        method: "post", //define method http
        controller: postLogin, //this is method handle when have request on server
        route: "/login", //define API
    }
]
