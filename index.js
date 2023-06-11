const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.routes")
const cors=require("cors")
const app=express()
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/notes",noteRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server is running ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
   
})