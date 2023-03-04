//require model
const IdeaModel = require("../models/idea.model");
const ReactionModel = require("../models/reaction.model")
const getIdeas = async (req, res) => {
    //create an array of documents
    //console(req.data)
    try {
      const ideas = await IdeaModel.find({});
      return res.status(200).json(ideas);
    } 
    catch (error) {
      return res.status(500).json(error.message);
    }
};
const getIdeaPopular = async(req, res)=>{
  let authorReaction = await ReactionModel.aggregate([
    {$group: {_id: {ideaId: '$ideaId'},  ideaCount : {$push: "$ideaId"}}},
    {$project: {_id: '$_id.ideaId', count: {$size: "$ideaCount"}}}
 ]);
}
const postIdea= async(req, res) =>{
    let content = req.body.content
    let authorId = req.body.authorId
    let campaignId = req.body.campaignId
    let categoryId = req.body.categoryId
    let enonymously = (req.body.enonymously==='true')? true:false 
    let response
    IdeaModel.create({
      content: content,
      authorId: authorId,
      campaignId: campaignId,
      categoryId: categoryId,
      enonymously: enonymously
    }).then(data=>{
      response = {
        'status': 'Upload new idea success',
        'data': data
      }      
      res.status(200).json(response)
    })
    .catch(err=>{
      res.status(500).json(err.message)
    })
}
const putIdea = async(req, res)=>{
   let id = req.params.id
   let newContent = req.body.content
   let enonymously = req.body.enonymously
   let response
   IdeaModel.findByIdAndUpdate(id,{
       content: newContent,
       enonymously:enonymously
   }).then(data=>{
    response = {
      'status': 'Update idea success',
      'data': data
    }      
   }).catch(err=>{
     res.status(500).json(err.message)
   })
}
module.exports = [
  {
    method: "get", //define method http
    controller: getIdeas, //this is method handle when have request on server
    route: "/idea", //define API
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
]
