const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const campaignSchema  = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    startTime: {
        type:Date,
        required:true,
        default:Date.now
     },
    firstClosureDate: {
        type:Date,
        required:true,
     },
     finalClosureDate: {
         type: Date,
         required:true
     },
     departmentId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'department',
    }
},{
    timestamps:true
});

module.exports = mongoose.model('campaign', campaignSchema );