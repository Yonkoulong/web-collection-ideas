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
    avartarUrl:{
        type: String,
        default:"https://res.cloudinary.com/drt4qtuwv/image/upload/v1679112944/web_collection_ideas/download_pvmgpw.jpg" 
    },
    publishId:{
        type: String,
    },
    refreshToken: {
        type:String,
        
    },
    departmentId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'department'
    },
    dob:{
        type: Date
    }
});

module.exports = mongoose.model('account', accountSchema );