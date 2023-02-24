const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const campaignSchema  = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    firstClosureDate: {
        type:Date,
        required:true,
        default:Date.now
     },
     finalClosureDate: {
         type: Date
     },
     departmentId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'department',
    }
},{
    timestamps:true
});

module.exports = mongoose.model('campaign', campaignSchema );