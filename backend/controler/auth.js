const userSchema = require('../model/userModel.js');
const bcrypt = require("bcryptjs");
const createError = require("../middlewhare/error.js");
const jwt = require("jsonwebtoken")


const SignUp =async (req,res,next)=>{
    try {
        const user = await userSchema.findOne({phone:req.body.phone})
        if(user){
            return next(createError(201,"This number is already exist"))
        }

        const hash = await bcrypt.hash(req.body.password,10)
        const token = jwt.sign({id:req.body.phone},process.env.SECRET_KEY)
        res.cookie("access_token",token,{httpOnly:true}).status(200)
        const newUser = new userSchema({...req.body,password:hash,token:token})
        await newUser.save();
        res.status(200).send("user is created" ) 
    } catch (error) {
        next(error)
    } 
}



const SignIn = async (req,res,next)=>{
    const user = await userSchema.findOne({phone:req.body.phone});
    if(!user){
        return res.status(404).send("user not found");
    }
    const isCorrect = await bcrypt.compare(req.body.password,user.password)
    if(!isCorrect){
        return res.status(201).send("Wrong Credentials")
    }
    const token = jwt.sign({id:user.phone},process.env.SECRET_KEY)
    res.cookie("access_token",token,{httpOnly:true}).status(200)
    await userSchema.findByIdAndUpdate(user._id,{$set:{token:token}})
    const {password,...others} = user._doc
    res.status(200).send(others);
}


const LogOut = (req,res,next)=>{
    res.cookie("access_token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).send("Loged out successfull")
}


module.exports = {SignUp,SignIn,LogOut}

