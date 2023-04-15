const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const departmentSchema  = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('department', departmentSchema );