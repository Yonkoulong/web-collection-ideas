const User = require("../models/user.model");

const getUsers = async (_req, res) => {
    //create an array of documents
    try {
      const users = await User.find({});
  
      return res.status(httpCode.ok).json(users);
    } catch {
      return res.status(httpCode.badRequest).json([]);
    }
};

module.exports = [
  {
    method: "get", //define method http
    controller: getUsers, //this is method handle when have request on server
    route: "/users", //define API
  }
]