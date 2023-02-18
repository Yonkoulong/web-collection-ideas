//require model
const User = require("../models/account.model");
//const Role = require("../Ulti")

const postLogin = async (req, res) => {
    //create an array of documents
    var email = req.body.username
    var password = req.body.password
    var role = req.body.role
    console.log(email, password, role)
    const users = await User.findOne({
        email: email,
        password: password,
        
    }).then(data => {
        if (data) {
             res.json('Login success');
        } else {
            res.status(300).json('Wrong account')
        }
    }).catch(err => {
         res.status(300).json('login fail');
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
