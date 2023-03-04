//require model
const CommentModel = require("../models/comment.model");

const getComment = async (_req, res) => {
    //create an array of documents
    try {
      const comments = await CommentModel.find({});
  
      return res.status(httpCode.ok).json(comments);
    } catch {
      return res.status(httpCode.badRequest).json([]);
    }
};
const postComment = async (req, res) =>{
    let content = req.body.content
    let authorId = req.body.authorId
    let ideaId = req.body.ideaId
    let response
    CommentModel.create({
      content: content,
      authorId: authorId,
      ideaId: ideaId,
    }).then(data=>{
      response = {
        'status': 'Comment success',
        'data': data
      }      
      res.status(200).json(response)
    })
    .catch(err=>{
      res.status(500).json(err.message)
    })
}
module.exports = [
  {
    method: "get", //define method http
    controller: getComment, //this is method handle when have request on server
    route: "/comment", //define API
  },
  {
    method: "post", //define method http
    controller: postComment, //this is method handle when have request on server
    route: "/comment", //define API
  },
]
