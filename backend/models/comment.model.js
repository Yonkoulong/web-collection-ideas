const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        default: emotionType.NONE
    }, enonymously: {
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
});

module.exports = mongoose.model('comment', commentSchema)