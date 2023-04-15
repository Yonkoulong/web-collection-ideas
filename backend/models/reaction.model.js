const reactionType = require('../Ulti')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactionSchema = new Schema({
     type:{
        type:Number,
        default:reactionType.NONE
     },
    authorId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'account',
        require : true
    },
    ideaId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'idea',
        require : true
    }
});

module.exports = mongoose.model('reaction', reactionSchema)