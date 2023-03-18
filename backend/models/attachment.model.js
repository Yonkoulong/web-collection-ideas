const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const attachmentSchema  = new Schema({
    filelName: {
        type: String,
    },
    originalName: {
        type: String,
    },
    fileSize:{
        type: String,
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