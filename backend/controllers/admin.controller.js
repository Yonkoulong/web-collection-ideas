//require model
const UserModel = require("../models/account.model");
const DepartmentModel = require("../models/department.model");
const campaignModel = require('../models/campaign.model')
const bcrypt = require("bcrypt");
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
const postRegisterAccount = async (req, res) => {
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

}
const postCreateDepartment = async (req, res) => {
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
const postCreateCampaign= async (req, res) => {
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
    controller: postRegisterAccount, //this is method handle when have request on server
    route: "/admin/register", //define API
  },
  {
    method: "post", //define method http
    controller: postCreateDepartment, //this is method handle when have request on server
    route: "/admin/createDepartment", //define API
  },
  {
    method: "post", //define method http
    controller: postCreateCampaign, //this is method handle when have request on server
    route: "/admin/createCampaign", //define API
  },
]
