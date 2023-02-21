const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ideaSchema  = new Schema({
    content:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'account',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',  
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'campaign',  
    },
    enonymously: {
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