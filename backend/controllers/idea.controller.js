//require model
const IdeaModel = require("../models/idea.model");
const ReactionModel = require("../models/reaction.model")
const DepartmentModel = require("../models/department.model");
const campaignModel = require("../models/campaign.model");
const mailer = require("../Utils/mailer");
const nodemailer = require("nodemailer");
const accountModel = require("../models/account.model");
const CategoryModel = require("../models/category.model");
// select idea có reation nhiều nhất
const getIdeaMostLike = async (req, res) => {
  try {
     let ideaMostLike = await IdeaModel.aggregate([
      { $project: { count: { 
        $size: { "$ifNull": [ "$reaction", [] ] }
    } } },
    {$sort: { count: -1 }}
     ])
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
const getIdeaLatestComment = async (req, res) => {
  try {
     let ideaMostLike = await IdeaModel.aggregate([
      { $project: { count: { 
        $size: { "$ifNull": [ "$comment", [] ] }
    } } },
    {$sort: { count: -1 }}
     ])
     if(!ideaMostLike) return res.sendStatus(404);
    response = {
      'status': 'Get idea latest comment',
      'data': ideaMostLike
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const getIdeasMostView = async(req, res)=>{
   try {
      let ideaMostView= await IdeaModel.aggregate([
        { $project: { count: { 
          $size: { "$ifNull": [ "$viewer", [] ] }
      } } },
      {$sort: { count: -1 }}
      ])
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
const getIdeasLatest = async (req, res) =>{
  try {
    let ideaLatest= await IdeaModel.find({}).sort({createdAt: -1})
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
    let id = req.params.id
    let detailIdea = await IdeaModel.findOne({_id:id}).populate(['authorId','campaignId','viewer','reaction','comment'])
    if(detailIdea){
      let response = {
        'status': 'Get idea success',
        'data': detailIdea
      }
      res.status(200).json(response)
    }
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
    let authorId = req.body.authorId
    let campaignId = req.body.campaignId
    let categoryId = req.body.categoryId
    let enonymously = (req.body.enonymously === 'true') ? true : false
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
    let id = req.body.id
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
const postReaction = async (req, res) =>{
  let type = req.body.type
  let authorId = req.id
  let ideaId = req.body.ideaId
  let response
  try {
      let IdeaModel = await IdeaModel.findOne({
          ideaId:ideaId}).populate('reaction')
      if(IdeaModel) {
          if( IdeaModel.reaction.type== type){
            let deleteReaction=  await ReactionModel.findOneAndDelete({
                  authorId:authorId,
                  ideaId:ideaId
              })
              response = {
                  'status': 'Delete reaction success',
                  'data':deleteReaction
              }   
              return res.json(response)
          }    
          else {
             let updateReaction= await ReactionModel.findOneAndUpdate({
                  authorId:authorId,
                  ideaId:ideaId
              },{type:type}).populate('authorId')
              if(updateReaction){
                   response = {
                  'status': 'Delete reaction success',
                  'code':updateReaction
              }   
              return res.json(response)}
          }        
      }
      else{
          let idea =await IdeaModel.findOne({_id:ideaId})
          if(idea){
              let data = await ReactionModel.create({
                  type: type,
                  authorId: authorId,
                  ideaId: ideaId,
                })
              if(data){
                  response = {
                      'status': ' Reaction on idea success',
                      'data': data         
                  }      
                  res.status(200).json(response)
              }
          }
      }   
  } catch (error) {
      res.status(500).json(error.message)
  }
};
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
    method: "get", //define method http
    controller: getIdeaMostLike, //this is method handle when have request on server
    route: "/ideaMostReaction", //define API
  },
  {
    method: "get", //define method http
    controller: getIdeasMostView, //this is method handle when have request on server
    route: "/ideaMostView", //define API
  },
  {
    method: "get", //define method http
    controller: getIdeasLatest, //this is method handle when have request on server
    route: "/ideaLatest", //define API
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
