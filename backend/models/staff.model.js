const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema  = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Staff', staffSchema );