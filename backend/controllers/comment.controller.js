//require model
const CommentModel = require("../models/comment.model");
const IdeaModel = require("../models/idea.model");
const AccountModel = require("../models/account.model")
const mailer = require("../Utils/mailer");
const validator = require("email-validator");
const getComment = async (_req, res) => {
    //create an array of documents
    try {
      const comments = await CommentModel.find({});
     let response = {
        'status':' Get allComment success',
        'data': comments
      }      
      return res.status(200).json(response);
    } catch (error)  {
      return res.status(500).json(err.message)
    }
};
const getCommentById = async (req, res) =>{
  try {
    let id = req.params.id
    // let authorId = req.id
    // let ideaId = req.body.ideaId
    let response
    let comment = await CommentModel.findOne({
      _id:id,
    })
    if(comment){
      response = {
        'status': 'Get Comment By Id success',
        'data': comment
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const postComment = async (req, res) =>{
  try {
    let content = req.body.content
    let enonymously = (req.body.enonymously === 1) ? true : false
    let authorId = req.id
    let ideaId = req.body.ideaId
    let response
    let newComment= await CommentModel.create({
      content: content,
      enonymously:enonymously,
      authorId: authorId,
      ideaId: ideaId,
    })
    if(!newComment) return res.sendStatus(404);
      let idea= await IdeaModel.findOne({_id:ideaId}).populate('authorId')
      let poster = await AccountModel.findOne({_id:authorId})
      if( validator.validate(element.authorId.email)){
        let infor= await mailer.sendMail(idea.authorId.email,`${poster.name} has post new comment at${(await newComment).createdAt} .Content: ${(await newComment).content}`,`${process.env.APP_URL}/campaigns/${idea.campaignId}/ideas/${ideaId}`)
      }
      let updateIdea = await IdeaModel.updateOne(
        { _id: ideaId },
        { $push: { comment: newComment._id } }
      )
      if(updateIdea){
        response = {
          'status': 'Comment success',
          'data': newComment
        }      
        res.status(200).json(response)
      }
      
    
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const putComment = async (req, res) =>{
  try {
    let id = req.params.id
    let content = req.body.content
    let authorId = req.id
    let ideaId = req.body.ideaId
    let response
    let comment = await CommentModel.findOneAndUpdate({
      _id:id,
      authorId:authorId,
      ideaId:ideaId
    },{
      content:content
    })
    if(comment){
      response = {
        'status': 'Update Comment success',
        'data': comment
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const deleteComment = async (req, res) =>{
  try {
    let id = req.params.id
    let content = req.body.content
    let authorId = req.id
    let ideaId = req.body.ideaId
    let response
    let comment = await CommentModel.findByIdAndDelete({
      _id:id,
      authorId:authorId,
      ideaId:ideaId
    })
    if(comment){
      response = {
        'status': 'Delete Comment success',
        'data': comment
      }      
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = [
  {
    method: "get", //define method http
    controller: getComment, //this is method handle when have request on server
    route: "/comment", //define API
  },
  {
    method: "get", //define method http
    controller: getCommentById, //this is method handle when have request on server
    route: "/comment/:id", //define API
  },
  {
    method: "post", //define method http
    controller: postComment, //this is method handle when have request on server
    route: "/comment", //define API
  },
  {
    method: "put", //define method http
    controller: putComment, //this is method handle when have request on server
    route: "/comment/:id", //define API
  },
  {
    method: "delete", //define method http
    controller: deleteComment, //this is method handle when have request on server
    route: "/comment/:id", //define API
  },
]
