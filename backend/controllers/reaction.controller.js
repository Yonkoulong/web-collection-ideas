const ReactionModel = require("../models/reaction.model")
const IdeaModel = require("../models/idea.model");
const AccountModel = require("../models/account.model");

const getReactionByIdea = async(req, res)=>{
    let ideaId = req.body.ideaId
    let response
    try {
        let reaction =await ReactionModel.find({ideaId:ideaId})
        if(reaction){
            response = {
            'status': ' success',
            'data': {                          
                reaction
            }           
        }      
        console.log(reaction.length)
        res.status(200).json(response)

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
        let authorReaction = await ReactionModel.findOne({
            authorId:authorId,
            ideaId:ideaId}).populate('authorId')
        console.log(authorReaction);
        if(authorReaction) {
            if( authorReaction.type== type){
              let deleteReaction=  await ReactionModel.findOneAndDelete({
                    authorId:authorId,
                    ideaId:ideaId
                })
                let updateIdea = await IdeaModel.updateOne(
                    { _id: ideaId },
                    { $pull: { reaction: authorReaction._id } }
                  )
                  if(updateIdea){
                    response = {
                        'status': 'update reaction success',
                        'data':deleteReaction
                    }   
                    return res.json(response)
                  }
                
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
                let newReaction = await ReactionModel.create({
                    type: type,
                    authorId: authorId,
                    ideaId: ideaId,
                  })
                if(newReaction){
                    let updateIdea = await IdeaModel.updateOne(
                        { _id: ideaId },
                        { $push: { reaction: newReaction._id } }
                      )
                      if(updateIdea){
                        response = {
                            'status': ' Reaction on idea success',
                            'data': newReaction         
                        }      
                      }
                    res.status(200).json(response)
                }
            }
        }   
    } catch (error) {
        res.status(500).json(error.message)
    }
};
const deleteReactionByIdea = async(req, res) =>{
    let authorId = req.id
    let ideaId = req.body.ideaId
    try {
        let authorReaction = await ReactionModel.findOne({
            authorId:authorId,
            ideaId:ideaId})
        if(authorReaction){
            let reaction= await ReactionModel.deleteOne({
                authorId:authorId,
                ideaId:ideaId
            })
            if(reaction){
                response = {
                    'status': 'Delete reaction success',
                    'data': {                          
                        reaction
                    }
                } 
                res.status(200).json(response)
           }   
        }
    } catch (error) {
        
    }
}

module.exports = [
  {
    method: "get", //define method http
    controller: getReactionByIdea, //this is method handle when have request on server
    route: "/reaction", //define API
  },
  {
    method: "post", //define method http
    controller: postReaction, //this is method handle when have request on server
    route: "/reaction", //define API
  },
  {
    method: "delete", //define method http
    controller: deleteReactionByIdea, //this is method handle when have request on server
    route: "/reaction", //define API
  },
]