const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const attachmentSchema  = new Schema({
    filelName: {
        type: String,
    },
    publishId: {
        type: String,
        require:true
    },
    url: {
        type: String,
        require:true
    },
    fileSize:{
        type: String,
    },
    type:{
        type: String,
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'account',
        require:true
    },
    ideaId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'idea',
        require:true
    }
});

module.exports = mongoose.model('attachment', attachmentSchema );