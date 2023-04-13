//require model
const UserModel = require("../models/account.model");
const CategoryModel = require("../models/category.model")


const getCategories = async(req, res) =>{
  try {
    let categories = await CategoryModel.find({});
    if(categories){
      response = {
        'status': 'Get all categories success',
        'data': categories
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
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
const deleteCategory = async(req, res)=>{
  try {
    let id = req.params.id
    let deleteCategory= await CategoryModel.findOneAndDelete({_id:id})
    if(!deleteCategory) return res.sendStatus(404);
    response = {
      'status': 'Delete category success',
      'data': deleteCategory
    }      
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
};
module.exports = [
  {
    method: "get",
    controller: getCategories,
    route: "/categories"
  },
  {
    method: "post", //define method http
    controller: postCategory, //this is method handle when have request on server
    route: "/category", //define API
  },
  {
    method: "delete", //define method http
    controller: deleteCategory, //this is method handle when have request on server
    route: "/category/:id", //define API
  },
  {
    method: "put", //define method http
    controller: putCategory, //this is method handle when have request on server
    route: "/category/:id", //define API
  }
 
]
