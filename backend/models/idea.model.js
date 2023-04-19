const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ideaSchema  = new Schema({
    content:{
        type: String,
        required: true,
        min
    },
    viewer:[
        {   type: mongoose.Schema.Types.ObjectId, 
            ref: 'account',
        }
    ],
    reaction:[
        {   type: mongoose.Schema.Types.ObjectId, 
            ref: 'reaction',
        }
    ],
    comment:[
        {   type: mongoose.Schema.Types.ObjectId, 
            ref: 'comment',
        }
    ],
    attachment :[
        {   type: mongoose.Schema.Types.ObjectId, 
            ref: 'attachment',
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
    created: {
         type: Date, default: Date.now
    }
});

module.exports = mongoose.model('idea', ideaSchema );