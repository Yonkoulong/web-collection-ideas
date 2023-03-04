//require model
const UserModel = require("../models/account.model");
const CategoryModel = require("../models/category.model")

const getManager = async (_req, res) => {
    //create an array of documents
    try {
      const users = await UserModel.find({});
  
      return res.status(httpCode.ok).json(users);
    } catch {
      return res.status(httpCode.badRequest).json([]);
    }
};
const postCategory = async(req, res)=>{
    let type = req.body.type
    let description = req.body.description
    CategoryModel.create({
       type:type,
       description:description
    })
    .then(data=>{
      response = {
        'status': 'Create category success',
        'data': data
      }      
      res.status(200).json(response)
    })
    .catch(err=>{
      res.status(500).json(err.message)
    })
};
const putCategory = async(req, res)=>{
     let id = req.params.id
     let type = req.body.type
     let description = req.body.description
     CategoryModel.findByIdAndUpdate(id,{
      type:type,
      description:description
     })
     .then(data=>{
      response = {
        'status': 'Update category success',
        'data': data
      }      
      res.status(200).json(response)
    })
    .catch(err=>{
      res.status(500).json(err.message)
    })
};

module.exports = [
  {
    method: "get", //define method http
    controller: getManager, //this is method handle when have request on server
    route: "/manager", //define API
  },
  {
    method: "post", //define method http
    controller: postCategory, //this is method handle when have request on server
    route: "/manager/category", //define API
  },
  {
    method: "put", //define method http
    controller: putCategory, //this is method handle when have request on server
    route: "/manager/category", //define API
  }
 
]
