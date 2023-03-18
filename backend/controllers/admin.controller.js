//require model
const UserModel = require("../models/account.model");
//const Role = require("../Ulti")

const getAdmin = async (_req, res) => {
  //create an array of documents
  try {
    const users = await UserModel.find({});

    return res.status(200).json(users);
  } catch {
    return res.status(500).json([]);
  }
};
// TODO :update campaign
const patchClosureDateCampaign = async(req,res )=>{
// TODO: delete campaign
  
}
module.exports = [
  {
    method: "get", //define method http
    controller: getAdmin, //this is method handle when have request on server
    route: "/admin", //define API
  }
]
