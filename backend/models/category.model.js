const mongoose = require("mongoose");
const emotionType = require('../Ulti')
const Schema = mongoose.Schema;
const categorySchema  = new Schema({
    type:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    }
   
});

module.exports = mongoose.model('category', categorySchema );