const express=require("express")
const { userModel } = require("../model/user.model")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
require("dotenv").config()
userRouter.post("/register",async(req,res)=>{
    const {email,pass,name}=req.body

     try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.json({msg:err.message})
            }else{
                const user=new userModel({name,pass:hash,email}) 
                await user.save()
                res.json({msg:"register successfull"})
            }
        })
      
     } catch (error) {
        console.log("register not successfull")
        res.json({msg:"register not successfull",err:error.message})
     }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user= await userModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,user:user.name},process.env.secretkey)
                    res.json({msg:"login successfull",token:token})
                   
                }else{
                    res.json({msg:err})
                }
            })
        }else{
            res.json({msg:"user not found"})
        }
    } catch (error) {
        console.log("login not successfull")
        res.json({msg:"login not successfull",err:error.message})
    }

})


module.exports={
    userRouter
}