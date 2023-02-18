const User = require("../models/account.model");

const getStaffs = async (req, res) => {
    //create an array of documents
    var email = req.body.username
    var password = req.body.password
    var role = req.body.role
    try {
      const users = await User.find({
        email: email,
        password: password,
        role:role
      });
      return res.status(httpCode.ok).json(users);
    } catch {
      return res.status(httpCode.badRequest).json([]);
    }
};

module.exports = [
  {
    method: "get", //define method http
    controller: getStaffs, //this is method handle when have request on server
    route: "/staff", //define API
  }
]