//require model
const UserModel = require("../models/account.model");

const getManager = async (_req, res) => {
    //create an array of documents
    try {
      const users = await UserModel.find({});
  
      return res.status(httpCode.ok).json(users);
    } catch {
      return res.status(httpCode.badRequest).json([]);
    }
};
const postCreateCategory = async(req, res)=>{
    
}
module.exports = [
  {
    method: "get", //define method http
    controller: getManager, //this is method handle when have request on server
    route: "/manager", //define API
  }
 
]
