//require model
const User = require("../models/idea.model");

const getIdeas = async (_req, res) => {
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
    controller: getIdeas, //this is method handle when have request on server
    route: "/ideas", //define API
  }
 
]
