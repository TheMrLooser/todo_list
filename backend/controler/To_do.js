const createError = require("../middlewhare/error.js");
const dataModel = require("../model/dataModel.js");
const userModel = require('../model/userModel.js')

const findUserByCookie = async(req,res,next)=>{
    const getCookie = await req.cookies.access_token
    if(getCookie){
        const getUser = await userModel.findOne({token:getCookie})
        const getTodo = await dataModel.find({userId:getUser._id})
        res.status(200).send(getTodo )    

        
         
    }
}

const addNew = async (req,res,next)=>{
    const getCookie = await req.cookies.access_token
    try {
        if(getCookie){
            const user = await userModel.findOne({token:getCookie})
            const newToDO = new dataModel({...req.body,userId:user._id});
            await newToDO.save()
            res.status(200).send("New element added")
        }
        
    } catch (error) {
        next(error)
    }
}

const getTodo = async (req,res,next)=>{
    try {
        const data = await dataModel.find()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

const delToDo = async (req,res,next)=>{
    try {
        const element = await dataModel.findById(req.params.id)
        if(!element){
            return res.status(404).send("Element not found")
        }
        await dataModel.findOneAndDelete(element._id)
        res.status(200).send("element deleted")
    } catch (error) {
        next(error)
    }
}

const updateTodo = async (req,res,next)=>{
    try {
        const element = await dataModel.findById(req.params.id);
        if(!element){
            return res.status(404).send("element not found")
        }
        await dataModel.findByIdAndUpdate(req.params.id,{$set:{...req.body}});
        res.status(200).send("updated successfully")
    
    } catch (error) {
        next(error)
    }
}


module.exports = {addNew,getTodo,delToDo , updateTodo ,findUserByCookie}