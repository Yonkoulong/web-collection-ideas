//require model
const UserModel = require("../models/account.model");
const DepartmentModel = require("../models/department.model");
const campaignModel = require('../models/campaign.model')
const bcrypt = require("bcrypt");
const AccountModel = require("../models/account.model");
const ideaController = require("./idea.controller");
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
const postAccount = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let role = req.body.role
  let response
  if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required. ' })
  console.log(email, password, role)
  //check duplicate
  const duplicate = UserModel.findOne({
    email: email
  })
    .then(data => {
      if (data){
        response = {
          'status': 'duplicate email',
          'code': 103
        }     
        return res.status(409).json(response);
      }
      else {
        // hash pasword
        let hashedPwd = '';
        bcrypt.hash(password, 10, function (err, hash) {
          console.log('hash ', hash);
          hashedPwd = hash;
          //create account
          UserModel.create({
            email: email,
            password: hashedPwd,
            role: role
          })
            .then(data => {   
             response = {
                'status': 'Register account success',
                'data': data
              }        
              console.log(response)     
              res.status(201).json(response);    
            })
            .catch(err => {
              res.status(500).json({ 'message': err.message })
            })
        })

      }
    })
    .catch(err => {
      res.status(500).json({ 'message': err.message })
    })

};
const getAccount = async(req, res) =>{
  try {
    let accounts = await AccountModel.find({});
    if(accounts){
      response = {
        'status': 'Get all accounts success',
        'data': accounts
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const getAccountById = async(req, res) =>{
  try {
    let id = req.params.id
    let account = await AccountModel.findOne({_id:id});
    if(account){
      response = {
        'status': 'Get account success',
        'data': account
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
 
};
const getAccountByDepartment = async(req, res) =>{
  try {
    let departmentId = req.params.id
    let accounts = await AccountModel.find({departmentId:departmentId});
    if(accounts){
      response = {
        'status': 'Get account by department success',
        'data': accounts
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
 
};
const deleteAccount = async(req, res) =>{
  try {
    let id = req.params.id
    let account = await AccountModel.findByIdAndDelete({id});
    if(account){
      response = {
        'status': 'Delete account success',
        'data': account
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const postDepartment = async (req, res) => {
  let name = req.body.name
  let description = req.body.description
  let response
  DepartmentModel.create({
    name: name,
    description: description
  })
    .then(data => {
      response = {
        'status': 'Create new department success',
        'data': data
      }      
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
}
const getDepartment = async(req, res) =>{
  try {
    let departments = await DepartmentModel.find({});
    if(departments){
      response = {
        'status': 'Get all department success',
        'data': departments
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const getDepartmentById = async(req, res) =>{
  try {
    let id = req.params.id
    let department = await DepartmentModel.findById({
      _id:id
    });
    if(department){
      response = {
        'status': 'Get department success',
        'data': department
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const putDepartment = async (req, res)=>{
  try {
    let id = req.params.id
    let name = req.body.name
    let description = req.body.description
    let response
    let newDepartment= await DepartmentModel.findByIdAndUpdate(id,{
      name: name,
      description: description
    })
    if(newDepartment){
      response = {
        'status': 'Update department success',
        'data': newDepartment
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const deleteDepartment = async (req, res)=>{
  try {
    let id = req.params.id
    let response
    await DepartmentModel.findByIdAndDelete(id)
      response = {
        'status': 'Delete department success',
      }      
      res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const postCampaign= async (req, res) => {
   let name = req.body.name
   let departmentId = req.body.departmentId
   let finalClosureDate = req.body?.finalClosureDate
   let date1 = new Date(finalClosureDate)
   console.log(date1.getDate())
   return res.json(new Date(finalClosureDate))
   let response
   campaignModel.create({
      name:name,
      departmentId:departmentId
   }).then(data => {
    response = {
      'status': 'Create new campaign success',
      'data': data
    }      
    res.status(201).json(response)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
}
const getCampaign = async(req, res) =>{
  try {
    let campaigns = await campaignModel.find({});
    let response
    if(campaigns){
      response = {
        'status': 'Get all campaigns success',
        'data': campaigns
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const getCampaignById = async(req, res) =>{
  try {
    let id = req.params.id
    let campaign = await campaignModel.findById({_id:id});
    if(campaign){
      response = {
        'status': 'Get campaign success',
        'data': campaign
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const putCampaign = async (req, res)=>{
  try {
    let id = req.params.id
    let name = req.body.name
    let firstClosureDate = req.body?.firstClosureDate
    let finalClosureDate = req.body?.finalClosureDate
    let response
    let newCampaign= await DepartmentModel.findByIdAndUpdate(id,{
      name: name,
      firstClosureDate:firstClosureDate,
      finalClosureDate: finalClosureDate
    })
    if(newCampaign){
      response = {
        'status': 'Update campaign success',
        'data': newCampaign
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const deleteCampaign = async(req, res) =>{
  try {
    let id = req.params.id
    let campaign = await campaignModel.findByIdAndDelete({_id:id});
    if(campaign){
      response = {
        'status': 'Delete campaign success',
        'data': campaign
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
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
  },
  {
    method: "post", //define method http
    controller: postAccount, //this is method handle when have request on server
    route: "/admin/account", //define API
  },
  {
    method: "get", //define method http
    controller: getAccount, //this is method handle when have request on server
    route: "/admin/account", //define API
  },
  {
    method: "get", //define method http
    controller: getAccountById, //this is method handle when have request on server
    route: "/admin/account/:id", //define API
  },
  {
    method: "get", //define method http
    controller: getAccountByDepartment, //this is method handle when have request on server
    route: "/admin/department/:id/account", //define API
  },
  {
    method: "put", //define method http
    controller: deleteAccount, //this is method handle when have request on server
    route: "/admin/account/:id", //define API
  },
  {
    method: "post", //define method http
    controller: postDepartment, //this is method handle when have request on server
    route: "/admin/department", //define API
  },
  {
    method: "get", //define method http
    controller: getDepartment, //this is method handle when have request on server
    route: "/admin/department", //define API
  },
  {
    method: "get", //define method http
    controller: getDepartmentById, //this is method handle when have request on server
    route: "/admin/department/:id", //define API
  },
  {
    method: "put", //define method http
    controller: putDepartment, //this is method handle when have request on server
    route: "/admin/department", //define API
  },
  {
    method: "delete", //define method http
    controller: deleteDepartment, //this is method handle when have request on server
    route: "/admin/department/:id", //define API
  },
  {
    method: "post", //define method http
    controller: postCampaign, //this is method handle when have request on server
    route: "/admin/campaign", //define API
  },
  {
    method: "get", //define method http
    controller: getCampaign, //this is method handle when have request on server
    route: "/admin/campaign", //define API
  },
  {
    method: "get", //define method http
    controller: getCampaignById, //this is method handle when have request on server
    route: "/admin/campaign/:id", //define API
  },
  {
    method: "put", //define method http
    controller: putCampaign, //this is method handle when have request on server
    route: "/admin/campaign/:id", //define API
  },
  {
    method: "delete", //define method http
    controller: deleteCampaign, //this is method handle when have request on server
    route: "/admin/campaign/:id", //define API
  },
]
