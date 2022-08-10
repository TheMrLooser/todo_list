const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    date:{
        type:Date,
        default:Date(Date.now())
    },
    heading:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,

    },
    status:{
        type:String,
        default:"Not Completed"
    },
    userId:String 



},{timestamps:true});

module.exports = mongoose.model("TO_DO",DataSchema)