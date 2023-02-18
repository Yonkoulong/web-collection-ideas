//require model
const Comment = require("../models/comment.model");

const getComment = async (_req, res) => {
    //create an array of documents
    try {
      const comments = await Comment.find({});
  
      return res.status(httpCode.ok).json(comments);
    } catch {
      return res.status(httpCode.badRequest).json([]);
    }
};

module.exports = [
  {
    method: "get", //define method http
    controller: getComment, //this is method handle when have request on server
    route: "/comment", //define API
  }
 
]
