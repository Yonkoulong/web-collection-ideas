//require model
const IdeaModel = require("../models/idea.model");
const ReactionModel = require("../models/reaction.model")
const DepartmentModel = require("../models/department.model");
const campaignModel = require("../models/campaign.model");
const mailer = require("../Utils/mailer");
const nodemailer = require("nodemailer");
const accountModel = require("../models/account.model");
const CategoryModel = require("../models/category.model");
const AttachMentController = require("../controllers/attachment.controller")
// select idea có reation nhiều nhất
const mongoose = require("mongoose");
const commentModel = require("../models/comment.model");
const path = require("path");
const postIdeaMostLike = async (req, res) => {
  try {
    let campaignId = req.body.campaignId
    let categoryId = req.body?.categoryId
    let ideaMostLike
    if(categoryId == null){
       ideaMostLike = await IdeaModel.aggregate([
        {$match:{campaignId:mongoose.Types.ObjectId(campaignId)}},
        { $project: { 
          data:"$$ROOT",count: { 
          $size: { "$ifNull": [ "$reaction", [] ] }
      } } },
      {$sort: { count: -1 }}
       ])
    }
    else{
      ideaMostLike = await IdeaModel.aggregate([
        {$match:{campaignId:mongoose.Types.ObjectId(campaignId),categoryId:mongoose.Types.ObjectId(categoryId)}},
        { $project: {
          data:"$$ROOT", count: { 
          $size: { "$ifNull": [ "$reaction", [] ] }
      } } },
      {$sort: { count: -1 }}
       ])
    }
     if(!ideaMostLike) return res.sendStatus(404);
    response = {
      'status': 'Get idea most reaction',
      'data': ideaMostLike
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const postIdeaLatestComment = async (req, res) => {
  try {
    let campaignId = req.body.campaignId
    let categoryId = req.body?.categoryId
    let ideaLateComment
    if(categoryId == null){
      let idea= await IdeaModel.aggregate([
        {$match:{campaignId:mongoose.Types.ObjectId(campaignId)}},
       ])
        ideaLateComment = await commentModel.populate(idea,{path:"comment",options:{$orderby:'-createAt'}})
      //ideaLateComment = await idea.populate('comment')
    }
     if(!ideaLateComment) return res.sendStatus(404);
    response = {
      'status': 'Get idea latest comment',
      'data': ideaLateComment
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const postIdeasMostView = async(req, res)=>{
   try {
    let campaignId = req.body.campaignId
    let categoryId = req.body?.categoryId
    let ideaMostView
    if(categoryId == null){
      ideaMostView= await IdeaModel.aggregate([
        { $match : { campaignId : mongoose.Types.ObjectId(campaignId) } },
        { $project: {
          data:"$$ROOT",
           view: { 
                 $size: { "$ifNull": [ "$viewer", [] ] }
                 },
           
        } },
        {$sort: { view: -1 }}
      ])
    }
    else  {
       ideaMostView= await IdeaModel.aggregate([
        {$match:{categoryId:mongoose.Types.ObjectId(categoryId) ,campaignId:mongoose.Types.ObjectId(campaignId) }},
        { $project: {  data:"$$ROOT",count: { 
          $size: { "$ifNull": [ "$viewer", [] ] }
      } } },
      {$sort: { count: -1 }}
      ])
    }
      
      if(!ideaMostView) return res.sendStatus(404);
     // let ideaMostView = await IdeaModel.find({}).sort({viewer:1})
      response = {
        'status': 'Get idea most view',
        'data': ideaMostView
      }
      res.status(200).json(response)
   } catch (error) {
    res.status(500).json(error.message)
   }
}
const postIdeasLatest = async (req, res) =>{
  try {
    let campaignId = req.body.campaignId
    let categoryId = req.body?.categoryId
    let ideaLatest
    if(categoryId == null){
       ideaLatest= await IdeaModel.find({campaignId:campaignId}).sort({createdAt: -1})
    }
    else{
      ideaLatest= await IdeaModel.find({campaignId:campaignId,categoryId:categoryId}).sort({createdAt: -1})
    }
    if(!ideaLatest) return res.sendStatus(404);
    let response = {
      'status': 'Get idea most view',
      'data': ideaLatest
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const postIdeaFilter = async (req, res) => {
  try {
    let campaignId = req.body.campaignId
    let categoryId = req.body?.categoryId
    let ideas
    if(campaignId && categoryId == null){
      ideas = await IdeaModel.find({ campaignId: campaignId }).populate(['authorId','reaction'])
    }
    else if(categoryId && campaignId ){
      ideas = await IdeaModel.find({ campaignId: campaignId,categoryId: categoryId }).populate(['authorId','reaction'])
    }
    let response = {
      'status': 'Get idea success',
      'data': ideas
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const getIdeaById = async (req, res) => {
  try {
    //AttachMentController.getAttchmentById(req, res)
    let id = req.params.id
    let detailIdea = await IdeaModel.findOne({_id:id}).populate(['authorId','campaignId','viewer','reaction','comment','attachment'])
    if(!detailIdea)return res.sendStatus(404);
    let response = {
      'status': 'Get idea success',
      'data': detailIdea
    }
    res.status(200).json(response)
    
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const searchIdea = async (req, res) => {
  try {
    let filter = req.body?.filter
    let ideaFilter = await IdeaModel.find({ "content": { $regex: `${filter}` } })
    if (ideaFilter) {
      response = {
        'status': `Get idea filter by ${filter} success`,
        'data': ideaFilter
      }
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(err.message)
  }
}

const postIdea = async (req, res) => {
  try {
    let content = req.body.content
    let authorId = req.id
    let campaignId = req.body.campaignId
    let categoryId = req.body.categoryId
    let enonymously = (req.body.enonymously === 1) ? true : false
    let response
    let campaign = await campaignModel.findOne({_id:campaignId})
    let currentAccount = await accountModel.findOne({_id:authorId})
    let newIdea= await IdeaModel.create({
      content: content,
      authorId: authorId,
      campaignId: campaignId,
      categoryId: categoryId,
      enonymously: enonymously
    })
    if(!newIdea) return res.sendStatus(401);
      let qac= await accountModel.find({role:"qac",departmentId:campaign.departmentId})
      let qacArr = []
      qac.forEach(element => {
        qacArr.push(element.email)
      });
      if(qac){
        console.log(qac);
        let infor= await mailer.sendMail(qacArr,`${currentAccount.name} has post new idea at${(await newIdea).createdAt} .Content: ${(await newIdea).content}`,`${process.env.APP_URL}/campaigns/${campaignId}/ideas/${(await newIdea)._id}`)
        // sau này tính làm sau
        if(!infor){
          let response = {
            'status': 'No recipients',
          }
          return res.status(401).json(response)
        }    
      }
      response = {
        'status': 'Upload new idea success',
        'data': newIdea
      }
      res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const putIdea = async (req, res) => {
  let id = req.params.id
  let newContent = req.body.content
  let enonymously = req.body.enonymously
  let response
  IdeaModel.findByIdAndUpdate(id, {
    content: newContent,
    enonymously: enonymously
  }).then(data => {
    response = {
      'status': 'Update idea success',
      'data': data
    }
    res.status(200).json(response)
  }).catch(err => {
    res.status(500).json(err.message)
  })
}
const postView = async (req, res) => {
  try {
    let id = req.body.ideaId
    let viewerId = req.id
    let response
    let idea = await IdeaModel.findOne({ _id: id }).populate()
    if (idea) {
      if (idea.viewer.includes(viewerId)) {
        response = {
          'status': 'Account has already view this idea',
          'code': 103
        }
        res.status(200).json(response)
      }
      else {
        let updateIdea = await IdeaModel.updateOne(
          { _id: id },
          { $push: { viewer: viewerId } }
        )
        if(!updateIdea) return res.sendStatus(404);
        response = {
          'status': 'Account view success',
          
        }
        res.status(200).json(response)
      }
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = [
  {
    method: "post", //define method http
    controller: postIdeaFilter, //this is method handle when have request on server
    route: "/idea/filter", //define API
  },
  {
    method: "post", //define method http
    controller: searchIdea, //this is method handle when have request on server
    route: "/idea/search", //define API
  },
  {
    method: "get", //define method http
    controller: getIdeaById, //this is method handle when have request on server
    route: "/idea/:id", //define API
  },
  {
    method: "post", //define method http
    controller: postIdeaMostLike, //this is method handle when have request on server
    route: "/idea/mostLike", //define API
  },
  {
    method: "post", //define method http
    controller: postIdeasMostView, //this is method handle when have request on server
    route: "/idea/mostView", //define API
  },
  {
    method: "get", //define method http
    controller: postIdeasLatest, //this is method handle when have request on server
    route: "/ideaLatest", //define API
  },
  {
    method: "post", //define method http
    controller: postIdeaLatestComment, //this is method handle when have request on server
    route: "/idea/latestComment", //define API
  },
  {
    method: "put", //define method http
    controller: putIdea, //this is method handle when have request on server
    route: "/idea/:id", //define API
  },
  {
    method: "post", //define method http
    controller: postIdea, //this is method handle when have request on server
    route: "/idea", //define API
  },
  {
    method: "post", //define method http
    controller: postView, //this is method handle when have request on server
    route: "/view", //define API
  },
]
