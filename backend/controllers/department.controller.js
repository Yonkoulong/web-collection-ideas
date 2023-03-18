const DepartmentModel = require("../models/department.model")
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
module.exports = [
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
]