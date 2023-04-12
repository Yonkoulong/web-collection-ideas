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
function compare( a, b ) {
  if ( a.count < b.count ){
    return -1;
  }
  if ( a.count > b.count ){
    return 1;
  }
  return 0;
}
const postIdeaMostLike = async (req, res) => {
  try {
    let campaignId = req.body.campaignId
    let categoryId = req.body?.categoryId
    var ideaMostLike
    let finalIdea
    if(categoryId == null){
      var count
      ideaMostLike = await IdeaModel.find({campaignId:campaignId}).populate('reaction')
      ideaMostLike.forEach(ideaItem => {
        count =0
        ideaItem.reaction.forEach(reactionItem => {
          count += reactionItem.type==1 ? 1:0
        });
        //ideaItem.viewer.push({count:"count"})
//ideaItem= Object.assign(ideaItem,{count:1})
       Object.assign(ideaItem._doc,{count:count})
      });
      //ideaMostLike.push({count:"count"})
     
      console.log( ideaMostLike.sort((a,b) => (a._doc.count > b._doc.count) ? 1 : ((b._doc.count > a._doc.count) ? -1 : 0)))
    }
    else{
      ideaMostLike = await IdeaModel.find({campaignId:campaignId,categoryId:categoryId}).sort({like:1}).populate(['authorId',{path:'reaction',match:{type:1}}])
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
const postIdeaMostComment = async (req, res) => {
  try {
    let campaignId = req.body.campaignId
    let categoryId = req.body?.categoryId
    let ideaMostComment
    if(categoryId == null){
      ideaMostComment= await IdeaModel.find({campaignId:campaignId}).sort({comment:1}).populate(['authorId','reaction'])
    }
    else  {
      ideaMostComment= await IdeaModel.find({campaignId:campaignId, categoryId:categoryId}).sort({comment:1}).populate(['authorId','reaction'])
    }
    response = {
      'status': 'Get idea most comment',
      'data': ideaMostComment
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
      ideaMostView= await IdeaModel.find({campaignId:campaignId}).sort({viewer:1}).populate(['authorId','reaction'])
    }
    else  {
       ideaMostView= await IdeaModel.find({campaignId:campaignId,categoryId:categoryId}).sort({viewer:1}).populate(['authorId','reaction'])
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
       ideaLatest= await IdeaModel.find({campaignId:campaignId}).sort({createdAt: 1}).populate(['authorId','reaction'])
    }
    else{
      ideaLatest= await IdeaModel.find({campaignId:campaignId,categoryId:categoryId}).sort({createdAt: 1}).populate(['authorId','reaction'])
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
    let listIdea = req.body.listIdea

    var array = JSON.parse(listIdea)
   console.log(array)
    array.forEach(element => {
      console.log(element)
        element=mongoose.Types.ObjectId(element)
    });
   
    let ideaFilter= await IdeaModel.find({_id:{$in:array},"content": { $regex: `${filter}` }})
   // let ideaFilter = await IdeaModel.find({ campaignId:campaignId ,"content": { $regex: `${filter}` }})
    if (ideaFilter) {
      response = {
        'status': `Get idea filter by ${filter} success`,
        'data': ideaFilter
      }
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
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
    let ideaId = req.body.ideaId
    let viewerId = req.id
    let response
    let idea = await IdeaModel.findOne({ _id: ideaId }).populate()
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
          { _id: ideaId },
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

const getAllIdeas = async(req, res) => {
  try {
    let ideas = await IdeaModel.find({ }).populate(['authorId','reaction']);
    let response = {
      'status': 'Get all ideas success',
      'data': ideas
    }
    res.status(200).json(response)
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
    method: "post", //define method http
    controller: postIdeasLatest, //this is method handle when have request on server
    route: "/idea/latest", //define API
  },
  {
    method: "post", //define method http
    controller: postIdeaMostComment, //this is method handle when have request on server
    route: "/idea/mostComment", //define API
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
  {
    method: "get",
    controller: getAllIdeas,
    route: "/all-ideas"
  }
]
