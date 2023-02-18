//require model
const User = require("../models/account.model");
//const Role = require("../Ulti")

const getAdmin = async (_req, res) => {
    //create an array of documents
    try {
      const users = await User.find({});
  
      return res.status(httpCode.ok).json(users);
    } catch {
      return res.status(httpCode.badRequest).json([]);
    }
};
const postRegisterAccount = async(req, res) =>{
    var username = req.body.username
    var password = req.body.password
    var role = req.body.role
    console.log(username, password)
    User.create({
        email:username,
        password:password,
        role:role
    })
    .then(data=>{
        res.json('Register successfully!')
    })
    .catch(err=>{
        res.status(500).json(err.message)
    })
}
module.exports = [
  {
    method: "get", //define method http
    controller: getAdmin, //this is method handle when have request on server
    route: "/admin", //define API
  },
  {
    method: "post", //define method http
    controller: postRegisterAccount, //this is method handle when have request on server
    route: "/admin/register", //define API
  },
 
]
