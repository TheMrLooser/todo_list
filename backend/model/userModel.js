const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        validate:validator.isEmail
        
    },
    phone:{
        type:Number,
        unique:true,
        minLength:10,
        maxLength:10
    },
    password:{
        type:String,
        
    },
    img:{
        type:String
    }

    
},{timestamps:true});

module.exports = mongoose.model("User",userSchema)