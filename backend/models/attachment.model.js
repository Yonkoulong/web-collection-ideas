const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const attachmentSchema  = new Schema({
    filelName: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    fileSize:{
        type: String,
        required: true    
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'account',
    },
    ideaId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'idea',
    }
});

module.exports = mongoose.model('attachment', attachmentSchema );