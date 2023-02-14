const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ideaSchema  = new Schema({
    content:{
        type: String,
        required: true,
        unique: true
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'comment',
    }],
    emotion:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'emotion',      
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',  
    },
    department:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'department',  
    },
    enonymose: {
        type: Boolean,
        require: true
    },
    closureDate: {
       type:Date,
       required:true,
       default:Date.now
    },
    finalClosureDate: {
        type: Date
    }

});

module.exports = mongoose.model('idea', ideaSchema );