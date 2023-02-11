const User = require("../models/staff.model");

const getStaff = async (_req, res) => {
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
    controller: getStaff, //this is method handle when have request on server
    route: "/staff", //define API
  }
]