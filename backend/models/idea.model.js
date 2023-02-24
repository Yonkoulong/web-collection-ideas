const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ideaSchema  = new Schema({
    content:{
        type: String,
        required: true,
        unique: true
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'account',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',  
    },
    campaignId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'campaign',  
    },
    enonymously: {
        type: Boolean,
        require: true
    },

});

module.exports = mongoose.model('idea', ideaSchema );