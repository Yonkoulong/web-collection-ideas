const emotionType = require('../Ulti')
const emotionSchema = new mongoose.Schema({
     type:{
        type:Number,
        default:emotionType.NONE
     },
    accountID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'account',
        require : true
    }
});

module.exports = mongoose.model('emotion', emotionSchema)