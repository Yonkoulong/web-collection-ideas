
const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        default: emotionType.NONE
    },
    accountID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
        require: true
    }
});

module.exports = mongoose.model('comment', commentSchema)