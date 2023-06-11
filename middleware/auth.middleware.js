const jwt=require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decoded=jwt.verify(token,process.env.secretkey)
            if(decoded){
                console.log(decoded.userID)
               
                req.body.user=decoded.user;
                req.body.userId=decoded.userID
                console.log(req.body)
                next()
            }else{
                res.json({msg:"token not varified"})
            }
        } catch (error) {
            res.json({msg:error})
        }
    }else{
        res.json({msg:"login first"})
    }
}

module.exports={
    auth
}