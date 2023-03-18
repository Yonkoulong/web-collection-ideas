const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountSchema  = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true    
    },
    refreshToken: {
        type:String,
        
    },
    departmentId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'department',
        require:true
    },
    dob:{
        type: Date
    }
});

module.exports = mongoose.model('account', accountSchema );