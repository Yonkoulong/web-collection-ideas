const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    enonymously: {
        type: Boolean,
        require: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        require: true
    },
    ideaId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'idea',
        require: true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('comment', commentSchema)