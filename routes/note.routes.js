const express = require("express")
const { auth } = require("../middleware/auth.middleware")
const { noteModel } = require("../model/note.model")

const noteRouter = express.Router()

noteRouter.post("/create", auth, async (req, res) => {
    const { title, body, user, category,userId} = req.body
    try {
        const note = new noteModel({ title, body, user, category,userId })
        await note.save()
        res.json({ msg: "note added" })
    } catch (error) {
        res.json({ msg: error })
    }
})


noteRouter.get("/", auth, async(req, res) => {
    try {
        const data=await noteModel.find({userId:req.body.userId})
        res.json({ msg: "get data",data })
    } catch (error) {
        res.json({ msg: error })
    }
    
})


noteRouter.patch("/update/:noteid", auth, async(req, res) => {
    const {noteid}=req.params
    const useriddoc=req.body.userId
    try {
        let note=await noteModel.findOne({_id:noteid})
        let noteuserid=note.userId
        if(useriddoc===noteuserid){
            await noteModel.findByIdAndUpdate({_id:noteid},req.body)
            res.json({msg:"patch done"})
        }else{
            res.json({msg:"not patched"})
        }
    } catch (error) {
        res.send(error)
    }

})


noteRouter.delete("/delete/:noteid", auth, async(req, res) => {
    const {noteid}=req.params
    const useriddoc=req.body.userId
    try {
        let note=await noteModel.findOne({_id:noteid})
        let noteuserid=note.userId
        if(useriddoc===noteuserid){
            await noteModel.findByIdAndDelete({_id:noteid})
            res.json({msg:"Deleted"})
        }else{
            res.json({msg:"not Deleted"})
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = {
    noteRouter
}