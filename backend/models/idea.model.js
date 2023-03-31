const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ideaSchema  = new Schema({
    content:{
        type: String,
        required: true,
    },
    viewer:[
        {   type: mongoose.Schema.Types.ObjectId, 
            ref: 'account',
        }
    ],
    authorId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'account',
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category', 
        require: true 
    },
    campaignId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'campaign',  
        require: true
    },
    enonymously: {
        type: Boolean,
        require: true
    },
},{
    timestamps:true
});

module.exports = mongoose.model('idea', ideaSchema );