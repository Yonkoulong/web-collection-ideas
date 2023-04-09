const CampaignModel = require('../models/campaign.model')
const DepartmentModel = require('../models/department.model')

const postCampaign = async (req, res) => {
  try {
    let name = req.body.name
    let departmentId = req.body.departmentId
    let startTime = req.body.startTime
    let firstClosureDate = req.body.firstClosureDate
    let finalClosureDate = req.body.finalClosureDate
    let date1 = new Date(finalClosureDate)
    console.log(date1.getDate())
    let department = await DepartmentModel.findOne({ _id: departmentId })

    let newCampaign = await CampaignModel.create({
      name: name,
      startTime: startTime,
      firstClosureDate: firstClosureDate,
      finalClosureDate: finalClosureDate,
      departmentId: departmentId,

    })
    if(!newCampaign) return res.sendStatus(409);
      let response = {
        'status': 'Create new campaign success',
        'data': { ...newCampaign._doc, departmentName: department.name }
      }
      console.log(newCampaign)
      res.status(201).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
   
 }
 const getCampaignByDepartment = async(req, res)=>{
  try {
    let departmentId = req.params.id
    if(departmentId){
      campaigns = await CampaignModel.find({departmentId:departmentId}).populate('departmentId');
    }
    if(campaigns){
      let response = {
        'status': 'Get all campaigns by department',
        'data': campaigns
      }
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
 }
 const getCampaign = async(req, res) =>{
   try {
    let campaigns 
    campaigns = await CampaignModel.find({}).populate('departmentId');
    if(campaigns){
      let response = {
        'status': 'Get all campaigns success',
        'data': campaigns
      }
      res.status(200).json(response)
    }
   } catch (error) {
     res.status(500).json(error.message)
   }
 };
 const postSearchCampaign = async(req, res) =>{
  try {
    let departmentId = req.body.departmentId
    let filter = req.body.filter
    if (departmentId != null) {
      let campaignFilter = await IdeaModel.find({ "name": { $regex: `${filter}` } })
      let response = {
        'status': 'Get campaigns filter success',
        'data': campaignFilter
      }
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
 }
 const getCampaignById = async(req, res) =>{
   try {
     let id = req.params.id
     let campaign = await CampaignModel.findById({_id:id});
     if(campaign){
       let response = {
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
     let startTime = req.body.startTime
     let firstClosureDate = req.body.firstClosureDate
     let finalClosureDate = req.body.finalClosureDate
     let response
     let department = await DepartmentModel.findOne({_id:departmentId})
     let newCampaign= await CampaignModel.findByIdAndUpdate(id,{
        name:name,
        startTime: startTime,
        firstClosureDate:firstClosureDate,
        finalClosureDate: finalClosureDate,
     })
     if(newCampaign){
       response = {
         'status': 'Update campaign success',
         'data': {...newCampaign._doc,departmentName:department.name}
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
     let campaign = await CampaignModel.findByIdAndDelete({_id:id});
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
 module.exports = [
    {
      method: "post", //define method http
      controller: postCampaign, //this is method handle when have request on server
      route: "/campaign", //define API
    },
    {
      method: "post", //define method http
      controller: postSearchCampaign, //this is method handle when have request on server
      route: "/campaign/Filter", //define API
    },
    {
      method: "get", //define method http
      controller: getCampaign, //this is method handle when have request on server
      route: "/campaign", //define API
    },
    {
      method: "get", //define method http
      controller: getCampaignById, //this is method handle when have request on server
      route: "/campaign/:id", //define API
    },
    {
      method: "get", //define method http
      controller: getCampaignByDepartment, //this is method handle when have request on server
      route: "/campaign/department/:id", //define API
    },
    {
      method: "put", //define method http
      controller: putCampaign, //this is method handle when have request on server
      route: "/campaign/:id", //define API
    },
    {
      method: "delete", //define method http
      controller: deleteCampaign, //this is method handle when have request on server
      route: "/campaign/:id", //define API
    },
  ]
  
