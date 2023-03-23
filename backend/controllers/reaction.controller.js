const ReactionModel = require("../models/reaction.model")
const IdeaModel = require("../models/idea.model");
const AccountModel = require("../models/account.model");
const getReactionByIdea = async(req, res)=>{
    let ideaId = req.params.ideaId
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
    let ideaId = req.params.ideaId
    let response
    console.log(type, authorId, ideaId);
    try {
        if(type ==0){
            response = {
                'status': 'user has not reacted!',
                'code':103
            }   
            return res.json(response)
        }
        //let author = await AccountModel.findOne({_id:authorId})
        let authorReaction = await ReactionModel.findOne({
            authorId:authorId,
            ideaId:ideaId})
        if(authorReaction) {
            if(authorReaction.type!=0 && authorReaction.type== type){
                response = {
                    'status': 'user has already reacted',
                    'code':103
                }   
                return res.json(response)
            }    
            else if(authorReaction.type==0){
                await ReactionModel.findOneAndDelete({
                    authorId:authorId,
                    ideaId:ideaId
                })
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
const deleteReactionByIdea = async(req, res) =>{
    let authorId = req.id
    let ideaId = req.params.ideaId
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
    route: "/:ideaId/reaction", //define API
  },
  {
    method: "post", //define method http
    controller: postReaction, //this is method handle when have request on server
    route: "/:ideaId/reaction", //define API
  },
  {
    method: "delete", //define method http
    controller: deleteReactionByIdea, //this is method handle when have request on server
    route: "/:ideaId/reaction", //define API
  },
]