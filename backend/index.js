const express = require('express')
const ConnectDB =  require('./DB/connection.js')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const authRouter = require('./Router/authRouter.js')
const To_do_Router = require('./Router/To_do.js')

 
const App = express();
App.use(express.json());
dotenv.config({path:"config/config.js"})
App.use(cookieParser())

App.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something is wrong!";
    return res.status(status).json({
        success:false,
        status,
        message
    })
}) 

App.use('/api/v1',To_do_Router)
App.use('/api/v1',authRouter)

  


 ConnectDB()
 App.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
 })