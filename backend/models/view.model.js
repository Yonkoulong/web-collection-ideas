const emotionType = require('../Ulti')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const viewSchema = new Schema({
    count:{
        type:number
    },
    viewer:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'account',
        require : true
    },
    ideaId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'idea',
        require : true
    }
});

module.exports = mongoose.model('view', viewSchema)